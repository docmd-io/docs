---
title: "docmd docs: despliegue documentación lista para producción desde Markdown"
description: "Cree documentación lista para producción desde Markdown en segundos. Cero configuración, rápido por defecto, optimizado para SEO y preparado para IA."
titleAppend: false
---

::: hero

# docmd

De Markdown a documentación en producción con un solo comando. HTML estático para SEO. SPA para velocidad. Funciona de forma nativa con herramientas de IA.

::: button "Primeros pasos" ./getting-started/quick-start.md icon:rocket ::: /button ::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github ::: /button

:::

## Descripción general

docmd es un generador de documentación con cero configuración. Construye sitios web estáticos y rápidos directamente a partir de sus archivos Markdown.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

Ejecute este único comando. El motor construye su sitio, genera la navegación y habilita la búsqueda automáticamente.

## Capacidades clave

Todo lo necesario para una documentación sólida viene integrado. Sin necesidad de plugins adicionales para lo esencial.

::: grids
    ::: grid
        ::: card "Configuración instantánea" icon:rocket
        Comience de inmediato sin código base repetitivo. El motor detecta archivos automáticamente y estructura la navegación en segundos.
        :::
    :::
    ::: grid
        ::: card "Contexto para IA" icon:brain-circuit
        Genera `llms.txt` y `llms-full.txt` automáticamente. Su documentación se mantiene legible para asistentes de IA.
        :::
    :::
    ::: grid
        ::: card "Paquetes OKF" icon:database
        Genera un paquete Open Knowledge Format y un grafo de conceptos tipados para agentes de IA. Lea [más](external:https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing).
        :::
    :::
    ::: grid
        ::: card "Servidor MCP nativo" icon:terminal
        Servidor Model Context Protocol integrado con herramientas nativas. Los agentes de IA consultan y validan su documentación a través de una conexión stdio local: sin red ni servicios remotos.
        :::
    :::
    ::: grid
        ::: card "Búsqueda Local-First" icon:search
        Búsqueda rápida de texto completo en el cliente impulsada por MiniSearch. Funciona directamente en todas las versiones y entornos locales.
        :::
    :::
    ::: grid
        ::: card "Vistas previas en vivo" icon:monitor
        Renderice Markdown al instante en el navegador con la API `docmd.compile`. Impulsa editores en vivo, vistas previas de CMS y documentación integrada.
        :::
    :::
    ::: grid
        ::: card "Plantillas personalizadas" icon:palette
        Personalice su documentación con plantillas o pruebe temas integrados con CSS personalizado. Admite modo oscuro y preferencias del sistema.
        :::
    :::
    ::: grid
        ::: card "Traducción nativa" icon:globe
        Soporte i18n de primer nivel. Cuenta con enrutamiento prioritario por idioma, índices de búsqueda individuales y cadenas de interfaz traducidas.
        :::
    :::
:::

::: callout info "Contenedores de contenido enriquecido" icon:info
Vaya más allá del Markdown estándar. Utilice patrones visuales estructurados como pasos, pestañas, tarjetas, rejillas y llamadas directamente en su texto.
::: button "Explorar contenedores" ./content/containers/index.md icon:blocks
:::