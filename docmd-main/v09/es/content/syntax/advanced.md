---
title: "Sintaxis avanzada de Markdown"
description: "Domine las características extendidas de GFM: listas de tareas, atributos de elementos, notas al pie, listas de definiciones y abreviaturas en docmd."
---

Más allá de las primitivas de Markdown estándar, `docmd` admite extensiones de GitHub Flavored Markdown (GFM) y analizadores de atributos de elementos personalizados. Estas primitivas proporcionan un control detallado sobre la semántica del documento y el estilo de los elementos.

## Listas de tareas

Renderice listas de tareas interactivas o de solo lectura para la planificación de lanzamientos y el seguimiento de características:

```markdown
- [x] Optimización del rendimiento del motor completada
- [ ] Finalización de la API de plugins
- [ ] Auditoría de documentación y sincro de localización
```

- [x] Optimización del rendimiento del motor completada
- [ ] Finalización de la API de plugins
- [ ] Auditoría de documentación y sincro de localización

## Emojis en línea

Incorpore códigos cortos de emojis estándar en línea dentro de la prosa Markdown:

```markdown
¡Nos encanta :heart: los motores de documentación de alto rendimiento! :rocket: :sparkles:
```

¡Nos encanta :heart: los motores de documentación de alto rendimiento! :rocket: :sparkles:

## Atributos de elementos personalizados (`{ }`)

Adjunte ID únicos, clases CSS personalizadas y estilos en línea a encabezados, imágenes y enlaces mediante la notación de bloques de atributos `{ }`.

### Identificadores de elementos (`#id`)

Asigne ID de elementos HTML personalizados para permitir enlaces profundos directos a subsecciones técnicas:

```markdown
## Puntos de referencia de rendimiento {#benchmarks-2026}
```

### Clases de utilidad CSS (`.class`)

Aplique clases de utilidad directamente sin escribir HTML en línea personalizado:

```markdown
## Título de sección centrado {.text-centre .text-accent}
```

### Enlaces con estilo de botón

Transforme enlaces Markdown estándar en botones de llamada a la acción:

```markdown
[Descargar último lanzamiento](#download){.docmd-button}
```

## Notas al pie del documento

Inyecte citas técnicas o detalles de referencia como notas al pie. El compilador recopila y renderiza las notas al pie en la parte inferior del documento automáticamente:

```markdown
Las decisiones arquitectónicas se documentan en la RFC.[^1]

[^1]: RFC-42: Arquitectura del motor de renderizado isomórfico.
```

Las decisiones arquitectónicas se documentan en la RFC.[^1]

[^1]: RFC-42: Arquitectura del motor de renderizado isomórfico.

## Listas de definiciones

Estructure listas de referencias de parámetros de API y glosarios de terminología:

```markdown
NombrePropiedad
: La cadena identificadora única para la propiedad de configuración.

ValorPredeterminado
: El valor de respaldo aplicado cuando no se especifica ninguna anulación de propiedad.
```

NombrePropiedad
: La cadena identificadora única para la propiedad de configuración.

ValorPredeterminado
: El valor de respaldo aplicado cuando no se especifica ninguna anulación de propiedad.

## Abreviaturas globales

Defina abreviaturas de términos globalmente en un documento. Al pasar el cursor sobre el término definido se muestra una explicación emergente interactiva:

```markdown
*[SPA]: Single Page Application
El enrutador docmd ofrece una experiencia de lectura SPA de alto rendimiento.
```

*[SPA]: Single Page Application
El enrutador docmd ofrece una experiencia de lectura SPA de alto rendimiento.

::: callout tip "Precisión semántica para agentes de IA" icon:sparkles
Las definiciones semánticas explícitas, las notas al pie y las abreviaturas proporcionan contexto técnico de alta fidelidad a los agentes de IA que leen el flujo de contexto `llms.txt`.
:::