import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { mobile, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { mobile } });
  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (user.status === "SUSPENDED") {
    return NextResponse.json({ error: "Account suspended" }, { status: 403 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // If 2FA enabled, require OTP step
  if (user.is2FAEnabled) {
    return NextResponse.json({ requires2FA: true, mobile: user.mobile }, { status: 200 });
  }

  const token = await signToken({ userId: user.id, mobile: user.mobile, role: user.role });

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const res = NextResponse.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, mobile: user.mobile, role: user.role, status: user.status },
  });
  res.cookies.set("auth_token", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 604800 });
  return res;
}
