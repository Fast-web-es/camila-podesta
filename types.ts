export type Category = 'Retail' | 'Interior' | 'Art';

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
