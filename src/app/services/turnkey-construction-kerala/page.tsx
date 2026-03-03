
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Turnkey Construction Services Kerala – Key Handover Solutions',
  description: 'Stress-free turnkey construction in Kerala. BeOnce manages everything from plan approval and loan assistance to civil work and interiors.',
};

export default function TurnkeyConstructionKerala() {
  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Turnkey Construction Services Kerala</h1>
          <p className="text-xl text-muted-foreground">You dream it, we build it. From plot to key handover, we manage it all.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Stress-Free Home Building in Kerala</h2>
          <p>
            Turnkey construction means you handover the responsibility to us. In the complex world of Kerala construction, where managing multiple vendors and legal requirements can be a nightmare, BeOnce provides a single point of accountability.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">What "Turnkey" Means at BeOnce</h3>
          <div className="not-prose grid gap-4 my-8">
            {[
              "End-to-end Project Management",
              "Loan Assistance & Financial Support",
              "Architectural 2D & 3D Designing",
              "Government Approval & Paperwork",
              "Full Civil & Structural Construction",
              "Interior Furnishing & Painting",
              "Final Quality Inspection & Handover"
            ].map(item => (
              <div key={item} className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold font-headline mt-10">Benefits of Turnkey Solutions</h3>
          <ul>
            <li><strong>Fixed Budget:</strong> Avoid the "budget creep" common in self-managed projects.</li>
            <li><strong>Fixed Timeline:</strong> Clear milestones and a committed handover date.</li>
            <li><strong>Quality Assurance:</strong> Unified standards across all phases of construction.</li>
            <li><strong>Zero Hassle:</strong> Ideal for NRIs and busy professionals.</li>
          </ul>

          <div className="mt-16 text-center not-prose">
            <Button size="lg" asChild>
              <Link href="/contact">Get Your Turnkey Estimate</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
