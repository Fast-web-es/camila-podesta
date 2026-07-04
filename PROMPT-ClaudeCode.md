# Prompt para Claude Code — Portfolio de Camila Podestá

Estás en este repo (base: portfolio de Marcos Morales, Next.js, con rutas dinámicas `app/*/[id]` + `data.ts`). Conviértelo en el portfolio de **Camila Podestá**, replicando lo más fiel posible su web original (un Readymag que está caído). **Todo el material ya está en la carpeta `assets/`.**

## Estilo (fiel al original)
Minimalista, editorial. **Negro sobre blanco.** Fuentes: **Times** (titulares) + **Inter** (texto). Mucho espacio en blanco. Renders animados (GIF/MP4).

## Estructura
- **Header fijo:** izq. "Industrial & 3D design based in Barcelona" · der. "CAMILA PODESTÁ".
- **Portada:** estrella 3D animada central grande, mucho blanco.
- **3 secciones** con grilla de proyectos: RETAIL FURNITURE · INTERIOR DESIGN · ART & ILLUSTRATION. En la grilla, cada proyecto se representa con su **GIF separador** (teaser).
- **Cada proyecto → su página interna** (reutiliza las rutas `[id]` que ya existen): categoría, título, tags, descripción, y sus **imágenes + vídeos** reales.
- **Footer:** "©Copyright 2025. All Rights Reserved".

> ### ⚠️ REGLA DE MEDIA (clave, léela)
> - Los **GIF de `assets/SEPARADORES/`** se usan **SOLO en la home**, como teaser de cada proyecto dentro de su sección. **NO** van dentro de la página interna.
> - Las **páginas internas** llevan las **imágenes y vídeos reales** de cada proyecto, y **el número varía por proyecto** (ej.: ASUS = 5 imágenes + 2 vídeos · Sant Joan de Déu = 4 imágenes). Respeta el orden.
> - Puede que algunos **vídeos por proyecto no estén aún en `assets/`** (ahora solo hay un par de .mp4). Marca los que falten como `// TODO: vídeo` y avísame para pedírselos a Camila.

---

## PASO 1 — Assets (hazlo primero)
En `assets/` están los originales, con espacios/acentos/mayúsculas. **Normaliza los nombres** (kebab-case, sin acentos) y **cópialos a `public/`** (Next solo sirve estáticos desde ahí):
- **Hero** → `public/hero/` — usa `assets/estrella animada vertical sin fondo pago.mp4` (fondo transparente).
- **Separadores (teasers de la HOME)** → `public/works/{retail,interior,art}/_home/` — desde `assets/SEPARADORES/{RF, ID, A AND IL}/`. Un GIF por proyecto. **Solo se usan en la home.**
- **Media interna por proyecto (imágenes + vídeos)** → `public/works/{seccion}/{slug}/` — desde `assets/RETAIL FURNITURE/`, `assets/INTERIOR DESIGN/`, `assets/ART ILUSTRATION/` y los `.mp4`. Usa las versiones `Movil/` para móvil.
Al terminar, dame la lista de archivos copiados y **marca qué proyectos parecen quedarse sin imágenes o sin vídeos** (para pedírselos a Camila).

## PASO 2 — Rellena `data.ts` con estos 23 proyectos
Formato por proyecto: slug · título · tags · tech · descripción · **sep** (GIF teaser, solo home) · **media interna** (imágenes + vídeos de la página interna). El nº de media por proyecto **varía** y lo confirma Camila; las carpetas de `assets/` son la fuente. Adapta al schema del `data.ts` existente. *(Abajo, donde pone "detalle" = media interna, no el separador.)*

### RETAIL FURNITURE — tags: 3D MODEL / RENDER / POP DISPLAY
1. `asus` — **ASUS** — sep `RF/Asus.gif`, detalle `Asus_01/02/03` — *(Blender)*
   3D design and animation of a metal totem-style furniture piece, created for the exhibition of a new computer model launch, to be used at ASUS brand events held in various cities across Spain.
2. `chocolate-ametller` — **CHOCOLATE AMETLLER** — sep `RF/Chocolate Amatller.gif`, detalle `CA01–05` — *(Blender)*
   Production of metal furniture for bulk chocolates for the brands Simon Coll and Chocolates Amatller, for their stores located in Barcelona.
3. `miret-pastry` — **MIRET PASTRY** — sep `RF/Miret Pastry.gif`, detalle `Miret_Portada-01` — *(Blender + Rhinoceros 3D)*
   Custom furniture design for a pastry shop located in Barcelona.
4. `malfy-display` — **MALFY DISPLAY** — sep `RF/Malfy.gif`, detalle `M01–05` — *(Blender)*
   Prototyping and subsequent production of gin display units, intended for airports and large retail markets.
5. `kinder` — **KINDER** — sep `RF/Kinder.gif`, detalle `K 01–07`, `Movil/kind01–04` — *(Blender)*
   Prototyping and production of Kinder furniture units for airport retail locations across Portugal.
6. `sant-joan-de-deu` — **SANT JOAN DE DÉU STAND** — sep `RF/Sant Joan de Deu.gif`, detalle `SJDD_version movil_01/02` — *(Blender)*
   Stand built for the Pediatric Oncology Congress at the Barcelona International Convention Center. Walls made of reinforced white cardboard; transversal elements in methacrylate.
