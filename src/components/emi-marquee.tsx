'use client';

import React from 'react';

export function EmiMarquee() {
  return (
    <div className="w-full bg-yellow-400 py-1 overflow-hidden border-b border-yellow-500 relative z-[60]">
      <div className="flex whitespace-nowrap animate-marquee">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <span key={i} className="mx-4 text-[10px] font-bold uppercase tracking-widest text-black">
            🔥 New Zero Interest EMI Scheme: Build with 60% Down Payment & 40% in 30 Months! 🏠 Zero Interest // Zero Hidden Costs // Instant Approval 🚀
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}