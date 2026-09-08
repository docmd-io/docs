---
title: "Configuración del entorno de desarrollo"
description: "Cómo configurar el entorno de desarrollo local, enlazar compilaciones locales del framework y ejecutar pipelines de verificación para la documentación de docmd."
---

# Configuración del entorno de desarrollo

::: callout info "Contribuir al núcleo de docmd" icon:git-pull-request
¿Desea contribuir al framework central de docmd? Consulte la [Guía de contribución en GitHub](external:https://github.com/docmd-io/docmd?tab=contributing-ov-file) para obtener instrucciones sobre la configuración del repositorio.
:::

Esta guía explica cómo compilar y actualizar este repositorio de documentación (`docmd-io/docs`).

## Requisitos previos

* **Node.js**: v22.x o posterior (se recomienda la versión LTS)
* **pnpm**: v10.x o posterior

## Desarrollo local

```bash
git clone https://github.com/docmd-io/docs.git
cd docs
pnpm install
npx @docmd/core dev
```

El servidor de desarrollo local se inicia en `http://localhost:3000` con recarga rápida en caliente (HMR).

### Enlazar código del framework local

Para probar cambios locales realizados dentro de `docmd-io/docmd` en este sitio de documentación:

```bash
# Dentro del repositorio del framework docmd
pnpm build

# Dentro de este repositorio de documentación, enlace la compilación local
npx @docmd/core link ../docmd/packages/core
```

Reinicie `npx @docmd/core dev` para aplicar las actualizaciones de la compilación local del framework.

## Controles de calidad

Ejecute la canalización de verificación antes de enviar Pull Requests:

```bash
# Analizar archivos Markdown y verificar la integridad de enlaces
pnpm lint

# Ejecutar canalización de verificación completa (lint + compilación + enlaces rotos)
pnpm verify
```

## Flujo de trabajo de traducciones

Procedimiento para agregar o actualizar contenido localizado en `de/`, `es/` y `zh/`:

1. Actualice los archivos de origen canónicos en inglés dentro de `docmd-main/v09/en/...`.
2. Replique las modificaciones en `de/`, `es/` y `zh/` bajo las rutas correspondientes, conservando las claves de frontmatter, marcadores de contenedores y títulos de fragmentos de código.
3. Ejecute `pnpm verify` para confirmar la integridad de los enlaces.

## Estructura de directorios del proyecto

```text
docs/
├── docmd-main/v09/
│   ├── en/                  # Fuente canónica en inglés
│   ├── de/                  # Traducciones al alemán (espejo de en/)
│   ├── es/                  # Traducciones al español (espejo de en/)
│   ├── zh/                  # Traducciones al chino (espejo de en/)
│   └── navigation.json      # Jerarquía de navegación compartida
├── docmd-search/            # Recursos del motor de búsqueda
├── docs/                    # Objetivos de subproyectos
└── package.json
```

## Siguientes pasos

- [Creación de plugins](./building-plugins.md) — desarrolle un plugin personalizado para docmd.
- [Ejemplos de plugins](./plugin-examples.md) — vea un recorrido completo por un plugin.
- [Creación de plantillas](./building-templates.md) — cree una plantilla personalizada para docmd.
- [Referencia de la API de Node](./node-api-reference.md) — API programática de compilación.
