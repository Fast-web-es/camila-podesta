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
      <div className="space-y-16 md:space-y-24 pb-8">
        {sections.map((section) => {
          const projects = getProjectsByCategory(section.category);
          return (
            <section key={section.category} id={section.category.toLowerCase()}>
              {/* Header: left-aligned at all sizes.
                  Divider rule on TOP. text-balance/pretty avoid widows. */}
              <div className="px-5 md:px-10 border-t border-ink pt-7 md:pt-9 mb-9 md:mb-12 text-left">
                <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight uppercase text-balance">
                  {section.label}
                </h2>
                <p className="font-sans text-xs md:text-sm text-ink/70 mt-3 max-w-lg mx-0 leading-snug text-pretty">
                  {section.intro}
                </p>
                <div className="flex justify-start flex-wrap gap-x-6 gap-y-1 mt-4">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-ink/60"
                    >
                      {tag}
                    </span>
                  ))}
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
