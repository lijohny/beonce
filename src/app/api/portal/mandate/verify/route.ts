import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay, verifySignature } from "@/lib/razorpay";
import { z } from "zod";

const schema = z.object({
  mandateId: z.number().int().positive(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { mandateId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;

  const valid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
  if (!valid) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  const mandate = await prisma.mandateRecord.findFirst({
    where: { id: mandateId, userId, razorpayOrderId },
  });
  if (!mandate) return NextResponse.json({ error: "Mandate not found" }, { status: 404 });

  // Fetch token from Razorpay
  let tokenId: string | null = null;
  try {
    const payment = await razorpay.payments.fetch(razorpayPaymentId) as { token_id?: string };
    tokenId = payment.token_id || null;
  } catch {
    // token may arrive via webhook — proceed without it
  }

  await prisma.$transaction(async (tx) => {
    await tx.mandateRecord.update({
      where: { id: mandateId },
      data: {
        razorpayPaymentId,
        razorpayTokenId: tokenId,
        status: "ACTIVE",
        activatedAt: new Date(),
      },
    });

    if (mandate.emiAccountId) {
      await tx.emiAccount.update({
        where: { id: mandate.emiAccountId },
        data: { mandateId: String(mandateId), mandateStatus: "ACTIVE" },
      });
    }
  });

  return NextResponse.json({
    message: "Mandate activated successfully",
    referenceNo: mandate.referenceNo,
    tokenId,
  });
}
