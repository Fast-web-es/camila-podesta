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
      {/* The source video is 16:9 with the star centered in lots of empty
          transparent space, so we crop it in a square box with object-cover
          (+ scale) to make the star read big and centred on every screen. */}
      <section className="flex items-center justify-center min-h-[48vh] md:min-h-[72vh] px-6">
        <div className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[440px] md:h-[440px] overflow-hidden flex items-center justify-center">
          <video
            className="w-full h-full object-cover scale-[1.45]"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero/estrella.gif"
          >
            <source src="/hero/estrella.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ---------------- SECTIONS ---------------- */}
      <div className="space-y-16 md:space-y-24 pb-8">
        {sections.map((section) => {
          const projects = getProjectsByCategory(section.category);
          return (
            <section key={section.category} id={section.category.toLowerCase()}>
              {/* Header row: title · intro · distributed tags, with a rule below */}
              <div className="px-5 md:px-10 border-b border-ink pb-3 mb-8 md:mb-10">
                <div className="flex items-baseline gap-6 md:gap-10">
                  <h2 className="font-sans font-bold text-2xl md:text-4xl tracking-tight uppercase shrink-0">
                    {section.label}
                  </h2>
                  <p className="hidden sm:block font-sans text-[11px] md:text-xs text-ink leading-snug max-w-[16rem] shrink-0">
                    {section.intro}
                  </p>
                  <div className="hidden md:flex flex-1 justify-around items-baseline">
                    {section.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[11px] md:text-xs uppercase tracking-[0.12em] text-ink"
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
