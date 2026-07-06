'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '../types';

interface ProjectItemProps {
  project: Project;
}

// Carousel card: the animated separator GIF (which already contains its own
// text — so NO label underneath) shown next to a still image of the project.
// The whole pair links to the project's internal page.
const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const cover = project.images[0];

  return (
    <Link
      href={`/work/${project.id}`}
      className="group shrink-0 h-full flex items-center gap-6 md:gap-10 snap-start"
    >
      {/* Separator GIF teaser */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.sep}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="h-[80%] md:h-[82%] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Still image of the project — standardized vertical card */}
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full aspect-[2/3] object-cover transition-opacity duration-500 group-hover:opacity-90"
        />
      )}
    </Link>
  );
};

export default ProjectItem;
