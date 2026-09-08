---
title: "Despliegue en Netlify"
description: "Despliega documentación de docmd en Netlify utilizando configuraciones netlify.toml generadas."
---

Genera manifiestos de compilación para Netlify que coincidan con la configuración de tu proyecto:

```bash
npx @docmd/core deploy --netlify
```

## Configuración generada

El archivo `netlify.toml` emitido configura entornos de compilación, directorios de salida y controles de cabeceras:

* **Comando de compilación**: Ejecuta `npm install @docmd/core && npx @docmd/core build`.
* **Directorio de publicación**: Sincronizado con `config.out` (`site`).
* **Políticas de cabeceras**: Aplica almacenamiento en caché inmutable para recursos estáticos y reglas de no almacenamiento para entradas HTML.
* **Reglas de redirección**: Configura reescrituras de `/*` → `/index.html` cuando `layout.spa: true`.

```toml "netlify.toml"
[build]
  command = "npx @docmd/core build"
  publish = "site"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Ejecución del despliegue

Conecta tu repositorio de Git en Netlify para compilaciones automáticas con cada push, o despliega a través de la CLI de Netlify:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

::: callout tip "Regeneración" icon:refresh-cw
Vuelve a ejecutar `npx @docmd/core deploy --netlify --force` siempre que modifiques los valores de `out` o `url` en `docmd.config.json`.
:::
