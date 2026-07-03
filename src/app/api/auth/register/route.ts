import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { mobile, name, password, email } = parsed.data;

  // Verify OTP was completed before registration
  const otpVerified = await prisma.otpRecord.findFirst({
    where: {
      mobile,
      purpose: "REGISTRATION",
      used: true,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
    },
  });
  if (!otpVerified) {
    return NextResponse.json({ error: "Mobile OTP verification required" }, { status: 403 });
  }

  const existing = await prisma.user.findUnique({ where: { mobile } });
  if (existing) return NextResponse.json({ error: "Mobile already registered" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { mobile, name, email, passwordHash, isVerified: true, status: "PENDING" },
  });

  const token = await signToken({ userId: user.id, mobile: user.mobile, role: user.role });

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const res = NextResponse.json({ message: "Registration successful", userId: user.id }, { status: 201 });
  res.cookies.set("auth_token", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 604800 });
  return res;
}
