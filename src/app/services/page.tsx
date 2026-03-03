import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, MapPin, Share2 } from 'lucide-react';
import { servicesList } from '@/app/lib/services-data';
import imageData from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Our Construction Services in Kerala | BeOnce',
  description: 'Explore 20+ residential construction services by BeOnce. Specialists in house construction, villa projects, budget homes, and turnkey solutions across Kerala.',
};

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="py-12 border-b bg-card">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-headline tracking-tight">BeOnce Construction</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9 (350+ reviews)</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Kerala, India</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
              <Button size="sm" className="rounded-full" asChild>
                <Link href="/contact">Message</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-8 flex gap-6 border-b overflow-x-auto pb-px no-scrollbar">
            <button className="pb-3 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">Services & Products</button>
            <button className="pb-3 text-muted-foreground hover:text-foreground text-sm whitespace-nowrap">Reviews</button>
            <button className="pb-3 text-muted-foreground hover:text-foreground text-sm whitespace-nowrap">Photos</button>
            <button className="pb-3 text-muted-foreground hover:text-foreground text-sm whitespace-nowrap">About</button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-5 max-w-6xl">
          <h2 className="text-xl font-bold font-headline mb-6">Our Findings & Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesList.map((service) => {
              const img = imageData.services.find(s => s.slug === service.slug);
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group block">
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-card h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={img?.src || 'https://picsum.photos/seed/service/600/600'}
                        alt={img?.alt || service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={img?.hint || 'construction'}
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">{service.description}</p>
                      <p className="text-sm font-medium mt-3 text-foreground">{service.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col items-center gap-6">
            <Button variant="outline" className="rounded-full w-full max-w-md gap-2" asChild>
              <Link href="/contact">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}