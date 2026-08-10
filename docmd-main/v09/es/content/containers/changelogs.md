---
title: "Registro de Cambios (Changelogs)"
description: "Genera historiales de versiones basados en líneas de tiempo y notas de lanzamiento en docmd."
---

El contenedor `changelog` proporciona un diseño especializado para documentar la evolución del proyecto. Transforma encabezados de versión o fecha en entradas de línea de tiempo vertical.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: changelog # Apertura del contenedor exterior de historial
::: log [title:"v1.0.0 (AAAA-MM-DD)"] # Apertura de entrada de versión individual
Detalles del lanzamiento (encabezados Markdown, viñetas, avisos)...
::: /log # Cierre explícito de la entrada de log

::: log [title:"v0.9.0 (AAAA-MM-DD)"] # Segunda versión
Notas de lanzamiento...
::: /log
::: /changelog # Cierre explícito del historial
```

## Características y Atributos Soportados

| Parámetro / Elemento | Tipo | Descripción |
| :--- | :--- | :--- |
| **Etiqueta de Versión** | `"String"` \| `title:"..."` | Número de versión o fecha mostrada como una insignia en el margen izquierdo. |
| **Subcontenedores** | `::: log` ... `::: /log` | Envoltorios de versión explícitos. La sintaxis heredada `== Versión` es totalmente compatible. |
| **Etiquetas de Cierre** | `::: /changelog`, `::: /log`, `:::` | Soporta etiquetas de cierre explícitas o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) and valores posicionales.
:::


## Ejemplos de Uso

```markdown
::: changelog # Historial de producción
::: log "v2.0.0 (2026-03-15)" # Versión principal
### Reestructuración Principal del Sistema
El motor central ha sido rediseñado para ejecución isomórfica.
::: /log

::: log "v1.5.1 (2025-12-10)" # Parche
### Parche de Seguridad
*   Se corrigió vulnerabilidad en el analizador interno.
::: /log
::: /changelog
```

::: changelog # Historial de producción
::: log "v2.0.0 (2026-03-15)" # Versión principal
### Reestructuración Principal del Sistema
El motor central ha sido rediseñado para ejecución isomórfica.
::: /log

::: log "v1.5.1 (2025-12-10)" # Parche
### Parche de Seguridad
*   Se corrigió vulnerabilidad en el analizador interno.
::: /log
::: /changelog