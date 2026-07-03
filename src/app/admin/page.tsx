"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, CreditCard, IndianRupee } from "lucide-react";

type Stats = {
  users: { total: number; active: number; pending: number };
  kyc: { pending: number; underReview: number; approved: number; rejected: number };
  payments: { totalCollected: number; todayCount: number };
  emi: { activeAccounts: number };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Fetch all stats in parallel from existing APIs
    Promise.all([
      fetch("/api/admin/users?page=1").then((r) => r.json()),
      fetch("/api/admin/users?page=1&kycStatus=PENDING").then((r) => r.json()),
      fetch("/api/admin/users?page=1&kycStatus=UNDER_REVIEW").then((r) => r.json()),
      fetch("/api/admin/users?page=1&kycStatus=APPROVED").then((r) => r.json()),
      fetch("/api/admin/users?page=1&kycStatus=REJECTED").then((r) => r.json()),
      fetch("/api/admin/payments?page=1").then((r) => r.json()),
    ]).then(([all, pending, review, approved, rejected, payments]) => {
      setStats({
        users: { total: all.total, active: 0, pending: 0 },
        kyc: { pending: pending.total, underReview: review.total, approved: approved.total, rejected: rejected.total },
        payments: { totalCollected: payments.totalCollected, todayCount: 0 },
        emi: { activeAccounts: 0 },
      });
    });
  }, []);

  const cards = stats ? [
    { label: "Total Users", value: stats.users.total, icon: Users, color: "text-blue-500", href: "/admin/users" },
    { label: "KYC Pending", value: stats.kyc.pending + stats.kyc.underReview, icon: ShieldCheck, color: "text-orange-500", href: "/admin/kyc" },
    { label: "KYC Approved", value: stats.kyc.approved, icon: ShieldCheck, color: "text-green-500", href: "/admin/kyc" },
    { label: "Total Collected", value: `₹${Number(stats.payments.totalCollected).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: IndianRupee, color: "text-purple-500", href: "/admin/payments" },
  ] : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}><CardContent className="h-24 animate-pulse bg-muted rounded-lg" /></Card>
            ))
          : cards.map(({ label, value, icon: Icon, color, href }) => (
              <Link key={label} href={href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                    <p className="text-2xl font-bold">{value}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {stats && (
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> KYC Overview</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {[
              { label: "Pending", count: stats.kyc.pending, variant: "secondary" },
              { label: "Under Review", count: stats.kyc.underReview, variant: "secondary" },
              { label: "Approved", count: stats.kyc.approved, variant: "default" },
              { label: "Rejected", count: stats.kyc.rejected, variant: "destructive" },
            ].map(({ label, count, variant }) => (
              <div key={label} className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Badge variant={variant as never}>{label}</Badge>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: "/admin/kyc?status=PENDING", label: "Review Pending KYC", badge: stats?.kyc.pending },
              { href: "/admin/users", label: "Manage Users" },
              { href: "/admin/payments", label: "View All Payments" },
            ].map(({ href, label, badge }) => (
              <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors text-sm">
                <span>{label}</span>
                {badge !== undefined && badge > 0 && <Badge variant="destructive">{badge}</Badge>}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><CreditCard className="h-4 w-4" /> Revenue</CardTitle></CardHeader>
          <CardContent className="pt-2">
            <p className="text-3xl font-bold">
              ₹{stats ? Number(stats.payments.totalCollected).toLocaleString("en-IN", { maximumFractionDigits: 0 }) : "—"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total collected (all time)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
