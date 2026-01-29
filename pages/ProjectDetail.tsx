import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectById, getProjectsByCategory } from '../data';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <SEO title="Project Not Found" />
        <h2 className="font-serif text-3xl mb-4">Project not found</h2>
        <Link to="/" className="text-sm uppercase tracking-widest border-b border-black pb-1">Back to Home</Link>
      </div>
    );
  }

  const categoryProjects = getProjectsByCategory(project.category as 'Commercial' | 'Personal');
  const currentIndex = categoryProjects.findIndex(p => p.id === project.id);
  const prevProject = categoryProjects[currentIndex - 1];
  const nextProject = categoryProjects[currentIndex + 1];

  const baseCategoryUrl = project.category === 'Commercial' ? '/commercial-work' : '/personal';
  const backLink = project.category === 'Commercial' ? '/' : '/personal';
  const backLabel = project.category === 'Commercial' ? 'Back to Commercial' : 'Back to Personal';

  const renderDescription = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return (
          <a 
            key={index} 
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-gray-400 hover:text-ink hover:decoration-ink transition-all"
          >
            {match[1]}
          </a>
        );
      }
      return part;
    });
  };

  const metaDescription = project.description.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').substring(0, 160) + "...";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-6"
    >
      <SEO 
        title={project.title} 
        description={metaDescription}
        image={project.thumbnail}
        type="article"
      />

      <div className="flex flex-col lg:flex-row lg:gap-24">
        
        {/* Sticky Sidebar (Info) */}
        <div className="lg:w-1/3 mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-32">
            <Link to={backLink} className="inline-block mb-8 text-[10px] uppercase tracking-widest text-gray-400 hover:text-ink transition-colors">
              &larr; {backLabel}
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-ink leading-tight">
              {project.title}
            </h1>
            
            <div className="border-t border-black w-12 mb-8"></div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 font-sans">
              <div>
                 <span className="block text-gray-300 font-normal mb-1">Category</span>
                 {project.category}
              </div>
              <div>
                 <span className="block text-gray-300 font-normal mb-1">Year</span>
                 {project.year}
              </div>
              {project.client && (
                <div className="col-span-2">
                   <span className="block text-gray-300 font-normal mb-1">Client</span>
                   {project.client}
                </div>
              )}
            </div>

            <p className="text-base md:text-lg font-light text-gray-600 leading-relaxed font-sans whitespace-pre-line">
              {renderDescription(project.description)}
            </p>
          </div>
        </div>

        {/* Scrollable Media Feed */}
        <div className="lg:w-2/3 flex flex-col space-y-12 md:space-y-24">
          {project.video && (
             <div className="w-full aspect-video bg-black">
                <iframe 
                  className="w-full h-full"
                  src={project.video} 
                  title="Project Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
             </div>
          )}
          
          {project.images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }} // Load when 10% away from view
              transition={{ duration: 0.8 }}
              className={index % 2 !== 0 ? "lg:w-3/4 lg:self-end" : "w-full"} 
            >
              <OptimizedImage 
                src={img} 
                alt={`${project.title} view ${index + 1}`} 
                className="w-full h-auto shadow-sm"
              />
              <p className="mt-2 text-[10px] text-gray-400 uppercase tracking-widest text-right">Figure {index + 1}</p>
            </motion.div>
          ))}

           {/* Navigation Footer */}
          <div className="border-t border-gray-300 pt-16 mt-16 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-start md:items-center">
            {prevProject ? (
              <Link to={`${baseCategoryUrl}/${prevProject.id}`} className="group w-full md:w-auto">
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Previous Project</span>
                <div className="flex items-center">
                   <ArrowLeft className="mr-4 w-6 h-6 text-ink group-hover:-translate-x-2 transition-transform duration-300" />
                   <span className="font-serif text-2xl md:text-3xl group-hover:italic transition-all">{prevProject.title}</span>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link to={`${baseCategoryUrl}/${nextProject.id}`} className="group w-full md:w-auto text-left md:text-right">
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Next Project</span>
                <div className="flex items-center md:justify-end">
                   <span className="font-serif text-2xl md:text-3xl group-hover:italic transition-all">{nextProject.title}</span>
                   <ArrowRight className="ml-4 w-6 h-6 text-ink group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectDetail;