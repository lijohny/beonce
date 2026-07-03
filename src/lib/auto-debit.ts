import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

/**
 * Charge a subsequent EMI using the stored Razorpay token.
 * Called by the scheduler for each due EMI account.
 */
export async function chargeSubsequentEmi(emiAccountId: number): Promise<{ success: boolean; error?: string }> {
  const emiAccount = await prisma.emiAccount.findUnique({
    where: { id: emiAccountId },
    include: {
      user: { select: { id: true, mobile: true, email: true, name: true } },
      mandates: { where: { status: "ACTIVE" }, take: 1 },
    },
  });

  if (!emiAccount) return { success: false, error: "EMI account not found" };
  if (emiAccount.status !== "ACTIVE") return { success: false, error: "EMI account not active" };
  if (emiAccount.paidEmis >= emiAccount.totalEmis) return { success: false, error: "All EMIs paid" };

  const mandate = emiAccount.mandates[0];
  if (!mandate?.razorpayTokenId || !mandate?.razorpayCustomerId) {
    return { success: false, error: "No active mandate token" };
  }

  const emiAmount = Number(emiAccount.emiAmount);

  try {
    // Create order for subsequent recurring payment
    const order = await razorpay.orders.create({
      amount: Math.round(emiAmount * 100),
      currency: "INR",
      payment_capture: true,
      receipt: `autoemi_${emiAccountId}_${Date.now()}`,
    });

    // Create pending payment record
    const payment = await prisma.payment.create({
      data: {
        emiAccountId,
        razorpayOrderId: order.id,
        amount: emiAmount,
        gst: 0,
        type: "EMI",
        status: "PENDING",
      },
    });

    // Charge via token (subsequent payment — no customer action needed)
    await (razorpay.payments as unknown as {
      createRecurringPayment: (params: Record<string, unknown>) => Promise<unknown>
    }).createRecurringPayment({
      email: emiAccount.user.email || `${emiAccount.user.mobile}@beonce.in`,
      contact: `+91${emiAccount.user.mobile}`,
      amount: Math.round(emiAmount * 100),
      currency: "INR",
      order_id: order.id,
      customer_id: mandate.razorpayCustomerId,
      token: mandate.razorpayTokenId,
      recurring: 1,
      description: `EMI ${emiAccount.paidEmis + 1} of ${emiAccount.totalEmis}`,
      notify: { sms: true, email: true },
      reminder_enable: true,
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Charge failed" };
  }
}
