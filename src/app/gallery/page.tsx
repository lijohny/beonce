"use client";

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const { ref: galleryRef, inView: galleryInView } = useScrollAnimation<HTMLDivElement>();

  const images = [
    { src: 'https://placehold.co/600x400', alt: 'Modern Boxy Home 1', hint: 'modern architecture' },
    { src: 'https://placehold.co/400x600', alt: 'Minimalist Interior 1', hint: 'minimalist interior' },
    { src: 'https://placehold.co/600x400', alt: 'Contemporary Living Room', hint: 'contemporary design' },
    { src: 'https://placehold.co/600x400', alt: 'Modern Kitchen Design', hint: 'modern kitchen' },
    { src: 'https://placehold.co/400x600', alt: 'Courtyard View', hint: 'courtyard garden' },
    { src: 'https://placehold.co/600x400', alt: 'Exterior Facade', hint: 'boxy architecture' },
    { src: 'https://placehold.co/600x400', alt: 'Bedroom with a View', hint: 'modern bedroom' },
    { src: 'https://placehold.co/600x400', alt: 'Open Plan Living', hint: 'open plan' },
    { src: 'https://placehold.co/400x600', alt: 'Staircase detail', hint: 'architectural detail' },
  ];

  return (
    <div className="bg-background">
      <div ref={galleryRef} className={cn("container mx-auto py-16 md:py-24 lg:px-5 animate-raise-up", { 'in-view': galleryInView })}>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Our Gallery</h1>
          <p className="mt-4 text-muted-foreground">
            Explore a selection of our contemporary home projects. Witness the fusion of modern design, quality finishes, and functional living spaces.
          </p>
        </div>
        
        <div className="columns-2 md:columns-3 gap-4 mt-12 space-y-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg break-inside-avoid shadow-md hover:shadow-xl transition-shadow" style={{ transitionDelay: `${index * 100}ms` }}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
