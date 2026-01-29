export type Category = 'Commercial' | 'Personal' | 'Art' | 'Editorial';

export interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  client?: string;
  thumbnail: string;
  description: string;
  images: string[]; // URLs for the detail view
  video?: string;   // Optional video URL
}