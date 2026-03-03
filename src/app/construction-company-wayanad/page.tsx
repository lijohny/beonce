
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Wayanad – BeOnce',
  description: 'Expert hillside house construction in Wayanad. Building robust and modern homes in Kalpetta, Mananthavady, and Sulthan Bathery.',
};

export default function WayanadPage() {
  const towns = ['Kalpetta', 'Mananthavady', 'Sulthan Bathery', 'Meenangadi', 'Panamaram', 'Vythiri', 'Pulpally', 'Ambalavayal'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Best Construction Company in <span className="text-primary">Wayanad</span>
          </h1>
          <p className="text-xl text-muted-foreground">Expert builders for the lush green hills. Safe and sustainable home construction.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert Hillside Builders in Wayanad</h2>
          <p>
            Wayanad's unique ecosystem requires a construction approach that is both sensitive and strong. <strong>BeOnce</strong> is the leading construction company in Wayanad, specialized in building hillside homes that prioritize structural integrity and soil stability.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Our Wayanad Expertise</h3>
          <ul>
            <li><strong>Terrain-Safe Foundations:</strong> Specialized engineering for sloped land.</li>
            <li><strong>Sustainable Material Use:</strong> Harmonizing with the environment.</li>
            <li><strong>Modern Homestay & Villa Designs:</strong> Perfect for tourism-rich plots.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving the Wayanad Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Safely in Wayanad</h2>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Talk to Our Hillside Experts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
