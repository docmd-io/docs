---
title: "API del navegador"
description: "APIs del lado del cliente para docmd: motor de renderizado isomórfico y comunicación de plugins por WebSocket en modo desarrollo."
---

docmd expone dos APIs del lado del cliente: el **Motor de compilación isomórfico** para renderizar Markdown en contextos de navegador, y la **API de plugins en modo desarrollo** para comunicarse con el servidor de desarrollo local.

## Motor de compilación isomórfico

El motor de renderizado de Markdown se ejecuta sin problemas dentro de entornos de navegador. Utilice esto para construir vistas previas de editores en vivo, entornos de prueba interactivos o widgets de documentación incrustados.

### Integración por CDN

```html
<!-- Estilos del tema principal -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Motor de renderizado isomórfico -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

Compila Markdown sin procesar en un documento HTML completo utilizando plantillas de página de docmd.

* **`markdown`** (`string`): Texto de origen Markdown sin procesar.
* **`config`** (`object`): Anulaciones de configuración (coincidentes con el esquema de `docmd.config.json`).
* **Devuelve**: `Promise<string>` que se resuelve en el documento HTML compilado.

### Ejemplo de implementación de vista previa en vivo

Renderice las salidas dentro de elementos `<iframe>` utilizando `srcdoc` para garantizar un aislamiento completo de estilos:

```javascript
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: "Vista previa",
    theme: { appearance: "light" }
  });
  preview.srcdoc = html;
}

editor.addEventListener("input", updatePreview);
```

## API de plugins en modo desarrollo

Durante la ejecución de `npx @docmd/core dev`, se inyecta un objeto global `window.docmd` en las páginas servidas. Esta interfaz permite que los componentes del plugin del lado del navegador interactúen con los controladores de acciones del lado del servidor a través de RPC de WebSocket.

::: callout info "Solo en modo desarrollo" icon:code
La API de plugins en modo desarrollo está disponible exclusivamente durante las sesiones de `npx @docmd/core dev` y se omite en las compilaciones de producción.
:::

### `docmd.call(action, payload)`

Envía llamadas RPC a controladores de acciones del lado del servidor registrados por plugins. Devuelve una promesa que se resuelve en la salida del controlador:

```javascript
const threads = await docmd.call("threads:get-threads", {
  file: "docs/getting-started.md"
});
console.log(threads);
```

### `docmd.send(name, data)`

Transmite eventos de disparar y olvidar al servidor de desarrollo sin esperar respuestas:

```javascript
docmd.send("analytics:page-view", {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

Se suscribe a eventos de WebSocket enviados por el servidor. Devuelve una función de cancelación de suscripción:

```javascript
const unsubscribe = docmd.on("threads:updated", (data) => {
  console.log("Hilos actualizados:", data);
});

unsubscribe();
```

### Persistencia de estado en recargas rápidas

```javascript
// Guardar contexto antes de la recarga rápida
docmd.scheduleReload("scroll-restore", {
  scrollY: window.scrollY
});

// Restaurar contexto después de la recarga
docmd.afterReload("scroll-restore", (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```