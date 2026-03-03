import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ShieldAlert, FileText, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interest-Free EMI Home Construction Kerala | BeOnce 60/40 Scheme',
  description: 'Build your dream home in Kerala with BeOnce\'s 60/40 interest-free EMI scheme. Pay 60% upfront and 40% in 30 monthly installments. No interest, no hidden charges.',
  keywords: 'interest free emi home construction kerala, house construction emi kerala, beonce 60/40 scheme, home building finance kerala, budget home emi'
};

const terms = [
  "The full down payment must be paid on the same day the agreement is signed.",
  "The applicant must submit a Promissory Note duly signed in favour of the company.",
  "Copies of Title Deed, PAN Card, Aadhaar Card, and latest land/property tax receipt must be provided.",
  "The applicant must prove a clear and reliable source of income to the satisfaction of the company.",
  "The EMI facility will be granted only if the company is fully satisfied with the applicant’s repayment capability.",
  "Violation of any agreement condition empowers the company to cancel the EMI facility and demand the entire outstanding amount in a lump sum.",
  "This EMI facility is limited to selected customers and subject to final company approval; it cannot be claimed as a right.",
  "This credit facility is based purely on trust and good faith. Any breach of trust will be treated as a breach of contract.",
  "Any additional cost due to customer-requested design or work changes during construction must be paid immediately and will not be included in EMI.",
  "The property must not be sold, transferred, or handed over to any third party during the EMI period.",
  "EMI payments must be made strictly on or before the due date every month. Delayed payments will attract penalties.",
  "EMI repayment can start one month after agreement signing or one month after house completion and key handover, as applicable."
];

export default function EmiSchemePage() {
  return (
    <div className="bg-background">
      {/* Hero Header */}
      <section className="py-20 bg-yellow-400">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black font-headline mb-6 tracking-tight text-black">
            60/40 Zero Interest EMI Scheme
          </h1>
          <p className="text-xl font-medium text-black/80 max-w-2xl mx-auto">
            A revolutionary trust-based financing solution to help you build your home in Kerala without the burden of heavy interest rates.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-foreground">
                  <Info className="w-6 h-6 text-primary" /> How the Interest-Free Scheme Works
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                <p>
                  At <strong>BeOnce</strong>, we understand that building a home is a life-long dream and a significant financial commitment. Our unique <strong>60/40 interest-free EMI scheme</strong> is designed to make high-quality house construction in Kerala accessible to everyone.
                </p>
                <p>
                  By eliminating interest rates, we ensure that every rupee you spend goes directly into the quality and craftsmanship of your dream home.
                </p>
                <div className="not-prose grid gap-6 my-8">
                  <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <h4 className="font-bold text-primary mb-2 text-xl">1. Down Payment (60%)</h4>
                    <p className="text-muted-foreground">The initial 60% of the total project cost is paid at the time of agreement signing. this allows us to secure premium materials like UltraTech cement and high-grade steel at current market prices, protecting you from future price hikes.</p>
                  </div>
                  <div className="p-6 bg-yellow-400/5 rounded-xl border border-yellow-400/20">
                    <h4 className="font-bold text-yellow-600 dark:text-yellow-500 mb-2 text-xl">2. Interest-Free EMI (40%)</h4>
                    <p className="text-muted-foreground">The remaining 40% balance is split into <strong>30 equal monthly installments</strong>. There are absolutely <strong>no interest charges, no processing fees, and no hidden markups</strong>.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none">
              <CardHeader>
                <CardTitle className="font-headline text-white">Benefits at a Glance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-1 text-white" />
                  <div>
                    <p className="font-bold text-white text-lg">60% Upfront</p>
                    <p className="text-sm opacity-80 text-white leading-tight">Start construction immediately with an initial deposit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-1 text-white" />
                  <div>
                    <p className="font-bold text-white text-lg">40% Zero Interest</p>
                    <p className="text-sm opacity-80 text-white leading-tight">Pay back the rest over 2.5 years without any extra cost.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-1 text-white" />
                  <div>
                    <p className="font-bold text-white text-lg">30 Month Window</p>
                    <p className="text-sm opacity-80 text-white leading-tight">Comfortable repayment period designed for middle-class families.</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full mt-4" asChild>
                  <Link href="/contact">Check Your Eligibility</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold font-headline">Detailed Terms & Conditions</h2>
            </div>
            <Card className="border-none shadow-none bg-muted/30">
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-6">Our EMI facility is built on a foundation of mutual trust. Please read the following terms carefully:</p>
                <ul className="grid gap-4 list-none p-0">
                  {terms.map((term, index) => (
                    <li key={index} className="flex gap-4 items-start text-sm leading-relaxed">
                      <span className="flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full w-6 h-6 shrink-0 text-xs">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{term}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Required Documents */}
          <div className="bg-primary/5 p-10 rounded-2xl border">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold font-headline">Required Documentation for EMI</h3>
            </div>
            <p className="text-muted-foreground mb-8">To process your interest-free EMI application, we require the following verified documents:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Original Title Deed of the property",
                "PAN Card of the primary applicant",
                "Aadhaar Card with matching address",
                "Latest land/property tax paid receipt",
                "Income proof (Salary slips/IT returns/Bank statements)",
                "Signed Promissory Note"
              ].map(doc => (
                <div key={doc} className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-t">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">Ready to Build Your Dream Home with Zero Interest?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our EMI facility is based on trust and good faith. Join hundreds of happy families in Kerala who built their homes with BeOnce.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Speak to our Financial Experts</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/gallery">Explore Our Recent Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
