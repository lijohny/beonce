
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Malappuram – BeOnce',
  description: 'Premium residential construction in Malappuram. Experts in large villa projects and modern homes in Manjeri, Tirur, and Perinthalmanna.',
};

export default function MalappuramPage() {
  const towns = ['Manjeri', 'Tirur', 'Perinthalmanna', 'Malappuram City', 'Kottakkal', 'Ponnani', 'Nilambur', 'Kondotty'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Top Construction Company in <span className="text-primary">Malappuram</span>
          </h1>
          <p className="text-xl text-muted-foreground">Expert villa builders for the heart of Malabar. Luxury meets transparency.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert Residential Builders in Malappuram</h2>
          <p>
            Malappuram is known for its grand homes and architectural ambition. <strong>BeOnce</strong> delivers on this promise as the best construction company in Malappuram, specializing in large-scale luxury villas and contemporary family homes.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Signature Malappuram Services</h3>
          <ul>
            <li><strong>Luxury Villa Projects:</strong> Custom designs with premium finishes.</li>
            <li><strong>NRI Specialized Project Management:</strong> Seamless coordination for abroad-based owners.</li>
            <li><strong>Courtyard & Large Open Spaces:</strong> Traditional concepts in modern frameworks.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving the Malappuram Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Your Grand Home in Malappuram</h2>
            <Button size="lg" asChild>
              <Link href="/contact">Request Your Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
