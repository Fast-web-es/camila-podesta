import { Project, Section, Category } from './types';

// ---------------------------------------------------------------------------
// Camila Podestá — Industrial & 3D design based in Barcelona
// 23 projects across 3 sections.
//   sep       → animated GIF teaser, shown ONLY on the home grid.
//   images    → real detail media (desktop) shown on the internal page.
//   mobileImages → optional Movil/ versions used on small screens.
//   videos    → real .mp4 videos shown on the internal page.
// Media arrays are kept in sync with the files present in /public/works.
// ---------------------------------------------------------------------------

const RETAIL_TAGS = ['3D MODEL', 'RENDER', 'POP DISPLAY'];
const INTERIOR_TAGS = ['3D'];
const ART_TAGS = ['OIL PAINTING', 'ILLUSTRATOR'];

export const sections: Section[] = [
  {
    category: 'Retail',
    label: 'RETAIL FURNITURE',
    intro: 'Custom retail furniture design for brands aiming to stand out at the point of sale.',
    tags: ['3D MODEL', 'RENDER', 'POP DISPLAY'],
  },
  {
    category: 'Interior',
    label: 'INTERIOR DESIGN',
    intro: 'Interior concepts, designed to reflect identity in each environment.',
    tags: ['3D MODEL', 'RENDER'],
  },
  {
    category: 'Art',
    label: 'ART & ILUSTRATION',
    intro: 'A personal collection blending digital illustration and oil painting.',
    tags: ['OIL PAINTING', 'ILLUSTRATOR', '3D'],
  },
];

// Helper: build ["/base/1.ext", ... ,"/base/n.ext"]
const seq = (base: string, n: number, ext: string, prefix = ''): string[] =>
  Array.from({ length: n }, (_, i) => `${base}/${prefix}${i + 1}.${ext}`);

