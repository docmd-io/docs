---
title: "Registros de cambios (Changelogs)"
description: "Genere historiales de versiones basados en líneas de tiempo y notas de lanzamiento estructuradas en docmd."
---

El contenedor `changelog` proporciona un diseño especializado para documentar la evolución del proyecto. Analiza sintácticamente los encabezados de versión o fecha en entradas verticales de línea de tiempo, garantizando que las notas de lanzamiento sigan siendo claras y fáciles de leer.

## Referencia de sintaxis

```markdown
::: changelog

== Texto de la etiqueta
La descripción de la entrada va aquí.

:::
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Marcador de entrada** | `==` | Delimitador que inicia una nueva entrada de línea de tiempo dentro del bloque del registro de cambios. |
| **Etiqueta** | `String` | Cadena de texto (por ejemplo, número de versión o fecha ISO) renderizada como una insignia de línea de tiempo en el margen izquierdo. |

## Ejemplos de uso

### Línea de tiempo del historial de lanzamientos

Los registros de cambios admiten el formato completo de Markdown dentro de cada entrada, incluidas listas, avisos y fragmentos de código:

```markdown
::: changelog

== v2.0.0 (2026-03-15)
### Reacondicionamiento principal del sistema
El motor principal se ha rediseñado para la ejecución isomórfica.

*   Se implementó el **Enrutador SPA** para navegación por páginas sin recarga.
*   Se introdujo la arquitectura de **Plugins isomórficos**.

::: callout success
Este lanzamiento ofrece una mejora del 40% en la velocidad de compilación inicial.
:::

== v1.5.1 (2025-12-10)
### Parche de seguridad
*   Se resolvió una vulnerabilidad de alta gravedad en el analizador interno.
*   Se actualizó la dependencia `flatted` a `v3.3.2`.

== v1.0.0 (2024-05-01)
Lanzamiento público inicial.

:::
```

::: changelog

== v2.0.0 (2026-03-15)
### Reacondicionamiento principal del sistema
El motor principal se ha rediseñado para la ejecución isomórfica.

*   Se implementó el **Enrutador SPA** para navegación por páginas sin recarga.
*   Se introdujo la arquitectura de **Plugins isomórficos**.

::: callout success
Este lanzamiento ofrece una mejora del 40% en la velocidad de compilación inicial.
:::

== v1.5.1 (2025-12-10)
### Parche de seguridad
*   Se resolvió una vulnerabilidad de alta gravedad en el analizador interno.
*   Se actualizó la dependencia `flatted` a `v3.3.2`.

== v1.0.0 (2024-05-01)
Lanzamiento público inicial.

:::

::: callout tip "Contexto histórico para agentes de IA" icon:sparkles
Los contenedores de registro de cambios proporcionan una hoja de ruta temporal para los agentes de IA. La estructura `::: changelog` permite a los LLM analizar cuándo se introdujeron APIs específicas o correcciones de seguridad en el flujo de contexto `llms.txt`.
:::