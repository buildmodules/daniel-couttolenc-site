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
        ui: {
          router: ({ document }) => `/piezas/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            isTitle: true,
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
            type: "number",
            name: "orden",
            label: "Orden en el grid (menor = primero)",
          },
          {
            type: "boolean",
            name: "destacado",
            label: "Mostrar en el home",
          },
        ],
      },
      {
        name: "colecciones",
        label: "Colecciones",
        path: "src/content/colecciones",
        format: "md",
        ui: {
          router: ({ document }) => `/colecciones/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "Título",
            isTitle: true,
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
            type: "number",
            name: "orden",
            label: "Orden en el grid (menor = primero)",
          },
          {
            type: "boolean",
            name: "destacado",
            label: "Mostrar en el home",
          },
        ],
      },
    ],
  },
});
