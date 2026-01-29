import { Project } from './types';

const commercialTitles = [
  "ZEIT Online illustrations",
  "Citi Private Bank illustrations",
  "El sabor de la historia documentary",
  "Pam – Agua para Marte",
  "Koderom på hjul",
  "Yellow",
  "UiB AI",
  "Ben & Jerry's pitch",
  "Noches de Palacio illustrations",
  "Kipling digital collage Style frames",
  "Casa Baldo",
  "Columbia Association",
  "Cinemateca Pocket",
  "Fuego Dentro",
  "Pam – Sin aire",
  "Hansaspelet - exhibition design",
  "Maradona - Netflix pitch",
  "Museo Papalote digital collages campaign",
  "Nat Geo Asombrosamente",
  "Viceversa cover illustration",
  "Daily run Africa podcast illustrations",
  "P.A.M – Alas negras",
  "Mural for Metropolink Art Festival",
  "Lucyda video manifiesto",
  "Cuarteto conurbano",
  "Ha Ash 30 de Febrero – Collages for music video",
  "Netcom style frames"
];

const personalTitles = [
  "Little Worlds",
  "Missing Objects",
  "Digital Collage Portraits",
  "Digital Collages",
  "In Deep Quiet"
];

interface ProjectOverride {
  id?: string; // Explicit slug for SEO matching (e.g. 'cuarteto-conurbano')
  description: string;
  client?: string;
  imageCount?: number;
  video?: string;
}

