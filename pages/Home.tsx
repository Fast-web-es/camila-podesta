import React from 'react';
import { motion } from 'framer-motion';
import ProjectItem from '../components/ProjectItem';
import { getProjectsByCategory } from '../data';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const commercialProjects = getProjectsByCategory('Commercial');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <SEO 
        title="Commercial Work" 
        description="Selected commercial graphic design, illustrations and art direction by Marcos Morales." 
      />
      <section className="mb-20">
         <div className="flex justify-between items-end mb-12 border-b border-gray-300 pb-4">
            <h2 className="text-sm font-sans uppercase tracking-widest text-gray-400">
              Selected Commercial Work
            </h2>
            <span className="text-xs font-serif italic text-gray-400">
              {commercialProjects.length} Projects
            </span>
         </div>
         
         {/* 
            Grid Layout:
            - Switched to CSS Grid for strict alignment.
            - uniform squares requires the parent to be a grid, not columns.
            - Added generous gap-y to separate the text of one row from the image of the next.
         */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
           {commercialProjects.map((project) => (
             <ProjectItem key={project.id} project={project} />
           ))}
         </div>
      </section>
    </motion.div>
  );
};

export default Home;