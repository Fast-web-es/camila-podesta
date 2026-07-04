# Camila Podestá — Reconstrucción de Readymag en código

Proyecto Readymag: `5469870` (página pública caída). **Portafolio multipágina: portada + ~30 páginas internas (una por proyecto)** en `/edit/5469870/2/`, `/3/`, …
Base del repo: portfolio de Marcos Morales (Next.js). Ya tienes TODOS los assets originales en `assets/`.

**La arquitectura ya la tienes:** la base Marcos Morales usa rutas dinámicas `app/commercial-work/[id]`, `app/personal/[id]` + un `data.ts`. No construyes 30 páginas a mano: **rellenas `data.ts` con los ~30 proyectos y la plantilla genera todas las páginas.**

### Patrón de página interna (por proyecto)
Cada página = categoría · título · etiquetas · descripción · imágenes. Ejemplos reales extraídos:
- **ASUS** (Retail Furniture · 3D MODEL/RENDER/POP DISPLAY): "Responsible for the 3D design and animation of a metal totem-style furniture piece, created for the exhibition of a new computer model launch, to be used at ASUS brand events held in various cities across Spain."
- **CHOCOLATE AMATLLER** (Retail Furniture · 3D MODEL/RENDER/POP DISPLAY): "Responsible for the production of metal furniture for bulk chocolates for the brands Simon Coll and Chocolates Amatller, for their stores located in Barcelona."

### Para rellenar `data.ts` hacen falta 2 cosas
1. **Texto por proyecto** (título, categoría, etiquetas, descripción) → se extrae de Readymag página a página, o lo da Camila (ella lo escribió).
2. **Imágenes por proyecto** → ya están en `assets/{SECCIÓN}/` agrupadas por prefijo (Asus_01/02/03, CA01-05, Alpro 01/02…). Claude Code las mapea por nombre; tú confirmas las finales.

## Identidad
- **Nombre:** Camila Podestá
- **Header:** izq. "Industrial & 3D design based in Barcelona" · der. "CAMILA PODESTÁ"
- **Footer:** ©Copyright 2025. All Rights Reserved
- **Fuentes:** Times (serif, titulares) + Inter (sans, textos)
- **Estilo:** negro sobre blanco, minimalista, editorial, mucho espacio en blanco. Renders = GIF/MP4 animados.

## Estructura (una sola página, en orden)
1. **Header fijo:** izq. claim · der. "CAMILA PODESTÁ".
2. **Hero:** estrella 3D animada central grande, mucho blanco.
3. **RETAIL FURNITURE** — "Custom retail furniture design for brands aiming to stand out at the point of sale." (etiquetas 3D MODEL / RENDER) + grilla de piezas.
4. **INTERIOR DESIGN** — "Interior concepts, designed to reflect identity in each environment." (3D) + grilla.
5. **ART & ILUSTRATION** *(sic)* — "A personal collection blending digital illustration and oil painting." (OIL PAINTING / ILLUSTRATOR) + grilla.
6. **Footer:** ©Copyright 2025.

## Assets — YA LOS TIENES en `assets/` (no descargues nada de Readymag)
- **Hero (estrella):** `assets/estrella animada vertical sin fondo pago.mp4` (fondo transparente, ideal) · alt: `assets/Estrella animada vertical.gif`
- **Separadores animados por sección** (los GIF de la grilla):
  - RETAIL FURNITURE → `assets/SEPARADORES/RF/` (Alpro, Asus, Chocolate Amatller, Dog Chow, Kinder, Malfy, Miret Pastry, Sant Joan de Deu)
  - INTERIOR DESIGN → `assets/SEPARADORES/ID/` (Cozy corner, Corner sunset, Lilac living room, Living room by the sea, Night in a remote place, Retro space, Unknown place)
  - ART & ILUSTRATION → `assets/SEPARADORES/A AND IL/` (Canine, 3D Canine, Girl with puffer, Girl with sunglasses, Ninja girl, Star pillow I/II, Interpretation of vd, Tirano)
- **Obras en detalle** (para páginas de proyecto / hover): `assets/RETAIL FURNITURE/`, `assets/INTERIOR DESIGN/`, `assets/ART ILUSTRATION/` (cada una con `Movil/` = versión móvil).
- **Flechas de navegación:** `assets/Flechita*.png` · **Fondos:** `assets/Fondo gris.gif`, `assets/Ok fondo gris claro.gif`.
- Ojo: hay muchas variantes por pieza (`baja`, `baja baja`, `zoom`) → hay que quedarse con la final.

## Dos cosas OBLIGATORIAS antes de construir
1. **Normalizar nombres:** los archivos tienen espacios, acentos y mayúsculas → renómbralos a kebab-case sin acentos (ej. `SEPARADORES/RF/Sant Joan de Deu.gif` → `public/works/retail/sant-joan-de-deu.gif`). Espacios/acentos rompen imports en Next.
2. **Mover a `public/`:** Next sirve estáticos desde `public/`, no desde `assets/`. Copia los assets finales a `public/works/{retail,interior,art}/` y `public/hero/`.

## Cómo hacerlo rápido y sin quemar tokens
- Trabaja **dentro de este repo** (reutiliza componentes de la base Marcos Morales).
- **No pegues HTML de Readymag.** Dale a Claude Code: este spec + los assets ya normalizados en `public/` + 3-4 capturas de referencia por sección.
- Construye **sección por sección** (hero → retail → interior → art → footer), revisando cada una contra su captura antes de seguir.

## PROMPT para Claude Code

**Paso 0 (assets):** En `assets/` tengo los originales por sección. Antes de construir: elige la versión final de cada pieza, **normaliza los nombres** (minúsculas, sin espacios ni acentos, kebab-case) y **cópialos a `public/`** así: hero → `public/hero/`; separadores → `public/works/retail`, `public/works/interior`, `public/works/art`; versiones móvil aparte. Dame la lista final de archivos.

**Paso 1 (build):** Reconstruye el portfolio de **Camila Podestá** en este proyecto Next.js (base Marcos Morales, reutiliza componentes). Réplica lo más fiel posible del original: minimalista, editorial, **negro sobre blanco, Times + Inter**.

Estructura (una página):
- Header fijo: izq. "Industrial & 3D design based in Barcelona" · der. "CAMILA PODESTÁ".
- Hero: estrella 3D animada central (`public/hero/…`), mucho blanco.
- RETAIL FURNITURE — "Custom retail furniture design for brands aiming to stand out at the point of sale." (3D MODEL / RENDER) + grilla de GIFs de `public/works/retail`.
- INTERIOR DESIGN — "Interior concepts, designed to reflect identity in each environment." (3D) + grilla `public/works/interior`.
- ART & ILUSTRATION — "A personal collection blending digital illustration and oil painting." (OIL PAINTING / ILLUSTRATOR) + grilla `public/works/art`.
- Footer: "©Copyright 2025. All Rights Reserved".

Requisitos: Times titulares, Inter textos; negro sobre blanco; responsive (usa las versiones `Movil/` en móvil); hover/animaciones sutiles. No inventes textos de piezas individuales: si faltan títulos por obra, deja `// TODO`. Entrega listo para `npm run dev` y deploy en Vercel. Trabaja y muéstrame **sección por sección**.
