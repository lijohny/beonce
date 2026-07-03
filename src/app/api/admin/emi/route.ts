import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  userId: z.number().int().positive(),
  loanAmount: z.number().positive(),
  emiAmount: z.number().positive(),
  totalEmis: z.number().int().min(1).max(360),
  processingFee: z.number().min(0).default(0),
  nextDueDate: z.string().datetime().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });

  const { userId, loanAmount, emiAmount, totalEmis, processingFee, nextDueDate } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const kyc = await prisma.kycRecord.findUnique({ where: { userId } });
  if (kyc?.status !== "APPROVED") {
    return NextResponse.json({ error: "KYC must be approved before creating EMI account" }, { status: 400 });
  }

  const gstAmount = Math.round(processingFee * 0.18 * 100) / 100;

  const emiAccount = await prisma.emiAccount.create({
    data: {
      userId, loanAmount, emiAmount, totalEmis, processingFee, gstAmount,
      nextDueDate: nextDueDate ? new Date(nextDueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "ACTIVE",
    },
  });

  return NextResponse.json({ message: "EMI account created", emiAccount }, { status: 201 });
}
