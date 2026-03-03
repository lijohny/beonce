'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/app/lib/blog-data';
import imageData from '@/app/lib/placeholder-images.json';

export function BlogTicker() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
    }, 
    [
      AutoScroll({ 
        speed: 0.8, 
        stopOnInteraction: false, 
        stopOnMouseEnter: false 
      })
    ]
  );

  return (
    <div className="w-full bg-background py-16 overflow-hidden">
      <div className="container mx-auto px-5 mb-8">
        <h2 className="text-2xl font-bold font-headline">Latest Articles & Guides</h2>
        <p className="text-muted-foreground text-sm">Expert advice on Kerala house construction and design.</p>
      </div>
      
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {blogPosts.map((post) => {
            const img = imageData.blogs.find(b => b.slug === post.slug);
            return (
              <div key={post.slug} className="embla__slide flex-[0_0_320px] min-w-0 px-4">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow bg-card h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={img?.src || 'https://picsum.photos/seed/blog/800/600'}
                        alt={img?.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={img?.hint || 'construction'}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary/90 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors h-10">{post.title}</h3>
                      <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8 min read</span>
                        <span className="text-primary font-bold flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></span>
                      </div>
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
