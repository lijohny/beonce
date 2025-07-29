
// src/app/packages/22-lakhs/page.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Building, PaintRoller, Wrench, Brick, DoorOpen } from 'lucide-react';
import Link from 'next/link';

const features = [
  { 
    category: 'Structure & Foundation',
    icon: <Building className="w-6 h-6 text-primary" />,
    items: [
      'Stellar column and beam for superior strength',
      'Solid belt concrete for a durable foundation',
      'High-quality cement brick work using UltraTech cement',
    ] 
  },
  { 
    category: 'Finishing & Furnishing',
    icon: <PaintRoller className="w-6 h-6 text-primary" />,
    items: [
      'Full wood furnishing for all doors and windows',
      'Smooth gypsum plastering for walls',
      'Premium interior and exterior painting',
    ] 
  },
  { 
    category: 'Utilities',
    icon: <Wrench className="w-6 h-6 text-primary" />,
    items: [
      'Complete plumbing and electrical work',
      'All necessary fixtures for interior and exterior',
      'Ready-to-use utility connections',
    ] 
  },
];

export default function PackageDetailPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">The 22 Lakhs Home Package</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            An all-inclusive package designed for modern living on a compact plot. Perfect for those seeking a stylish, high-quality home without the hassle.
          </p>
          
          <Card className="mt-8 overflow-hidden shadow-lg">
            <Image
              src="/image/assets/images/package-home.jpg"
              alt="22 Lakhs Package Home Design"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
              data-ai-hint="modern house exterior"
            />
          </Card>

          <div className="mt-12">
            <h2 className="text-3xl font-bold tracking-tight font-headline">What's Included?</h2>
            <p className="mt-2 text-muted-foreground">
              We handle everything from foundation to handover, ensuring a seamless and worry-free experience.
            </p>
            
            <div className="mt-8 grid md:grid-cols-1 gap-8">
              {features.map((featureSet) => (
                <Card key={featureSet.category} className="bg-card">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {featureSet.icon}
                    </div>
                    <CardTitle className="font-headline">{featureSet.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {featureSet.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mt-8 overflow-hidden shadow-lg">
            <Image
              src="/image/assets/images/planone1.png"
              alt="22 Lakhs Package Home Design"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
              data-ai-hint="modern house exterior"
            />
          </Card>

          
          {/* <Card className="mt-8 overflow-hidden shadow-lg">
            <Image
              src="/image/assets/images/planone2.png"
              alt="22 Lakhs Package Home Design"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
              data-ai-hint="modern house exterior"
            />
          </Card> */}
          
          <div className="mt-16 text-center bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Ready to Build Your Dream Home?</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              This unbeatable package is perfect for plots of 2 cents or more. Contact us today to get started.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/contact">
                Contact Us Today
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
