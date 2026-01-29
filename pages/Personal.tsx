import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProjectsByCategory } from '../data';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

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
    // We update the motion values directly for performance
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
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
      <section className="relative">
         
         {/* --- DESKTOP VIEW: TEXT WALL & CURSOR REVEAL --- */}
         <div className="hidden lg:block relative z-10">
            {/* 
                Changes for "Lighter" feel:
                1. gap-x-12 gap-y-8: More physical space between items.
                2. leading-loose: Much more line height.
                3. max-w-7xl: Wider container to let text breathe.
            */}
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 leading-loose max-w-7xl mx-auto px-12 py-20">
              {projects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <Link 
                    to={`/personal/${project.id}`}
                    className="relative group inline-block"
                    onMouseEnter={() => setActiveProject(project)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    {/* 
                        Typography Changes:
                        1. Removed 'italic' to prevent layout shift.
                        2. Changed duration-500 to duration-300 for snappier feel.
                        3. Lowered default opacity to 40% so the active one (100%) pops more.
                    */}
                    <h2 className={`
                      text-5xl md:text-6xl xl:text-7xl font-display font-light text-ink transition-all duration-300 ease-out
                      ${activeProject?.id === project.id ? 'opacity-100 scale-105 z-20' : 'opacity-40 hover:opacity-100 blur-[0.5px] hover:blur-0'}
                    `}>
                      {project.title}
                    </h2>
                  </Link>
                  {/* The Divider: Lighter color and thinner font */}
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
         {/* This layer sits on top (z-20) but ignores pointer events so you can click the links underneath */}
         <motion.div 
            className="hidden lg:block fixed top-0 left-0 pointer-events-none z-30 overflow-hidden rounded-sm shadow-2xl"
            style={{ 
              x, 
              y,
              // Offset the image so the cursor is centered-ish or slightly top-left of the image
              translateX: '-50%', 
              translateY: '-50%',
              width: '320px', // Adjusted width for elegance
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
                  <img 
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