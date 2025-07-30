import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from '@/components/whatsapp-button';
import Script from 'next/script'; // ← Import Script

export const metadata: Metadata = {
  title: 'BeOnce',
  description: 'A new era of living spaces',
  openGraph: {
    title: 'BeOnce',
    description: 'A new era of living spaces',
    url: 'https://beonce.co.in/',
    siteName: 'BeOnce',
    images: [
      {
        url: 'https://beonce.co.in/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BeOnce Preview Image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeOnce',
    description: 'A new era of living spaces',
    images: ['https://beonce.co.in/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {/* Google Analytics Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JEBF1WK39"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0JEBF1WK39');
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}
