import { Logo } from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container px-5 py-12 mx-auto ">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground font-headline">A new era of living spaces</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-2 lg:grid-cols-3">
            <div>
              <h4 className="font-headline font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">Gallery</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li> 
                <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="https://www.instagram.com/be.once_/" className="text-sm text-muted-foreground hover:text-primary">Facebook</Link></li>
                <li><Link href="https://www.instagram.com/be.once_/" className="text-sm text-muted-foreground hover:text-primary">Instagram</Link></li>
                {/* <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">LinkedIn</Link></li> */}
              </ul>
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
