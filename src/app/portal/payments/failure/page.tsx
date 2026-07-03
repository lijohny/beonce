"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";

function FailureContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-6 space-y-4">
          <XCircle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">Your payment could not be processed. No amount has been deducted.</p>
          {orderId && (
            <p className="text-xs text-muted-foreground font-mono">Order ID: {orderId}</p>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/portal/payments">Try Again</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/portal/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <FailureContent />
    </Suspense>
  );
}
