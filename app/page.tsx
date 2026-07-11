'use client';

import React from 'react';
import { motion } from 'motion/react';
import Carousel from '@/components/Carousel';
import { sections, getProjectsByCategory } from '@/data';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ---------------- HERO ---------------- */}
      {/* The star is a "shooting star" that travels diagonally across the whole
          16:9 white frame, so we show the full frame at full viewport width
          (edge to edge) and let it fly across on every screen. */}
      <section className="w-full">
        <video
          className="block w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero/estrella-poster.jpg"
        >
          <source src="/hero/estrella.mp4?v=3" type="video/mp4" />
        </video>
      </section>

      {/* ---------------- SECTIONS ---------------- */}
      <div className="max-w-[1920px] mx-auto space-y-16 md:space-y-24 pb-8">
        {sections.map((section) => {
          const projects = getProjectsByCategory(section.category);
          return (
            <section key={section.category} id={section.category.toLowerCase()}>
              {/* Header: single distributed row on desktop (title · intro ·
                  spread tags); stacked left-aligned on smaller screens.
                  Divider rule on TOP. Dense, pure-black, tight tracking. */}
              <div className="px-5 md:px-10 border-t border-ink pt-7 md:pt-9 mb-9 md:mb-12">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:gap-10">
                  <h2 className="font-sans font-bold text-3xl md:text-5xl leading-none tracking-tighter uppercase text-balance text-ink xl:shrink-0">
                    {section.label}
                  </h2>
                  <p className="font-sans font-medium text-xs md:text-sm text-ink leading-tight text-pretty xl:max-w-[18rem] xl:shrink-0">
                    {section.intro}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 xl:flex-1 xl:justify-around xl:items-start">
                    {section.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans font-semibold text-[11px] md:text-xs uppercase tracking-tight text-ink whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Horizontal carousel */}
              <div className="px-5 md:px-10">
                <Carousel projects={projects} />
              </div>
            </section>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Home;
