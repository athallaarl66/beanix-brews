import { NextRequest, NextResponse } from "next/server";

// Path yang boleh diakses tanpa tenant & tanpa login
const PUBLIC_PATHS = ["/", "/404", "/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Lewatin middleware untuk halaman publik
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const host = req.headers.get("host") || "";
  let tenant: string | null = null;

  // Dev: ambil tenant dari query (?tenant=xxx)
  // Prod: ambil tenant dari subdomain (xxx.domain.com)
  if (host.includes("localhost")) {
    tenant = req.nextUrl.searchParams.get("tenant");
  } else {
    tenant = host.split(".")[0];
  }

  // Kalau tenant kosong, lanjut tanpa set header (hindari redirect loop)
  if (!tenant) {
    return NextResponse.next();
  }

  // Proteksi halaman dashboard (wajib login)
  if (pathname.startsWith("/dashboard")) {
    const session = req.cookies.get("session");
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Simpan tenant ke header untuk dipakai di server component / API
  const res = NextResponse.next();
  res.headers.set("x-tenant", tenant);

  return res;
}

// Jalankan middleware di semua route kecuali asset & API
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
