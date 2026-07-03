import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export default function KycSubmittedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-6 space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold">KYC Submitted!</h1>
          <p className="text-muted-foreground">Your documents have been submitted successfully and are under review.</p>
          <div className="flex items-center justify-center gap-2 text-sm text-orange-600 bg-orange-50 dark:bg-orange-950 rounded-lg py-2 px-4">
            <Clock className="h-4 w-4" />
            <span>Review typically takes 1–2 business days</span>
          </div>
          <Button className="w-full" asChild>
            <Link href="/portal/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
