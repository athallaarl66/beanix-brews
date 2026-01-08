import { prisma } from "@/lib/prisma";

// Ambil semua kategori tenant
export async function getCategories(businessId: string) {
  return prisma.category.findMany({
    where: { businessId, isActive: true },
    orderBy: { displayOrder: "asc" },
  });
}

// Create kategori
export async function createCategory(
  businessId: string,
  data: { name: string; slug: string; icon?: string }
) {
  return prisma.category.create({
    data: { ...data, businessId },
  });
}
