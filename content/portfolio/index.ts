import { projects } from '@/data';
import type { EditableProject, PortfolioSettings } from '@/types';

export const settings: PortfolioSettings = {
  name: 'Camila Podestá',
  siteTitle: 'Camila Podestá — Portfolio',
  availableLanguages: ['en'],
};

/**
 * Adapter between Camila's existing data.ts model and the reusable dashboard.
 * The public portfolio remains untouched while the dashboard works with one
 * stable editable shape.
 */
export const editableProjects: EditableProject[] = projects.map((project, order) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  year: '',
  client: '',
  thumbnail: project.cover || project.sep,
  description: project.description,
  images: project.images,
  video: project.videos?.[0],
  published: true,
  order,
  source: {
    categoryLabel: project.categoryLabel,
    tags: project.tags,
    tech: project.tech,
    sep: project.sep,
    cover: project.cover,
    mobileImages: project.mobileImages,
    videos: project.videos,
  },
}));

export const publicProjects = editableProjects
  .filter((project) => project.published)
  .sort((a, b) => a.order - b.order);

export const getProjectById = (id: string) => publicProjects.find((project) => project.id === id);
export const getProjectsByCategory = (category: EditableProject['category']) =>
  publicProjects.filter((project) => project.category === category);
