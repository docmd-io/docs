---
title: "Vista previa en vivo"
description: "Ejecute el motor docmd completamente en el navegador utilizando la arquitectura del compilador de navegador @docmd/live en docmd."
---

La arquitectura del compilador `docmd` desacopla las operaciones de E/S del sistema de archivos de la lógica de análisis sintáctico principal de Markdown. El motor principal puede ejecutarse completamente dentro del navegador, impulsando editores en vivo, paneles de vista previa de CMS y aplicaciones web dinámicas sin requerir un servidor en el backend.

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp" alt="Interfaz del Editor en Vivo de docmd">

::: button "Abrir editor en vivo" external:https://live.docmd.io

## El editor en vivo

El Editor en vivo integrado proporciona un espacio de trabajo de creación en panel dividido de alto rendimiento. Escriba Markdown en el panel izquierdo y observe cómo la salida HTML renderizada se actualiza en tiempo real a la derecha.

### Ejecución en desarrollo local

Inicie el Editor en vivo localmente dentro del espacio de trabajo de su proyecto:

```bash
npx @docmd/core live
```

### Compilación para distribución estática

Compile una versión estática e independiente de la interfaz del Editor en vivo para alojarla en Vercel, Cloudflare Pages o GitHub Pages:

```bash
npx @docmd/core live --no-serve
```

Esto compila los recursos estáticos en el directorio de salida, incluyendo el punto de entrada `index.html` y el paquete del motor de navegador `@docmd/live`.

## Incrustación de @docmd/live

Integre el paquete compatible con el navegador en aplicaciones web de terceros para renderizar Markdown de `docmd` del lado del cliente.

### 1. Integración de recursos

Incluya la hoja de estilos y el paquete JavaScript desde recursos estáticos o CDN:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. API del compilador de navegador

El objeto global `docmd` expone un método asíncrono `compile` para renderizado instantáneo del lado del cliente:

```javascript
const html = await docmd.compile(markdown, {
  "title": "Vista Previa en Vivo Dinámica",
  "theme": { "appearance": "dark" }
});

document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "Entornos de pruebas de validación y comentarios de IA" icon:sparkles
La arquitectura de navegador `@docmd/live` es ideal para crear **Entornos de pruebas de agentes de IA**. Envíe el Markdown generado por agentes directamente a un búfer de compilación en vivo para verificación visual instantánea antes de confirmar los cambios en su repositorio Git.
:::