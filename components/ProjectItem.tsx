import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';

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
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
      className="group cursor-pointer mb-8 md:mb-12 break-inside-avoid"
    >
      <Link to={`/${basePath}/${project.id}`} className="block">
        <div className="overflow-hidden mb-3 relative w-full">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-auto object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-paper/0 group-hover:bg-paper/10 transition-colors duration-500 mix-blend-overlay" />
        </div>
        
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-baseline pt-2">
             <h3 className="text-lg md:text-xl font-serif text-ink group-hover:italic transition-all duration-300 leading-tight">
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