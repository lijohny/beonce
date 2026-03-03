import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, Hammer, ShieldCheck, BadgeCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Construction Company in Kerala – BeOnce',
  description: 'BeOnce is the top construction company in Kerala specializing in modern boxy homes, turnkey villa projects, and budget-friendly house construction across all 14 districts.',
};

const districts = [
  { name: 'Thiruvananthapuram', slug: 'thiruvananthapuram' },
  { name: 'Kollam', slug: 'kollam' },
  { name: 'Pathanamthitta', slug: 'pathanamthitta' },
  { name: 'Alappuzha', slug: 'alappuzha' },
  { name: 'Kottayam', slug: 'kottayam' },
  { name: 'Idukki', slug: 'idukki' },
  { name: 'Ernakulam', slug: 'ernakulam' },
  { name: 'Thrissur', slug: 'thrissur' },
  { name: 'Palakkad', slug: 'palakkad' },
  { name: 'Malappuram', slug: 'malappuram' },
  { name: 'Kozhikode', slug: 'kozhikode' },
  { name: 'Wayanad', slug: 'wayanad' },
  { name: 'Kannur', slug: 'kannur' },
  { name: 'Kasaragod', slug: 'kasaragod' },
];

export default function MasterKeralaPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 tracking-tight">
            Best Construction Company in Kerala – <span className="text-primary">BeOnce</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Redefining residential living with modern architecture, transparent pricing, and end-to-end turnkey solutions across the God's Own Country.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Start Your Project Today</Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-5xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold font-headline mb-6">The New Standard of House Construction in Kerala</h2>
          <p>
            When it comes to building your dream home, choosing the right partner is the most critical decision. <strong>BeOnce</strong> has emerged as the best construction company in Kerala by bridging the gap between luxury aesthetics and budget-conscious engineering. Our expertise lies in crafting contemporary "boxy" type homes that aren't just visually striking but are optimized for the tropical climate of Kerala.
          </p>
          
          <p>
            From the misty hills of Wayanad to the coastal stretches of Alappuzha, our construction methodology focuses on durability, sustainability, and architectural brilliance. We understand that a home in Kerala is more than just a building; it's a legacy.
          </p>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Why BeOnce is the Top Choice for Kerala Homeowners</h2>
          <div className="grid md:grid-cols-2 gap-8 not-prose mb-12">
            {[
              { title: "Boxy Modern Designs", desc: "Specializing in minimalist, contemporary architecture that maximizes space and light.", icon: <Home className="text-primary" /> },
              { title: "Turnkey Excellence", desc: "We handle everything from plan approval to key handover, including all paperwork.", icon: <Hammer className="text-primary" /> },
              { title: "Transparent Pricing", desc: "No hidden costs. Our 22 Lakhs package and sqft-based pricing are crystal clear.", icon: <ShieldCheck className="text-primary" /> },
              { title: "Loan Assistance", desc: "Dedicated support for home loans, even for those with CIBIL issues.", icon: <BadgeCheck className="text-primary" /> },
            ].map((item, i) => (
              <div key={i} className="p-6 border rounded-xl bg-card">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Our Comprehensive Service Spectrum</h2>
          <p>
            As a leading construction firm in Kerala, we offer a "single-window" experience. Our clients don't have to chase architects, contractors, or government officials. We manage:
          </p>
          <ul>
            <li><strong>Architectural Planning & 3D Visualization:</strong> See your home before it's built.</li>
            <li><strong>Permits & Approvals:</strong> Handling all panchayat/municipality paperwork.</li>
            <li><strong>Material Procurement:</strong> Using top-tier brands like UltraTech and premium wood.</li>
            <li><strong>Civil Construction:</strong> Robust foundation and structural work with beam-column design.</li>
            <li><strong>Interior Design:</strong> Modern kitchens, premium tiling, and full wood furnishing.</li>
          </ul>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Serving All 14 Districts of Kerala</h2>
          <p>
            Our reach extends from the southernmost tip of Thiruvananthapuram to the northern borders of Kasaragod. Whether you are an NRI looking to build a vacation home in Ernakulam or a local resident planning a budget home in Thrissur, BeOnce brings its signature quality to your doorstep. Explore our local services:
          </p>
          <div className="bg-muted p-8 rounded-xl not-prose grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
            {districts.map(d => (
              <Link key={d.slug} href={`/construction-company-${d.slug}`} className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {d.name}
              </Link>
            ))}
          </div>

          <h2 className="text-3xl font-bold font-headline mt-12 mb-6">Our Construction Process: From Base to Handover</h2>
          <p>
            We follow a meticulous 7-step process to ensure timely delivery and quality:
          </p>
          <ol>
            <li><strong>Consultation:</strong> Understanding your vision and budget.</li>
            <li><strong>Site Analysis:</strong> Soil testing and plot optimization.</li>
            <li><strong>Design Approval:</strong> Finalizing the 3D view and floor plans.</li>
            <li><strong>Structural Execution:</strong> Foundation, column-beam, and brickwork.</li>
            <li><strong>Utility Finishing:</strong> Electrical, plumbing, and tiling.</li>
            <li><strong>Furnishing:</strong> Interior wood work and painting.</li>
            <li><strong>Handover:</strong> Final quality check and key delivery.</li>
          </ol>

          <div className="mt-16 bg-primary text-primary-foreground p-10 rounded-2xl text-center not-prose">
            <h2 className="text-3xl font-bold mb-4">Ready to Build with the Best?</h2>
            <p className="text-lg mb-8 opacity-90">Join 300+ happy families who chose BeOnce for their dream home in Kerala.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get a Free Estimate</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                <Link href="/gallery">Explore Our Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}