# Portfolio — Ivan Ajenjo

## Stack
- Astro v5 + Tailwind CSS v4
- Desplegado en Cloudflare Pages (rama `master`, build `npm run build`, salida `dist`)
- Repo: github.com/ivanajenjo/ivanajenjo.github.io
- URL actual: https://ivan-ajenjo.com

## Estructura
- `src/layouts/Layout.astro` — layout base
- `src/pages/index.astro` — página principal
- `src/content/blog/*.md` — posts del blog (esquema en `src/content.config.ts`; `draft: true` solo se ve en dev)
- `plantillas/` — plantillas de post (TIL, tutorial, deep dive, retrospectiva); fuera de `src/` para que no se publiquen
- `src/pages/blog/` — listado (`index.astro`) y página de post (`[...slug].astro`)
- `src/pages/rss.xml.ts` y `src/pages/sitemap.xml.ts` — RSS y sitemap generados en el build
- `src/lib/posts.ts` — consulta de posts, formato de fecha y tiempo de lectura
- `src/components/` — Hero, SobreMi, Proyectos, Experiencia, Contacto, Nav (enlaces absolutos `/#about`… para que funcionen desde el blog)
- `src/styles/global.css` — tokens de tema (claro/oscuro), componentes y animaciones; las fuentes (Inter + Fira Code) se cargan en `Layout.astro`

## Comandos
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción

## Convenciones
- Idioma del código: inglés. Contenido del portfolio: inglés. Contenido del blog: español (`lang="es"`)
- IDs de secciones en inglés: #about, #projects, #experience, #contact
- Hacer commit y push sin pedir confirmación (en la rama de trabajo indicada)
- No instalar dependencias sin preguntar

## Pendiente
- Añadir foto real en la sección About
- Añadir proyectos reales cuando estén disponibles
