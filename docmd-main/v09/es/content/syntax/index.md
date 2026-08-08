---
title: "Base de sintaxis Markdown"
description: "Domine la tipografía Markdown básica, jerarquía de encabezados, listas, tablas y extensiones HTML sin procesar en docmd."
---

`docmd` cumple con las especificaciones estándar de **GitHub Flavored Markdown (GFM)**. Esta página cubre la tipografía básica y las primitivas estructurales utilizadas en toda su documentación.

## Primitivas de tipografía

| Estilo | Sintaxis | Salida de renderizado |
| :--- | :--- | :--- |
| **Negrita** | `**texto**` | **Énfasis fuerte** |
| *Cursiva* | `*texto*` | *Énfasis suave* |
| ~~Tachado~~ | `~~texto~~` | ~~Contenido en desuso~~ |
| `Código en línea` | `` `texto` `` | `engine.initialise()` |

## Reglas de jerarquía de encabezados

`docmd` deriva el encabezado principal `<h1>` del documento automáticamente de la propiedad `title` del frontmatter. Estructure los encabezados de sección comenzando en `##` (`h2`):

```markdown
## Nivel 2 - Sección principal
### Nivel 3 - Subtema de característica
#### Nivel 4 - Subsección detallada
```

::: callout tip "Estructura de encabezados para búsqueda e IA" icon:sparkles
Mantenga una jerarquía secuencial de encabezados sin omitir niveles (por ejemplo, saltar directamente de `##` a `####`). Una estructura consistente permite a los agentes de IA y a los indexadores de búsqueda mapear su contenido con precisión.
:::

## Listas

Utilice listas con viñetas para resúmenes fáciles de leer y listas ordenadas para flujos de trabajo secuenciales. Para tutoriales de varios pasos, utilice el [Contenedor de pasos](../containers/steps.md) dedicado:

```markdown
*   Lista de características sin ordenar
*   Punto secundario

1.  Inicializar entorno del espacio de trabajo
2.  Ejecutar comando de compilación
```

## Citas en bloque

Las citas en bloque estándar `>` destacan citas externas o avisos contextuales:

```markdown
> El motor docmd redefine los límites entre la generación de sitios estáticos y la entrega web dinámica.
```

> El motor docmd redefine los límites entre la generación de sitios estáticos y la entrega web dinámica.

## Tablas

Formatee datos tabulares utilizando la sintaxis de tubos de GFM:

```markdown
| Parámetro | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `undefined` | Identificador clave. |
| `active` | `Boolean` | `true` | Interruptor de estado de habilitación. |
```

| Parámetro | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `undefined` | Identificador clave. |
| `active` | `Boolean` | `true` | Interruptor de estado de habilitación. |

## Integración de HTML sin procesar

`docmd` analiza HTML en línea directamente. Utilice elementos HTML sin procesar al diseñar componentes de inicio a medida o widgets incrustados:

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  Los elementos HTML a medida se renderizan en línea sin problemas.
</div>
```