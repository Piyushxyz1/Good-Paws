import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      internalOrderId,
    } = await req.json();

    // 1. Generate signature locally using HMAC SHA256
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    // 2. Compare signatures
    const isAuthentic = expectedSignature === razorpaySignature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 3. Update Order Status, set unique paymentId, and Clear Cart in a transaction
    await prisma.$transaction(async (tx) => {
      // Mark order as paid and record paymentId
      await tx.order.update({
        where: { id: internalOrderId },
        data: {
          status: "CONFIRMED", // Assumes 'PAID' exists in your OrderStatus enum
          paymentStatus: "SUCCESS",
          paymentId: razorpayPaymentId,
        },
      });

      // Find user's cart via the order's userId
      const order = await tx.order.findUnique({
        where: { id: internalOrderId },
        select: { userId: true },
      });

      if (order) {
        const cart = await tx.cart.findUnique({
          where: { userId: order.userId },
        });

        if (cart) {
          // Delete cart items
          await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}