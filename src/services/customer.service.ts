import { prisma } from "@/lib/prisma";

// Ambil customer tenant
export async function getCustomers(businessId: string) {
  return prisma.customer.findMany({
    where: { businessId },
    orderBy: { totalSpent: "desc" },
  });
}
