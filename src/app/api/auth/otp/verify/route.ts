import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().length(6),
  purpose: z.enum(["REGISTRATION", "LOGIN", "PASSWORD_RESET", "TWO_FA"]),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { mobile, otp, purpose } = parsed.data;

  const record = await prisma.otpRecord.findFirst({
    where: { mobile, otp, purpose, used: false, expiresAt: { gte: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  await prisma.otpRecord.update({ where: { id: record.id }, data: { used: true } });

  return NextResponse.json({ message: "OTP verified", verified: true });
}
