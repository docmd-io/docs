---
title: "Extender docmd con plugins personalizados"
description: "Cómo utilizar los hooks del ciclo de vida de docmd para crear funciones personalizadas y extender el motor de documentación."
---

## Problema

En ocasiones surgen requisitos específicos no cubiertos por las funciones integradas. Por ejemplo, es posible que necesite obtener datos de una API interna durante el proceso de compilación o realizar transformaciones complejas en el HTML generado.

## Por qué es importante

La extensibilidad distingue una herramienta estática de un framework de documentación profesional. Sin una forma limpia de inyectar lógica personalizada, los equipos recurren a frágiles scripts de shell o envoltorios de postprocesamiento, lo que dificulta el mantenimiento y la depuración del proceso de compilación.

## Enfoque

docmd cuenta con una sólida [API de plugins](./building-plugins.md) basada en hooks. Desarrolle módulos estándar de Node.js que intercepten el ciclo de vida de la documentación en distintas fases. Esto le permite modificar libremente el contenido y el comportamiento, desde la configuración inicial hasta la generación final del HTML.

## Implementación

### 1. Crear un plugin local

Un plugin es un módulo estándar de JavaScript que exporta un descriptor y hooks de ciclo de vida.

```javascript
// plugins/version-injector.js

let latestVersion = "0.0.0";

export default {
  // Descriptor del plugin
  plugin: {
    "name": "version-injector",
    "version": "1.0.0",
    "capabilities": ["init", "build"]
  },

  // Hooks de ciclo de vida
  async onConfigResolved(config) {
    // Obtener datos externos una vez durante la inicialización
    const response = await fetch("https://api.example.com/version");
    latestVersion = await response.text();
    console.log(`[Plugin] Versión obtenida: ${latestVersion}`);
  },

  // Modificar HTML antes de escribirlo en disco
  async onBeforeRender(page) {
    if (!page.html) return;

    page.html = page.html.replace(/\{\{VERSION\}\}/g, latestVersion);
    page.frontmatter.computedVersion = latestVersion;
  }
};
```

### 2. Registrar el plugin

Registre su plugin local importándolo en su archivo `docmd.config.js` (o `docmd.config.ts`). Los archivos de configuración en formato JSON no admiten sentencias `import`; utilice la variante `.js` o `.ts` para el registro de plugins con dependencias o código directo.

```javascript
import VersionInjector from "./plugins/version-injector.js";

export default {
  "title": "Documentación de mi proyecto",
  "plugins": {
    // Inyectar el objeto del plugin local
    "version-injector": VersionInjector
  }
};
```

## Consideraciones y compensaciones

Los plugins personalizados se ejecutan en el entorno de Node.js durante el tiempo de compilación. Aunque son potentes, pueden impactar en el rendimiento si no están optimizados. Cualquier lógica ubicada en hooks como `onAfterParse` o `onPageReady` se ejecuta para *cada página* de su sitio. Asegúrese de que sus transformaciones sean eficientes (por ejemplo, utilizando expresiones regulares optimizadas) para preservar la alta velocidad de compilación.
