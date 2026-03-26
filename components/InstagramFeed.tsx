'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

// Placeholder data - You should replace these 'src' with your actual best Instagram shots
// You can put these images in your /public/images/instagram/ folder
const instaPosts = [
  { id: 1, src: 'https://images.unsplash.com/photo-1548293779-c5c2a13898f9?auto=format&fit=crop&q=80&w=800', url: 'https://instagram.com/marcosmoralesdg' },
  { id: 2, src: 'https://images.unsplash.com/photo-1598006322896-121544a49c93?auto=format&fit=crop&q=80&w=800', url: 'https://instagram.com/marcosmoralesdg' },
  { id: 3, src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800', url: 'https://instagram.com/marcosmoralesdg' },
  { id: 4, src: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=800', url: 'https://instagram.com/marcosmoralesdg' }
];

const InstagramFeed: React.FC = () => {
  return (
    <section className="mt-32 pt-16 border-t border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-2">
            Follow along
          </h2>
          <a 
            href="https://instagram.com/marcosmoralesdg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-serif text-3xl md:text-4xl text-ink hover:italic transition-all duration-300 flex items-center gap-3"
          >
            @marcosmoralesdg
          </a>
        </div>
        
        <a 
          href="https://instagram.com/marcosmoralesdg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-ink hover:text-gray-500 transition-colors mt-6 md:mt-0"
        >
          View Profile <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instaPosts.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative block aspect-square overflow-hidden bg-gray-200"
          >
            <OptimizedImage
              src={post.src}
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Instagram className="text-white drop-shadow-md" size={32} strokeWidth={1.5} />
               </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      {/* Mobile only link */}
      <div className="mt-8 text-center md:hidden">
         <a 
          href="https://instagram.com/marcosmoralesdg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-ink border-b border-ink pb-1"
        >
          View Profile
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;