import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/app/lib/blog-data';
import imageData from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Construction Blog Kerala – House Construction Guide',
  description: 'Your ultimate guide to house construction in Kerala. Tips on budget planning, design trends, and construction costs.',
};

export default function BlogIndexPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-5 text-center max-w-3xl">
          <h1 className="text-4xl font-bold font-headline mb-4 tracking-tight">Construction Blog Kerala</h1>
          <p className="text-xl text-muted-foreground">Expert insights and guides for building your dream home in God's Own Country.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-5 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const img = imageData.blogs.find(b => b.slug === post.slug);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-card h-full flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
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
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8 min read</span>
                        <span className="text-primary font-semibold flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}