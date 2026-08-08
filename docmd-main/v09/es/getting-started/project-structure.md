---
title: "Estructura del proyecto"
description: "Aprenda cómo `@docmd/core` mapea carpetas físicas y archivos Markdown a URLs dinámicas y una navegación limpia."
---

El compilador utiliza su sistema de archivos local como la fuente de verdad. Los directorios se convierten en secciones de navegación, los archivos Markdown en páginas de contenido y la jerarquía de su sistema de archivos se traduce directamente en URLs web.

## 1. Estructura estándar del proyecto

Ejecute `npx @docmd/core init` para establecer un diseño de espacio de trabajo mínimo. Esta estructura mantiene el contenido fuente separado de los recursos y las compilaciones de producción.

```text
mis-docs/
├── docs/                 ← Directorio fuente que contiene sus páginas Markdown (.md)
│   └── index.md          ← La página de inicio (se resuelve en /)
├── assets/               ← Recursos web estáticos cargados directamente por el motor
│   ├── css/              ← Hojas de estilo personalizadas para personalizar el diseño
│   ├── js/               ← Scripts personalizados para extender la lógica del navegador
│   └── images/           ← Logotipos de marca, iconos e ilustraciones integradas
├── docmd.config.json     ← Esquema de configuración central
├── package.json          ← Manifiesto de dependencias de Node y scripts
└── site/                 ← Directorio de salida de compilación de producción optimizado
```

::: callout info "Resolución del archivo de configuración" icon:settings
`docmd.config.json` (o `docmd.config.ts`) es el formato de configuración primario y recomendado. El formato heredado `docmd.config.js` actúa estrictamente como una alternativa cuando faltan los archivos de configuración `.json` o `.ts`.
:::

## 2. Mapeo de directorios y URLs

El compilador mapea los archivos dentro de su carpeta fuente directamente a URLs públicas. No hay extensiones `.html` finales ni reglas de enrutamiento complejas.

| Archivo Fuente | Ruta URL Resuelta | Propósito |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | Página de inicio |
| `docs/api.md` | `/api` | Referencia principal de API |
| `docs/guides/setup.md` | `/guides/setup` | Guía técnica de subsección |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | Página de nivel profundo |

::: callout tip "Análisis automático de encabezados" icon:info
Si un archivo carece de un `title` explícito en su frontmatter YAML, el motor extrae automáticamente la primera etiqueta de encabezado `H1` (`# Encabezado`). Este título representa la página en las migas de pan e indexación de búsqueda.
:::

## 3. Estructura de monorrepositorio de espacio de trabajo

Para diseños complejos o proyectos grandes con múltiples productos distintos (como una plataforma central, un SDK y una herramienta CLI), `docmd` admite de forma nativa una estructura de directorio de **Monorrepositorio de espacio de trabajo**. Esto le permite administrar múltiples sitios de documentación independientes desde un solo repositorio raíz mientras mantiene una marca unificada.

```text
mi-monorrepo-docs/
├── docmd.config.json         ← Configuración raíz (define ajustes globales)
├── assets/                   ← Recursos globales compartidos (heredados por todos)
│   ├── css/                  ← Hojas de estilo globales compartidas
│   └── images/               ← Logotipos e iconos compartidos
├── package.json              ← Manifiesto de dependencias raíz
├── main-site/                ← Directorio del proyecto principal
│   ├── docmd.config.json     ← Anulaciones de config. específicas del proyecto
│   └── docs/                 ← Contenido para el sitio principal (se resuelve en /)
│       └── index.md
└── sdk-reference/            ← Directorio del proyecto secundario
    ├── docmd.config.json     ← Anulaciones de config. específicas del proyecto
    └── docs/                 ← Contenido para sdk-reference (se resuelve en /sdk)
        └── index.md
```

### Patrones clave de directorios de espacio de trabajo

::: grids
    ::: grid
        ::: card "Cascada de configuración global" icon:layers
        Cualquier configuración definida en el `docmd.config.json` raíz (como `theme` o `menubar`) actúa como un valor por defecto. Los proyectos individuales anulan selectivamente estos valores en sus archivos de configuración locales.
        :::
    :::
    ::: grid
        ::: card "Uso compartido y prioridad de recursos" icon:folder-tree
        Los logotipos compartidos, los estilos globales personalizados y los scripts comunes se ubican en el directorio raíz `assets/`. Los recursos específicos del proyecto anulan los recursos raíz en caso de colisión de nombres.
        :::
    :::
    ::: grid
        ::: card "Consolidación de salida" icon:package-check
        Durante el proceso de compilación (`npx @docmd/core build`), el motor combina todos los proyectos del espacio de trabajo en un único directorio de salida consolidado (por ejemplo, `./site/` y `./site/sdk/`), eliminando la necesidad de configuraciones complejas de proxy inverso.
        :::
    :::
:::

Para conocer los pasos completos de configuración y las reglas avanzadas en cascada, consulte la [Guía de configuración de espacios de trabajo](../configuration/workspaces.md).
