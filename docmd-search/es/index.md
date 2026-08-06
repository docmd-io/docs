---
title: "docmd-search"
description: "Motor de búsqueda semántica offline para documentación."
---

Motor de búsqueda semántica offline para documentación. Los embeddings vectoriales se generan localmente durante la compilación mediante ONNX Runtime. El cliente del navegador realiza coincidencias de términos y similitud coseno.

::: callout tip "CLI Sin Configuración"
Ejecute `npx docmd-search ./docs` en cualquier directorio. Funciona de inmediato sin claves API.
:::

## Características Principales

::: grid

::: card "Ejecución Local" icon:wifi-off
Todos los embeddings se generan localmente usando ONNX Runtime. Ningún dato sale de su equipo.
:::

::: card "Carga por Lotes" icon:zap
La búsqueda está lista tan pronto como se carga el primer lote.
:::

::: card "Cliente Ultraligero" icon:package
El cliente para navegador ocupa menos de **3KB gzipped** sin módulos WASM pesados.
:::

:::
