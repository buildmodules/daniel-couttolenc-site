import { defineConfig } from "tinacms";

// ⚠️ Estos valores vienen de tina.io al conectar el repo (gratis hasta cierto
// límite de usuarios/requests). Sin esto Tina corre solo en modo local-dev.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "piezas",
        label: "Piezas",
        path: "src/content/piezas",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL, sin espacios)",
            required: true,
          },
          {
            type: "image",
            name: "portada",
            label: "Imagen de portada",
          },
          {
            type: "image",
            name: "galeria",
            label: "Galería de imágenes",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descripción",
            isBody: true,
          },
          {
            type: "string",
            name: "dimensiones",
            label: "Dimensiones (W × D × H)",
          },
          {
            type: "string",
            name: "materialTipo",
            label: "Tipo de material (ej. Solid Wood, Cast Bronze) — default: Solid Wood",
          },
          {
            type: "object",
            name: "variantes",
            label: "Variantes de material / acabado",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.nombre ?? "Nueva variante" }),
            },
            fields: [
              { type: "string", name: "nombre", label: "Nombre del acabado", required: true },
              { type: "image", name: "imagen", label: "Imagen del acabado" },
            ],
          },
          {
            type: "string",
            name: "leadTime",
            label: "Tiempo de entrega",
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / nota especial (edición limitada, colaboración, etc.)",
          },
          {
            type: "number",
            name: "orden",
            label: "Orden en el grid (menor = primero)",
          },
          {
            type: "boolean",
            name: "destacado",
            label: "Mostrar en el home",
          },
          {
            type: "string",
            name: "metaTitle",
            label: "SEO — Meta title",
            description: "Título para buscadores y redes (tag <title> / og:title). Si se deja vacío, se usa el Título.",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "SEO — Meta description",
            description: "Descripción para buscadores y redes (meta description / og:description). 150–160 caracteres recomendado.",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "ogImage",
            label: "SEO — Open Graph image",
            description: "Imagen para compartir en redes sociales (Facebook, WhatsApp, X, iMessage). Si se deja vacía, se usa la imagen de portada.",
          },
        ],
      },
      {
        name: "exhibiciones",
        label: "Exhibitions",
        path: "src/content/exhibiciones",
        format: "md",
        ui: {
          itemProps: (item) => ({
            label: [item?.anio, item?.nombre].filter(Boolean).join(" — ") || "Nueva exhibición",
          }),
        },
        fields: [
          {
            type: "string",
            name: "anio",
            label: "Año",
            required: true,
          },
          {
            type: "string",
            name: "nombre",
            label: "Nombre / lugar",
            required: true,
          },
          {
            type: "image",
            name: "foto",
            label: "Foto representativa",
          },
          {
            type: "number",
            name: "orden",
            label: "Orden en la lista (menor = primero)",
          },
        ],
      },
      {
        name: "colecciones",
        label: "Colecciones",
        path: "src/content/colecciones",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL, sin espacios)",
            required: true,
          },
          {
            type: "image",
            name: "portada",
            label: "Imagen de portada",
          },
          {
            type: "image",
            name: "galeria",
            label: "Galería de imágenes",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descripción",
            isBody: true,
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / nota especial (edición limitada, colaboración, etc.)",
          },
          {
            type: "number",
            name: "orden",
            label: "Orden en el grid (menor = primero)",
          },
          {
            type: "boolean",
            name: "destacado",
            label: "Mostrar en el home",
          },
          {
            type: "string",
            name: "metaTitle",
            label: "SEO — Meta title",
            description: "Título para buscadores y redes (tag <title> / og:title). Si se deja vacío, se usa el Título.",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "SEO — Meta description",
            description: "Descripción para buscadores y redes (meta description / og:description). 150–160 caracteres recomendado.",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "ogImage",
            label: "SEO — Open Graph image",
            description: "Imagen para compartir en redes sociales (Facebook, WhatsApp, X, iMessage). Si se deja vacía, se usa la imagen de portada.",
          },
        ],
      },
    ],
  },
});
