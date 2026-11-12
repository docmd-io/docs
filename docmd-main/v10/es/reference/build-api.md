---
title: "API de compilación"
description: "Referencia de la API de Node.js programática para docmd: compilar sitios, paquetes de editores en vivo y espacios de trabajo multiproyecto."
---

Puede importar y ejecutar el motor de compilación de docmd mediante programación desde aplicaciones Node.js. Esto permite canalizaciones de compilación personalizadas, generación automatizada de documentación e integraciones de monorepositorios.

## Instalación

Asegúrese de que `@docmd/core` esté instalado en su proyecto:

```bash
npm install @docmd/core
```

## Funciones principales de exportación de compilación

### `buildSite(configPath, options)`

Ejecuta la compilación estándar de sitios estáticos:

```javascript
import { buildSite } from "@docmd/core";

async function runBuild() {
  await buildSite("./docmd.config.json", {
    isDev: false,
    offline: false,
    zeroConfig: false
  });
}
```

### `buildLive(options)`

Compila la aplicación Editor en vivo basada en el navegador:

```javascript
import { buildLive } from "@docmd/core";

async function generateEditor() {
  await buildLive({
    serve: false,
    port: 3000
  });
}
```

## Funciones de espacio de trabajo

Funciones para gestionar espacios de trabajo multiproyecto mediante programación:

* **`isWorkspace(config)`**: Evalúa si un objeto de configuración se ajusta a los esquemas del espacio de trabajo.
* **`detectWorkspace(configPath)`**: Resuelve las configuraciones del espacio de trabajo, devolviendo `WorkspaceRootConfig` normalizado o `null`.
* **`buildWorkspace(config, options)`**: Compila todos los proyectos definidos en la raíz del espacio de trabajo.
* **`devWorkspace(config, options)`**: Inicia el servidor de desarrollo del espacio de trabajo con seguimiento de recompilación objetivo.

```javascript
import { detectWorkspace, buildWorkspace } from "@docmd/core";

async function buildAllWorkspaces() {
  const config = await detectWorkspace("./docmd.config.json");
  if (config) {
    await buildWorkspace(config, { quiet: false });
  }
}
```

## Ejemplo de canalización personalizada

Componga la compilación de docmd con scripts de compilación personalizados:

```javascript
import { buildSite } from "@docmd/core";
import fs from "fs-extra";

async function deployPipeline() {
  // 1. Generar fuentes de contenido dinámico
  await fs.writeFile("./docs/dynamic.md", "# Página generada dinámicamente");

  // 2. Ejecutar compilación estática
  await buildSite("./docmd.config.json");

  // 3. Mover el directorio de salida
  await fs.move("./site", "./public/docs");
}
```

::: callout tip "Compatibilidad con la automatización por IA" icon:cpu
La API de compilación programática permite a los trabajadores en segundo plano y a los agentes de IA activar compilaciones después de modificaciones del código fuente para verificar la integridad del sitio de forma automática.
:::