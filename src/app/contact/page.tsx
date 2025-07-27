"use client";

import { ContactForm } from '@/components/contact-form';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage({ params }: { params: { slug: string } }) {
  const { ref: contactRef, inView: contactInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="bg-background">
      <div ref={contactRef} className={cn("container mx-auto py-16 md:py-24 lg:px-5 animate-raise-up", { 'in-view': contactInView })}>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">
            Ready to start building your dream home? Get in touch with us today.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8" style={{ transitionDelay: '0ms' }}>
            <h2 className="text-2xl font-bold font-headline">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Office</h3>
                  <p className="text-muted-foreground">123 Modern Avenue, Buildtown, 54321</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">hello@beonce.dev</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">+91 123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3" style={{ transitionDelay: '150ms' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
