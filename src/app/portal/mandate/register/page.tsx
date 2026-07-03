"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck, CreditCard, Landmark, Fingerprint, Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

const schema = z.object({
  authType: z.enum(["debitcard", "netbanking", "aadhaar"]),
  maxAmount: z.number({ invalid_type_error: "Enter a valid amount" }).min(1000, "Minimum ₹1,000"),
});
type FormData = z.infer<typeof schema>;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const AUTH_METHODS = [
  { value: "debitcard", label: "Debit Card", icon: CreditCard },
  { value: "netbanking", label: "Net Banking", icon: Landmark },
  { value: "aadhaar", label: "Aadhaar", icon: Fingerprint },
] as const;

function MandateRegisterContent() {
  const router = useRouter();
  const params = useSearchParams();
  const emiAccountId = Number(params.get("emiAccountId"));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emiAmount, setEmiAmount] = useState<number | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { authType: "debitcard", maxAmount: 0 },
  });

  useEffect(() => {
    if (!emiAccountId) return;
    fetch(`/api/portal/emi/account/${emiAccountId}`)
      .then((r) => r.json())
      .then((d) => {
        const amt = Number(d.account?.emiAmount || 0);
        setEmiAmount(amt);
        setValue("maxAmount", amt * 2); // default max = 2x EMI
      });
  }, [emiAccountId, setValue]);

  const onSubmit = useCallback(async (data: FormData) => {
    setError(""); setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) { setError("Failed to load payment gateway."); setLoading(false); return; }

    const res = await fetch("/api/portal/mandate/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emiAccountId, ...data }),
    });
    const order = await res.json();
    if (!res.ok) { setError(order.error || "Failed to create mandate"); setLoading(false); return; }

    const rzp = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      customer_id: order.customerId,
      amount: order.amount,
      currency: order.currency,
      name: "beOnce Construction",
      description: "EMI Auto-Debit Mandate",
      recurring: 1,
      theme: { color: "#1a1a2e" },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        const verifyRes = await fetch("/api/portal/mandate/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mandateId: order.mandateId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        if (verifyRes.ok) {
          router.push(`/portal/mandate/status?success=1&ref=${order.referenceNo}`);
        } else {
          setError("Mandate verification failed. Contact support.");
        }
      },
      modal: { ondismiss: () => setLoading(false) },
    });

    rzp.open();
    setLoading(false);
  }, [emiAccountId, router]);

  if (!emiAccountId) return <p className="p-8 text-center text-muted-foreground">No EMI account specified.</p>;

  const authType = watch("authType");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" /> Register E-Mandate
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Authorise auto-debit for hassle-free EMI payments
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>1. Authorise once using your debit card / net banking / Aadhaar</p>
          <p>2. EMI will be auto-debited on your due date each month</p>
          <p>3. No manual payment needed — you&apos;ll get SMS alerts before each debit</p>
          {emiAmount && <p className="text-foreground font-medium">Your EMI amount: ₹{emiAmount.toLocaleString("en-IN")}/month</p>}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Authentication Method</CardTitle>
            <CardDescription>Choose how you want to authorise the mandate</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={authType}
              onValueChange={(v) => setValue("authType", v as FormData["authType"])}
              className="grid grid-cols-3 gap-3"
            >
              {AUTH_METHODS.map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className={`flex flex-col items-center gap-2 border rounded-lg p-3 cursor-pointer transition-colors ${authType === value ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
                >
                  <RadioGroupItem value={value} className="sr-only" />
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{label}</span>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Maximum Debit Amount</CardTitle>
            <CardDescription>The bank will never debit more than this amount per transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label>Max Amount (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 10000"
              {...register("maxAmount", { valueAsNumber: true })}
            />
            {errors.maxAmount && <p className="text-xs text-destructive">{errors.maxAmount.message}</p>}
          </CardContent>
        </Card>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          {loading ? "Opening…" : "Proceed to Authorise"}
        </Button>
      </form>
    </div>
  );
}

export default function MandateRegisterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading…</div>}>
      <MandateRegisterContent />
    </Suspense>
  );
}
