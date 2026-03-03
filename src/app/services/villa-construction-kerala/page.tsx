
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Villa Construction in Kerala – Premium Luxury Builders',
  description: 'Design and build your dream villa in Kerala. BeOnce specializes in luxury villa projects with modern designs, courtyard spaces, and premium finishes.',
};

export default function VillaConstructionKerala() {
  return (
    <div className="bg-background">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-5 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Villa Construction in Kerala</h1>
          <p className="text-xl text-muted-foreground">Exquisite villa designs for those who seek privacy, luxury, and architectural brilliance.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Luxury Villa Builders in Kerala</h2>
          <p>
            Villas in Kerala are moving away from traditional pitched roofs toward contemporary flat-roof "Boxy" designs that allow for roof gardens and utility spaces. BeOnce is at the forefront of this architectural shift, creating villas that are both high-status and highly functional.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">Key Features of Our Villa Projects</h3>
          <ul>
            <li><strong>Courtyard Integration:</strong> Bringing the "Nadumuttam" concept into modern design.</li>
            <li><strong>Premium Interior Work:</strong> High-end tiling, false ceilings, and custom lighting.</li>
            <li><strong>Advanced Safety:</strong> Free CCTV installation and high-security locks.</li>
            <li><strong>Sustainable Living:</strong> Provisions for solar panels and rainwater harvesting.</li>
          </ul>

          <h3 className="text-2xl font-bold font-headline mt-10">Our Design Philosophy</h3>
          <p>
            We believe a villa should be a sanctuary. Our design team focuses on open floor plans, large glass windows to bring in the Kerala greenery, and minimalist aesthetics that emphasize quality materials over ornate decorations.
          </p>

          <div className="bg-muted p-8 rounded-2xl not-prose my-12">
            <h4 className="text-xl font-bold mb-4">The BeOnce Villa Guarantee</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ 5-Year Service Support</li>
              <li>✓ Structural Warranty</li>
              <li>✓ On-time Project Delivery</li>
              <li>✓ Premium Branded Fittings (Jaguar/Kohler equivalents)</li>
            </ul>
          </div>

          <div className="mt-16 text-center not-prose">
            <Button size="lg" asChild>
              <Link href="/contact">Discuss Your Villa Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
