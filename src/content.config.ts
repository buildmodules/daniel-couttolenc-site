import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const variante = z.object({
  nombre: z.string(),
  imagen: z.string().optional(),
});

const piezas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/piezas" }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    portada: z.string().optional(),
    galeria: z.array(z.string()).optional(),
    dimensiones: z.string().optional(),
    materialTipo: z.string().optional(),
    variantes: z.array(variante).optional(),
    leadTime: z.string().optional(),
    badge: z.string().optional(),
    orden: z.number().optional(),
    destacado: z.boolean().optional().default(true),
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
    galeria: z.array(z.string()).optional(),
    badge: z.string().optional(),
    orden: z.number().optional(),
    destacado: z.boolean().optional().default(true),
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

export const collections = { piezas, colecciones, exhibiciones };
