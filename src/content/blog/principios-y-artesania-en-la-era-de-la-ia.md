---
title: "Ahora más que nunca: principios y artesanía de software"
description: "Si escribir código ya no es el cuello de botella, lo que nos diferencia es saber qué código merece existir. Por qué los principios importan más en la era de los agentes."
pubDate: 2026-10-15
tags: ["artesanía de software", "diseño", "ia", "buenas prácticas"]
draft: false
---

Hace unos años, la pregunta en una revisión de código era "¿esto funciona?".
Hoy, con un agente capaz de generar un servicio completo en minutos, la
pregunta ha cambiado: **"¿esto debería existir así?"**.

Escribir código ha dejado de ser lo caro. Lo caro sigue siendo lo de siempre:
entender el problema, decidir dónde va cada responsabilidad y mantener el
sistema vivo durante años. Y eso es justo lo que los principios de software y
la artesanía llevan décadas intentando enseñarnos.

## El cuello de botella se ha movido

Durante mucho tiempo, el ritmo de un equipo lo marcaba cuánto código podía
escribir. Esa limitación tenía un efecto secundario útil: cada línea costaba
esfuerzo, así que nos lo pensábamos dos veces antes de añadirla.

Esa fricción ha desaparecido. Ahora es trivial generar mil líneas que compilan,
pasan los tests que el propio agente ha escrito y parecen razonables. El
problema es que **el código que parece razonable no es lo mismo que el código
correcto para tu dominio**. Y el coste de mantener esas mil líneas no ha bajado
nada.

Si producir es casi gratis, el valor está en:

- **Decidir qué no escribir.** Cada línea es una responsabilidad que alguien
  tendrá que entender, probar y cambiar.
- **Leer y revisar con criterio.** Pasamos más tiempo leyendo código ajeno
  (humano o generado) que escribiéndolo.
- **Diseñar los límites.** Dónde termina un módulo, qué conoce de los demás y
  qué invariantes protege.

## Los principios son contexto comprimido

SOLID, alta cohesión y bajo acoplamiento, la ley de Demeter, DRY bien
entendido... No son reglas de estilo. Son lecciones aprendidas, comprimidas en
pocas palabras, sobre qué hace que un sistema sea fácil o doloroso de cambiar.

Un agente conoce todos esos principios. Lo que no tiene es tu contexto: qué
parte del dominio es estable y cuál cambia cada trimestre, qué equipo es dueño
de qué, qué decisión tomasteis hace dos años y por qué. **Aplicar un principio
es una decisión de diseño, no una plantilla**, y las decisiones de diseño
necesitan a alguien que entienda el negocio.

Un ejemplo que veo a menudo. Pídele a un asistente "añade la lógica para
descatalogar un producto" y es muy probable que obtengas algo así:

```java
@Service
public class ProductService {

    public void discontinue(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        if (product.getStatus() == Status.ACTIVE && product.getStock() == 0) {
            product.setStatus(Status.DISCONTINUED);
            product.setDiscontinuedAt(Instant.now());
            productRepository.save(product);
            kafkaTemplate.send("product-events", new ProductDiscontinued(productId));
        }
    }
}
```

Funciona. Pero la regla de negocio vive en un servicio, el modelo es un saco de
getters y setters, la condición falla en silencio y la infraestructura está
mezclada con el dominio. Mañana alguien añadirá otro método que cambie el
estado sin pasar por esa comprobación.

Con un poco de diseño, la regla vuelve a donde pertenece:

```java
public class Product {

    public ProductDiscontinued discontinue(Clock clock) {
        if (status != Status.ACTIVE) {
            throw new ProductNotActiveException(id);
        }
        if (hasStock()) {
            throw new ProductStillHasStockException(id);
        }
        this.status = Status.DISCONTINUED;
        this.discontinuedAt = clock.instant();
        return new ProductDiscontinued(id, discontinuedAt);
    }
}
```

El agregado protege su invariante, los errores tienen nombre, el tiempo se
puede controlar en los tests y publicar el evento es asunto de otra capa. Ninguna
de estas decisiones es exótica: es diseño orientado al dominio de toda la vida.
La diferencia es que **alguien tuvo que saber que hacía falta**.

## La artesanía es una forma de trabajar, no de escribir

Cuando se habla de artesanía de software, mucha gente piensa en código bonito.
Para mí es otra cosa: una actitud de responsabilidad sobre lo que entregas.
No basta con que funcione; tiene que estar bien hecho, aportar valor de forma
continuada y poder evolucionar.

Esa actitud encaja especialmente bien con trabajar junto a agentes:

### Pasos pequeños y feedback rápido

Los agentes son buenos generando mucho de golpe. Justo por eso conviene
pedirles poco cada vez. Un cambio pequeño se revisa de verdad; un PR de
2.000 líneas se aprueba por agotamiento.

### Los tests como especificación

Si dejas que el mismo agente escriba la implementación y los tests, a menudo
obtienes tests que confirman lo que el código hace, no lo que debería hacer.
Escribir tú los casos importantes (o al menos revisarlos con lupa) es la forma
más barata de fijar la intención. TDD vuelve a tener mucho sentido: el test es
el contrato que le das al agente.

### Nombres y lenguaje ubicuo

Un buen nombre es documentación que no se queda desactualizada. Y cuanto más
claro es el lenguaje del dominio en el código, mejor contexto tiene cualquier
herramienta (o persona) que llegue después.

### Refactorizar sin miedo

Con el coste de escribir por los suelos, refactorizar también es más barato
que nunca. Lo que hace falta es la red de seguridad: tests fiables y límites
claros entre módulos. Sin eso, cada cambio generado es una apuesta.

## Lo que no ha cambiado

Hay una idea que me ronda desde hace tiempo: **las herramientas amplifican lo
que ya eres**. Un equipo con buenos hábitos, con agentes, entrega más y mejor.
Un equipo sin criterio, con agentes, genera deuda técnica a una velocidad que
antes era imposible.

Por eso creo que este es el mejor momento para volver a los fundamentos. No
como nostalgia, sino como ventaja competitiva:

- Entender el dominio antes de abrir el editor.
- Diseñar límites explícitos y proteger las invariantes.
- Trabajar en pasos pequeños, con tests que expresen intención.
- Revisar el código generado con el mismo rigor que el de un compañero.
- Dejar el código un poco mejor de lo que lo encontraste.

Los agentes han cambiado cómo escribimos software. No han cambiado qué hace que
un software sea bueno. Y esa parte sigue siendo nuestra.
