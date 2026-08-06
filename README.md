# Portfolio CMS — Daniel Couttolenc

Stack: Astro + TinaCMS + GitHub + Netlify

## Setup

```bash
npm install
npm run dev
```

Admin de Tina disponible en `/admin` cuando corres `npm run dev` o en producción
tras conectar el repo en https://app.tina.io (necesitas `TINA_CLIENT_ID` y
`TINA_TOKEN` como variables de entorno en Netlify).

## Estructura

- `src/content/piezas/` — piezas individuales (.md)
- `src/content/colecciones/` — colecciones/álbumes (.md)
- `tina/config.ts` — schema del CMS, editable sin tocar el frontend
- `src/pages/` — rutas: home (grid mixto paginado), /piezas/[slug], /colecciones/[slug], /contacto, /nosotros

## Pendientes antes de producción

1. Reemplazar `FORMSPREE_ENDPOINT` en `src/pages/contacto.astro` con tu endpoint real.
2. Crear cuenta en tina.io, conectar el repo, obtener `TINA_CLIENT_ID` / `TINA_TOKEN`,
   configurarlos como env vars en Netlify.
3. Subir imágenes reales a `public/images/` (o migrar a un servicio de imágenes
   externo si el catálogo crece — ver conversación de arquitectura).
4. La sección "Exhibitions" en /nosotros está hardcoded — decidir si el cliente
   la va a editar seguido; si sí, hay que moverla a una colección de Tina.
5. Conectar dominio y confirmar DNS (ver plan de migración de Bluehost).
