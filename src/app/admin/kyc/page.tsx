"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

type User = {
  id: number; name: string | null; mobile: string;
  kycRecord: { id: number; status: string; createdAt: string } | null;
};

const statusVariant = (s: string) =>
  ({ APPROVED: "default", REJECTED: "destructive", PENDING: "secondary", UNDER_REVIEW: "secondary" } as const)[s as never] ?? "outline";

export default function AdminKycListPage() {
  return (
    <Suspense fallback={<div className="animate-pulse text-muted-foreground p-8">Loading…</div>}>
      <KycListContent />
    </Suspense>
  );
}

function KycListContent() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filter, setFilter] = useState(searchParams.get("status") || "PENDING");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (filter !== "ALL") params.set("kycStatus", filter);
    const res = await fetch(`/api/admin/users?${params}`);
    const d = await res.json();
    setUsers(d.users.filter((u: User) => u.kycRecord));
    setTotal(d.total); setPages(d.pages);
    setLoading(false);
  }, [page, filter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">KYC Review <span className="text-muted-foreground text-lg">({total})</span></h1>
        <Select value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-4 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b">
            <span>Customer</span><span>Mobile</span><span>Status</span><span>Action</span>
          </div>

          {loading ? (
            <div className="p-8 text-center animate-pulse text-muted-foreground">Loading…</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No KYC records found.</div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-3 border-b last:border-0 items-center text-sm">
                <p className="font-medium">{u.name || "—"}</p>
                <p className="font-mono">{u.mobile}</p>
                <div>
                  {u.kycRecord && <Badge variant={statusVariant(u.kycRecord.status)}>{u.kycRecord.status.replace("_", " ")}</Badge>}
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/admin/kyc/${u.kycRecord?.id}`}>Review</Link>
                </Button>
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
