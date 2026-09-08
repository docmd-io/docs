---
title: "Plugin de paquetes OKF"
description: "Genere paquetes de conocimiento en formato Open Knowledge Format (OKF) y grafos conceptuales interactivos para agentes de IA."
---

El plugin `@docmd/plugin-okf` compila un paquete de conocimiento estructurado en **[Open Knowledge Format][okf-spec]** (OKF) durante la generación estática. OKF es una especificación abierta e independiente de proveedores diseñada para estructurar metadatos, grafos de conceptos y contextos temáticos para agentes de IA y flujos de trabajo con modelos de lenguaje.

El plugin está **activo por defecto**. Los paquetes OKF se generan en `site/okf/` en cada compilación del sitio.

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Visión arquitectónica

OKF organiza el conocimiento en una estructura de directorios portátil con manifiestos YAML, conceptos en Markdown y visualizaciones de grafos dirigidos por fuerzas.

### Principios de diseño

1. **Requisitos estructurales mínimos**: Cada entrada de concepto solo necesita el campo `type`.
2. **Independencia de productores y consumidores**: Archivos Markdown escritos por humanos se transforman en esquemas estándar consultables por cualquier framework de IA.
3. **Neutralidad respecto a proveedores**: Independiente de proveedores de nube, plataformas de modelos o motores vectoriales específicos.

## Estructura generada

La compilación produce el siguiente árbol de directorios:

```text
site/okf/
├── okf.yaml              ← Archivo de resumen del manifiesto
├── index.md              ← Catálogo de conceptos agrupados por tipo
├── graph/                ← Visualizador de grafos (cuando graph: true)
│   ├── index.html        ← Aplicación interactiva del grafo
│   ├── graph.json        ← Nodos y aristas del grafo
│   ├── graph.js          ← Runtime independiente del grafo
│   └── graph.css         ← Estilos acordes al tema
├── concepts/
│   └── <slug>.md         ← Archivos individuales de concepto en Markdown
└── _meta/
    ├── bundle.json       ← Espejo JSON de okf.yaml
    └── lint-report.txt   ← Informes de validación de compilación
```

## Comportamiento por defecto

El plugin OKF se ejecuta automáticamente en cada compilación:

* **Ámbito del idioma predeterminado**: Genera conceptos para el idioma principal en la raíz del paquete.
* **Inferencia automática de tipos**: Clasifica rutas como `/api/`, `/guides/`, `/reference/`, `/concepts/`, `/runbooks/`, `/datasets/`, `/metrics/` y `/tables/` en conceptos tipados.
* **Markdown íntegro**: Copia el contenido y frontmatter de cada página a los archivos de concepto.

### Desactivación del plugin

Desactive la generación de OKF en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "okf": false
  }
}
```

O bien establezca `enabled: false`:

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "enabled": false
    }
  }
}
```

## Opciones de configuración

Configure los parámetros de OKF en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la generación del paquete OKF. |
| `outputDir` | `string` | `'okf'` | Directorio de salida relativo a la raíz del sitio. |
| `bundleName` | `string` | `config.title` | Nombre del paquete en `okf.yaml` y cabeceras del grafo. |
| `defaultType` | `string` | `'concept'` | Tipo de concepto predeterminado para páginas sin etiquetar. |
| `typeField` | `string` | `'type'` | Clave de frontmatter utilizada para clasificar el tipo. |
| `warnOnMissingType` | `boolean` | `true` | Emite avisos en la terminal para páginas que recurran a `defaultType`. |
| `includeFullMarkdown` | `boolean` | `true` | Incluye el cuerpo Markdown completo en los conceptos. |
| `graph` | `boolean` | `false` | Genera el visualizador de grafos interactivo en `graph/`. |
| `localeStrategy` | `'default-only' \| 'folders'` | `'default-only'` | Estrategia para sitios con varios idiomas. |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "outputDir": "knowledge",
      "defaultType": "concept",
      "graph": true
    }
  }
}
```

### Estrategia de carpetas para varios idiomas

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "localeStrategy": "folders"
    }
  }
}
```

Estructura resultante:

```text
site/okf/                    ← Idioma predeterminado (raíz)
├── okf.yaml
├── index.md
└── concepts/

site/okf/es/                 ← Idioma español (subcarpeta)
├── okf.yaml
└── concepts/
```

## Exclusión de páginas

Excluya páginas individuales mediante el frontmatter:

```yaml
---
title: "Nota operativa interna"
okf: false # Excluye la página únicamente de los paquetes OKF
---
```

Para excluir una página de forma global en mapas de sitio, búsqueda, archivos de LLM y OKF, utilice `noindex: true`.

::: callout tip "Visualización del grafo de conocimiento" icon:git-fork
Active `graph: true` en la configuración del plugin OKF para generar un mapa interactivo (`site/okf/graph/index.html`) con las relaciones conceptuales y referencias cruzadas de su documentación.
:::
