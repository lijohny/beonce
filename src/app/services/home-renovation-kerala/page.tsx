
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Home Renovation & Remodeling Kerala – Modernize Your Home',
  description: 'Top home renovation and remodeling services in Kerala. Update your old home with modern boxy extensions, interior upgrades, and structural repairs.',
};

export default function HomeRenovationKerala() {
  return (
    <div className="bg-background">
      <section className="py-20 border-b">
        <div className="container mx-auto px-5 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Home Renovation & Remodeling Kerala</h1>
          <p className="text-xl text-muted-foreground">Transforming old Kerala homes into modern, functional living spaces.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Give Your Home a New Lease on Life</h2>
          <p>
            Whether it's an ancestral home that needs structural reinforcement or a decade-old villa that needs a modern "Boxy" facelift, BeOnce offers professional renovation services across Kerala.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">Our Renovation Expertise</h3>
          <ul>
            <li><strong>Modern Extensions:</strong> Adding new rooms or a second floor with contemporary designs.</li>
            <li><strong>Kitchen Remodeling:</strong> Transforming old kitchens into modular, ergonomic spaces.</li>
            <li><strong>Tiling & Painting:</strong> refreshing the look and feel of your interiors.</li>
            <li><strong>Structural Repairs:</strong> Fixing dampness, roof leaks, and cracks common in older Kerala houses.</li>
          </ul>

          <h3 className="text-2xl font-bold font-headline mt-10">Why Remodel with BeOnce?</h3>
          <p>
            Renovation is often more complex than new construction because it requires working with existing structures. Our engineers specialize in integrating modern elements into traditional frameworks without compromising safety.
          </p>

          <div className="mt-16 bg-muted p-10 rounded-2xl text-center not-prose">
            <h3 className="text-2xl font-bold mb-4">Start Your Home Transformation</h3>
            <p className="text-muted-foreground mb-8">Schedule a site visit for a professional assessment and renovation estimate.</p>
            <Button size="lg" asChild>
              <Link href="/contact">Book a Site Visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
