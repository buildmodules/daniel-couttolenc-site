// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: actualizar cuando se conecte el dominio definitivo en Netlify —
  // se usa para generar URLs absolutas (canonical, Open Graph, Twitter card).
  site: 'https://danielcouttolenc.com',
  devToolbar: { enabled: false },
});
