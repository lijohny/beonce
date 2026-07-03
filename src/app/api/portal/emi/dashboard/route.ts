import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user, accounts, recentPayments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, mobile: true, status: true },
    }),
    prisma.emiAccount.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.findMany({
      where: { emiAccount: { userId }, status: "SUCCESS" },
      orderBy: { paidAt: "desc" },
      take: 10,
      select: {
        id: true, type: true, amount: true, gst: true,
        paidAt: true, razorpayPaymentId: true,
        emiAccount: { select: { id: true } },
      },
    }),
  ]);

  const totalLoan = accounts.reduce((s, a) => s + Number(a.loanAmount), 0);
  const totalPaid = accounts.reduce((s, a) => s + Number(a.emiAmount) * a.paidEmis, 0);
  const totalPending = accounts.reduce((s, a) => s + Number(a.emiAmount) * (a.totalEmis - a.paidEmis), 0);

  const upcomingDues = accounts
    .filter((a) => a.nextDueDate && a.status === "ACTIVE" && a.paidEmis < a.totalEmis)
    .map((a) => ({
      emiAccountId: a.id,
      emiAmount: a.emiAmount,
      nextDueDate: a.nextDueDate,
      daysUntilDue: Math.ceil(
        (new Date(a.nextDueDate!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      ),
    }))
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  return NextResponse.json({
    user,
    summary: { totalLoan, totalPaid, totalPending, activeAccounts: accounts.filter((a) => a.status === "ACTIVE").length },
    accounts,
    upcomingDues,
    recentPayments,
  });
}
