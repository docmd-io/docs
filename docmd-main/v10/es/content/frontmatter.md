---
title: "Referencia de Frontmatter"
description: "Configure metadatos a nivel de página, indexación de búsqueda, anulaciones de diseño y controles de componentes en docmd."
---

El Frontmatter permite realizar anulaciones de configuración a nivel de página. Declare metadatos YAML en la parte superior absoluta de sus archivos Markdown entre delimitadores de triple guion (`---`).

## Propiedades de metadatos principales

| Clave | Tipo | Descripción |
| :--- | :--- | :--- |
| `title` | `String` | **Recomendado.** Establece la etiqueta HTML `<title>` y el encabezado principal de la página. |
| `description` | `String` | Establece la metadescripción para SEO, motores de búsqueda, `llms.txt` y manifiestos OKF. |
| `keywords` | `Array \| String` | Palabras clave de búsqueda para `<meta name="keywords">`, extraídas también como etiquetas para paquetes OKF. |
| `tags` | `Array \| String` | Etiquetas de concepto para manifiestos de Open Knowledge Format (`/okf/`) y gráficos de conocimiento. |

::: callout tip "Mejores prácticas de metadatos" icon:sparkles
Proporcionar un `title` y una `description` explícitos en el frontmatter garantiza que los motores de búsqueda y los generadores de contexto de IA indexen su documentación con precisión.
:::

## Controles de indexación y visibilidad

| Clave | Tipo | Descripción |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Cuando es `true`, excluye la página de índices de búsqueda, mapas del sitio y paquetes de IA. |
| `okf` | `Boolean` | Establezca en `false` para excluir el documento exclusivamente de los paquetes OKF (`/okf/`). |
| `llms` | `Boolean` | Establezca en `false` para excluir el documento de los archivos de contexto de IA compilados (`llms.txt`). |
| `type` | `String` | Clasificación de tipo de concepto explícita para paquetes OKF (por ejemplo, `guide`, `api`, `concept`). |
| `hideTitle` | `Boolean` | Cuando es `true`, oculta el título principal del área del encabezado de la página. |
| `bodyClass` | `String` | Añade clases CSS personalizadas al elemento `<body>` de nivel superior. |

## Configuración de diseño y ventana gráfica

| Clave | Tipo | Descripción |
| :--- | :--- | :--- |
| `layout` | `String` | Establezca en `"full"` para expandir el ancho del contenido y desactivar la tabla de contenidos (TOC). |
| `toc` | `Boolean` | Establezca en `false` para desactivar la barra lateral de la tabla de contenidos de la derecha. |
| `noStyle` | `Boolean` | Desactiva los elementos de la interfaz estándar (Barra lateral, Encabezado, Pie de página) para páginas HTML a medida. |
| `titleSeparator` | `String` | Delimitador de título personalizado para esta página (p. ej. `"-"`, `"|"`). Los espacios se añaden automáticamente. |
| `titleAppend` | `Boolean` | Establezca en `false` para evitar añadir el título global del sitio al `<title>` HTML y tarjetas sociales. |

### Controles detallados de componentes (`noStyle`)

Cuando `noStyle: true` está activo, especifique componentes de la interfaz individuales para preservar:

```yaml
---
noStyle: true
components:
  meta: true      # Inyecta metadatos SEO
  favicon: true   # Inyecta el favicon del sitio
  css: true       # Inyecta docmd-main.css
  theme: true     # Inyecta estilos específicos del tema
  highlight: true # Inyecta el resaltado de sintaxis
  scripts: true   # Inyecta la lógica del enrutador SPA
  sidebar: true   # Inyecta la barra lateral de navegación
  footer: true    # Inyecta el pie de página del sitio
---
```

## Anulaciones de plugins y SEO

| Clave | Tipo | Descripción |
| :--- | :--- | :--- |
| `image` | `String` | URL para tarjetas de vista previa en redes sociales (`og:image`). |
| `aiBots` | `Boolean` | Establezca en `false` para evitar que los rastreadores de IA raspen la página. |
| `canonicalUrl` | `String \| Boolean` | URL canónica personalizada para indexación SEO o `false` para suprimir la etiqueta canónica. |
| `ldJson` | `Object \| Array` | Datos estructurados Schema.org JSON-LD personalizados inyectados en el `<head>` de la página. |
| `seo` | `Object` | Anulaciones de configuración SEO anidadas (`titleSeparator`, `titleAppend`, `breadcrumbs`, `ldJson`, etc.). |