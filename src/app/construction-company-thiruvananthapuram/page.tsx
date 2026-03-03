
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, MapPin, ShieldCheck, BadgeCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Thiruvananthapuram – BeOnce',
  description: 'Top-rated house construction company in Thiruvananthapuram. We build modern boxy homes and luxury villas in Kattakada, Nedumangad, and TVM city.',
};

export default function TrivandrumPage() {
  const towns = ['Kattakada', 'Nedumangad', 'Neyyattinkara', 'Varkala', 'Attingal', 'Vizhinjam', 'Kazhakkoottam', 'Pappanamcode'];

  return (
    <div className="bg-background">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Best Construction Company in <span className="text-primary">Thiruvananthapuram</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Building modern, climate-responsive, and budget-friendly homes across the capital district.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get Your Quote in TVM</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-5xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Expert House Builders in Thiruvananthapuram</h2>
          <p>
            Thiruvananthapuram, being the capital of Kerala, demands a unique blend of traditional elegance and modern urban functionality. At <strong>BeOnce</strong>, we have established ourselves as the premier construction company in Thiruvananthapuram by delivering projects that respect local topography while embracing contemporary "Boxy" architecture.
          </p>
          
          <p>
            From the bustling tech hubs of Kazhakkoottam to the serene landscapes of Kattakada, our civil engineering team ensures every home is built with precision. We understand the specific soil conditions of the district, from the red earth of the midlands to the sandy stretches of the coast, ensuring robust foundations for every structure.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">Why BeOnce is the Top Choice in TVM</h3>
          <p>
            Choosing the right contractor in Thiruvananthapuram is often a challenge due to varying labor costs and material availability. BeOnce simplifies this with a transparent, turnkey approach. We handle everything:
          </p>
          <ul>
            <li><strong>TRIDA & Municipality Approvals:</strong> Navigating the complex permit process in Thiruvananthapuram.</li>
            <li><strong>Modern Boxy Designs:</strong> Maximizing space in urban plots.</li>
            <li><strong>22 Lakhs Package:</strong> Perfect for budget-conscious families in the suburbs.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Our Presence Across the District</h2>
          <p>We provide end-to-end construction services in the following key areas of Thiruvananthapuram:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold font-headline mt-10">Signature Quality Standards</h3>
          <p>
            We use only premium materials like UltraTech cement and Fe500 grade steel to ensure your home lasts for generations. Our project management team provides regular updates, ensuring you are part of the journey from the first brick to the final coat of paint.
          </p>

          <div className="mt-16 bg-primary text-primary-foreground p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4">Start Building in Thiruvananthapuram</h2>
            <p className="text-lg mb-8 opacity-90">Join the growing community of BeOnce homeowners in the capital city.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Consult Our Architects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
