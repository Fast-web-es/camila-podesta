'use client';

import React from 'react';
import Link from 'next/link';
import ScrollToTop from './ScrollToTop';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <ScrollToTop />

      <header className="fixed top-0 w-full z-50 bg-paper">
        <div className="max-w-[1920px] mx-auto px-5 md:px-10 py-4 md:py-5 flex justify-between items-start gap-4">
          <span className="text-xs md:text-base font-sans font-medium leading-tight text-ink max-w-[45%]">
            Industrial &amp; 3D design
            <br />
            based in Barcelona
          </span>
          <Link
            href="/"
            className="font-sans font-bold text-lg md:text-2xl tracking-[0.06em] uppercase leading-none whitespace-nowrap hover:opacity-60 transition-opacity"
          >
            Camila Podestá
          </Link>
        </div>
      </header>

      <main className="flex-grow pt-20 md:pt-24 w-full">{children}</main>

      <footer className="py-5 px-5 md:px-10 mt-20 border-t border-ink">
        <div className="max-w-[1920px] mx-auto flex items-baseline gap-3">
          <span className="font-sans font-bold text-sm tracking-[0.06em] uppercase">
            Camila Podestá
          </span>
          <span className="text-[10px] text-gray-500">
            ©Copyright 2025. All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
