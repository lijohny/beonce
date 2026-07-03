import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const PUBLIC_PATHS = [
  "/",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/otp/send",
  "/api/auth/otp/verify",
  "/api/auth/password-reset",
  "/portal/login",
  "/portal/register",
  "/portal/forgot-password",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isPublic) return NextResponse.next();

  // Only protect /portal and /api/portal routes
  const isProtected = pathname.startsWith("/portal") || pathname.startsWith("/api/portal");
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isProtected && !isAdminRoute) return NextResponse.next();

  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/portal/login", req.url));
  }

  try {
    const payload = await verifyToken(token);

    if (isAdminRoute && payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const res = NextResponse.next();
    res.headers.set("x-user-id", String(payload.userId));
    res.headers.set("x-user-role", payload.role);
    return res;
  } catch {
    const res = NextResponse.redirect(new URL("/portal/login", req.url));
    res.cookies.delete("auth_token");
    return res;
  }
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/api/portal/:path*", "/api/admin/:path*"],
};
