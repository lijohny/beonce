
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Kasaragod – BeOnce',
  description: 'Expert house construction in Kasaragod. Building premium villas and budget homes in Kanhangad, Nileshwaram, and Kasaragod city.',
};

export default function KasaragodPage() {
  const towns = ['Kasaragod City', 'Kanhangad', 'Nileshwaram', 'Uppala', 'Manjeshwar', 'Kumbla', 'Trikaripur', 'Cheruvathur'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Premier Construction Company in <span className="text-primary">Kasaragod</span>
          </h1>
          <p className="text-xl text-muted-foreground">Quality residential construction for the northern gateway of Kerala.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert Builders in Kasaragod</h2>
          <p>
            Kasaragod demands homes that are as resilient as its history. <strong>BeOnce</strong> is a leading construction company in Kasaragod, providing high-quality residential solutions that prioritize long-term durability and modern aesthetics.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Specialized Services in Kasaragod</h3>
          <ul>
            <li><strong>All-Inclusive Turnkey Solutions:</strong> Managing every phase of construction.</li>
            <li><strong>Modern Architectural Designs:</strong> Standing out with boxy minimalism.</li>
            <li><strong>NRI Project Management:</strong> Seamless coordination for abroad-based owners.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving the Kasaragod District</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Start Your Project in Kasaragod</h2>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get a Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
