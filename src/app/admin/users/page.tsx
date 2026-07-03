"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

type User = {
  id: number; name: string | null; mobile: string; email: string | null;
  status: string; isVerified: boolean; createdAt: string;
  kycRecord: { id: number; status: string } | null;
  emiAccounts: { id: number; status: string; loanAmount: string }[];
};

const kycBadge = (status: string | undefined) => {
  if (!status) return <Badge variant="outline">No KYC</Badge>;
  const v = { APPROVED: "default", REJECTED: "destructive", PENDING: "secondary", UNDER_REVIEW: "secondary" } as const;
  return <Badge variant={v[status as keyof typeof v] ?? "outline"}>{status}</Badge>;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [kycFilter, setKycFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (kycFilter !== "ALL") params.set("kycStatus", kycFilter);
    const res = await fetch(`/api/admin/users?${params}`);
    const d = await res.json();
    setUsers(d.users); setTotal(d.total); setPages(d.pages);
    setLoading(false);
  }, [page, search, kycFilter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users <span className="text-muted-foreground text-lg">({total})</span></h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, mobile, email…" className="pl-9"
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <Select value={kycFilter} onValueChange={(v) => { setKycFilter(v); setPage(1); }}>
          <SelectTrigger className="w-44"><SelectValue placeholder="KYC Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All KYC</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b">
            <span>User</span><span>Mobile</span><span>KYC</span><span>EMI Accounts</span><span>Actions</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground animate-pulse">Loading…</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No users found.</div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 py-3 border-b last:border-0 items-center text-sm">
                <div>
                  <p className="font-medium">{u.name || "—"}</p>
                  <p className="text-xs text-muted-foreground">{u.email || "—"}</p>
                </div>
                <p className="font-mono">{u.mobile}</p>
                <div>{kycBadge(u.kycRecord?.status)}</div>
                <p>{u.emiAccounts.length > 0 ? `${u.emiAccounts.length} account(s)` : "—"}</p>
                <div className="flex gap-2">
                  {u.kycRecord && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/kyc/${u.kycRecord.id}`}>Review KYC</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Page {page} of {pages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
