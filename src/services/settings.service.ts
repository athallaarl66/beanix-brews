import { prisma } from "@/lib/prisma";

// Ambil settings tenant
export async function getBusinessSettings(businessId: string) {
  return prisma.businessSettings.findUnique({
    where: { businessId },
  });
}
