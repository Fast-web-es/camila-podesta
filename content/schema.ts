import { EditableProject } from '@/types';

export interface PortfolioSettings {
  name: string;
  siteTitle: string;
  intro?: string;
  email?: string;
  instagram?: string;
  availableLanguages: string[];
}

export interface PortfolioContent {
  settings: PortfolioSettings;
  projects: EditableProject[];
}

