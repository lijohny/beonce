import Razorpay from "razorpay";
import crypto from "crypto";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const GST_RATE = 0.18;

export function calcGst(amount: number): number {
  return Math.round(amount * GST_RATE * 100) / 100;
}

export async function createRazorpayOrder(
  amountRupees: number,
  receiptId: string,
  notes?: Record<string, string>
) {
  return razorpay.orders.create({
    amount: Math.round(amountRupees * 100), // paise
    currency: "INR",
    receipt: receiptId,
    notes,
  });
}

export function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expected === signature;
}

export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}
