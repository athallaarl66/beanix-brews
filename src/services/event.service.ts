import { prisma } from "@/lib/prisma";

// Event aktif tenant
export async function getActiveEvents(businessId: string) {
  return prisma.event.findMany({
    where: {
      businessId,
      isActive: true,
    },
    orderBy: { startDate: "asc" },
  });
}
