import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignature } from "@/lib/razorpay";
import { z } from "zod";

const schema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  paymentId: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = parsed.data;

  const valid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
  if (!valid) return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });

  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, razorpayOrderId, emiAccount: { userId } },
    include: { emiAccount: true },
  });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  if (payment.status === "SUCCESS") return NextResponse.json({ message: "Already processed" });

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: paymentId },
      data: { razorpayPaymentId, status: "SUCCESS", paidAt: new Date() },
    });

    if (payment.type === "EMI" || payment.type === "ADVANCE_EMI") {
      const nextDue = new Date();
      nextDue.setMonth(nextDue.getMonth() + 1);
      await tx.emiAccount.update({
        where: { id: payment.emiAccountId },
        data: {
          paidEmis: { increment: 1 },
          nextDueDate: nextDue,
        },
      });
    }
  });

  return NextResponse.json({ message: "Payment verified", paymentId });
}
