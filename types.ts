export type Category = 'Retail' | 'Interior' | 'Art';

export type DashboardCategory = Category | 'Commercial' | 'Personal' | 'Editorial';

export interface Project {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string; // Full section label, e.g. "RETAIL FURNITURE"
  tags: string[];
  tech?: string;
  description: string;
  sep: string; // Animated GIF teaser — used ONLY on the home grid
  cover?: string; // Still "portada" image — used ONLY as the home carousel cover
  images: string[]; // Real detail media (desktop) for the internal page
  mobileImages?: string[]; // Optional mobile versions (Movil/)
  videos?: string[]; // Optional real videos for the internal page
}

export interface Section {
  category: Category;
  label: string;
  intro: string;
  tags: string[];
}

// Shared content shape used by the reusable admin dashboard.
export interface EditableProject {
  id: string;
  title: string;
  category: DashboardCategory;
  year: string;
  client?: string;
  thumbnail: string;
  description: string;
  images: string[];
  video?: string;
  published: boolean;
  order: number;
  source?: {
    categoryLabel?: string;
    tags?: string[];
    tech?: string;
    sep?: string;
    cover?: string;
    mobileImages?: string[];
    videos?: string[];
  };
}

export interface PortfolioSettings {
  name: string;
  siteTitle: string;
  intro?: string;
  email?: string;
  instagram?: string;
  bio?: string;
  availableLanguages: string[];
}
