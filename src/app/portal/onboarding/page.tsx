"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Loader2, ChevronRight } from "lucide-react";

type OnboardingData = {
  user: { name: string; status: string };
  kyc: { status: string } | null;
  mandate: { status: string } | null;
  processingFeePaid: boolean;
  agreementSigned: boolean;
  emiActive: boolean;
};

type Step = {
  id: number;
  label: string;
  description: string;
  done: boolean;
  href?: string;
  actionLabel?: string;
};

export default function OnboardingPage() {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/portal/kyc/status").then((r) => r.json()),
      fetch("/api/portal/mandate/status").then((r) => r.json()),
      fetch("/api/portal/emi/dashboard").then((r) => r.json()),
    ]).then(([kyc, mandate, dashboard]) => {
      const accounts = dashboard.accounts || [];
      const activeMandate = mandate.mandates?.find((m: { status: string }) => m.status === "ACTIVE");
      const hasProcessingFee = accounts.some((a: { processingFee: string; status: string }) =>
        Number(a.processingFee) === 0 || a.status === "ACTIVE"
      );

      setData({
        user: dashboard.user || { name: "Customer", status: "PENDING" },
        kyc: kyc.status !== "NOT_SUBMITTED" ? kyc : null,
        mandate: activeMandate || null,
        processingFeePaid: hasProcessingFee,
        agreementSigned: kyc.fields?.agreementSigned || false,
        emiActive: accounts.some((a: { status: string }) => a.status === "ACTIVE"),
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const steps: Step[] = data ? [
    {
      id: 1, label: "Registration", description: "Create your account and verify mobile",
      done: true,
    },
    {
      id: 2, label: "KYC Approved", description: "Aadhaar, PAN, selfie and documents verified",
      done: data.kyc?.status === "APPROVED",
      href: data.kyc ? undefined : "/portal/kyc",
      actionLabel: !data.kyc ? "Submit KYC" : data.kyc.status === "PENDING" ? "Under Review" : data.kyc.status === "REJECTED" ? "Re-submit KYC" : undefined,
    },
    {
      id: 3, label: "E-Mandate Activated", description: "Auto-debit authorised for monthly EMIs",
      done: !!data.mandate,
      href: !data.mandate ? "/portal/dashboard" : undefined,
      actionLabel: !data.mandate ? "Set Up Mandate" : undefined,
    },
    {
      id: 4, label: "Processing Fee Paid", description: "One-time processing fee collected",
      done: data.processingFeePaid,
      href: !data.processingFeePaid ? "/portal/dashboard" : undefined,
      actionLabel: !data.processingFeePaid ? "Pay Fee" : undefined,
    },
    {
      id: 5, label: "Agreement Signed", description: "E-agreement digitally signed",
      done: data.agreementSigned,
    },
    {
      id: 6, label: "EMI Account Activated", description: "Your EMI account is live and ready",
      done: data.emiActive,
    },
    {
      id: 7, label: "Welcome to beOnce EMI!", description: "All set — your construction financing is active",
      done: data.emiActive,
    },
  ] : [];

  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === 7;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (allDone) {
    return <WelcomePage name={data?.user.name || "Customer"} />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Setup</h1>
        <p className="text-sm text-muted-foreground">{completedCount} of 7 steps completed</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${Math.round((completedCount / 7) * 100)}%` }}
        />
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isNext = !step.done && steps.slice(0, index).every((s) => s.done);
          return (
            <Card key={step.id} className={`transition-all ${isNext ? "border-primary shadow-sm" : ""} ${step.done ? "opacity-80" : ""}`}>
              <CardContent className="pt-4 pb-4 flex items-center gap-4">
                <div className="shrink-0">
                  {step.done
                    ? <CheckCircle2 className="h-7 w-7 text-green-500" />
                    : <Circle className={`h-7 w-7 ${isNext ? "text-primary" : "text-muted-foreground"}`} />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm ${step.done ? "line-through text-muted-foreground" : ""}`}>{step.label}</p>
                    {isNext && <Badge variant="default" className="text-xs">Next</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {!step.done && step.href && step.actionLabel && (
                  <Button size="sm" variant={isNext ? "default" : "outline"} asChild>
                    <Link href={step.href} className="gap-1">
                      {step.actionLabel} <ChevronRight className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
                {!step.done && !step.href && step.actionLabel && (
                  <Badge variant="secondary" className="text-xs shrink-0">{step.actionLabel}</Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button variant="ghost" size="sm" asChild className="w-full">
        <Link href="/portal/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}

function WelcomePage({ name }: { name: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg space-y-6">
        <div className="text-6xl">🎉</div>
        <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />
        <div>
          <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
          <p className="text-muted-foreground mt-2">Your beOnce EMI account is fully activated. Your construction dream starts now.</p>
        </div>
        <Card className="text-left">
          <CardHeader className="pb-2"><CardTitle className="text-base">What&apos;s next?</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              "Your EMI will be auto-debited on your due date each month",
              "You'll receive SMS & email reminders 3 days before each debit",
              "Pay advance EMIs anytime without penalty",
              "Download payment receipts from the portal",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span>{t}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild><Link href="/portal/dashboard">Go to Dashboard</Link></Button>
          <Button size="lg" variant="outline" asChild><Link href="/portal/payments">Make a Payment</Link></Button>
        </div>
      </div>
    </div>
  );
}
