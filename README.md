# Portfolio Iván Ajenjo

Sitio estático con [Astro](https://astro.build), desplegado en Cloudflare Pages.

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera ./dist
```

## Cloudflare Pages

Workers & Pages → Create → Pages → Connect to Git, y configura:

| Ajuste | Valor |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable `NODE_VERSION` | `22` |
