import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { notifyPaymentSuccess, notifyPaymentFailed } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const eventName: string = event.event;
  const entity = event?.payload?.payment?.entity;
  const orderId = entity?.order_id;
  const paymentId = entity?.id;
  const tokenId = entity?.token_id;

  if (!orderId) return NextResponse.json({ ok: true });

  // ── Mandate: token confirmed/rejected via token.* events ──────────────────
  if (eventName.startsWith("token.")) {
    const tokenEntity = event?.payload?.token?.entity;
    const mandate = await prisma.mandateRecord.findFirst({
      where: { razorpayOrderId: orderId },
    });
    if (mandate) {
      if (eventName === "token.confirmed") {
        await prisma.$transaction(async (tx) => {
          await tx.mandateRecord.update({
            where: { id: mandate.id },
            data: { razorpayTokenId: tokenEntity?.id, status: "ACTIVE", activatedAt: new Date() },
          });
          if (mandate.emiAccountId) {
            await tx.emiAccount.update({
              where: { id: mandate.emiAccountId },
              data: { mandateId: String(mandate.id), mandateStatus: "ACTIVE" },
            });
          }
        });
      } else if (eventName === "token.rejected") {
        await prisma.mandateRecord.update({
          where: { id: mandate.id },
          data: { status: "FAILED", failureReason: "Rejected by bank" },
        });
      }
    }
    return NextResponse.json({ ok: true });
  }

  // ── Mandate: payment.authorized carries tokenId for emandate ──────────────
  if (eventName === "payment.authorized" && tokenId) {
    const mandate = await prisma.mandateRecord.findFirst({
      where: { razorpayOrderId: orderId, status: "PENDING" },
    });
    if (mandate) {
      await prisma.$transaction(async (tx) => {
        await tx.mandateRecord.update({
          where: { id: mandate.id },
          data: { razorpayPaymentId: paymentId, razorpayTokenId: tokenId, status: "ACTIVE", activatedAt: new Date() },
        });
        if (mandate.emiAccountId) {
          await tx.emiAccount.update({
            where: { id: mandate.emiAccountId },
            data: { mandateId: String(mandate.id), mandateStatus: "ACTIVE" },
          });
        }
      });
    }
    return NextResponse.json({ ok: true });
  }

  // ── Regular EMI payments ───────────────────────────────────────────────────
  const payment = await prisma.payment.findFirst({ where: { razorpayOrderId: orderId } });
  if (!payment) return NextResponse.json({ ok: true });

  if (eventName === "payment.captured" && payment.status !== "SUCCESS") {
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: { razorpayPaymentId: paymentId, status: "SUCCESS", paidAt: new Date() },
      });
      if (payment.type === "EMI" || payment.type === "ADVANCE_EMI") {
        const nextDue = new Date();
        nextDue.setMonth(nextDue.getMonth() + 1);
        await tx.emiAccount.update({
          where: { id: payment.emiAccountId },
          data: { paidEmis: { increment: 1 }, nextDueDate: nextDue },
        });
      }
    });
    // Notify customer
    const emiAcc = await prisma.emiAccount.findUnique({ where: { id: payment.emiAccountId }, include: { user: true } });
    if (emiAcc?.user) {
      notifyPaymentSuccess(emiAcc.user.mobile, emiAcc.user.email, emiAcc.user.name || "Customer",
        Number(payment.amount) + Number(payment.gst), paymentId).catch(() => {});
    }
  }

  if (eventName === "payment.failed" && payment.status === "PENDING") {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
    const emiAcc = await prisma.emiAccount.findUnique({ where: { id: payment.emiAccountId }, include: { user: true } });
    if (emiAcc?.user) {
      notifyPaymentFailed(emiAcc.user.mobile, emiAcc.user.email, emiAcc.user.name || "Customer",
        Number(payment.amount)).catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}
