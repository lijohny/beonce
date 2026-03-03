
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Palakkad – BeOnce',
  description: 'Expert house construction in Palakkad. Building climate-responsive and modern homes in Ottapalam, Chittur, and Palakkad city.',
};

export default function PalakkadPage() {
  const towns = ['Palakkad City', 'Ottapalam', 'Chittur', 'Mannarkkad', 'Alathur', 'Pattambi', 'Shoranur', 'Cherpulassery'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Best Construction Company in <span className="text-primary">Palakkad</span>
          </h1>
          <p className="text-xl text-muted-foreground">Building climate-ready homes for the gateway to Kerala. Durable and stylish.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Climate-Responsive Builders in Palakkad</h2>
          <p>
            Palakkad's heat requires specialized construction techniques. <strong>BeOnce</strong>, as a top construction company in Palakkad, uses materials and designs that ensure thermal comfort, such as gypsum plastering and optimized ventilation.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Why BeOnce in Palakkad?</h3>
          <ul>
            <li><strong>Thermal Comfort Designs:</strong> Homes that stay cool naturally.</li>
            <li><strong>Strong Foundation Work:</strong> Essential for Palakkad's diverse soil.</li>
            <li><strong>Modern Aesthetics:</strong> Standing out with contemporary boxy designs.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Our Palakkad Service Network</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Your Cool Haven in Palakkad</h2>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Consult Our Engineers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