7. `dog-chow` — **DOG CHOW STAND** — sep `RF/Dog Chow.gif`, detalle `Dgch01/02` — *(Blender)*
   Design of this promotional stand for Purina Dog Chow, implemented in a hypermarket. House-shaped entrance, vibrant brand colors, and strategic product placement to enhance the in-store experience.
8. `alpro` — **ALPRO** — sep `RF/Alpro.gif`, detalle `Alpro 01/02/03 (+Furn)` — *(Blender)*
   Production of a series of display units for Alpro's plant-based milk and ice cream line, for hypermarkets across Spain.

### INTERIOR DESIGN — tag: 3D
9. `living-room-by-the-sea` — **LIVING ROOM BY THE SEA** — sep `ID/Living room by the sea.gif` — *(Blender)*
   Seaside living room and dining area render. Designed to capture natural light and relaxed elegance, with a central shelving unit that subtly divides the space. Contemporary elements with retro touches.
10. `lilac-living-room` — **LILAC LIVING ROOM** — sep `ID/Lilac living room.gif` — *(Blender)*
    A serene dining nook bathed in morning light. Lilac walls and soft textures frame a sculptural table and vibrant accents, blending calm with character.
11. `cozy-corner` — **COZY CORNER** — sep `ID/COZY CORNER.gif` (+ `Corner sunset.gif`) — *(Blender)*
    Reading nook at different times of day; an intimate layered corner where light transforms the atmosphere — from soft morning hues to deeper evening tones.
12. `night-in-a-remote-place` — **NIGHT IN A REMOTE PLACE** — sep `ID/Night in a remote place.gif` — *(Blender)*
    Outdoor lounge at night. A surreal retreat nestled in a lush, undefined landscape — where soft light and curved architecture invite stillness.
13. `unknown-place` — **UNKNOWN PLACE** — sep `ID/Unknown place.gif` — *(Blender)*
    Open-air gathering space. Part of the same remote retreat as the lounge; a sunlit circular arena blending brutalist textures with tropical surroundings.
14. `retro-living-room` — **RETRO LIVING ROOM** — sep `ID/Retro space.gif` — *(IA + Photoshop)*
    AI-generated living room. A bold interplay of color and form — base image fully generated with AI and later enhanced in Photoshop.

### ART & ILLUSTRATION — tags: OIL PAINTING / ILLUSTRATOR
15. `ninja-girl` — **NINJA GIRL** — sep `A AND IL/Ninja girl.gif`, detalle `Ninja01–04`
    Part of a series that explores color, light, and fabric textures.
16. `girl-with-puffer` — **GIRL WITH PUFFER** — sep `A AND IL/Girl with puffer.gif`, detalle `Puff01–04`
    Part of a series that explores color, light, and fabric textures.
17. `interpretation-of-van-dyck` — **INTERPRETATION OF VAN DICK** — sep `A AND IL/Interpretation of vd.gif`, detalle `Vd01–04`
    Reinterpretation of a Van Dyck portrait — deconstruction of classical forms through contemporary color palettes, lighting contrasts, and volumetric emphasis.
18. `girl-with-sunglasses` — **GIRL WITH SUNGLASSES** — sep `A AND IL/Girl with sunglasses.gif`, detalle `GAF01–04`
    Part of a series that explores color, light, and fabric textures.
19. `star-pillow-i` — **STAR PILLOW I** — sep `A AND IL/Star pillow I.gif`, detalle `S01–04`
    Part of a series that explores color, light, and fabric textures.
20. `star-pillow-ii` — **STAR PILLOW II** — sep `A AND IL/Star pillow II.gif`
    Part of a series that explores color, light, and fabric textures.
21. `canine-tarot-2d` — **CANINE TAROT DECK (2D)** — detalle (cartas) `MAGO, LUNA, SOL, TORRE, MUNDO, FORTUNA, ERMITAÑO, AMANTES…` — *(Illustrator)*
    Reinterpretation of the classic arcana with dogs as protagonists. Created entirely in Illustrator; each card explores fate, intuition, and symbolism.
22. `canine-tarot-3d` — **CANINE TAROT DECK (3D)** — sep `A AND IL/3D Canine.gif` (+ `Canine.gif`) — *(Blender)*
    3D continuation of the tarot; the canine characters gain depth, texture, and presence, preserving the original symbolism.
23. `tirano-branding` — **TIRANO BRANDING** — sep `A AND IL/Tirano.gif`
    Illustrations created for a restaurant in Mallorca: framed artworks for the interior, food & drink menu design, and the contact card.

## PASO 3 — Build
Con los assets en `public/` y `data.ts` relleno: monta la portada (header + hero estrella + 3 secciones con grilla de separadores) y las páginas internas por proyecto usando las rutas `[id]` existentes. Times titulares, Inter texto, negro sobre blanco, responsive (versiones `Movil/` en móvil), hover/animaciones sutiles. Deja listo para `npm run dev` y deploy en Vercel. **Trabaja y muéstrame sección por sección.**

## Antes de dar por cerrado, confírmame:
- Prefijos de detalle ambiguos en Retail (`VILO_*`, `CA*`, `M*`, `01_final/fachada`, `Portada*`) → a qué proyecto van.
- Typos del original: "INTERIOR **DESING**" → **DESIGN**; "CHOCOLATE **AMETLLER**" vs brand real **Amatller**.
- Títulos por pieza individual (si cada imagen dentro de un proyecto lleva caption propio, no lo tengo: usa `// TODO`).