// PASTE YOUR CUSTOM SLUGS HERE IN THE 'id' FIELD
const commercialOverrides: Record<string, ProjectOverride> = {
  "ZEIT Online illustrations": {
    id: "zeit-illustrations",
    client: "ZEIT Online",
    description: "Art Director: Jakob Weber\n\nIllustrations made for articles about Artificial intelligence in our every day lives.",
    imageCount: 4
  },
  "Citi Private Bank illustrations": {
    id: "citi",
    client: "Citi Private Bank",
    description: "lllustrations made for the re-design of the Citi Private Bank website. We made over 100 digital illustrations that communicate the subtle and refined identity of the services that this branch of the bank provides to their exclusive clients.\n\nwww.privatebank.citibank.com",
    imageCount: 11
  },
  "El sabor de la historia documentary": {
    id: "el-sabor-de-la-historia-documentary",
    client: "Das Pattern",
    description: "El Sabor de la historia is a documentary tv series directed by Santiago Idelson. I was fortunate to work at Das Pattern and get involved in this fun proyect.\nI have been making collages for the opening titles, inserts and other parts of it. The documentary shows facts about food history and the favorite dishes of people like Che Guevara, Cristobal Columbus, Carlos Gardel and José de San Martin.",
    imageCount: 10,
    video: "https://player.vimeo.com/video/125709269"
  },
  "Pam – Agua para Marte": {
    id: "pam-agua-para-marte",
    client: "Pam",
    description: "Digital collage illustration for the cover of Pam’s single “Agua para Marte”.",
    imageCount: 1
  },
  "Koderom på hjul": {
    id: "koderom-p-hjul",
    client: "Equinor",
    description: "Role: Senior Designer at Haltenbanken Bergen\n Client: Equinor\nProject: Visual Identity, Brand Guidelines, Naming Development, Experience Design\n\nPå Hjul is a mobile show that travels from school to school to teach children about coding and science. I was responsible for guiding the client in developing the project’s identity, from naming to the vehicle’s design. Each illustration was created based on Equinor’s illustration guidelines. Additionally, I developed templates for social media and PowerPoint presentations.",
    imageCount: 4
  },
  "Yellow": {
    id: "yellow",
    client: "Das Pattern",
    description: "Agency: Das Pattern\n\nA video producer house funded in Buenos Aires needed a completely new identity. I was in charge of it’s development and the creation of style frames for the logo reveal.",
    imageCount: 11,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "UiB AI": {
    id: "uib-ai",
    client: "UiB",
    description: "Role: Digital designer at Haltenbanken\nClient: UiB\n\nDevelopment of a visual identity and supporting graphics for the Artificial Intelligence platform.",
    imageCount: 4
  },
  "Ben & Jerry's pitch": {
    id: "ben-jerrys-pitch",
    client: "Hornet / Ben & Jerry's",
    description: "These are some illustrations for a pitch I had the chance to participate with Hornet, unfortunately it didn’t happen but it was a fun project.",
    imageCount: 6
  },
  "Noches de Palacio illustrations": {
    id: "noches-de-palacio-digital-collage-illustrations",
    client: "NT producciones",
    description: "Agency: NT producciones\n\nIllustrations and collages for the campaign “Noches de Palacio” for El Palacio de Hierro.",
    imageCount: 10
  },
  "Kipling digital collage Style frames": {
    id: "kipling-digital-collage-style-frames",
    client: "Kipling",
    description: "Agency: Golden Wolf\nClient: Kipling\n\nDigital collages made for their institutional video.",
    imageCount: 7,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "Casa Baldo": {
    id: "casa-baldo",
    client: "Casa Baldo",
    description: "Branding\n\nAn architect and an interior designer funded Casa Baldo, a fabric producer in Buenos Aires. I was in charge of developing the identity.",
    imageCount: 5
  },
  "Columbia Association": {
    id: "columbia-association",
    client: "Columbia Association",
    description: "Agency: GKV\nArt director: Jonathan Anthes\nAnimator: Brian Fink\n\nDigital collage illustrations made for the Columbia Association ad campaign during 2019 / 2020.",
    imageCount: 9
  },
  "Cinemateca Pocket": {
    id: "cinemateca-pocket",
    client: "Buenos Aires City",
    description: "Agency: Pattern.tv\nClient: Buenos Aires city\n\nDirector Santiago Idelson got funded by Buenos Aires city to develop a project that would reunite the old cinema archives with new technologies. The project includes a book and a AR app that allows users to have a closer interaction with archive material. I was in charge of designing the book and app. The project will hopefully be launched in 2021.",
    imageCount: 7
  },
  "Fuego Dentro": {
    id: "fuego-dentro-cover-illustration",
    client: "Adrian Kz",
    description: "Illustration for the singer “Fuego Dentro” (Adrian Kz) from Buenos Aires, Argentina. The name of the single is “el hijo de la modista” (The son of the seamstress). The image has a lot of small details telling the story of the song.",
    imageCount: 1
  },
  "Pam – Sin aire": {
    id: "pam-sin-aire",
    client: "Pam",
    description: "Cd artwork for Pam  for his single “Sin Aire” \n(without air in Spanish).",
    imageCount: 1
  },
  "Hansaspelet - exhibition design": {
    id: "hansaspelet-exhibition-design",
    client: "Haltenbanken Bergen",
    description: "Hansaspelet - Kampen mot tiden at Haltenbanken Bergen\n\n“Kampen mot tiden”, is an interactive museum exhibition where you will help the museum's founder save Bryggen's precious treasures. You must solve puzzles and tasks, and fight against skeptics, city fires and a miserable economy. Battle Against Time is a fun time travel where you will get to know the Hanseatic Museum's adventurous 150-year history better!\n My responsibility was to create the visual identity of the exhibition, together with the 3d installations, the production of figures and illustrations both for physical and digital use.",
    imageCount: 6
  },
  "Maradona - Netflix pitch": {
    id: "maradona-netflix-pitch",
    client: "Netflix (Pitch)",
    description: "Pitch\n\nStyleframes made for a pitch to get make the illustrative shots of a Maradona Netflix series.",
    imageCount: 4
  },
  "Museo Papalote digital collages campaign": {
    id: "museo-papalote-digital-collages-campaing",
    client: "Museo Papalote",
    description: "Agency: FCB México.\nProduction: NTproducciones\n\n4 Digital collages were made for the reopening campaign of the Papalote Museum located in Mexico D.F.",
    imageCount: 4
  },
  "Nat Geo Asombrosamente": {
    id: "nat-geo-asombrosamente",
    client: "Nat Geo",
    description: "Commercial\n\nBranding pack and illustrations for the Nat Geo show called Asombrosamente which explains how our brain works in our every day life.\nI designed and illustrated the visual content for 10 episodes broadcasted in Latin America while working at Das Pattern.",
    imageCount: 6
  },
  "Viceversa cover illustration": {
    id: "viceversa-cover-illustration",
    client: "Viceversa",
    description: "Commercial\n\nSingle cover for the band Viceversa.",
    imageCount: 2
  },
  "Daily run Africa podcast illustrations": {
    id: "daily-run-africa",
    client: "Daily Run Africa",
    description: "Commercial\n\nIllustrations for the podcasts covers of Daily Run Africa, a health and wellness show providing a space for culturally-relevant civic dialogue and participation on chronic diseases and health promotion.",
    imageCount: 9
  },
  "P.A.M – Alas negras": {
    id: "p-a-m-alas-negras",
    client: "Pam",
    description: "Commercial\n\nIllustration and lyric video for the sing “Alas negras” (Black wings) for PAM.",
    imageCount: 2
  },
  "Mural for Metropolink Art Festival": {
    id: "mural-for-metropolink-art-festival",
    client: "Metropolink Art Festival",
    description: "Commercial\n\nOxana Niznick invited me to participate of the Metropolink Art festival in Heidelberg, Germany. Together we made this mural. It is a mix of watercolour illustrations (Oxana’s style) and my digital collages. We made the sketch digitally and then took it to the wall.",
    imageCount: 4
  },
  "Lucyda video manifiesto": {
    id: "lucyda-video-manifiesto",
    client: "Lucyda",
    description: "Das Pattern / Lucyda\n\nLucyda came up with the idea of making a visual manifiesto. These are the style frames that were animated.",
    imageCount: 15
  },
  "Cuarteto conurbano": {
    id: "cuarteto-conurbano",
    client: "Cuarteto Conurbano",
    description: "The Tango quartet came to Europe for the second time and I got the chance to make them some designs for their postcards. They are themed in the “conurbano” which is the outer suburbs of Buenos Aires.",
    imageCount: 3
  },
  "Ha Ash 30 de Febrero – Collages for music video": {
    id: "30-de-febrero-ha-ash",
    client: "Ha Ash",
    description: "Music video\n\nIllustrations for the music video “30 de Febrero” from the Mexican pop duet Ha Ash.\nThe singers go through a calendar with impossible situations, relating these to the concept of “30th of February”.\n\nArt director: Santiago Idelson.",
    imageCount: 13,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "Netcom style frames": {
    id: "netcom-style-frames",
    client: "Netcom",
    description: "Das Pattern / Netcom\n\nStyle frames for the company Netcom while working at Das Pattern. These are part of an institutional video.",
    imageCount: 8
  }
};

const personalOverrides: Record<string, ProjectOverride> = {
  "Little Worlds": {
    id: "little-worlds",
    description: "I have been creating these little worlds, miniature everyday situations mixed with surreal illustrated elements.",
    imageCount: 10
  },
  "Missing Objects": {
    id: "missing-objects",
    description: "A series of misplaced missing objects",
    imageCount: 6
  },
  "Digital Collage Portraits": {
    id: "digital-collage-portraits",
    description: "Digital collage portraits.",
    imageCount: 4
  },
  "Digital Collages": {
    id: "digital-collages",
    description: "Digital collages that I make for fun.",
    imageCount: 30
  },
  "In Deep Quiet": {
    id: "in-deep-quiet",
    description: "After so much collage, color and small elements I found that I needed a break and “go minimal”. That is why I started this project that works as a balance outlet. These posters are simple and monochromatic and are [sold as print on demand](https://www.inprnt.com/gallery/indeepquiet/).",
    imageCount: 9
  }
};

// Fallback image in case the local file is missing or path is wrong
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

const generateProjects = (titles: string[], category: 'Commercial' | 'Personal'): Project[] => {
  return titles.map((title, index) => {
    // Check for overrides based on category
    let override: ProjectOverride | undefined;
    if (category === 'Commercial') {
       override = commercialOverrides[title];
    } else {
       override = personalOverrides[title];
    }
    
    // PRIORITY: Use override ID if provided, otherwise fallback to auto-generated slug
    const autoId = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const id = override?.id || autoId;

    // Generate images based on override count or default
    const imageCount = override?.imageCount || 3;
    const images: string[] = [];
    
    // GENERATE LOCAL PATHS: /images/category/id/1.jpg (or .png for specific cases)
    const categoryPath = category.toLowerCase();
    
    for (let i = 1; i <= imageCount; i++) {
        let extension = 'jpg';
        
        // Custom logic for "Digital Collages" which mixes PNG and JPG
        if (id === 'digital-collages') {
          // 1 to 6 are .png, 7 to 30 are .jpg
          if (i <= 6) {
            extension = 'png';
          } else {
            extension = 'jpg';
          }
        }
        
        images.push(`/images/${categoryPath}/${id}/${i}.${extension}`);
    }
    
    return {
      id: id,
      title: title,
      category: category,
      year: (2018 + (index % 7)).toString(), // Adjusted year range slightly for variety
      client: override?.client || (category === 'Commercial' ? (index % 2 === 0 ? 'International Client' : 'Creative Studio') : undefined),
      thumbnail: images.length > 0 ? images[0] : FALLBACK_IMAGE, // Use the first local image as thumbnail
      description: override?.description || (category === 'Commercial' 
        ? `A strategic visual exploration for ${title}. The project focused on conceptual clarity, texture integration, and a sophisticated color palette to convey the narrative.`
        : `An exploration of ${title} using mixed media and digital collage techniques. This personal series investigates the relationship between texture and digital space.`),
      images: images,
      video: override?.video
    };
  });
};

export const projects: Project[] = [
  ...generateProjects(commercialTitles, 'Commercial'),
  ...generateProjects(personalTitles, 'Personal')
];

export const getProjectById = (id: string) => projects.find(p => p.id === id);
export const getProjectsByCategory = (type: 'Commercial' | 'Personal') => {
    return projects.filter(p => p.category === type);
}