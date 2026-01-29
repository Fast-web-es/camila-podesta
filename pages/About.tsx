import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-6"
    >
      <div className="flex flex-col lg:flex-row lg:gap-24 items-start relative">
        
        {/* Left Column: Headline + Bio */}
        {/* We use 'sticky' here so if the right column is longer, this stays visible */}
        <div className="lg:w-5/12 lg:sticky lg:top-32 flex flex-col justify-between mb-16 lg:mb-0">
          <div>
            {/* Headline */}
            {/* Updated typography: Smaller size, looser leading, wider tracking for editorial feel */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light leading-relaxed tracking-wide text-ink max-w-xl">
              I'm Marcos Morales, a graphic designer and artist based in Norway. I have an insatiable curiosity, which drives me to explore new places and connect with other creatives for exciting collaborations.
            </h1>

            {/* Bio & Email */}
            <div className="mt-12 lg:mt-24 max-w-md">
              <p className="text-lg leading-relaxed mb-8 text-gray-800">
                For the last years I have been working mostly as a freelancer for studios and clients from different parts of the world.
              </p>
              
              <div className="space-y-2">
                <p className="text-lg leading-relaxed text-gray-800">
                  If you want to contact me for work, collaborations or just say hello:
                </p>
                <a 
                  href="mailto:hello@marcos-morales.com" 
                  className="block text-lg text-ink underline underline-offset-4 decoration-1 decoration-gray-400 hover:decoration-ink transition-all"
                >
                    hello@marcos-morales.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image + Data Lists */}
        {/* This column will scroll naturally. The padding bottom ensures it doesn't hit the footer abruptly. */}
        <div className="lg:w-7/12 w-full flex flex-col">
           
           {/* Image with specific aspect ratio 2500x1454 */}
           <div className="mb-16 w-full relative">
             <div className="aspect-[2500/1454] w-full overflow-hidden bg-gray-200">
               <img 
                 src="/about/about.jpg" 
                 alt="Marcos Morales Portrait" 
                 className="w-full h-full object-cover grayscale block"
               />
             </div>
             <p className="mt-3 text-[10px] text-gray-400 uppercase tracking-widest text-right">
                Marcos Morales Portrait
             </p>
           </div>

           {/* The Lists */}
           {/* Using a grid that breaks down nicely on mobile */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 font-serif text-ink">
              
              {/* Projects */}
              <div>
                 <h3 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-gray-500 font-sans border-b border-gray-300 pb-2">Projects</h3>
                 <ul className="space-y-3 text-base leading-snug">
                    <li>Citi Bank</li>
                    <li>National Geographic</li>
                    <li>History Channel</li>
                    <li>Power rangers</li>
                    <li>Citroën</li>
                    <li>Kipling</li>
                    <li className="italic text-gray-500">
                      <Link 
                        to="/" 
                        className="hover:text-ink transition-colors border-b border-transparent hover:border-gray-400 pb-0.5"
                      >
                        + More
                      </Link>
                    </li>
                 </ul>
              </div>

              {/* Workshops */}
              <div>
                 <h3 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-gray-500 font-sans border-b border-gray-300 pb-2">Workshops</h3>
                 <ul className="space-y-3 text-base leading-snug">
                    <li>Oslo, Norway</li>
                    <li>Berlin, Germany</li>
                    <li>Barcelona, Spain</li>
                    <li>Wroclaw, Poland</li>
                    <li>Buenos Aires, Argentina</li>
                 </ul>
              </div>

              {/* Books */}
              <div>
                 <h3 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-gray-500 font-sans border-b border-gray-300 pb-2">Books</h3>
                 <ul className="space-y-3 text-base leading-snug">
                    <li>Collage makers <br/><span className="text-xs text-gray-400 font-sans italic">Monsa</span></li>
                    <li>Mix & Match <br/><span className="text-xs text-gray-400 font-sans italic">Sandu</span></li>
                    <li>Collage: Impossible <br/><span className="text-xs text-gray-400 font-sans italic">Sendpoints</span></li>
                    <li>Linking Layers <br/><span className="text-xs text-gray-400 font-sans italic">Self published</span></li>
                 </ul>
              </div>

           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;