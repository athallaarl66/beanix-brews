import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// Ambil user yang sedang login berdasarkan session cookie
export async function getSessionUser() {
  // Ambil cookie dari request (server-side)
  const cookieStore = await cookies();

  // Session disimpan sebagai userId (simple auth untuk demo)
  const session = cookieStore.get("session")?.value;

  // Kalau tidak ada session, user belum login
  if (!session) return null;

  // Cari user aktif berdasarkan id dari session
  return prisma.user.findUnique({
    where: {
      id: session,
      isActive: true, // user non-aktif dianggap logout
    },
  });
}
