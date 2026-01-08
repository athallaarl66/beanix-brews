import { prisma } from "@/lib/prisma";

// Ambil semua produk milik tenant
export async function getProducts(businessId: string) {
  return prisma.product.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
  });
}

// Ambil 1 produk (storefront)
export async function getProductBySlug(businessId: string, slug: string) {
  return prisma.product.findFirst({
    where: { businessId, slug, isAvailable: true },
  });
}

// Create produk (dashboard)
export async function createProduct(
  businessId: string,
  data: {
    name: string;
    slug: string;
    price: number;
    categoryId: string;
    description?: string;
    image?: string;
  }
) {
  return prisma.product.create({
    data: { ...data, businessId },
  });
}
