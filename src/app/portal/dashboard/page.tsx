"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IndianRupee, CalendarClock, CheckCircle2, Clock, AlertCircle } from "lucide-react";

type Summary = { totalLoan: number; totalPaid: number; totalPending: number; activeAccounts: number };
type Account = { id: number; loanAmount: string; emiAmount: string; totalEmis: number; paidEmis: number; nextDueDate: string | null; status: string };
type Due = { emiAccountId: number; emiAmount: string; nextDueDate: string; daysUntilDue: number };
type Payment = { id: number; type: string; amount: string; gst: string; paidAt: string; razorpayPaymentId: string; emiAccount: { id: number } };

type DashboardData = { user: { name: string }; summary: Summary; accounts: Account[]; upcomingDues: Due[]; recentPayments: Payment[] };

const fmt = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/portal/emi/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load dashboard"));
  }, []);

  if (error) return <p className="p-8 text-center text-destructive">{error}</p>;
  if (!data) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading dashboard...</div>;

  const { user, summary, accounts, upcomingDues, recentPayments } = data;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name || "Customer"}</h1>
          <p className="text-sm text-muted-foreground">EMI Portal Dashboard</p>
        </div>
        <form action="/api/auth/logout" method="POST">
          <Button variant="ghost" size="sm" type="submit">Logout</Button>
        </form>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Loan", value: fmt(summary.totalLoan), icon: IndianRupee, color: "text-blue-500" },
          { label: "Total Paid", value: fmt(summary.totalPaid), icon: CheckCircle2, color: "text-green-500" },
          { label: "Pending", value: fmt(summary.totalPending), icon: Clock, color: "text-orange-500" },
          { label: "Active Accounts", value: String(summary.activeAccounts), icon: CalendarClock, color: "text-purple-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Dues */}
      {upcomingDues.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" /> Upcoming Dues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDues.map((due) => (
              <div key={due.emiAccountId} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-semibold">{fmt(Number(due.emiAmount))}</p>
                  <p className="text-xs text-muted-foreground">
                    Due {new Date(due.nextDueDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={due.daysUntilDue <= 3 ? "destructive" : due.daysUntilDue <= 7 ? "secondary" : "outline"}>
                    {due.daysUntilDue <= 0 ? "Overdue" : `${due.daysUntilDue}d left`}
                  </Badge>
                  <Button size="sm" asChild>
                    <Link href={`/portal/payments?emiAccountId=${due.emiAccountId}`}>Pay Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* EMI Accounts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your EMI Accounts</h2>
        {accounts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No EMI accounts found.</p>
        ) : (
          accounts.map((acc) => {
            const progress = Math.round((acc.paidEmis / acc.totalEmis) * 100);
            const remaining = acc.totalEmis - acc.paidEmis;
            return (
              <Card key={acc.id}>
                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{fmt(Number(acc.loanAmount))} Loan</p>
                      <p className="text-sm text-muted-foreground">EMI: {fmt(Number(acc.emiAmount))} / month</p>
                    </div>
                    <Badge variant={acc.status === "ACTIVE" ? "default" : acc.status === "COMPLETED" ? "secondary" : "destructive"}>
                      {acc.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{acc.paidEmis} of {acc.totalEmis} EMIs paid</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{remaining} EMIs remaining</span>
                    {acc.nextDueDate && (
                      <span className="text-muted-foreground">Next due: {new Date(acc.nextDueDate).toLocaleDateString("en-IN")}</span>
                    )}
                  </div>
                  {acc.status === "ACTIVE" && remaining > 0 && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/portal/payments?emiAccountId=${acc.id}`}>Make Payment</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Recent Payments */}
      {recentPayments.length > 0 && (
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Payments</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal/payments/history">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentPayments.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{p.type.replace("_", " ")}</p>
                    <p className="text-xs text-muted-foreground">{p.paidAt ? new Date(p.paidAt).toLocaleDateString("en-IN") : "-"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">{fmt(Number(p.amount) + Number(p.gst))}</p>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/api/portal/payments/receipt/${p.id}?download=true`} download>Receipt</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
