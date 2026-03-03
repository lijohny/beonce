
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Pathanamthitta – BeOnce',
  description: 'Expert house construction services in Pathanamthitta. We build modern villas and budget homes in Thiruvalla, Adoor, and Ranni.',
};

export default function PathanamthittaPage() {
  const towns = ['Thiruvalla', 'Adoor', 'Ranni', 'Pathanamthitta City', 'Konni', 'Mallappally', 'Pandalam', 'Kozhencherry'];

  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">
            Leading Construction Company in <span className="text-primary">Pathanamthitta</span>
          </h1>
          <p className="text-xl text-muted-foreground">Building legacies in the pilgrim capital of Kerala with modern engineering.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Your Trusted Partner in Pathanamthitta</h2>
          <p>
            From the urban landscape of Thiruvalla to the scenic terrains of Ranni, <strong>BeOnce</strong> delivers construction excellence that matches the dignity of Pathanamthitta. We specialize in NRI house construction, providing peace of mind to those building their dream homes from abroad.
          </p>
          
          <h3 className="text-2xl font-bold font-headline mt-10">Why Choose BeOnce in Pathanamthitta?</h3>
          <ul>
            <li><strong>NRI Friendly:</strong> Remote project management with video updates.</li>
            <li><strong>Topography Experts:</strong> Handling the varied terrains of the district with ease.</li>
            <li><strong>Premium Woodwork:</strong> Utilizing the best timber for a grand finish.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving Pathanamthitta District</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mb-12">
            {towns.map(town => (
              <div key={town} className="flex items-center gap-2 p-3 border rounded-lg bg-card text-sm">
                <MapPin className="w-4 h-4 text-primary" /> {town}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4 font-headline">Ready to Build?</h2>
            <Button size="lg" asChild>
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
