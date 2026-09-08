---
title: "Plugin de búsqueda"
description: "Habilite búsqueda de texto completo rápida y sin conexión junto con incrustaciones semánticas locales en docmd."
---

El plugin `@docmd/plugin-search` proporciona un buscador del lado del cliente para su sitio de documentación. Utiliza [MiniSearch](external:https://github.com/lucaong/minisearch) para generar un índice comprimido durante la compilación, permitiendo a los lectores realizar búsquedas instantáneas sin necesidad de bases de datos en servidor ni servicios externos de indexación.

## Opciones de configuración

La búsqueda está activa por defecto en todas las plantillas estándar de `docmd`. Configure los parámetros de indexación y la ubicación en el encabezado dentro de `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la generación del índice de búsqueda. |
| `placeholder` | `string` | `'Buscar...'` | Texto de marcador de posición en el cuadro de búsqueda. |
| `maxResults` | `number` | `10` | Cantidad máxima de resultados mostrados en la ventana modal. |

### Ejemplo de integración en encabezado

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true
      }
    }
  }
}
```

## Cómo funciona la búsqueda por palabras clave

### 1. Indexación en tiempo de compilación
Durante la compilación (`npx @docmd/core build`), `@docmd/plugin-search` recorre todas las páginas del sitio, extrayendo encabezados, títulos y párrafos para producir el archivo `search-index.json`:

* **Enlaces profundos**: Registra anclas de encabezados (`#`, `##`) como destinos directos de salto.
* **Ponderación de relevancia**: Los títulos de página tienen la máxima prioridad, seguidos por encabezados de sección y párrafos de texto.

### 2. Recuperación en el cliente
Al abrir el cuadro de búsqueda (`Ctrl+K` o `/`), el navegador descarga `search-index.json`. Las consultas se ejecutan localmente con coincidencias de prefijo y distancia difusa (fuzzy matching) para tolerar errores tipográficos menores.

## Personalización del alcance de búsqueda

Para excluir documentos específicos del índice de búsqueda, agregue `noindex: true` en el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Borrador de especificación interna"
noindex: true
---
```

::: callout tip title:"Privacidad y cumplimiento" icon:shield-check
Dado que las consultas de búsqueda se procesan íntegramente en la memoria del navegador del cliente, ninguna entrada de búsqueda ni pulsación de teclado sale del dispositivo del usuario.
::: /callout

## Búsqueda semántica local sin conexión

`@docmd/plugin-search` incluye compatibilidad con búsqueda semántica local mediante `docmd-search`. La búsqueda semántica utiliza modelos de incrustaciones vectoriales ejecutados en el cliente para comprender las consultas a nivel conceptual, más allá de la simple coincidencia literal de palabras.

### Habilitación de la búsqueda semántica

1. Instale `docmd-search` en su proyecto:

```bash
npm install docmd-search
```

2. Active la indexación semántica en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### Opciones de búsqueda semántica

| Opción | Tipo | Por defecto | Propósito técnico |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | Activa la búsqueda basada en vectores e incrustaciones. |
| `showConfidence` | `boolean` | `false` | Muestra el porcentaje de similitud en los resultados de búsqueda. |
| `showFilters` | `boolean` | `true` | Muestra controles de filtro de versión en el modal de búsqueda. |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | Identificador del modelo de HuggingFace. |
| `chunkSize` | `number` | `512` | Límite de fragmentación por sección de documento. |

### Modelos de incrustaciones compatibles

| Identificador de modelo | Tamaño de descarga | Uso recomendado |
| :--- | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` *(Por defecto)* | ~23 MB | Documentación técnica en inglés |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | Sitios multilingües (alemán, español, chino, francés) |
| `Xenova/multilingual-e5-small` | ~118 MB | Amplia cobertura internacional |

::: callout info "Retirada elegante automática" icon:info
Si la opción semántica está habilitada pero las dependencias de modelos vectoriales no pueden cargarse, el buscador recurre automáticamente a la indexación estándar por palabras clave de MiniSearch.
:::
