import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chargeSubsequentEmi } from "@/lib/auto-debit";

// Called daily by cron (e.g. AWS EventBridge, Vercel Cron, or external scheduler)
// Authorization: Bearer <CRON_SECRET>
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Find all active EMI accounts with mandate due today
  const dueAccounts = await prisma.emiAccount.findMany({
    where: {
      status: "ACTIVE",
      mandateStatus: "ACTIVE",
      nextDueDate: { gte: today, lt: tomorrow },
      paidEmis: { lt: prisma.emiAccount.fields.totalEmis as unknown as number },
    },
    select: { id: true },
  });

  const results = await Promise.allSettled(
    dueAccounts.map((a) => chargeSubsequentEmi(a.id))
  );

  const summary = results.reduce(
    (acc, r, i) => {
      if (r.status === "fulfilled" && r.value.success) {
        acc.charged.push(dueAccounts[i].id);
      } else {
        acc.failed.push({
          id: dueAccounts[i].id,
          error: r.status === "fulfilled" ? r.value.error : String(r.reason),
        });
      }
      return acc;
    },
    { charged: [] as number[], failed: [] as { id: number; error?: string }[] }
  );

  // Log run
  console.log(`[auto-debit] ${new Date().toISOString()} | charged: ${summary.charged.length} | failed: ${summary.failed.length}`);

  return NextResponse.json({
    date: today.toISOString().split("T")[0],
    total: dueAccounts.length,
    charged: summary.charged.length,
    failed: summary.failed,
  });
}
