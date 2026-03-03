
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Kollam – BeOnce',
  description: 'Reliable house construction in Kollam. From budget homes to luxury villas, BeOnce is the best construction company in Kollam city, Punalur, and Karunagappally.',
};

export default function KollamPage() {
  const towns = ['Kollam City', 'Karunagappally', 'Punalur', 'Paravur', 'Kottarakkara', 'Chathannoor', 'Chavara', 'Anchal'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Premier Construction Company in <span className="text-primary">Kollam</span>
          </h1>
          <p className="text-xl text-muted-foreground">Crafting high-quality, modern living spaces across the historical cashew city.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert Residential Builders in Kollam</h2>
          <p>
            Kollam's unique geographical mix—from its coastal beauty to its lush interior—requires a construction partner who understands localized engineering needs. <strong>BeOnce</strong> has established itself as the best construction company in Kollam by delivering robust, aesthetically pleasing homes that withstand the tropical climate.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Comprehensive Solutions for Kollam Homeowners</h3>
          <p>
            Whether you are looking for an affordable 2-bedroom home in Karunagappally or a luxury contemporary villa in Kollam city, we provide a seamless "Plot-to-Key" experience.
          </p>
          <ul>
            <li><strong>Foundation Specialists:</strong> Specialized piling and foundation work for coastal areas.</li>
            <li><strong>Custom Designs:</strong> Tailored floor plans that suit your family's needs.</li>
            <li><strong>Quality Sourcing:</strong> Using premium brands to ensure longevity.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Our Service Coverage in Kollam</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Your Dream Home in Kollam</h2>
            <p className="text-lg mb-8 opacity-90">Get a free estimate for your project today.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
