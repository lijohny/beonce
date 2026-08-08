"use client";

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const { ref: galleryRef, inView: galleryInView } = useScrollAnimation<HTMLDivElement>();

const images = [
  { src: "/image/assets/images/home1.jpg", alt: "Home 1", hint: "house" },
  { src: "/image/assets/images/home2.jpg", alt: "Home 2", hint: "house" },
  { src: "/image/assets/images/home3.jpg", alt: "Home 3", hint: "house" },
  { src: "/image/assets/images/home4.jpg", alt: "Home 4", hint: "house" },
  { src: "/image/assets/images/home5.jpg", alt: "Home 5", hint: "house" },
  { src: "/image/assets/images/home6.jpg", alt: "Home 6", hint: "house" },
  { src: "/image/assets/images/home7.jpg", alt: "Home 7", hint: "house" },
  { src: "/image/assets/images/home8.jpg", alt: "Home 8", hint: "house" },
  { src: "/image/assets/images/home9.jpg", alt: "Home 9", hint: "house" },
  { src: "/image/assets/images/home10.jpg", alt: "Home 10", hint: "house" },
  { src: "/image/assets/images/home11.jpg", alt: "Home 11", hint: "house" },
  { src: "/image/assets/images/home12.jpg", alt: "Home 12", hint: "house" },
  { src: "/image/assets/images/home13.jpg", alt: "Home 13", hint: "house" },
  // { src: "/image/assets/images/home14.jpg", alt: "Home 14", hint: "house" },
  { src: "/image/assets/images/home15.jpg", alt: "Home 15", hint: "house" },
  { src: "/image/assets/images/home16.jpg", alt: "Home 16", hint: "house" },
  { src: "/image/assets/images/home17.png", alt: "Home 17", hint: "house" },
  { src: "/image/assets/images/home18.jpg", alt: "Home 18", hint: "house" },
  { src: "/image/assets/images/home19.jpg", alt: "Home 19", hint: "house" },
  { src: "/image/assets/images/home20.jpg", alt: "Home 20", hint: "house" },
  { src: "/image/assets/images/home21.jpg", alt: "Home 21", hint: "house" },
  { src: "/image/assets/images/home22.jpg", alt: "Home 22", hint: "house" },
  { src: "/image/assets/images/home23.jpg", alt: "Home 23", hint: "house" },
  { src: "/image/assets/images/home24.jpg", alt: "Home 24", hint: "house" },
  { src: "/image/assets/images/home25.jpg", alt: "Home 25", hint: "house" },
  // { src: "/image/assets/images/home26.png", alt: "Home 250", hint: "house" },
  // { src: "/image/assets/images/home26.png", alt: "Home 299", hint: "house" },
  { src: "/image/assets/images/home27.jpg", alt: "Home 27", hint: "house" },

];

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24 px-5">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Our Gallery</h1>
          <p className="mt-4 text-muted-foreground">
            Explore a selection of our contemporary home projects. Witness the fusion of modern design, quality finishes, and functional living spaces.
          </p>
        </div>
        
        <div className="columns-1 md:columns-3 gap-4 mt-12 space-y-4">
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
