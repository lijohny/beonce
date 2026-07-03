"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

type Payment = {
  id: number; type: string; status: string; amount: string; gst: string;
  razorpayPaymentId: string | null; paidAt: string | null; createdAt: string;
  emiAccount: { id: number; user: { name: string | null; mobile: string } };
};

const statusVariant = (s: string) =>
  ({ SUCCESS: "default", PENDING: "secondary", FAILED: "destructive" } as const)[s as never] ?? "outline";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (status !== "ALL") params.set("status", status);
    if (type !== "ALL") params.set("type", type);
    const res = await fetch(`/api/admin/payments?${params}`);
    const d = await res.json();
    setPayments(d.payments); setTotal(d.total); setPages(d.pages);
    setTotalCollected(d.totalCollected);
    setLoading(false);
  }, [page, search, status, type]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Payments <span className="text-muted-foreground text-lg">({total})</span></h1>
        <Card className="border-green-500">
          <CardContent className="py-2 px-4">
            <p className="text-xs text-muted-foreground">Total Collected</p>
            <p className="text-xl font-bold text-green-600">{fmt(totalCollected)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search payment ID, mobile…" className="pl-9"
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={(v) => { setType(v); setPage(1); }}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="EMI">EMI</SelectItem>
            <SelectItem value="ADVANCE_EMI">Advance EMI</SelectItem>
            <SelectItem value="PROCESSING_FEE">Processing Fee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-6 gap-3 px-4 py-3 text-xs font-medium text-muted-foreground border-b">
            <span>Customer</span><span>Type</span><span>Amount</span><span>Status</span><span>Date</span><span>Payment ID</span>
          </div>

          {loading ? (
            <div className="p-8 text-center animate-pulse text-muted-foreground">Loading…</div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No payments found.</div>
          ) : (
            payments.map((p) => (
              <div key={p.id} className="grid grid-cols-2 md:grid-cols-6 gap-3 px-4 py-3 border-b last:border-0 items-center text-sm">
                <div>
                  <p className="font-medium">{p.emiAccount.user.name || "—"}</p>
                  <p className="text-xs text-muted-foreground font-mono">{p.emiAccount.user.mobile}</p>
                </div>
                <p>{p.type.replace(/_/g, " ")}</p>
                <div>
                  <p className="font-semibold">{fmt(Number(p.amount) + Number(p.gst))}</p>
                  {Number(p.gst) > 0 && <p className="text-xs text-muted-foreground">+GST {fmt(Number(p.gst))}</p>}
                </div>
                <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                <p className="text-xs">{p.paidAt ? new Date(p.paidAt).toLocaleDateString("en-IN") : new Date(p.createdAt).toLocaleDateString("en-IN")}</p>
                <p className="text-xs font-mono truncate">{p.razorpayPaymentId || "—"}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm text-muted-foreground">Page {page} of {pages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  );
}
