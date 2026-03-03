
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Thrissur – BeOnce',
  description: 'Top-rated house builders in Thrissur. We specialize in modern villas and budget homes in Guruvayur, Kunnamkulam, and Thrissur city.',
};

export default function ThrissurPage() {
  const towns = ['Thrissur City', 'Guruvayur', 'Kunnamkulam', 'Chalakudy', 'Kodungallur', 'Chavakkad', 'Irinjalakuda', 'Wadakkanchery'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Premier Construction Company in <span className="text-primary">Thrissur</span>
          </h1>
          <p className="text-xl text-muted-foreground">Bringing modern architectural brilliance to the cultural capital of Kerala.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert House Construction in Thrissur</h2>
          <p>
            Thrissur is a district that values tradition and quality. <strong>BeOnce</strong> bridges this with modern "Boxy" home designs that offer superior space efficiency. As a leading construction company in Thrissur, we ensure every project is a masterpiece of civil engineering.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Our Service Edge in Thrissur</h3>
          <ul>
            <li><strong>22 Lakhs Home Package:</strong> Highly popular in Thrissur suburbs.</li>
            <li><strong>Turnkey Villa Solutions:</strong> For a hassle-free premium experience.</li>
            <li><strong>Vastu-Integrated Modern Design:</strong> Merging tradition with modernism.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving Every Town in Thrissur</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build Your Legacy in Thrissur</h2>
            <Button size="lg" asChild>
              <Link href="/contact">Get a Personalized Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
