# Plantillas para el blog

Cuatro estructuras para escribir posts sin quedarse en blanco. Están fuera de
`src/` a propósito, para que Astro no las publique.

| Plantilla | Para qué | Longitud |
| --------- | -------- | -------- |
| [`til.md`](til.md) | Algo pequeño y concreto que acabas de aprender | 150–400 palabras |
| [`tutorial.md`](tutorial.md) | Enseñar a montar algo paso a paso | 800–1.500 palabras |
| [`deep-dive.md`](deep-dive.md) | Explicar cómo funciona algo por dentro | 1.500–3.000 palabras |
| [`retrospectiva.md`](retrospectiva.md) | Contar un proyecto: decisiones, fallos y lecciones | 800–2.000 palabras |

Si dudas, empieza por un TIL.

## Cómo usarlas

1. Copia la plantilla a `src/content/blog/` con el nombre que quieras como URL:

   ```sh
   cp plantillas/til.md src/content/blog/kafka-mensajes-duplicados.md
   ```

2. Rellena el frontmatter y cambia `AAAA-MM-DD` por la fecha.
3. Escribe siguiendo los comentarios `<!-- ... -->` de cada sección. No se ven
   en la web, pero conviene borrarlos antes de publicar.
4. Revisa el post con `npm run dev` (los borradores solo se ven ahí).
5. Para publicar, cambia `draft: true` a `false` y haz push a `master`.

## Consejos para escribir

- **Escribe como hablas.** Imagina que se lo explicas a un compañero.
  Frases cortas y en primera persona.
- **Primero el borrador feo, luego la edición.** No corrijas mientras escribes.
- **Empieza por el código.** Si no sabes cómo empezar, pega el fragmento clave
  y explícalo hacia arriba y hacia abajo.
- **Una idea por post.** Si salen dos, son dos posts.
- **Lee el post en voz alta antes de publicar.** Lo que suena raro, se reescribe.
- **El título dice lo que el lector se lleva.** Mejor "Cómo evitar mensajes
  duplicados en Kafka" que "Reflexiones sobre Kafka".
