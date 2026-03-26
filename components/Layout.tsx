'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Instagram } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import ScrollToTop from './ScrollToTop';
import { useCookieConsent } from './CookieConsent';
import GoogleAnalytics from './GoogleAnalytics';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showBanner } = useCookieConsent();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) =>
    `text-xs uppercase tracking-[0.25em] hover:text-gray-500 transition-colors duration-300 font-sans ${
      isActive(path) ? 'border-b border-ink pb-1' : ''
    }`;

  const mobileNavLinkClass = (path: string) =>
    `text-2xl font-serif mb-6 hover:text-gray-500 transition-colors ${
      isActive(path) ? 'italic' : ''
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink transition-colors duration-500">
      <ScrollToTop />
      <GoogleAnalytics />
      
      <header className="fixed top-0 w-full z-50 bg-paper/90 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
          <Link href="/" className="z-50 group">
            <h1 className="font-serif text-2xl md:text-3xl leading-none">
              Marcos Morales
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-16">
            <Link href="/" className={navLinkClass('/')}>Commercial Work</Link>
            <Link href="/personal" className={navLinkClass('/personal')}>Personal</Link>
            <Link href="/about" className={navLinkClass('/about')}>About</Link>
            <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
          </nav>

          <button 
            className="md:hidden z-50 p-2 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
          </button>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-paper z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass('/')}>Commercial Work</Link>
          <Link href="/personal" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass('/personal')}>Personal</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass('/about')}>About</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass('/contact')}>Contact</Link>
        </nav>
      </div>

      <main className="flex-grow pt-32 pb-32 md:pb-40 px-6 md:px-12 max-w-[1920px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={pathname} className="h-full">
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-gray-300 mt-auto">
        <div className="max-w-[1920px] mx-auto flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-8 md:gap-0">
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com/marcosmoralesdg" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-gray-500 transition-colors" aria-label="Instagram">
              <Instagram size={24} strokeWidth={1.5} />
            </a>
            <button 
              onClick={showBanner}
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-ink transition-colors"
            >
              Cookies
            </button>
          </div>
          <a 
            href="mailto:hello@marcos-morales.com" 
            className="font-serif text-xl md:text-2xl text-ink border-b border-ink pb-1 hover:italic transition-all duration-300"
          >
            hello@marcos-morales.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
