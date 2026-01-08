import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// Ambil tenant (business) aktif dari header x-tenant
export async function getCurrentTenant() {
  // Ambil header request (di-set oleh middleware)
  const h = await headers();

  // Slug tenant (contoh: "starbucks")
  const tenantSlug = h.get("x-tenant");

  // Kalau header tidak ada, berarti bukan context tenant
  if (!tenantSlug) {
    throw new Error("Tenant header missing");
  }

  // Cari business aktif berdasarkan slug
  const business = await prisma.business.findUnique({
    where: {
      slug: tenantSlug,
      isActive: true, // tenant non-aktif tidak boleh akses
    },
  });

  // Jika tenant tidak ditemukan / tidak aktif
  if (!business) {
    throw new Error("Business not found or inactive");
  }

  // Return data tenant (dipakai untuk scope query & layout)
  return business;
}
