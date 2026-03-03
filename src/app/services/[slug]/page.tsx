
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, Clock, MapPin, ShieldCheck } from 'lucide-react';
import imageData from '@/app/lib/placeholder-images.json';

const SERVICE_CONTENT: Record<string, { title: string; category: string; description: string; content: string }> = {
  'interior-design-kerala': {
    title: 'Modern Interior Design in Kerala',
    category: 'Design',
    description: 'Transform your living spaces with contemporary interior solutions tailored for the Kerala lifestyle.',
    content: `
      <h2>Luxury Interior Solutions for Every Home</h2>
      <p>Interior design in Kerala is no longer just about wood and granite. At BeOnce, we specialize in <strong>minimalist, contemporary interiors</strong> that maximize light, space, and airflow.</p>
      <h3>Our Design Approach</h3>
      <ul>
        <li><strong>Open Floor Plans:</strong> Creating a sense of grandeur even in compact homes.</li>
        <li><strong>Modern Lighting:</strong> Integrated LED solutions and natural light optimization.</li>
        <li><strong>Premium Materials:</strong> High-quality plywood, multi-wood, and luxury stone finishes.</li>
      </ul>
      <p>Whether you are looking for a modular kitchen or a complete living room makeover, our designers ensure your vision is translated into reality with 3D visualization before construction starts.</p>
    `
  },
  'landscape-design-kerala': {
    title: 'Landscape & Garden Design in Kerala',
    category: 'Exterior',
    description: 'Beautiful landscape planning that harmonizes your home with Kerala\'s lush greenery.',
    content: `
      <h2>Bringing Nature to Your Doorstep</h2>
      <p>Kerala's tropical climate is perfect for lush landscapes. We design outdoor spaces that are low-maintenance yet breathtakingly beautiful.</p>
      <h3>Specialized Features</h3>
      <ul>
        <li><strong>Vertical Gardens:</strong> Ideal for urban homes in Kochi or TVM.</li>
        <li><strong>Paving & Stone Work:</strong> Durable pathways using natural stone.</li>
        <li><strong>Water Features:</strong> Modern ponds and fountains that cool the surroundings.</li>
      </ul>
    `
  },
  'smart-home-integration': {
    title: 'Smart Home Automation Services Kerala',
    category: 'Technology',
    description: 'Integrate cutting-edge technology into your home for security, comfort, and energy efficiency.',
    content: `
      <h2>The Future of Living is Smart</h2>
      <p>Make your home responsive with BeOnce smart integration. We provide scalable automation solutions for new villas and renovations.</p>
      <ul>
        <li><strong>Remote Security:</strong> CCTV and smart locks accessible from your phone.</li>
        <li><strong>Energy Management:</strong> Automated lighting and AC control to reduce bills.</li>
        <li><strong>Home Cinema:</strong> Integrated entertainment systems for luxury living.</li>
      </ul>
    `
  }
  // Additional services would be mapped here for a full production build
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = SERVICE_CONTENT[params.slug];
  if (!service) return { title: 'Service Details' };

  return {
    title: `${service.title} | BeOnce Construction Kerala`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICE_CONTENT[params.slug];
  const img = imageData.services.find(s => s.slug === params.slug);

  if (!service) {
    return (
      <div className="container mx-auto py-24 px-5 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Details Under Optimization</h1>
        <p className="text-muted-foreground mb-8">We are currently updating our detailed portfolio for "{params.slug.replace(/-/g, ' ')}".</p>
        <Button asChild><Link href="/services"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Services</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-4xl">
          <Badge className="mb-4">{service.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">{service.title}</h1>
          <p className="text-xl text-muted-foreground">{service.description}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={img?.src || 'https://picsum.photos/seed/service-detail/800/800'}
                alt={img?.alt || service.title}
                fill
                className="object-cover"
                data-ai-hint={img?.hint || 'construction'}
              />
            </div>
            <div className="prose prose-slate prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.content }} />
              
              <div className="mt-12 p-8 bg-card border rounded-2xl not-prose">
                <h3 className="text-2xl font-bold mb-4 font-headline">Why BeOnce for this Service?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Expert Engineering Team</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span>5-Year Service Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Timely Project Delivery</span>
                  </li>
                </ul>
                <Button className="w-full mt-8" size="lg" asChild>
                  <Link href="/contact">Get a Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
