import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { address, city, state, pincode, amount } = body;

    // 1. Fetch user's cart items with product details
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 2. Create Razorpay Order (Amount in paise)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const fullShippingAddress = `${address}, ${city}, ${state} - ${pincode}`;

    // 3. Save Order in Database matching your exact schema fields
    const internalOrder = await prisma.order.create({
      data: {
        userId,
        total: amount,
        status: "PENDING",
        shippingAddress: fullShippingAddress,
        paymentStatus: "PENDING",
        paymentId:razorpayOrder.id,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,   // Required by your OrderItem schema
            unitPrice: item.product.price,    // Required by your OrderItem schema
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      internalOrderId: internalOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}