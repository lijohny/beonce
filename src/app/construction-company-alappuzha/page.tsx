
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Construction Company in Alappuzha – BeOnce',
  description: 'Reliable house construction in Alappuzha. Experts in water-front villas and modern homes in Cherthala, Kayamkulam, and Mavelikara.',
};

export default function AlappuzhaPage() {
  const towns = ['Alappuzha City', 'Cherthala', 'Kayamkulam', 'Mavelikara', 'Chengannur', 'Ambalapuzha', 'Haripad', 'Kuttanad'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Best Construction Company in <span className="text-primary">Alappuzha</span>
          </h1>
          <p className="text-xl text-muted-foreground">Expert engineering for the Venice of the East. Building robust homes on unique terrains.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Engineering Excellence for Alappuzha</h2>
          <p>
            Alappuzha's coastal and backwater geography requires specialized construction knowledge. <strong>BeOnce</strong> excels in delivering homes in Alappuzha that are protected against humidity and salinity while offering modern "Boxy" aesthetics.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Specialized Services in Alappuzha</h3>
          <ul>
            <li><strong>Reinforced Foundations:</strong> Essential for the soil conditions in Alappuzha and Kuttanad.</li>
            <li><strong>Waterproofing Specialists:</strong> Ensuring leak-proof homes in high-rainfall zones.</li>
            <li><strong>Modern Waterfront Villas:</strong> Designing homes that celebrate Alappuzha's beauty.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Where We Work in Alappuzha</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Build With the Experts</h2>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Book a Site Visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
