---
title: "Configuración de navegación"
description: "Estructure la navegación de la barra lateral, organice categorías y configure iconos para lectores y motores de búsqueda en docmd."
---

`docmd` proporciona un control explícito sobre la jerarquía de navegación de su sitio. Una barra lateral estructurada crea una secuencia de lectura lógica, optimizando tanto la experiencia del usuario de la aplicación de una sola página (SPA) como la indexación en motores de búsqueda.

## El esquema de navegación

El array `navigation` en `docmd.config.json` controla la barra lateral. Cada objeto representa un enlace directo a una página o un grupo de categorías anidado:

<img width="260" class="with-border" src="/assets/previews/navigation-hierarchy.webp">

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Descripción general", "path": "/", "icon": "home" },
    { "title": "Inicio rápido", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## Propiedades de enlace compatibles

Cada elemento del array de navegación admite las siguientes propiedades:

| Propiedad | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Sí | Etiqueta del menú mostrada en la barra lateral. |
| `path` | `String` | No | Ruta URL de destino. Las rutas locales relativas deben comenzar con una barra diagonal (`/`). |
| `icon` | `String` | No | Nombre de cualquier [Icono de Lucide](external:https://lucide.dev/icons) en formato kebab-case (por ejemplo, `git-branch`). |
| `children` | `Array` | No | Array de elementos de navegación anidados que definen un submenú. |
| `collapsible`| `Boolean`| No | Cuando es `true`, permite expandir o colapsar grupos de categorías. |
| `external` | `Boolean`| No | Cuando es `true`, abre el enlace de destino en una nueva pestaña del navegador. |

## Organización de grupos de navegación

Estructure su barra lateral utilizando dos patrones de agrupación principales:

### Encabezados de categoría interactivos (Página de inicio + Hijos)

Especifique un `path` junto con `children` para una sección de categoría. Hacer clic en el encabezado navega a la página de inicio y alterna los elementos hijos:

```json "docmd.config.json"
{
  "title": "Servicios en la nube",
  "path": "/cloud/overview", 
  "children": [
    { "title": "Configuración de AWS", "path": "/cloud/aws" },
    { "title": "Configuración de GCP", "path": "/cloud/gcp" }
  ]
}
```

### Etiquetas de categoría estáticas (Solo encabezados de grupo)

Omita la propiedad `path`. El encabezado de la categoría actúa como un título no interactivo que agrupa enlaces relacionados:

```json "docmd.config.json"
{
  "title": "Formato y elementos",
  "icon": "layout-grid",
  "children": [
    { "title": "Guía de sintaxis", "path": "/content/syntax" },
    { "title": "Contenedores enriquecidos", "path": "/content/containers" }
  ]
}
```

## Migas de pan contextuales

El motor resuelve las migas de pan contextuales para cada página dinámicamente, renderizándolas sobre el encabezado principal de la página:

<img width="500" class="with-border" src="/assets/previews/navigation-breadcrumb.webp">

- **Rastreo automático de rutas**: El motor rastrea la ruta activa a través del árbol de navegación para construir los segmentos de migas de pan.
- **Indicador de página activa**: El documento actual se muestra como el elemento final no enlazado.
- **Diseño adaptable**: Las migas de pan se adaptan dinámicamente a ventanas gráficas móviles pequeñas.

Para desactivar las migas de pan globalmente, actualice `layout.breadcrumbs`:

```json "docmd.config.json"
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## Resolución de navegación en cascada

`docmd` utiliza un sistema de resolución en cascada donde "el archivo más cercano gana". Esto permite que las subcarpetas con versión o localizadas definan barras laterales dedicadas sin duplicar opciones globales:

```text
mi-proyecto/
├── docmd.config.json         [Nivel 3: Config global] - Respaldo predeterminado
├── docs-v1.0/ 
│   ├── navigation.json       [Nivel 2: Navegación de versión] - Anula global
│   └── zh/
│       └── navigation.json   [Nivel 1: Navegación de idioma] - Máxima prioridad
```

1. **Nivel 1 (Específico del idioma)**: `navigation.json` dentro de una carpeta de idioma anula la navegación para ese idioma y versión.
2. **Nivel 2 (Específico de la versión)**: `navigation.json` dentro de una carpeta de versión anula la navegación global para esa versión específica.
3. **Nivel 3 (Base global)**: El array `navigation` en `docmd.config.json` sirve como respaldo base.

### Protección contra enlaces rotos

Durante la resolución de respaldo del Nivel 2 o 3, el motor comprueba si los archivos de destino existen en el disco. Las rutas inexistentes se filtran de la barra lateral renderizada automáticamente.

## Integración del sistema de iconos

`docmd` integra el conjunto completo de **Iconos de Lucide** de forma nativa. Pase cualquier nombre de icono oficial de Lucide en formato kebab-case (por ejemplo, `settings`, `folder-open`, `book-marked`) para aplicar un icono.

::: callout tip "Optimización de etiquetas de la barra lateral para motores de IA" icon:sparkles
Mantenga los títulos de la barra lateral claros y concisos. Un árbol de navegación estructurado ayuda a los agentes de IA a analizar eficientemente la estructura de su documentación a través del extremo compilado `llms.txt`.
:::