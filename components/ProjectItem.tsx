'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Project } from '../types';
import OptimizedImage from './OptimizedImage';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  // Determine base path based on category
  const basePath = project.category === 'Commercial' ? 'commercial-work' : 'personal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }} // Load slightly before coming into view
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
      className="group cursor-pointer w-full"
    >
      <Link href={`/${basePath}/${project.id}`} className="block h-full flex flex-col">
        <div className="mb-4 relative w-full">
           {/* 
              - aspect-square: Forces the 1:1 ratio.
              - object-cover is handled inside OptimizedImage, ensuring the image fills the square.
           */}
          <OptimizedImage
            src={project.thumbnail}
            alt={project.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="w-full aspect-square transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-paper/0 group-hover:bg-paper/10 transition-colors duration-500 mix-blend-overlay pointer-events-none" />
        </div>
        
        <div className="flex flex-col space-y-1 mt-auto">
          <div className="flex justify-between items-baseline pt-1">
             <h3 className="text-lg md:text-xl font-serif text-ink group-hover:italic transition-all duration-300 leading-tight max-w-[85%]">
              {project.title}
            </h3>
             <span className="hidden md:block text-[10px] uppercase tracking-widest text-gray-400 ml-4">
               {project.year}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
            {project.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectItem;
