"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

type Payment = {
  id: number;
  type: string;
  status: string;
  amount: string;
  gst: string;
  razorpayPaymentId: string | null;
  paidAt: string | null;
  createdAt: string;
  emiAccount: { id: number };
};

const fmt = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const statusVariant = (s: string) =>
  s === "SUCCESS" ? "default" : s === "PENDING" ? "secondary" : "destructive";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/portal/payments/history?page=${page}`)
      .then((r) => r.json())
      .then((d) => { setPayments(d.payments); setPages(d.pages); setTotal(d.total); })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/portal/dashboard">← Back</Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Payment History</h1>
          <p className="text-sm text-muted-foreground">{total} total payments</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8 animate-pulse">Loading...</p>
          ) : payments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No payments found.</p>
          ) : (
            <div className="space-y-0">
              {/* Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                <span>Date</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Receipt</span>
              </div>

              {payments.map((p) => {
                const total = Number(p.amount) + Number(p.gst);
                return (
                  <div key={p.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 px-3 py-3 border-b last:border-0 items-center text-sm">
                    <div>
                      <p>{p.paidAt ? new Date(p.paidAt).toLocaleDateString("en-IN") : new Date(p.createdAt).toLocaleDateString("en-IN")}</p>
                      {p.razorpayPaymentId && <p className="text-xs text-muted-foreground font-mono">{p.razorpayPaymentId.slice(0, 16)}…</p>}
                    </div>
                    <p className="md:col-auto">{p.type.replace(/_/g, " ")}</p>
                    <div>
                      <p className="font-semibold">{fmt(total)}</p>
                      {Number(p.gst) > 0 && <p className="text-xs text-muted-foreground">incl. GST {fmt(Number(p.gst))}</p>}
                    </div>
                    <Badge variant={statusVariant(p.status)} className="w-fit">{p.status}</Badge>
                    {p.status === "SUCCESS" ? (
                      <Button variant="ghost" size="sm" className="w-fit gap-1" asChild>
                        <a href={`/api/portal/payments/receipt/${p.id}?download=true`} download>
                          <Download className="h-3 w-3" /> Receipt
                        </a>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Page {page} of {pages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
