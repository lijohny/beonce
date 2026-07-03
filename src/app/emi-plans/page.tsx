"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calculator, IndianRupee, CalendarDays, Percent } from "lucide-react";

// ── EMI Scheme Plans ───────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "starter",
    name: "Starter Plan",
    minAmount: 100000,
    maxAmount: 500000,
    tenureMonths: [12, 24, 36],
    interestRate: 0,
    processingFeePercent: 2,
    badge: "Popular",
    features: ["Zero interest", "Flexible tenure", "No prepayment penalty", "Auto-debit support"],
  },
  {
    id: "prime",
    name: "Prime Plan",
    minAmount: 500000,
    maxAmount: 2000000,
    tenureMonths: [24, 36, 48, 60],
    interestRate: 0,
    processingFeePercent: 1.5,
    badge: "Best Value",
    features: ["Zero interest", "Up to 60 months", "Dedicated relationship manager", "Priority KYC"],
  },
  {
    id: "elite",
    name: "Elite Plan",
    minAmount: 2000000,
    maxAmount: 10000000,
    tenureMonths: [36, 48, 60, 84],
    interestRate: 0,
    processingFeePercent: 1,
    badge: "Premium",
    features: ["Zero interest", "Up to 84 months", "Home visit assistance", "Agreement doorstep service"],
  },
];

// ── Eligibility Criteria ────────────────────────────────────────────────────
const ELIGIBILITY = [
  "Indian resident aged 21–65 years",
  "Valid Aadhaar and PAN card",
  "Active bank account with IFSC",
  "Property / title deed (for amounts above ₹5 lakh)",
  "Minimum 6 months of stable income",
  "No active loan defaults",
];

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Is there any interest on the EMI scheme?", a: "No. beOnce offers a 0% interest EMI scheme. You only pay a one-time processing fee on the loan amount." },
  { q: "What is the processing fee?", a: "Processing fee varies by plan: Starter (2%), Prime (1.5%), Elite (1%). 18% GST applies on the processing fee." },
  { q: "How is the EMI amount calculated?", a: "EMI = Total Loan Amount ÷ Tenure (months). Since interest is 0%, the amount is simply divided equally." },
  { q: "Can I pay in advance?", a: "Yes. You can pay advance EMIs at any time without penalty through the portal." },
  { q: "When does auto-debit happen?", a: "Auto-debit is triggered on your due date each month. You will receive an SMS 3 days before the debit." },
  { q: "What happens if auto-debit fails?", a: "You will be notified immediately and can pay manually through the portal within the grace period." },
  { q: "How long does KYC approval take?", a: "KYC is typically reviewed within 1–2 business days after document submission." },
];

const fmt = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export default function EmiPlansPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);

  const emiAmount = Math.ceil(loanAmount / tenure);
  const applicablePlan = PLANS.find((p) => loanAmount >= p.minAmount && loanAmount <= p.maxAmount) || PLANS[0];
  const processingFee = Math.round((loanAmount * applicablePlan.processingFeePercent) / 100);
  const gstOnFee = Math.round(processingFee * 0.18);
  const totalPayable = loanAmount + processingFee + gstOnFee;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">EMI Schemes</h1>
        <p className="text-lg opacity-90 max-w-xl mx-auto">0% interest construction financing — flexible tenures, instant approval, no hidden charges.</p>
        <div className="flex justify-center gap-6 mt-6 text-sm">
          {["0% Interest", "Up to 84 Months", "Quick Approval"].map((t) => (
            <div key={t} className="flex items-center gap-1 opacity-90"><CheckCircle2 className="h-4 w-4" />{t}</div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Plans */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><IndianRupee className="h-6 w-6" />EMI Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.badge === "Popular" ? "border-primary shadow-lg" : ""}`}>
                {plan.badge && (
                  <Badge className="absolute -top-3 left-4" variant={plan.badge === "Popular" ? "default" : "secondary"}>
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{fmt(plan.minAmount)} – {fmt(plan.maxAmount)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center border rounded p-2">
                      <p className="text-xl font-bold text-green-600">0%</p>
                      <p className="text-xs text-muted-foreground">Interest</p>
                    </div>
                    <div className="text-center border rounded p-2">
                      <p className="text-xl font-bold">{plan.processingFeePercent}%</p>
                      <p className="text-xs text-muted-foreground">Processing Fee</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tenure Options</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.tenureMonths.map((m) => (
                        <Badge key={m} variant="outline" className="text-xs">{m} months</Badge>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.badge === "Popular" ? "default" : "outline"} asChild>
                    <Link href="/portal/register">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Calculator */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Calculator className="h-6 w-6" />EMI Calculator</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Loan Amount */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Loan Amount</Label>
                    <div className="flex items-center gap-1 border rounded px-2 py-1">
                      <span className="text-muted-foreground text-sm">₹</span>
                      <Input
                        type="number"
                        className="border-0 p-0 w-24 h-auto focus-visible:ring-0 text-right"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Math.min(10000000, Math.max(100000, Number(e.target.value))))}
                      />
                    </div>
                  </div>
                  <Slider min={100000} max={10000000} step={50000} value={[loanAmount]}
                    onValueChange={([v]) => setLoanAmount(v)} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1L</span><span>₹1Cr</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Tenure</Label>
                    <span className="font-semibold">{tenure} months</span>
                  </div>
                  <Slider min={6} max={84} step={6} value={[tenure]}
                    onValueChange={([v]) => setTenure(v)} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>6 months</span><span>84 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Your EMI Breakdown</CardTitle>
                <Badge variant="outline">{applicablePlan.name}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: CalendarDays, label: "Monthly EMI", value: fmt(emiAmount), highlight: true },
                  { icon: IndianRupee, label: "Loan Amount", value: fmt(loanAmount), highlight: false },
                  { icon: Percent, label: `Processing Fee (${applicablePlan.processingFeePercent}%)`, value: fmt(processingFee), highlight: false },
                  { icon: Percent, label: "GST on Fee (18%)", value: fmt(gstOnFee), highlight: false },
                  { icon: IndianRupee, label: "Total Payable", value: fmt(totalPayable), highlight: false },
                ].map(({ icon: Icon, label, value, highlight }) => (
                  <div key={label} className={`flex items-center justify-between p-3 rounded-lg ${highlight ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon className="h-4 w-4" />{label}
                    </div>
                    <p className={`font-bold ${highlight ? "text-xl" : ""}`}>{value}</p>
                  </div>
                ))}
                <Button className="w-full mt-2" asChild>
                  <Link href="/portal/register">Apply for This EMI</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckCircle2 className="h-6 w-6" />Eligibility Criteria</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="grid md:grid-cols-2 gap-3">
                {ELIGIBILITY.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />{e}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left text-sm font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="text-center py-8 space-y-4">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">Register in minutes and get your EMI account activated within 2 business days.</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild><Link href="/portal/register">Register Now</Link></Button>
            <Button size="lg" variant="outline" asChild><Link href="/portal/login">Sign In</Link></Button>
          </div>
        </section>
      </div>
    </div>
  );
}
