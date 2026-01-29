import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-10 max-w-5xl mx-auto"
    >
      <SEO 
        title="Contact" 
        description="Get in touch with Marcos Morales for design projects, collaborations, or inquiries." 
      />
      <div className="mb-20">
        <h2 className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-6">
          Get in touch
        </h2>
        <a 
          href="mailto:hello@marcos-morales.com" 
          className="text-4xl md:text-6xl lg:text-7xl font-serif hover:italic transition-all duration-300 break-words leading-none"
        >
          hello@marcos-morales.com
        </a>
        <p className="mt-8 text-xl font-serif italic text-gray-500">
           @marcosmoralesdg
        </p>
      </div>

      <div className="border-t border-gray-300 pt-16">
        <p className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-12">
          Or send a message directly
        </p>
        
        <form className="space-y-12 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-2 text-gray-500">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg"
              />
            </div>
            <div className="group">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-2 text-gray-500">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg"
              />
            </div>
          </div>
          
          <div className="group">
              <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2 text-gray-500">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg resize-none"
              ></textarea>
          </div>

          <button 
            type="button" 
            className="bg-ink text-paper px-10 py-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-gray-700 transition-colors"
          >
            Submit Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;