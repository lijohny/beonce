
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Kottayam – BeOnce',
  description: 'Premium house construction and villa projects in Kottayam. Top builders in Pala, Changanassery, and Kanjirappally specializing in contemporary designs.',
};

export default function KottayamPage() {
  const towns = ['Kottayam City', 'Pala', 'Changanassery', 'Kanjirappally', 'Vaikom', 'Ettumanoor', 'Pambady', 'Erattupetta'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Top Construction Company in <span className="text-primary">Kottayam</span>
          </h1>
          <p className="text-xl text-muted-foreground">Modern architecture meets the lush landscapes of the Akshara Nagari.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Residential Construction Leaders in Kottayam</h2>
          <p>
            Kottayam is a district known for its discerning homeowners and love for quality architecture. <strong>BeOnce</strong> has become the preferred construction company in Kottayam by offering a unique mix of modern functionality and premium aesthetics.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Our Kottayam Advantage</h3>
          <ul>
            <li><strong>Premium Interior Design:</strong> High-end finishes for sophisticated living.</li>
            <li><strong>Transparent Sqft Pricing:</strong> No hidden costs, just honest engineering.</li>
            <li><strong>Eco-Friendly Designs:</strong> Harmonizing with Kottayam's greenery.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving the Kottayam Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-muted p-10 rounded-2xl text-center not-prose border">
            <h2 className="text-3xl font-bold mb-4 font-headline">Plan Your Kottayam Home</h2>
            <Button size="lg" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
