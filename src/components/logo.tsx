import Image from 'next/image';
import Link from 'next/link';
// import logo from '../assets/images/logo.png';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="BeOnce Home">
      <Image
        src="/image/assets/images/logo.png"
        // F:\projects\freelance\beonce\.next\image\assets\images\logo.png
        alt="Logo"
        width={120}
        height={40}
      />
      <span className="text-xl font-semibold font-headline text-foreground">

      </span>
    </Link>
  );
}
