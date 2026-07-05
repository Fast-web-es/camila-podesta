'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectById, getProjectsByCategory } from '../data';
import OptimizedImage from '../components/OptimizedImage';

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl mb-4">Project not found</h2>
        <Link href="/" className="text-xs uppercase tracking-widest border-b border-ink pb-1">
          Back to Home
        </Link>
      </div>
    );
  }

  const categoryProjects = getProjectsByCategory(project.category);
  const currentIndex = categoryProjects.findIndex((p) => p.id === project.id);
  const prevProject = categoryProjects[currentIndex - 1];
  const nextProject = categoryProjects[currentIndex + 1];

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

  const hasMobile = project.mobileImages && project.mobileImages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-[1920px] mx-auto px-5 md:px-10 pt-4"
    >
      <div className="flex flex-col lg:flex-row lg:gap-24">
        {/* ---------------- Sticky info sidebar ---------------- */}
        <div className="lg:w-1/3 mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-28">
            <Link
              href="/"
              className="inline-block mb-8 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-ink transition-colors"
            >
              &larr; Back
            </Link>

            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
              {project.categoryLabel}
            </p>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6 text-ink leading-tight break-words">
              {project.title}
            </h1>

            <div className="border-t border-ink w-12 mb-6" />

            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-sans uppercase tracking-[0.18em] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.tech && (
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-6">
                {project.tech}
              </p>
            )}

            <p className="text-base md:text-lg font-normal text-gray-600 leading-relaxed font-sans whitespace-pre-line text-pretty">
              {renderDescription(project.description)}
            </p>
          </div>
        </div>

        {/* ---------------- Scrollable media feed ---------------- */}
        <div className="lg:w-2/3 flex flex-col space-y-8 md:space-y-16">
          {/* Videos first (real .mp4 per project) */}
          {project.videos?.map((src, index) => (
            <video
              key={`v-${index}`}
              className="w-full h-auto bg-black"
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}

          {/* Desktop images */}
          {project.images.map((img, index) => (
            <motion.div
              key={`d-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7 }}
              className={hasMobile ? 'hidden md:block' : 'block'}
            >
              <OptimizedImage
                src={img}
                alt={`${project.title} — ${index + 1}`}
                className="w-full h-auto"
              />
            </motion.div>
          ))}

          {/* Mobile images (Movil/ versions) */}
          {hasMobile &&
            project.mobileImages!.map((img, index) => (
              <div key={`m-${index}`} className="block md:hidden">
                <OptimizedImage
                  src={img}
                  alt={`${project.title} — ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}

          {project.images.length === 0 && !project.videos?.length && (
            <p className="font-sans text-sm text-gray-400 italic py-12">
              Media coming soon.
            </p>
          )}

          {/* ---------------- Prev / Next ---------------- */}
          <div className="border-t border-gray-200 pt-12 mt-8 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-start md:items-center">
            {prevProject ? (
              <Link href={`/work/${prevProject.id}`} className="group w-full md:w-auto">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Previous
                </span>
                <div className="flex items-center">
                  <ArrowLeft className="mr-3 w-5 h-5 text-ink group-hover:-translate-x-1.5 transition-transform duration-300" />
                  <span className="font-serif text-xl md:text-2xl group-hover:italic transition-all">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/work/${nextProject.id}`}
                className="group w-full md:w-auto text-left md:text-right"
              >
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Next
                </span>
                <div className="flex items-center md:justify-end">
                  <span className="font-serif text-xl md:text-2xl group-hover:italic transition-all">
                    {nextProject.title}
                  </span>
                  <ArrowRight className="ml-3 w-5 h-5 text-ink group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
