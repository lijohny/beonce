import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { z } from "zod";
import crypto from "crypto";

const schema = z.object({
  emiAccountId: z.number().int().positive(),
  authType: z.enum(["netbanking", "debitcard", "aadhaar"]).default("debitcard"),
  maxAmount: z.number().positive(),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { emiAccountId, authType, maxAmount } = parsed.data;

  const [user, emiAccount] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, mobile: true, email: true } }),
    prisma.emiAccount.findFirst({ where: { id: emiAccountId, userId } }),
  ]);

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!emiAccount) return NextResponse.json({ error: "EMI account not found" }, { status: 404 });

  // Check for existing active mandate
  const existing = await prisma.mandateRecord.findFirst({
    where: { userId, emiAccountId, status: "ACTIVE" },
  });
  if (existing) return NextResponse.json({ error: "Active mandate already exists" }, { status: 409 });

  // Create or reuse Razorpay customer
  let rzpCustomerId: string;
  const existingMandate = await prisma.mandateRecord.findFirst({
    where: { userId, razorpayCustomerId: { not: null } },
    select: { razorpayCustomerId: true },
  });

  if (existingMandate?.razorpayCustomerId) {
    rzpCustomerId = existingMandate.razorpayCustomerId;
  } else {
    const customer = await razorpay.customers.create({
      name: user.name || "Customer",
      email: user.email || `${user.mobile}@beonce.in`,
      contact: `+91${user.mobile}`,
    });
    rzpCustomerId = customer.id;
  }

  // Create recurring authorization order (₹0 authorization for emandate)
  const order = await razorpay.orders.create({
    amount: 0,
    currency: "INR",
    method: "emandate",
    receipt: `mandate_${emiAccountId}_${Date.now()}`,
    customer_id: rzpCustomerId,
    payment_capture: true,
    bank_account: {
      beneficiary_name: user.name || "Customer",
      account_number: "0",
      account_type: "savings",
    },
    token: {
      auth_type: authType,
      max_payment_amount: Math.round(maxAmount * 100),
      expire_at: Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 3600,
    },
  } as unknown as Parameters<typeof razorpay.orders.create>[0]);

  const referenceNo = `MNDT${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

  const mandate = await prisma.mandateRecord.create({
    data: {
      userId,
      emiAccountId,
      razorpayCustomerId: rzpCustomerId,
      razorpayOrderId: order.id,
      authType,
      maxAmount,
      status: "PENDING",
      referenceNo,
    },
  });

  return NextResponse.json({
    mandateId: mandate.id,
    orderId: order.id,
    customerId: rzpCustomerId,
    referenceNo,
    keyId: process.env.RAZORPAY_KEY_ID,
    amount: 0,
    currency: "INR",
  });
}
