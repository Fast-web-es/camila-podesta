import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProjectsByCategory } from '../data';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

const Personal: React.FC = () => {
  const projects = getProjectsByCategory('Personal');
  
  // State for the active project being hovered
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  // Mouse position references for smooth animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the image following the cursor
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Optimization: Only update state if screen is wide (desktop)
    if (window.innerWidth >= 1024) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[70vh] flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      <SEO 
        title="Personal Projects" 
        description="Experimental, artistic, and personal graphic design works by Marcos Morales." 
      />
      <section className="relative">
         
         {/* --- DESKTOP VIEW: TEXT WALL & CURSOR REVEAL --- */}
         <div className="hidden lg:block relative z-20">
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 leading-loose max-w-7xl mx-auto px-12 py-20">
              {projects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <Link 
                    to={`/personal/${project.id}`}
                    className="relative group inline-block"
                    onMouseEnter={() => setActiveProject(project)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    <h2 className={`
                      text-5xl md:text-6xl xl:text-7xl font-display font-light text-ink transition-all duration-300 ease-out
                      ${activeProject?.id === project.id ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100 blur-[0.5px] hover:blur-0'}
                    `}>
                      {project.title}
                    </h2>
                  </Link>
                  {index < projects.length - 1 && (
                    <span className="text-3xl xl:text-5xl font-display font-light text-gray-300 select-none opacity-30">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
         </div>

         {/* --- DESKTOP: FLOATING IMAGE LAYER --- */}
         <motion.div 
            className="hidden lg:block fixed top-0 left-0 pointer-events-none z-10 overflow-hidden rounded-sm shadow-2xl"
            style={{ 
              x, 
              y,
              translateX: '-50%', 
              translateY: '-50%',
              width: '500px',
            }}
         >
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={activeProject.thumbnail} 
                    alt={activeProject.title}
                    className="w-full h-auto object-cover aspect-[4/3]" 
                    // No lazy loading needed here as it needs to be instant on hover
                  />
                </motion.div>
              )}
            </AnimatePresence>
         </motion.div>


         {/* --- MOBILE/TABLET VIEW: EDITORIAL STACK --- */}
         <div className="lg:hidden flex flex-col space-y-16 pb-20">
            {projects.map((project) => (
              <Link to={`/personal/${project.id}`} key={project.id} className="group block">
                <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                  <OptimizedImage
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                   <div className="absolute top-4 right-4 bg-paper/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={20} className="text-ink" />
                   </div>
                </div>
                <div className="flex items-baseline justify-between border-b border-gray-300 pb-4">
                  <h2 className="text-4xl font-display font-light text-ink transition-all">
                    {project.title}
                  </h2>
                  <span className="text-xs font-sans uppercase tracking-widest text-gray-500">
                    {project.year}
                  </span>
                </div>
              </Link>
            ))}
         </div>

      </section>
    </motion.div>
  );
};

export default Personal;