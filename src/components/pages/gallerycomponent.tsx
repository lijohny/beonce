"use client";

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';


export default function Gallerycomponent({ params }: { params: { slug: string } }) {
  const { ref: galleryRef, inView: galleryInView } = useScrollAnimation<HTMLDivElement>();

const images = [
  { src: '/image/assets/images/home1.jpg', alt: 'Modern Boxy Home 1', hint: 'modern architecture' },
  { src: '/image/assets/images/home2.jpg', alt: 'Minimalist Interior 1', hint: 'minimalist interior' },
  { src: '/image/assets/images/home4.jpg', alt: 'Modern Kitchen Design', hint: 'modern kitchen' },
  { src: '/image/assets/images/home5.jpg', alt: 'Courtyard View', hint: 'courtyard garden' },
  { src: '/image/assets/images/home6.jpg', alt: 'Exterior Facade', hint: 'boxy architecture' },
  { src: '/image/assets/images/home7.jpg', alt: 'Bedroom with a View', hint: 'modern bedroom' },
  { src: '/image/assets/images/home8.jpg', alt: 'Open Plan Living', hint: 'open plan' },
  { src: '/image/assets/images/home10.jpg', alt: 'Staircase detail', hint: 'architectural detail' },
  { src: '/image/assets/images/home11.jpg', alt: 'Staircase detail', hint: 'architectural detail' },
  { src: '/image/assets/images/home12.jpg', alt: 'Staircase detail', hint: 'architectural detail' },
  { src: '/image/assets/images/home13.jpg', alt: 'Staircase detail', hint: 'architectural detail' },
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
        {/* <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            placeholder="blur"
            blurDataURL="/images/placeholder-blur.jpg" // ✅ shared low-res placeholder
            data-ai-hint={image.hint}
            priority={index < 2} // ✅ preload top 2 images for faster above-the-fold
          /> */}

            <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
                blurDataURL="/images/placeholder-blur.jpg" // ✅ shared low-res placeholder
                data-ai-hint={image.hint}
                priority={index < 2} // ✅ preload top 2 images for faster above-the-fold
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
