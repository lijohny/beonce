
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Kannur – BeOnce',
  description: 'Top house construction services in Kannur. We build premium villas and modern boxy homes in Thalassery, Payyanur, and Kannur city.',
};

export default function KannurPage() {
  const towns = ['Kannur City', 'Thalassery', 'Payyanur', 'Taliparamba', 'Iritty', 'Mattannur', 'Chockli', 'Kuthuparamba'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Leading Construction Company in <span className="text-primary">Kannur</span>
          </h1>
          <p className="text-xl text-muted-foreground">Building modern legacies in the land of Looms and Lores. Quality you can trust.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert Residential Builders in Kannur</h2>
          <p>
            Kannur is a district that values strength and durability. <strong>BeOnce</strong> has become a top construction company in Kannur by delivering robust structural work paired with elegant modern designs.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Our Advantage in Kannur</h3>
          <ul>
            <li><strong>Premium Woodwork:</strong> Best quality teak and mahogany finishes.</li>
            <li><strong>Robust Foundation Engineering:</strong> Durable structural work.</li>
            <li><strong>Modern "Boxy" Designs:</strong> Contemporary style for urban Kannur.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving the Kannur Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Ready for Your New Home?</h2>
            <Button size="lg" asChild>
              <Link href="/contact">Request a Site Visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