export const projects: Project[] = [
  // ======================= RETAIL FURNITURE =======================
  {
    id: 'asus',
    title: 'ASUS',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      '3D design and animation of a metal totem-style furniture piece, created for the exhibition of a new computer model launch, to be used at ASUS brand events held in various cities across Spain.',
    sep: '/works/retail/_home/asus.gif',
    images: seq('/works/retail/asus', 4, 'png'),
    videos: ['/works/retail/asus/video1.mp4'],
  },
  {
    id: 'chocolate-ametller',
    title: 'CHOCOLATE AMATLLER',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      'Production of metal furniture for bulk chocolates for the brands Simon Coll and Chocolates Amatller, for their stores located in Barcelona.',
    sep: '/works/retail/_home/chocolate-ametller.gif',
    images: seq('/works/retail/chocolate-ametller', 5, 'jpg'),
  },
  {
    id: 'miret-pastry',
    title: 'MIRET PASTRY',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender + Rhinoceros 3D',
    description: 'Custom furniture design for a pastry shop located in Barcelona.',
    sep: '/works/retail/_home/miret-pastry.gif',
    images: seq('/works/retail/miret-pastry', 5, 'png'),
  },
  {
    id: 'malfy-display',
    title: 'MALFY DISPLAY',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      'Prototyping and subsequent production of gin display units, intended for airports and large retail markets.',
    sep: '/works/retail/_home/malfy-display.gif',
    images: seq('/works/retail/malfy-display', 5, 'jpg'),
  },
  {
    id: 'kinder',
    title: 'KINDER',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      'Prototyping and production of Kinder furniture units for airport retail locations across Portugal.',
    sep: '/works/retail/_home/kinder.gif',
    images: seq('/works/retail/kinder', 6, 'jpg'),
    mobileImages: seq('/works/retail/kinder', 4, 'jpg', 'm'),
  },
  {
    id: 'sant-joan-de-deu',
    title: 'SANT JOAN DE DÉU STAND',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      'Stand built for the Pediatric Oncology Congress at the Barcelona International Convention Center. Walls made of reinforced white cardboard; transversal elements in methacrylate.',
    sep: '/works/retail/_home/sant-joan-de-deu.gif',
    images: seq('/works/retail/sant-joan-de-deu', 2, 'png'),
  },
  {
    id: 'dog-chow',
    title: 'DOG CHOW STAND',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      'Design of this promotional stand for Purina Dog Chow, implemented in a hypermarket. House-shaped entrance, vibrant brand colors, and strategic product placement to enhance the in-store experience.',
    sep: '/works/retail/_home/dog-chow.gif',
    images: seq('/works/retail/dog-chow', 3, 'png'),
  },
  {
    id: 'alpro',
    title: 'ALPRO',
    category: 'Retail',
    categoryLabel: 'RETAIL FURNITURE',
    tags: RETAIL_TAGS,
    tech: 'Blender',
    description:
      "Production of a series of display units for Alpro's plant-based milk and ice cream line, for hypermarkets across Spain.",
    sep: '/works/retail/_home/alpro.gif',
    images: seq('/works/retail/alpro', 5, 'png'),
  },

  // ======================= INTERIOR DESIGN =======================
  {
    id: 'living-room-by-the-sea',
    title: 'LIVING ROOM BY THE SEA',
    category: 'Interior',
    categoryLabel: 'INTERIOR DESIGN',
    tags: INTERIOR_TAGS,
    tech: 'Blender',
    description:
      'Seaside living room and dining area render. Designed to capture natural light and relaxed elegance, with a central shelving unit that subtly divides the space. Contemporary elements with retro touches.',
    sep: '/works/interior/_home/living-room-by-the-sea.gif',
    images: seq('/works/interior/living-room-by-the-sea', 3, 'jpg'),
  },
  {
    id: 'lilac-living-room',
    title: 'LILAC LIVING ROOM',
    category: 'Interior',
    categoryLabel: 'INTERIOR DESIGN',
    tags: INTERIOR_TAGS,
    tech: 'Blender',
    description:
      'A serene dining nook bathed in morning light. Lilac walls and soft textures frame a sculptural table and vibrant accents, blending calm with character.',
    sep: '/works/interior/_home/lilac-living-room.gif',
    images: seq('/works/interior/lilac-living-room', 1, 'jpg'),
  },
  {
    id: 'cozy-corner',
    title: 'COZY CORNER',
    category: 'Interior',
    categoryLabel: 'INTERIOR DESIGN',
    tags: INTERIOR_TAGS,
    tech: 'Blender',
    description:
      'Reading nook at different times of day; an intimate layered corner where light transforms the atmosphere — from soft morning hues to deeper evening tones.',
    sep: '/works/interior/_home/cozy-corner.gif',
    images: seq('/works/interior/cozy-corner', 1, 'jpg'),
  },
  {
    id: 'night-in-a-remote-place',
    title: 'NIGHT IN A REMOTE PLACE',
    category: 'Interior',
    categoryLabel: 'INTERIOR DESIGN',
    tags: INTERIOR_TAGS,
    tech: 'Blender',
    description:
      'Outdoor lounge at night. A surreal retreat nestled in a lush, undefined landscape — where soft light and curved architecture invite stillness.',
    sep: '/works/interior/_home/night-in-a-remote-place.gif',
    images: seq('/works/interior/night-in-a-remote-place', 1, 'png'),
  },
  {
    id: 'unknown-place',
    title: 'UNKNOWN PLACE',
    category: 'Interior',
    categoryLabel: 'INTERIOR DESIGN',
    tags: INTERIOR_TAGS,
    tech: 'Blender',
    description:
      'Open-air gathering space. Part of the same remote retreat as the lounge; a sunlit circular arena blending brutalist textures with tropical surroundings.',
    sep: '/works/interior/_home/unknown-place.gif',
    images: seq('/works/interior/unknown-place', 1, 'png'),
  },
  {
    id: 'retro-living-room',
    title: 'RETRO LIVING ROOM',
    category: 'Interior',
    categoryLabel: 'INTERIOR DESIGN',
    tags: INTERIOR_TAGS,
    tech: 'AI + Photoshop',
    description:
      'AI-generated living room. A bold interplay of color and form — base image fully generated with AI and later enhanced in Photoshop.',
    sep: '/works/interior/_home/retro-living-room.gif',
    images: seq('/works/interior/retro-living-room', 1, 'png'),
  },

  // ======================= ART & ILLUSTRATION =======================
  {
    id: 'ninja-girl',
    title: 'NINJA GIRL',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ART_TAGS,
    description: 'Part of a series that explores color, light, and fabric textures.',
    sep: '/works/art/_home/ninja-girl.gif',
    images: seq('/works/art/ninja-girl', 4, 'png'),
  },
  {
    id: 'girl-with-puffer',
    title: 'GIRL WITH PUFFER',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ART_TAGS,
    description: 'Part of a series that explores color, light, and fabric textures.',
    sep: '/works/art/_home/girl-with-puffer.gif',
    images: seq('/works/art/girl-with-puffer', 4, 'png'),
  },
  {
    id: 'interpretation-of-van-dyck',
    title: 'INTERPRETATION OF VAN DYCK',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ART_TAGS,
    description:
      'Reinterpretation of a Van Dyck portrait — deconstruction of classical forms through contemporary color palettes, lighting contrasts, and volumetric emphasis.',
    sep: '/works/art/_home/interpretation-of-van-dyck.gif',
    images: seq('/works/art/interpretation-of-van-dyck', 5, 'png'),
  },
  {
    id: 'girl-with-sunglasses',
    title: 'GIRL WITH SUNGLASSES',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ART_TAGS,
    description: 'Part of a series that explores color, light, and fabric textures.',
    sep: '/works/art/_home/girl-with-sunglasses.gif',
    images: seq('/works/art/girl-with-sunglasses', 4, 'png'),
  },
  {
    id: 'star-pillow-i',
    title: 'STAR PILLOW I',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ART_TAGS,
    description: 'Part of a series that explores color, light, and fabric textures.',
    sep: '/works/art/_home/star-pillow-i.gif',
    images: seq('/works/art/star-pillow-i', 4, 'png'),
  },
  {
    id: 'star-pillow-ii',
    title: 'STAR PILLOW II',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ART_TAGS,
    description: 'Part of a series that explores color, light, and fabric textures.',
    sep: '/works/art/_home/star-pillow-ii.gif',
    images: seq('/works/art/star-pillow-ii', 4, 'png'),
  },
  {
    id: 'canine-tarot-2d',
    title: 'CANINE TAROT DECK (2D)',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ['ILLUSTRATOR'],
    tech: 'Illustrator',
    description:
      'Reinterpretation of the classic arcana with dogs as protagonists. Created entirely in Illustrator; each card explores fate, intuition, and symbolism.',
    sep: '/works/art/_home/canine-tarot-2d.gif',
    images: seq('/works/art/canine-tarot-2d', 4, 'png'),
  },
  {
    id: 'canine-tarot-3d',
    title: 'CANINE TAROT DECK (3D)',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ['ILLUSTRATOR'],
    tech: 'Blender',
    description:
      '3D continuation of the tarot; the canine characters gain depth, texture, and presence, preserving the original symbolism.',
    sep: '/works/art/_home/canine-tarot-3d.gif',
    images: seq('/works/art/canine-tarot-3d', 8, 'png'),
  },
  {
    id: 'tirano-branding',
    title: 'TIRANO BRANDING',
    category: 'Art',
    categoryLabel: 'ART & ILUSTRATION',
    tags: ['ILLUSTRATOR'],
    tech: 'Illustrator',
    description:
      'Illustrations created for a restaurant in Mallorca: framed artworks for the interior, food & drink menu design, and the contact card.',
    sep: '/works/art/_home/tirano-branding.gif',
    images: seq('/works/art/tirano-branding', 5, 'png'),
  },
];

export const getProjectById = (id: string) => projects.find((p) => p.id === id);

export const getProjectsByCategory = (category: Category) =>
  projects.filter((p) => p.category === category);
