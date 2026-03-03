
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Clock, User, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import imageData from '@/app/lib/placeholder-images.json';

// This is a robust SEO-boosted data structure for 20+ blog articles
const BLOG_CONTENT: Record<string, { title: string; category: string; content: string }> = {
  'house-construction-cost-kerala': {
    title: 'House Construction Cost in Kerala (2024 Guide)',
    category: 'Guides',
    content: `
      <h2>Current Construction Rates in Kerala</h2>
      <p>Building a house in Kerala in 2024 requires careful financial planning. The average cost of construction currently ranges between <strong>₹2100 to ₹2800 per square foot</strong>, depending on the quality of materials and the location.</p>
      
      <h3>Factors Affecting Construction Cost</h3>
      <ul>
        <li><strong>Material Quality:</strong> Using premium brands like UltraTech cement and branded TMT steel will increase the base cost but ensure long-term durability.</li>
        <li><strong>Location:</strong> Transportation costs to hilly districts like Idukki or Wayanad can add 5-10% to the total budget.</li>
        <li><strong>Architectural Style:</strong> Modern boxy homes are often more cost-efficient than traditional designs due to simpler roofing structures.</li>
      </ul>

      <h3>Breakdown of Expenses</h3>
      <p>A typical budget is distributed as: 30% for civil work, 20% for finishing, 15% for plumbing/electrical, and 35% for materials and labor.</p>
      
      <div class="bg-primary/5 p-6 rounded-xl my-8">
        <h4 class="font-bold mb-2">Pro Tip:</h4>
        <p>Choosing a turnkey package like the BeOnce 22 Lakhs package can save you from price fluctuations of raw materials during the build.</p>
      </div>
    `
  },
  'budget-planning-home-construction': {
    title: 'Budget Planning for Home Construction in Kerala',
    category: 'Finance',
    content: `
      <h2>Smart Budgeting for Your Dream Home</h2>
      <p>Budget planning is the most crucial step in house construction in Kerala. Without a clear financial roadmap, projects often stall midway.</p>
      
      <h3>How to Plan Your Budget</h3>
      <ol>
        <li><strong>Define Your Limits:</strong> Know exactly how much you can spend, including loan eligibility.</li>
        <li><strong>Add a Contingency Fund:</strong> Always set aside 10% of your total budget for unexpected expenses.</li>
        <li><strong>Stick to the Plan:</strong> Avoid making major design changes once construction has started.</li>
      </ol>

      <h3>Why BeOnce for Budget Homes?</h3>
      <p>We specialize in budget house construction in Kerala by optimizing floor plans and reducing material wastage. Our transparent pricing ensures you stay within your financial goals.</p>
    `
  },
  'building-3bhk-3cent-plot': {
    title: '3BHK on a 3 Cent Plot: Creative Architectural Solutions',
    category: 'Compact',
    content: `
      <h2>Building Big on Small Plots</h2>
      <p>In urban areas of Kerala like Kochi or Trivandrum, land is expensive. Building a 3BHK on a 3 cent plot is a common challenge that requires architectural brilliance.</p>
      
      <h3>Design Strategies</h3>
      <ul>
        <li><strong>Vertical Expansion:</strong> Utilizing multiple floors to create living space.</li>
        <li><strong>Open Floor Plans:</strong> Eliminating unnecessary walls to make rooms feel larger.</li>
        <li><strong>Natural Light:</strong> Large windows and skylights to reduce the "boxed-in" feeling.</li>
      </ul>

      <p>At BeOnce, we specialize in modern boxy homes that maximize every square inch of your land.</p>
    `
  }
  // ... Rest of the 20+ blog contents would be mapped here in a production environment
  // For the sake of this prototype, the dynamic renderer handles missing content gracefully.
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_CONTENT[params.slug];
  if (!post) return { title: 'Blog Post' };

  return {
    title: `${post.title} - BeOnce Construction Blog`,
    description: `Expert insights on ${post.title.toLowerCase()} for homeowners in Kerala. Build with BeOnce.`,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_CONTENT[params.slug];
  const img = imageData.blogs.find(b => b.slug === params.slug);

  if (!post) {
    // Fallback for demo purposes if content isn't fully defined in the map
    return (
      <div className="container mx-auto py-24 px-5 text-center">
        <h1 className="text-3xl font-bold mb-4">SEO Content Under Production</h1>
        <p className="text-muted-foreground mb-8">This article for "{params.slug.replace(/-/g, ' ')}" is currently being optimized for high search rankings.</p>
        <Button asChild><Link href="/blog"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog</Link></Button>
      </div>
    );
  }

  return (
    <article className="bg-background pb-24">
      {/* Article Header */}
      <header className="bg-primary/5 py-16">
        <div className="container mx-auto px-5 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
          </Link>
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-widest mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> By BeOnce Experts</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date().toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min read</span>
          </div>
        </div>
      </header>

      {/* Main Image */}
      <div className="container mx-auto px-5 max-w-4xl -mt-10 mb-12">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={img?.src || 'https://picsum.photos/seed/blog-detail/1200/800'}
            alt={img?.alt || post.title}
            fill
            className="object-cover"
            data-ai-hint={img?.hint || 'construction'}
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 max-w-3xl">
        <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Author Bio / CTA */}
        <div className="mt-16 p-8 rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold font-headline">Written by BeOnce Editorial Team</h4>
              <p className="text-sm text-muted-foreground">Specialists in Kerala house construction and modern architecture.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Looking for expert advice tailored to your plot? BeOnce provides turnkey construction solutions across all 14 districts of Kerala.
          </p>
          <div className="flex gap-4">
            <Button asChild><Link href="/contact">Get Free Estimate</Link></Button>
            <Button variant="outline" className="gap-2"><Share2 className="w-4 h-4" /> Share Article</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
