
'use client';

import { useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}

export function Counter({ target, suffix = '', duration = 2000, trigger }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}
