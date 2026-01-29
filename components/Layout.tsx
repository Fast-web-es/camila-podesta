import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated: Smaller font (text-xs), wider tracking (tracking-[0.2em]), larger gap in parent
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-[0.25em] hover:text-gray-500 transition-colors duration-300 font-sans ${
      isActive ? 'border-b border-ink pb-1' : ''
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-2xl font-serif mb-6 hover:text-gray-500 transition-colors ${
      isActive ? 'italic' : ''
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink transition-colors duration-500">
      <ScrollToTop />
      
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-paper/90 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
          <Link to="/" className="z-50 group">
            <h1 className="font-serif text-2xl md:text-3xl leading-none">
              Marcos Morales
            </h1>
          </Link>

          {/* Desktop Nav - Increased spacing between items */}
          <nav className="hidden md:flex items-center gap-16">
            <NavLink to="/" className={navLinkClass}>Commercial Work</NavLink>
            <NavLink to="/personal" className={navLinkClass}>Personal</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-paper z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Commercial Work</NavLink>
          <NavLink to="/personal" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Personal</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>About</NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Contact</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      {/* Increased padding-bottom from pb-20 to pb-32/40 to prevent footer overlap issues */}
      <main className="flex-grow pt-32 pb-32 md:pb-40 px-6 md:px-12 max-w-[1920px] mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-gray-300 mt-auto">
        <div className="max-w-[1920px] mx-auto flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-8 md:gap-0">
          
          {/* Social Icons (Left) - Only Instagram as requested */}
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-gray-500 transition-colors" aria-label="Instagram">
              <Instagram size={24} strokeWidth={1.5} />
            </a>
          </div>

          {/* Email (Right) */}
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