import { prisma } from "@/lib/prisma";

// Ambil order tenant (dashboard)
export async function getOrders(businessId: string) {
  return prisma.order.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

// Create order (storefront)
export async function createOrder(
  businessId: string,
  data: {
    orderNumber: string;
    subtotal: number;
    tax: number;
    total: number;
    items: {
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }[];
  }
) {
  return prisma.order.create({
    data: {
      businessId,
      orderNumber: data.orderNumber,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      items: {
        create: data.items,
      },
    },
  });
}
