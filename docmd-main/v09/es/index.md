---
title: "docmd — Motor de Documentación Ultrarrápido, Cero Configuración e Impulsado por IA"
description: "Cree sitios de documentación estáticos rápidos, elegantes y listos para IA directamente desde Markdown. Cero configuración inicial, i18n nativo, búsqueda semántica y servidor MCP."
---

::: hero "Generación de Documentación sin Esfuerzo" "Cree sitios de documentación técnicos listos para producción directamente desde Markdown en segundos. Cero configuración inicial, rápido por defecto, i18n nativo y diseñado para agentes de IA."
::: button "Comenzar Ahora" ./getting-started/quick-start.md icon:rocket
::: button "Ver en GitHub" external:https://github.com/docmd-io/docmd icon:github
:::
:::

::: tabs

== tab "npm" icon:terminal
```bash
npx @docmd/core init
```

== tab "pnpm" icon:box
```bash
pnpm dlx @docmd/core init
```

== tab "yarn" icon:package
```bash
yarn dlx @docmd/core init
```

:::

## Características Principales

::: grids
    ::: grid
        ::: card "Zero-Config por Defecto" icon:zap
        Inicie un sitio de documentación completo sin escribir archivos de configuración. Detección automática de contenido, enrutamiento de carpetas y barra lateral inteligente.
        :::
    :::
    ::: grid
        ::: card "Preparado para IA (MCP & OKF)" icon:bot
        Servidor Model Context Protocol (MCP) integrado, paquetes de conocimiento OKF y payloads `llms.txt` optimizados para agentes de IA.
        :::
    :::
    ::: grid
        ::: card "Rendimiento Ultrarrápido" icon:gauge
        Sin sobrecarga de JS en el cliente, carga instantánea de páginas, navegación SPA cliente e indexado ultrarrápido.
        :::
    :::
:::

::: grids
    ::: grid
        ::: card "Búsqueda Local-First" icon:search
        Búsqueda de texto completo en el cliente impulsada por MiniSearch, sin dependencias externas y con soporte multi-idioma.
        :::
    :::
    ::: grid
        ::: card "Vista Previa en Vivo" icon:monitor
        Renderice Markdown al instante en el navegador usando la API `docmd.compile`. Ideal para editores en tiempo real y CMS.
        :::
    :::
    ::: grid
        ::: card "Temas Personalizables" icon:palette
        Personalice la apariencia con temas integrados, CSS personalizado y soporte completo para modo claro y oscuro.
        :::
    :::
    ::: grid
        ::: card "i18n Nativo" icon:globe
        Soporte internacional de primer nivel con enrutamiento por idioma, índices de búsqueda independientes y cadenas de UI traducidas.
        :::
    :::
:::

::: callout info "Contenedores de Contenido Ricos" icon:info
Vaya más allá del Markdown estándar. Utilice pasos, pestañas, tarjetas, rejillas y avisos visuales estructurados directamente en su texto.
::: button "Explorar Contenedores" ./content/containers/index.md icon:blocks
:::