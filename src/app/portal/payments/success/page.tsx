"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

type Payment = {
  id: number;
  type: string;
  amount: string;
  gst: string;
  razorpayPaymentId: string;
  paidAt: string;
};

function SuccessContent() {
  const params = useSearchParams();
  const paymentId = params.get("paymentId");
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    if (!paymentId) return;
    fetch(`/api/portal/payments/receipt/${paymentId}`)
      .then((r) => r.json())
      .then((d) => setPayment(d.payment));
  }, [paymentId]);

  const total = payment ? Number(payment.amount) + Number(payment.gst) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-6 space-y-4">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">Your payment has been processed successfully.</p>

          {payment && (
            <div className="text-left rounded-lg border p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Payment ID</span><span className="font-mono text-xs">{payment.razorpayPaymentId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span>{payment.type.replace("_", " ")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span>₹{Number(payment.amount).toLocaleString("en-IN")}</span></div>
              {Number(payment.gst) > 0 && <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{Number(payment.gst).toLocaleString("en-IN")}</span></div>}
              <div className="flex justify-between font-bold border-t pt-2"><span>Total Paid</span><span>₹{total.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{new Date(payment.paidAt).toLocaleString("en-IN")}</span></div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {paymentId && (
              <Button variant="outline" className="flex-1" asChild>
                <a href={`/api/portal/payments/receipt/${paymentId}?download=true`} download>Download Receipt</a>
              </Button>
            )}
            <Button className="flex-1" asChild>
              <Link href="/portal/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
