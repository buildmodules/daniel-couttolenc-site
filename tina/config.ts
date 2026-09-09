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
            description: "Se usa en el grid de /work.",
          },
          {
            type: "image",
            name: "portadaHover",
            label: "Imagen de portada (hover)",
            description: "Reemplaza a la portada al pasar el mouse sobre la tarjeta en /work.",
          },
          {
            type: "image",
            name: "galeria",
            label: "Galería de imágenes",
            list: true,
          },
          {
            type: "object",
            name: "creditosFotos",
            label: "Créditos de foto (opcional)",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.texto ?? "Nuevo crédito" }),
            },
            fields: [
              {
                type: "image",
                name: "imagen",
                label: "Foto (elige la misma imagen ya usada en Galería arriba)",
                required: true,
              },
              {
                type: "string",
                name: "texto",
                label: "Texto del crédito",
                description: 'Ej. "Photo courtesy of Hiperlocalidad". Se muestra solo al pasar el mouse sobre esa foto, abajo a la izquierda.',
                required: true,
              },
            ],
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
              {
                type: "string",
                name: "nombre",
                label: "Nombre del acabado",
                description:
                  'Usa "|" para partir el nombre en 2 líneas (ej. "Red Oak|Black finish" se muestra como "Red Oak" y, debajo, "Black finish"). Sin "|" se muestra en una sola línea.',
                required: true,
              },
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
            type: "boolean",
            name: "mostrarDisclaimer",
            label: "Mostrar \"Dimensions & material customizable upon request\"",
            description: "Desactívalo en piezas de edición limitada / spec fija (como KABIKI), donde no aplica personalización.",
          },
          {
            type: "number",
            name: "orden",
            label: "Orden en el grid (menor = primero)",
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
            description: "Se usa en el grid de /work.",
          },
          {
            type: "image",
            name: "portadaHover",
            label: "Imagen de portada (hover)",
            description: "Reemplaza a la portada al pasar el mouse sobre la tarjeta en /work.",
          },
          {
            type: "image",
            name: "galeria",
            label: "Galería de imágenes",
            list: true,
          },
          {
            type: "object",
            name: "creditosFotos",
            label: "Créditos de foto (opcional)",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.texto ?? "Nuevo crédito" }),
            },
            fields: [
              {
                type: "image",
                name: "imagen",
                label: "Foto (elige la misma imagen ya usada en Galería arriba)",
                required: true,
              },
              {
                type: "string",
                name: "texto",
                label: "Texto del crédito",
                description: 'Ej. "Photo courtesy of Hiperlocalidad". Se muestra solo al pasar el mouse sobre esa foto, abajo a la izquierda.',
                required: true,
              },
            ],
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
        name: "homeSlider",
        label: "Home Slider",
        path: "src/content/home-slider",
        format: "md",
        ui: {
          itemProps: (item) => ({
            label:
              `#${item?.orden ?? "?"} — ` +
              (item?.piezaRelacionada
                ? item.piezaRelacionada.split("/").pop()?.replace(/\.md$/, "")
                : item?.coleccionRelacionada
                  ? item.coleccionRelacionada.split("/").pop()?.replace(/\.md$/, "")
                  : "Sin relación"),
          }),
          defaultItem: () => ({ orden: 1 }),
        },
        fields: [
          {
            type: "image",
            name: "imagen",
            label: "Foto del slide (horizontal, escritorio)",
            required: true,
          },
          {
            type: "image",
            name: "imagenMobile",
            label: "Foto del slide (vertical, mobile)",
            description: "Toma vertical propia, no un recorte de la de escritorio — mantiene su propio aspect ratio en mobile.",
          },
          {
            type: "reference",
            name: "piezaRelacionada",
            label: "Pieza relacionada",
            collections: ["piezas"],
          },
          {
            type: "reference",
            name: "coleccionRelacionada",
            label: "Colección relacionada",
            collections: ["colecciones"],
          },
          {
            type: "number",
            name: "orden",
            label: "Orden en el slider (menor = primero)",
            required: true,
          },
        ],
      },
    ],
  },
});
