
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Home, ShieldCheck, BadgeCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Ernakulam – BeOnce Kochi',
  description: 'Premium house construction and villa projects in Ernakulam. Best builders in Kochi, Aluva, and Muvattupuzha specializing in modern designs.',
};

export default function ErnakulamPage() {
  const towns = ['Kochi', 'Aluva', 'Muvattupuzha', 'Perumbavoor', 'Angamaly', 'Tripunithura', 'Kalamassery', 'Kothamangalam'];

  return (
    <div className="bg-background">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Leading Construction Company in <span className="text-primary">Ernakulam</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Setting the benchmark for premium residential construction and turnkey solutions in Kochi and beyond.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Start Your Kochi Project</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-5xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Building the Future of Kochi</h2>
          <p>
            Ernakulam is the heart of Kerala's growth, and <strong>BeOnce</strong> is proud to be a major player in its residential development. As a top construction company in Ernakulam, we specialize in high-end villas, contemporary boxy homes, and efficient budget residences that cater to the diverse needs of this cosmopolitan district.
          </p>
          
          <p>
            Whether you have a compact plot in Kochi city or a sprawling property in Muvattupuzha, our designs are optimized for maximum space utilization and luxury appeal. We bring international design standards to the local Kerala context.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">What Makes Us Different in Ernakulam?</h3>
          <p>
            In a fast-paced market like Kochi, reliability and transparency are paramount. We offer:
          </p>
          <ul>
            <li><strong>Turnkey Convenience:</strong> We handle all GCDA and KSEB formalities.</li>
            <li><strong>Luxury Finishes:</strong> Premium interior work for those who desire the best.</li>
            <li><strong>CCTV & Smart Home Ready:</strong> Integrating modern technology into every build.</li>
            <li><strong>NRI Specialized Service:</strong> Dedicated remote monitoring for our clients living abroad.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving Every Corner of Ernakulam</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold font-headline mt-10">Modern Architecture for a Modern District</h3>
          <p>
            Our signature "Boxy" homes are particularly popular in Ernakulam for their minimalist beauty and cost-efficiency. By focusing on clean lines and functional spaces, we deliver homes that stand out in any neighborhood.
          </p>

          <div className="mt-16 bg-muted p-10 rounded-2xl text-center not-prose border">
            <h2 className="text-3xl font-bold mb-4 font-headline">Ready for a Site Consultation?</h2>
            <p className="text-lg mb-8 text-muted-foreground">Our expert engineers are ready to visit your plot in Ernakulam.</p>
            <Button size="lg" asChild>
              <Link href="/contact">Book Your Slot Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
