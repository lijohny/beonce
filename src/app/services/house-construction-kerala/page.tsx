
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'House Construction in Kerala – Quality Residential Builders',
  description: 'Expert residential house construction in Kerala. From foundation to key handover, BeOnce offers premium quality, modern designs, and transparent costs.',
};

export default function HouseConstructionKerala() {
  return (
    <div className="bg-background">
      <section className="py-20 border-b">
        <div className="container mx-auto px-5 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">House Construction in Kerala</h1>
          <p className="text-xl text-muted-foreground">Building homes that blend Kerala's traditional values with modern "Boxy" aesthetics.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-4xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">Professional Residential Construction Services</h2>
          <p>
            House construction in Kerala has evolved. Today, homeowners look for designs that are energy-efficient, climate-responsive, and architecturally modern. At <strong>BeOnce</strong>, we specialize in building residential structures that meet these demands while staying within your budget.
          </p>

          <h3 className="text-2xl font-bold font-headline mt-10">Cost Factors in Kerala House Construction</h3>
          <p>The cost of building a house in Kerala depends on several factors:</p>
          <ul>
            <li><strong>Material Choice:</strong> Premium vs. standard finishes.</li>
            <li><strong>Site Topography:</strong> Hilly terrains in Idukki/Wayanad require different foundations compared to Ernakulam.</li>
            <li><strong>Design Complexity:</strong> Boxy homes often offer better cost-per-sqft value due to structural simplicity.</li>
          </ul>

          <h3 className="text-2xl font-bold font-headline mt-10">Our Construction Materials</h3>
          <p>We believe in no compromises. Our standard builds include:</p>
          <ul>
            <li><strong>Cement:</strong> UltraTech or ACC for maximum structural integrity.</li>
            <li><strong>Steel:</strong> Fe500 grade TMT bars.</li>
            <li><strong>Wood:</strong> High-quality teak or mahogany for doors and frames.</li>
            <li><strong>Finishing:</strong> Asian Paints or Berger for long-lasting weather protection.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="not-prose">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the average duration for house construction in Kerala?</AccordionTrigger>
                <AccordionContent>
                  Typically, a 1500 sqft home takes 8 to 12 months, depending on the weather conditions (monsoon delays) and design complexity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you handle the building permits and panchayat approvals?</AccordionTrigger>
                <AccordionContent>
                  Yes, BeOnce provides a full turnkey service which includes managing all legal paperwork, plan approvals, and permits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is the starting price per sqft?</AccordionTrigger>
                <AccordionContent>
                  Our standard construction starts at ₹2400 per sqft, which includes everything from foundation to the final coat of paint and key handover.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-16 text-center not-prose">
            <Button size="lg" asChild>
              <Link href="/contact">Get a Personalized Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
