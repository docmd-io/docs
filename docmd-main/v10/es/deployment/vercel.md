---
title: "Despliegue en Vercel"
description: "Despliega sitios de documentación estática de docmd en Vercel utilizando configuraciones generadas de vercel.json."
---

Genera manifiestos de despliegue para producción en Vercel mediante la herramienta CLI Deployer:

```bash
npx @docmd/core deploy --vercel
```

## Configuración generada

El archivo `vercel.json` generado configura los comandos de compilación, directorios de publicación y políticas de enrutamiento:

* **Ejecución de la compilación**: Ejecuta `npx @docmd/core build`.
* **Ruta de salida**: Resuelve automáticamente la propiedad `out` (por defecto `site`).
* **Cabeceras de caché**: Almacena en caché de forma inmutable los recursos estáticos (`/assets/*`) mientras fuerza la revalidación de documentos HTML.
* **Reglas SPA**: Añade reescritura de rutas comodín cuando `layout.spa: true`.

```json "vercel.json"
{
  "buildCommand": "npx @docmd/core build",
  "outputDirectory": "site",
  "cleanUrls": true
}
```

## Ejecución del despliegue

Publica en Vercel mediante la CLI o la integración en el panel de control:

```bash
npm install -g vercel
vercel --prod
```

Alternativamente, vincula tu repositorio de Git en el panel de Vercel. Vercel detecta `vercel.json` y administra los activadores de CI/CD automáticamente.

::: callout tip "Regeneración" icon:refresh-cw
Vuelve a ejecutar `npx @docmd/core deploy --vercel --force` después de modificar las opciones `out` o `url` dentro de `docmd.config.json`.
:::
