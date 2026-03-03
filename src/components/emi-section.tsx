'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Percent, Calendar, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function EmiSection() {
  const { ref, inView } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className={cn("py-16 md:py-24 bg-yellow-400/10 animate-raise-up", { 'in-view': inView })}>
      <div className="container mx-auto px-5">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm mb-4 uppercase tracking-tighter">
            Exclusive Launch Offer
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Build Your Dream Home with <br /> <span className="text-primary italic">Zero Interest EMI</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pay just 60% upfront and the rest in 30 easy monthly installments. No interest, no stress.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-primary bg-card shadow-xl overflow-hidden">
            <div className="bg-primary p-6 text-white text-center">
              <h3 className="text-2xl font-bold font-headline">Down Payment</h3>
              <div className="text-5xl font-black mt-2">60%</div>
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Wallet className="w-5 h-5" />
                <span className="font-semibold uppercase tracking-wider text-sm">One-Time Payment</span>
              </div>
              <p className="text-muted-foreground">Pay 60% of the total budget at the time of agreement signing.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-400 bg-card shadow-xl overflow-hidden">
            <div className="bg-yellow-400 p-6 text-black text-center">
              <h3 className="text-2xl font-bold font-headline">Zero Interest EMI</h3>
              <div className="text-5xl font-black mt-2">40%</div>
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-yellow-600">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold uppercase tracking-wider text-sm">30 Monthly Installments</span>
              </div>
              <p className="text-muted-foreground">Balance 40% payable over 30 months with absolutely 0% interest.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "100% Interest-Free",
              "30 Month Repayment Window",
              "Trust-Based Verification",
              "No Hidden Processing Fees",
              "Transparent Agreement",
              "Lump Sum Prepayment Possible"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/emi-scheme">View Full Details & Terms</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/contact">Check Eligibility</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}