import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, sendOtpSms } from "@/lib/sns";
import { z } from "zod";

const schema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  purpose: z.enum(["REGISTRATION", "LOGIN", "PASSWORD_RESET", "TWO_FA"]),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { mobile, purpose } = parsed.data;

  // Rate limit: max 3 OTPs per mobile per 10 min
  const recentCount = await prisma.otpRecord.count({
    where: {
      mobile,
      purpose,
      createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) },
    },
  });
  if (recentCount >= 3) {
    return NextResponse.json({ error: "Too many OTP requests. Try again later." }, { status: 429 });
  }

  const user = await prisma.user.findUnique({ where: { mobile } });

  if (purpose === "REGISTRATION" && user) {
    return NextResponse.json({ error: "Mobile already registered" }, { status: 409 });
  }
  if ((purpose === "LOGIN" || purpose === "PASSWORD_RESET") && !user) {
    return NextResponse.json({ error: "Mobile not registered" }, { status: 404 });
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + Number(process.env.OTP_EXPIRY_MINUTES || 10) * 60 * 1000);

  await prisma.otpRecord.create({
    data: { mobile, otp, purpose, expiresAt, userId: user?.id ?? null },
  });

  await sendOtpSms(mobile, otp);

  return NextResponse.json({ message: "OTP sent successfully" });
}
