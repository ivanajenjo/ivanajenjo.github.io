# Portfolio — Ivan Ajenjo

## Stack
- Astro v5 + Tailwind CSS v4
- Desplegado en Cloudflare Pages (rama `master`, build `npm run build`, salida `dist`)
- Repo: github.com/ivanajenjo/ivanajenjo.github.io
- URL actual: https://ivan-ajenjo.com

## Estructura
- `src/layouts/Layout.astro` — layout base
- `src/pages/index.astro` — página principal
- `src/components/` — Hero, SobreMi, Proyectos, Experiencia, Contacto, Nav
- `src/styles/global.css` — tokens de tema (claro/oscuro), componentes y animaciones; las fuentes (Inter + Fira Code) se cargan en `Layout.astro`

## Comandos
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción

## Convenciones
- Idioma del código y contenido: inglés
- IDs de secciones en inglés: #about, #projects, #experience, #contact
- Hacer commit y push sin pedir confirmación (en la rama de trabajo indicada)
- No instalar dependencias sin preguntar

## Pendiente
- Añadir foto real en la sección About
- Añadir proyectos reales cuando estén disponibles
