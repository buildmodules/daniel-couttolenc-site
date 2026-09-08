import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const variante = z.object({
  nombre: z.string(),
  imagen: z.string().optional(),
});

// Créditos de foto (ej. "Photo courtesy of Hiperlocalidad") — array aparte y
// disperso en vez de anidarlo en cada item de `galeria`, porque solo aplica a
// alguna foto suelta ocasional: así `galeria` se queda como una lista plana
// de imágenes (simple de editar en Tina) y solo la foto que de verdad lo
// necesita gana esta entrada extra. `imagen` debe ser igual (mismo string)
// a la ruta de esa foto dentro de `galeria`.
const creditoFoto = z.object({
  imagen: z.string(),
  texto: z.string(),
});

const piezas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/piezas" }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    portada: z.string().optional(),
    // Foto que reemplaza a `portada` en el grid de /work al pasar el mouse
    // (antes era zoom sobre la misma imagen; ahora es un cambio de foto).
    portadaHover: z.string().optional(),
    galeria: z.array(z.string()).optional(),
    creditosFotos: z.array(creditoFoto).optional(),
    dimensiones: z.string().optional(),
    materialTipo: z.string().optional(),
    variantes: z.array(variante).optional(),
    leadTime: z.string().optional(),
    badge: z.string().optional(),
    mostrarDisclaimer: z.boolean().optional().default(true),
    orden: z.number().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const colecciones = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/colecciones" }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    portada: z.string().optional(),
    // Ver el comentario equivalente en la colección `piezas`.
    portadaHover: z.string().optional(),
    galeria: z.array(z.string()).optional(),
    creditosFotos: z.array(creditoFoto).optional(),
    badge: z.string().optional(),
    orden: z.number().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const exhibiciones = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/exhibiciones" }),
  schema: z.object({
    anio: z.string(),
    nombre: z.string(),
    foto: z.string().optional(),
    orden: z.number().optional(),
  }),
});

const homeSlider = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home-slider" }),
  schema: z.object({
    imagen: z.string(),
    piezaRelacionada: z.string().optional(),
    coleccionRelacionada: z.string().optional(),
    orden: z.number(),
  }),
});

export const collections = { piezas, colecciones, exhibiciones, homeSlider };
