import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const paymentId = Number(id);

  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, emiAccount: { userId } },
    select: {
      id: true,
      type: true,
      status: true,
      amount: true,
      gst: true,
      razorpayPaymentId: true,
      paidAt: true,
      createdAt: true,
      emiAccount: {
        select: {
          id: true,
          user: { select: { name: true, mobile: true } },
        },
      },
    },
  });

  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  const download = req.nextUrl.searchParams.get("download");
  if (download === "true") {
    const total = Number(payment.amount) + Number(payment.gst);
    const receiptText = [
      "=== beOnce Construction - Payment Receipt ===",
      `Receipt No : REC-${payment.id.toString().padStart(6, "0")}`,
      `Date       : ${payment.paidAt ? new Date(payment.paidAt).toLocaleString("en-IN") : "N/A"}`,
      `Name       : ${payment.emiAccount.user.name || "N/A"}`,
      `Mobile     : ${payment.emiAccount.user.mobile}`,
      `Payment ID : ${payment.razorpayPaymentId || "N/A"}`,
      `Type       : ${payment.type.replace("_", " ")}`,
      `Amount     : Rs. ${Number(payment.amount).toFixed(2)}`,
      `GST (18%)  : Rs. ${Number(payment.gst).toFixed(2)}`,
      `Total Paid : Rs. ${total.toFixed(2)}`,
      `Status     : ${payment.status}`,
      "============================================",
    ].join("\n");

    return new NextResponse(receiptText, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="receipt-${payment.id}.txt"`,
      },
    });
  }

  return NextResponse.json({ payment });
}
