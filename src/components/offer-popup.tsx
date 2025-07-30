
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
export function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-5">
      <div className="relative max-w-md mx-auto bg-background rounded-lg shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 z-10 rounded-full bg-white/50 hover:bg-white/80"
          aria-label="Close offer popup"
        >
          <X className="h-5 w-5 text-gray-800" />
        </Button>
         <Link href="/packages/22-lakhs">
                     <Image
              src="/video/ffer-popup-min.jpg"
              alt="Special Offer: Premium Home for 22 Lakh"
              width={800}
              height={1200}
              className="w-full h-auto"
              loading="lazy"
            />
         </Link>


      </div>
    </div>
  );
}
