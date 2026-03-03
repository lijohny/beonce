
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Idukki – BeOnce',
  description: 'Expert hillside house construction in Idukki. We build robust, modern homes in Thodupuzha, Kattappana, and Munnar with soil-stable engineering.',
};

export default function IdukkiPage() {
  const towns = ['Thodupuzha', 'Kattappana', 'Munnar', 'Adimali', 'Nedumkandam', 'Cheruthoni', 'Peermade', 'Rajakkad'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Leading Construction Company in <span className="text-primary">Idukki</span>
          </h1>
          <p className="text-xl text-muted-foreground">Harnessing advanced engineering for the high ranges of Kerala. Building safe, stylish homes.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Safe and Stylish Construction in Idukki</h2>
          <p>
            Building in Idukki presents unique challenges, from steep slopes to specific soil stability requirements. <strong>BeOnce</strong> is a specialist construction company in Idukki that prioritizes structural safety through meticulous site analysis and robust beam-column designs.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Hillside Construction Specialists</h3>
          <ul>
            <li><strong>Slope Optimization:</strong> Building designs that respect the natural landscape.</li>
            <li><strong>Structural Integrity:</strong> Fe500 steel and UltraTech cement for high-altitude durability.</li>
            <li><strong>Modern Cabin & Villa Designs:</strong> Perfect for Idukki's tourism-rich environment.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Our Footprint in Idukki</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Safely in the High Ranges</h2>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Talk to Our Hillside Experts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
