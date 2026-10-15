---
title: "Por qué empiezo este blog"
description: "Un sitio donde ordenar ideas sobre backend, arquitectura y lo que voy aprendiendo."
pubDate: 2026-10-15
tags: ["meta"]
draft: true
---

Este es un post de ejemplo. Está marcado como `draft: true`, así que solo se ve
con `npm run dev` y nunca llega a producción. Cámbialo a `false` (o borra la
línea) cuando quieras publicarlo.

## Cómo escribir un post

Crea un fichero `.md` en `src/content/blog/`. El nombre del fichero es la URL:
`mi-idea.md` se publica en `/blog/mi-idea/`. El frontmatter admite:

| Campo         | Obligatorio | Para qué sirve                          |
| ------------- | ----------- | --------------------------------------- |
| `title`       | sí          | Título del artículo                     |
| `description` | sí          | Resumen para el listado, SEO y RSS      |
| `pubDate`     | sí          | Fecha de publicación (`AAAA-MM-DD`)     |
| `updatedDate` | no          | Fecha de la última revisión importante  |
| `tags`        | no          | Etiquetas, p. ej. `["kafka", "ddd"]`    |
| `draft`       | no          | `true` para ocultarlo en producción     |

## Código

Los bloques de código se resaltan solos y siguen el tema claro u oscuro:

```java
public record ProductId(String value) {
    public ProductId {
        Objects.requireNonNull(value, "ProductId cannot be null");
    }
}
```

> Las citas, **negritas**, `código en línea` y [enlaces](https://ivan-ajenjo.com)
> también tienen estilo.
