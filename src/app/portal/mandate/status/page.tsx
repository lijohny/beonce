"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, ShieldCheck, Plus } from "lucide-react";

type Mandate = {
  id: number;
  authType: string;
  maxAmount: string;
  status: string;
  referenceNo: string | null;
  activatedAt: string | null;
  failureReason: string | null;
  createdAt: string;
  emiAccount: { id: number; emiAmount: string; nextDueDate: string | null } | null;
};

const statusIcon = (s: string) => {
  if (s === "ACTIVE") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  if (s === "FAILED" || s === "CANCELLED") return <XCircle className="h-5 w-5 text-destructive" />;
  return <Clock className="h-5 w-5 text-orange-500" />;
};

const statusVariant = (s: string) =>
  ({ ACTIVE: "default", FAILED: "destructive", CANCELLED: "destructive", PENDING: "secondary" } as const)[s as never] ?? "secondary";

function MandateStatusContent() {
  const params = useSearchParams();
  const success = params.get("success") === "1";
  const ref = params.get("ref");

  const [mandates, setMandates] = useState<Mandate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/mandate/status")
      .then((r) => r.json())
      .then((d) => setMandates(d.mandates))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6" /> E-Mandate
        </h1>
        <Button asChild size="sm" className="gap-1">
          <Link href="/portal/dashboard"><Plus className="h-4 w-4" /> New Mandate</Link>
        </Button>
      </div>

      {/* Success banner */}
      {success && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950">
          <CardContent className="pt-4 flex items-center gap-3 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Mandate registered successfully!</p>
              {ref && <p className="text-xs">Reference: {ref}</p>}
              <p className="text-sm mt-0.5">Your EMI will be auto-debited on the due date each month.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="animate-pulse text-center text-muted-foreground py-12">Loading…</div>
      ) : mandates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No mandates registered yet.</p>
            <Button asChild>
              <Link href="/portal/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mandates.map((m) => (
            <Card key={m.id}>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  {statusIcon(m.status)}
                  <CardTitle className="text-base">{m.authType.replace("debitcard", "Debit Card").replace("netbanking", "Net Banking").replace("aadhaar", "Aadhaar")} Mandate</CardTitle>
                </div>
                <Badge variant={statusVariant(m.status)}>{m.status}</Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Reference No</p><p className="font-mono font-medium">{m.referenceNo || "—"}</p></div>
                <div><p className="text-muted-foreground">Max Amount</p><p className="font-semibold">₹{Number(m.maxAmount).toLocaleString("en-IN")}</p></div>
                {m.activatedAt && <div><p className="text-muted-foreground">Activated On</p><p>{new Date(m.activatedAt).toLocaleDateString("en-IN")}</p></div>}
                {m.emiAccount && (
                  <div><p className="text-muted-foreground">EMI Amount</p><p className="font-semibold">₹{Number(m.emiAccount.emiAmount).toLocaleString("en-IN")}/mo</p></div>
                )}
                {m.emiAccount?.nextDueDate && (
                  <div className="col-span-2"><p className="text-muted-foreground">Next Auto-Debit</p><p className="font-medium">{new Date(m.emiAccount.nextDueDate).toLocaleDateString("en-IN")}</p></div>
                )}
                {m.failureReason && (
                  <div className="col-span-2"><p className="text-muted-foreground">Failure Reason</p><p className="text-destructive">{m.failureReason}</p></div>
                )}
                {m.status === "FAILED" && m.emiAccount && (
                  <div className="col-span-2 pt-1">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/portal/mandate/register?emiAccountId=${m.emiAccount.id}`}>Retry Registration</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button variant="ghost" size="sm" asChild>
        <Link href="/portal/dashboard">← Back to Dashboard</Link>
      </Button>
    </div>
  );
}

export default function MandateStatusPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading…</div>}>
      <MandateStatusContent />
    </Suspense>
  );
}
