
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Budget Home Construction Kerala – Affordable & Stylish',
  description: 'Affordable house construction in Kerala. Discover our signature 22 Lakhs home package. Quality construction on a budget with BeOnce.',
};

export default function BudgetHomeConstructionKerala() {
  return (
    <div className="bg-background">
      <section className="py-20 border-b">
        <div className="container mx-auto px-5 max-w-4xl text-center">
          <Badge className="mb-4">Most Popular</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Budget Home Construction Kerala</h1>
          <p className="text-xl text-muted-foreground">High-quality living shouldn't be out of reach. We make modern homes affordable.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Affordable Housing Without Compromise</h2>
          <p>
            Building a budget home in Kerala requires smart engineering and efficient space management. BeOnce has perfected the art of "Budget Excellence" through our signature **22 Lakhs Home Package**.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">The 22 Lakhs Signature Package</h3>
          <p>This package is designed for small families or individuals with 2+ cents of land. It includes:</p>
          <ul>
            <li><strong>900-1000 sqft Area:</strong> Optimized for two or three bedrooms.</li>
            <li><strong>Full Civil Work:</strong> Strong foundation and brickwork.</li>
            <li><strong>Modern Finishes:</strong> Tiling, painting, and electrical fixtures.</li>
            <li><strong>Paperwork:</strong> Plan approval and permits included.</li>
          </ul>

          <h3 className="text-2xl font-bold font-headline mt-10">How We Keep Costs Low</h3>
          <p>We achieve affordability through:</p>
          <ol>
            <li><strong>Standardized Designs:</strong> Reducing architectural overhead.</li>
            <li><strong>Direct Sourcing:</strong> Buying materials in bulk for multiple projects.</li>
            <li><strong>Efficient Labor Management:</strong> Experienced teams that reduce wastage.</li>
          </ol>

          <div className="mt-16 bg-card border p-8 rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4">Is this package right for you?</h3>
            <p className="text-muted-foreground mb-6">If you want a stylish, move-in ready home without the stress of managing contractors and fluctuating prices, our budget packages are the perfect fit.</p>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/packages/22-lakhs">View Package Details</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
