
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ArrowRight, Construction, DraftingCompass, Handshake, HomeIcon, Leaf, Paintbrush, Sparkles, CookingPot, ClipboardEdit, CheckCircle2, BadgeCheck, Camera, Star, Gem, Award, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { OfferPopup } from "@/components/offer-popup";

export default function HomePage() {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation<HTMLElement>();
  const { ref: aboutRef, inView: aboutInView } = useScrollAnimation<HTMLElement>();
  const { ref: experienceRef, inView: experienceInView } = useScrollAnimation<HTMLElement>();
  const { ref: servicesRef, inView: servicesInView } = useScrollAnimation<HTMLElement>();
  const { ref: packagesRef, inView: packagesInView } = useScrollAnimation<HTMLElement>();
  const { ref: financingRef, inView: financingInView } = useScrollAnimation<HTMLElement>();

  const services = [
    {
      icon: <DraftingCompass className="w-8 h-8 text-primary" />,
      title: "Discussion",
      description: "Meticulous planning to lay the perfect foundation for your dream home, ensuring every detail aligns with your vision."
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-primary" />,
      title: "Design",
      description: "Innovative and contemporary design solutions that blend aesthetics with functionality for a modern living experience."
    },
    {
      icon: <Construction className="w-8 h-8 text-primary" />,
      title: "Develop",
      description: "High-quality construction and development, bringing your boxy, budget-friendly modern home to life with precision."
    }
  ];

  const packageFeatures = [
    { icon: <HomeIcon className="w-6 h-6 text-primary" />, text: "900-1000 sqft Home" },
    { icon: <Sparkles className="w-6 h-6 text-primary" />, text: "Premium Finish" },
    { icon: <Leaf className="w-6 h-6 text-primary" />, text: "Courtyard Space" },
    { icon: <CookingPot className="w-6 h-6 text-primary" />, text: "Modern Kitchen" },
  ];

  const customHomeFeatures = [
      { icon: <ClipboardEdit className="w-6 h-6 text-primary" />, text: "Customizable Design" },
      { icon: <BadgeCheck className="w-6 h-6 text-primary" />, text: "Plan Approval" },
      { icon: <CheckCircle2 className="w-6 h-6 text-primary" />, text: "3D View" },
      { icon: <Gem className="w-6 h-6 text-primary" />, text: "Full Interior Work with Premium Level" },
      { icon: <Camera className="w-6 h-6 text-primary" />, text: "Free CCTV" },
      { icon: <Star className="w-6 h-6 text-primary" />, text: "5-Year Free Service Support" },
      { icon: <CheckCircle2 className="w-6 h-6 text-primary" />, text: "High-Quality Materials" }
  ];
  
  const experienceStats = [
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      value: "12+",
      label: "Years of Experience"
    },
    {
      icon: <Briefcase className="w-10 h-10 text-primary" />,
      value: "300+",
      label: "Projects Completed"
    }
  ];

  return (
    <div className="flex flex-col">
       <OfferPopup />
       <section ref={heroRef} className={cn("relative h-screen w-full overflow-hidden animate-raise-up", { 'in-view': heroInView })}>
        <video
          src="/video/interorwalking.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="container mx-auto lg:px-5 relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
            A new era of living spaces
          </h1>
          <p className="max-w-2xl mt-6 text-lg text-neutral-200">
            BeOnce crafts contemporary, boxy homes that are stylish, functional, and budget-friendly. Your modern dream home starts here.
          </p>
          <div className="mt-10 flex gap-4">
            <Button size="lg" asChild>
              <Link href="/gallery">View Our Work</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section ref={aboutRef} id="about" className={cn("py-16 md:py-24 animate-raise-up", { 'in-view': aboutInView })}>
        <div className="container mx-auto px-5 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Welcome to BeOnce</h2>
                <p className="text-muted-foreground">
                    At the forefront of a new generation of home building, BeOnce is dedicated to creating contemporary, "boxy type" homes that fit your lifestyle and your budget. We believe in minimalist aesthetics, functional design, and delivering exceptional value without compromising on quality. We're not just building houses; we're creating the future of living spaces.
                </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                 <Image
                    src="/image/assets/images/home9.jpg"
                    alt="Interior of a modern home"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    data-ai-hint="minimalist interior"
                 />
            </div>
        </div>
      </section>

      <section ref={experienceRef} id="experience" className={cn("py-16 md:py-24 bg-card animate-raise-up", { 'in-view': experienceInView })}>
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
            {experienceStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold font-headline text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servicesRef} id="services" className={cn("py-16 md:py-24 bg-background animate-raise-up", { 'in-view': servicesInView })}>
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-muted-foreground">
              From the initial sketch to the final brick, we offer a complete suite of services to build your perfect home.
            </p>
          </div>
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow bg-card" style={{ transitionDelay: `${i * 150}ms` }}>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section ref={packagesRef} id="packages" className={cn("py-16 md:py-24 animate-raise-up", { 'in-view': packagesInView })}>
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Our Home Packages</h2>
            <p className="mt-4 text-muted-foreground">
              Choose between our value-packed package home or a fully customized build.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 mt-12 lg:justify-center">
            <Card className="flex flex-col  border-primary border-2 shadow-xl" style={{ transitionDelay: '0ms' }}>
              <CardHeader>
                <CardTitle className="font-headline">The 22 Lakhs Package</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-4xl font-bold font-headline">₹22,00,000</p>
                <p className="text-muted-foreground">An unbeatable package for a premium 900-1000 sqft <br /> contemporary home.</p>
                <ul className="space-y-3 pt-4">
                  {packageFeatures.map(feat => (
                    <li key={feat.text} className="flex items-center gap-3">
                      {feat.icon}
                      <span className="text-sm">{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col  bg-card" style={{ transitionDelay: '150ms' }}>
              <CardHeader>
                <CardTitle className="font-headline">Custom Homes</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-4xl font-bold font-headline">₹2400 <span className="text-lg font-normal text-muted-foreground">/ sqft</span></p>
                <p className="text-muted-foreground">Your vision, your design. We build your dream home to <br/> your exact specifications.</p>
                 <ul className="space-y-3 pt-4">
                    {customHomeFeatures.map(feat => (
                      <li key={feat.text} className="flex items-center gap-3">
                        {feat.icon}
                        <span className="text-sm">{feat.text}</span>
                      </li>
                    ))}
                 </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section ref={financingRef} id="financing" className={cn("py-16 md:py-24 bg-card animate-raise-up", { 'in-view': financingInView })}>
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 p-3">
                <Handshake className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Flexible Financing Solutions</h2>
              <p className="text-muted-foreground">
                Don't let financial hurdles stop you. Our dedicated team specializes in providing loan assistance for individuals with CIBIL issues or non-traditional income proof. We're here to help you secure the financing for your BeOnce home.
              </p>
              <Button asChild>
                <Link href="/contact">Learn More <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/image/assets/images/homloasn.png"
                alt="Couple reviewing documents"
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="happy couple finance"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
