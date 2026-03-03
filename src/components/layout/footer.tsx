import { Logo } from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container px-5 py-12 mx-auto">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground font-headline italic">A new era of living spaces</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              BeOnce is Kerala's leading construction firm, specializing in modern boxy homes and turnkey villa projects.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
            <div>
              <h4 className="font-headline font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/best-construction-company-kerala" className="text-sm text-muted-foreground hover:text-primary">Best Construction Company in Kerala</Link></li>
                <li><Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">Our Gallery</Link></li>
                <li><Link href="/budget-planner" className="text-sm text-muted-foreground hover:text-primary">Budget Planner</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              </ul>
              
              <h4 className="font-headline font-medium mb-4 mt-8">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li> 
                <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="https://share.google/Woiw2fSGy73TuVFXS" target="_blank" className="text-sm text-muted-foreground hover:text-primary">Google Business</Link></li>
                <li><Link href="https://www.instagram.com/be.once_/" target="_blank" className="text-sm text-muted-foreground hover:text-primary">Instagram</Link></li>
                <li><Link href="https://www.facebook.com/beonceconstruction" target="_blank" className="text-sm text-muted-foreground hover:text-primary">Facebook</Link></li>
              </ul>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-semibold">Contact: 8137844372</p>
                <p className="text-xs text-muted-foreground">hai.beonce@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BeOnce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
