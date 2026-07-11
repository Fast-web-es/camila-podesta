'use client';

import React from 'react';
import Link from 'next/link';
import ScrollToTop from './ScrollToTop';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <ScrollToTop />

      <header className="fixed top-0 w-full z-50 bg-paper">
        <Link
          href="/"
          className="max-w-[1920px] mx-auto px-5 md:px-10 py-4 md:py-5 flex justify-between items-start gap-4 group"
        >
          <span className="text-xs md:text-base font-sans font-medium leading-tight text-ink max-w-[45%] group-hover:opacity-60 transition-opacity">
            Industrial &amp; 3D design
            <br />
            based in Barcelona
          </span>
          <span className="font-sans font-bold text-lg md:text-2xl tracking-tight uppercase leading-none whitespace-nowrap group-hover:opacity-60 transition-opacity">
            Camila Podestá
          </span>
        </Link>
      </header>

      <main className="flex-grow pt-20 md:pt-24 w-full">{children}</main>

      <footer className="py-5 px-5 md:px-10 mt-20 border-t border-ink">
        <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
            <span className="font-sans font-bold text-sm md:text-base tracking-tight uppercase">
              Camila Podestá
            </span>
            <span className="font-sans text-sm md:text-base text-gray-500">
              ©Copyright 2026. All Rights Reserved
            </span>
          </div>
          <a
            href="https://www.fast-web.es"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm md:text-base text-gray-500 hover:text-ink transition-colors whitespace-nowrap"
          >
            Site by Fast Web
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
