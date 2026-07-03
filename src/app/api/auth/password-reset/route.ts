import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  newPassword: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { mobile, newPassword } = parsed.data;

  // Require OTP_RESET verified within last 15 min
  const otpVerified = await prisma.otpRecord.findFirst({
    where: {
      mobile,
      purpose: "PASSWORD_RESET",
      used: true,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
    },
  });
  if (!otpVerified) {
    return NextResponse.json({ error: "OTP verification required" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({ where: { mobile } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  // Invalidate all sessions
  await prisma.session.deleteMany({ where: { userId: user.id } });

  return NextResponse.json({ message: "Password reset successful" });
}
