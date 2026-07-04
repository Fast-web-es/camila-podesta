'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import ProjectItem from './ProjectItem';

interface CarouselProps {
  projects: Project[];
}

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollRef}
        className="flex items-center gap-6 md:gap-16 overflow-x-auto snap-x scroll-smooth h-[190px] sm:h-[240px] md:h-[340px] -mx-5 md:mx-0 px-5 md:px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      {/* Scroll controls */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-ink opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-ink opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default Carousel;
