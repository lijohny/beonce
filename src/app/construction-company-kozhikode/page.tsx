
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Kozhikode – BeOnce',
  description: 'Top house construction company in Kozhikode. Modern boxy homes and luxury villas in Vadakara, Koyilandy, and Calicut city.',
};

export default function KozhikodePage() {
  const towns = ['Calicut City', 'Vadakara', 'Koyilandy', 'Feroke', 'Ramanattukara', 'Mukkam', 'Thamarassery', 'Balussery'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Leading Construction Company in <span className="text-primary">Kozhikode</span>
          </h1>
          <p className="text-xl text-muted-foreground">Modern architecture with Malabar's hospitality. Building homes with soul.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert Residential Builders in Calicut</h2>
          <p>
            Kozhikode (Calicut) is a city of taste and heritage. <strong>BeOnce</strong> respects this legacy as a premier construction company in Kozhikode, delivering homes that are architecturally significant and built for comfort.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">The BeOnce Edge in Kozhikode</h3>
          <ul>
            <li><strong>Modern Boxy Architecture:</strong> Stylish urban homes.</li>
            <li><strong>Complete Interior Solutions:</strong> Branded fittings and premium tiling.</li>
            <li><strong>Turnkey Convenience:</strong> Managing all paperwork and civil work.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving the Kozhikode District</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Your Dream in Kozhikode</h2>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Book Your Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
