"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

type EmiAccount = {
  id: number;
  loanAmount: string;
  emiAmount: string;
  totalEmis: number;
  paidEmis: number;
  nextDueDate: string | null;
  processingFee: string;
};

type PaymentType = "EMI" | "ADVANCE_EMI" | "PROCESSING_FEE";

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

function PaymentContent() {
  const router = useRouter();
  const params = useSearchParams();
  const emiAccountId = Number(params.get("emiAccountId"));

  const [account, setAccount] = useState<EmiAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!emiAccountId) return;
    fetch(`/api/portal/emi/account/${emiAccountId}`)
      .then((r) => r.json())
      .then((d) => setAccount(d.account))
      .catch(() => setError("Failed to load EMI details"));
  }, [emiAccountId]);

  const pay = useCallback(async (type: PaymentType) => {
    setError("");
    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) { setError("Failed to load payment gateway."); setLoading(false); return; }

    const res = await fetch("/api/portal/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emiAccountId, type }),
    });
    const order = await res.json();
    if (!res.ok) { setError(order.error || "Failed to create order"); setLoading(false); return; }

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "beOnce Construction",
      description: type === "PROCESSING_FEE" ? "Processing Fee" : type === "ADVANCE_EMI" ? "Advance EMI" : "EMI Payment",
      theme: { color: "#1a1a2e" },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        const verifyRes = await fetch("/api/portal/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            paymentId: order.paymentId,
          }),
        });
        if (verifyRes.ok) router.push(`/portal/payments/success?paymentId=${order.paymentId}`);
        else router.push(`/portal/payments/failure?orderId=${order.orderId}`);
      },
      modal: { ondismiss: () => setLoading(false) },
    });

    rzp.open();
    setLoading(false);
  }, [emiAccountId, router]);

  if (!emiAccountId) return <p className="p-8 text-center text-muted-foreground">No EMI account specified.</p>;

  const remaining = account ? account.totalEmis - account.paidEmis : 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Make Payment</h1>
      {error && <p className="text-sm text-destructive">{error}</p>}

      {account && (
        <Card>
          <CardHeader><CardTitle className="text-base">EMI Summary</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-muted-foreground">Loan Amount</p><p className="font-semibold">₹{Number(account.loanAmount).toLocaleString("en-IN")}</p></div>
            <div><p className="text-muted-foreground">EMI Amount</p><p className="font-semibold">₹{Number(account.emiAmount).toLocaleString("en-IN")}</p></div>
            <div><p className="text-muted-foreground">Paid / Total</p><p className="font-semibold">{account.paidEmis} / {account.totalEmis}</p></div>
            <div><p className="text-muted-foreground">Remaining</p><p className="font-semibold">{remaining} EMIs</p></div>
            {account.nextDueDate && <div className="col-span-2"><p className="text-muted-foreground">Next Due</p><p className="font-semibold">{new Date(account.nextDueDate).toLocaleDateString("en-IN")}</p></div>}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="font-semibold">Pay EMI</p>
              <p className="text-sm text-muted-foreground">Current month EMI</p>
              {account && <p className="text-lg font-bold mt-1">₹{Number(account.emiAmount).toLocaleString("en-IN")}</p>}
            </div>
            <Button onClick={() => pay("EMI")} disabled={loading || !account || remaining === 0}>Pay Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="font-semibold">Advance EMI</p>
              <p className="text-sm text-muted-foreground">Pay next month early</p>
              {account && <p className="text-lg font-bold mt-1">₹{Number(account.emiAmount).toLocaleString("en-IN")}</p>}
            </div>
            <Button variant="outline" onClick={() => pay("ADVANCE_EMI")} disabled={loading || !account || remaining <= 1}>Pay Advance</Button>
          </CardContent>
        </Card>

        {account && Number(account.processingFee) > 0 && (
          <Card>
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="font-semibold">Processing Fee</p>
                <p className="text-sm text-muted-foreground">One-time fee + 18% GST</p>
                <p className="text-lg font-bold mt-1">₹{(Number(account.processingFee) * 1.18).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary">+GST</Badge>
                <Button variant="outline" onClick={() => pay("PROCESSING_FEE")} disabled={loading}>Pay Fee</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
