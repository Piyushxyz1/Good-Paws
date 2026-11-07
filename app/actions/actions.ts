
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCartQuantity(
  itemId: string,
  quantity: number
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Please login first." };
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { success: false, message: "Invalid quantity." };
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!cart) {
    return { success: false, message: "Cart not found." };
  }

  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  });

  if (!item) {
    return { success: false, message: "Item not found." };
  }

  if (quantity > item.product.stock) {
    return { success: false, message: "Not enough stock available." };
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  revalidatePath("/cart");

  return { success: true };
}

export async function removeCartItem(itemId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Please login first." };
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!cart) {
    return { success: false, message: "Cart not found." };
  }

  const result = await prisma.cartItem.deleteMany({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (result.count === 0) {
    return { success: false, message: "Item not found." };
  }

  revalidatePath("/cart");

  return { success: true };
}

export async function addToCart(productId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Please login to add products to cart.",
      };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        stock: true,
        isActive: true,
        name:true
      },
    });

    if (!product || !product.isActive) {
      return {
        success: false,
        message: "Product not available.",
      };
    }

    if (product.stock < 1) {
      return {
        success: false,
        message: "Product is out of stock.",
      };
    }

    const cart = await prisma.cart.upsert({
      where: {
        userId: session.user.id,
      },
      update: {},
      create: {
        userId: session.user.id,
      },
    });

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return {
          success: false,
          message: "Maximum available stock reached.",
        };
      }

      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1, 
          productName: product.name      
        },
      });
    }

    revalidatePath("/cart");

    return {
      success: true,
      message: "Product added to cart!",
    };
  } catch (error) {
    console.error("Add to cart error:", error);

    return {
      success: false,
      message: "Unable to add product to cart.",
    };
  }
}