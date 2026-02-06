import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-20 md:pt-32 max-w-5xl mx-auto min-h-[50vh] flex flex-col justify-center"
    >
      <div>
        <h2 className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-6">
          Get in touch
        </h2>
        <a 
          href="mailto:hello@marcos-morales.com" 
          className="text-4xl md:text-6xl lg:text-7xl font-serif hover:italic transition-all duration-300 break-words leading-none text-ink"
        >
          hello@marcos-morales.com
        </a>
        <a 
          href="https://instagram.com/marcosmoralesdg"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 text-xl font-serif italic text-gray-500 hover:text-ink transition-colors block w-max"
        >
           @marcosmoralesdg
        </a>
      </div>
    </motion.div>
  );
};

export default Contact;