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
            Masonry Layout:
            - Changed gap from gap-12/24 to gap-6 (mobile) and gap-8 (desktop)
            - This creates the "narrow streets" effect requested.
            - Added xl:columns-3 for better density on very wide screens.
         */}
         <div className="block md:columns-2 xl:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
           {commercialProjects.map((project) => (
             <ProjectItem key={project.id} project={project} />
           ))}
         </div>
      </section>
    </motion.div>
  );
};

export default Home;