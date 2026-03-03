'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { servicesList } from '@/app/lib/services-data';
import imageData from '@/app/lib/placeholder-images.json';

export function ServicesTicker() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
    }, 
    [
      AutoScroll({ 
        speed: 1, 
        stopOnInteraction: false, 
        stopOnMouseEnter: false 
      })
    ]
  );

  return (
    <div className="w-full bg-muted/30 py-12 overflow-hidden">
      <div className="container mx-auto px-5 mb-8">
        <h2 className="text-2xl font-bold font-headline">Our Findings & Services</h2>
        <p className="text-muted-foreground text-sm">Explore our 20+ SEO-optimized construction solutions.</p>
      </div>
      
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {servicesList.map((service) => {
            const img = imageData.services.find(s => s.slug === service.slug);
            return (
              <div key={service.slug} className="embla__slide flex-[0_0_280px] min-w-0 px-4">
                <Link href={`/services/${service.slug}`} className="block group">
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
                      <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-grow">{service.description}</p>
                      <p className="text-xs font-bold mt-3 text-foreground">{service.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
