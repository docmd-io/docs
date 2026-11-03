---
title: Variables de Configuración y Personalizadas
description: Cómo definir variables en docmd.config.json, cargar archivos externos e interpolar variables en cadenas de configuración y Markdown.
---

# Variables de Configuración y Personalizadas

Puede definir variables personalizadas directamente en `docmd.config.json`, cargarlas desde archivos JSON externos o módulos de JavaScript, y utilizarlas en toda su documentación.

## Definición en `docmd.config.json`

Añada un bloque `variables` a su `docmd.config.json`:

```json
{
  "title": "Documentación Acme Cloud",
  "variables": {
    "companyName": "Acme Technologies",
    "supportEmail": "support@acme.com",
    "cloud": {
      "apiEndpoint": "https://api.acme.cloud/v2",
      "region": "eu-west-1",
      "maxInstances": 50
    }
  }
}
```

### Acceso en Markdown

Las propiedades anidadas se leen mediante notación de puntos:

````markdown
Para contactar con soporte técnico, escriba a [\{{ supportEmail }}](mailto:\{{ supportEmail }}).

Envíe sus peticiones a nuestro punto de conexión:
```bash
curl -X GET \{{ cloud.apiEndpoint }}/status \
  -H "X-Region: \{{ cloud.region }}"
```
````

Al compilar, esto se traduce a:

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: eu-west-1"
```

### Acceso a Variables de Configuración en JavaScript Cliente y Playgrounds

Todas las variables de usuario declaradas en `docmd.config.json` se serializan automáticamente en el motor cliente (`window.__DOCMD_VARIABLES__`), haciéndolas consultables en scripts del navegador, extensiones personalizadas y playgrounds interactivos mediante `window.docmd.var.get()`:

```javascript
// Consultar variables definidas en docmd.config.json
const endpoint = window.docmd?.var?.get("cloud.apiEndpoint");
const region = window.docmd?.var?.get("cloud.region");
console.log(`Conectando a ${endpoint} en ${region}`);
```

::: callout tip "Correspondencia 1:1 de Nombres" icon:check-circle
Las claves de las variables coinciden exactamente con sus nombres en Markdown. Si escribe `{{ cloud.apiEndpoint }}` en Markdown, use `window.docmd.var.get("cloud.apiEndpoint")` en JavaScript. No agregue el prefijo `docmd.` a las variables de usuario.
:::

## Uso en Campos de Configuración

docmd ejecuta una fase unificada de registro de variables **antes** de renderizar plantillas, barras de navegación y pies de página.

Esto le permite utilizar variables integradas como `\{{ docmd.buildYear }}` o sus propios valores directamente en los campos de configuración:

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} \{{ companyName }}. Todos los derechos reservados."
  },
  "layout": {
    "banners": {
      "top": {
        "content": "**¡docmd v\{{ docmd.version }} está disponible!** — Región: \{{ env.DEPLOY_REGION || 'global' }}."
      }
    }
  }
}
```

::: callout tip "El Ciclo de Resolución Unificado" icon:refresh-cw
1. **Registro**: Al iniciar `docmd build`, `VariableRegistry` registra las variables integradas, las variables de entorno y los valores de `variables` del archivo de configuración.
2. **Interpolación de Configuración**: docmd recorre recursivamente `docmd.config.json` y sustituye los tokens `{{ variable }}`.
3. **Renderizado de Markdown**: El compilador procesa los documentos Markdown utilizando el mismo registro de variables resuelto.
4. **Resultado**: El pie de página y las páginas Markdown reflejan siempre los mismos valores exactos sin duplicación manual.
:::

## Archivos de Variables Externos

En proyectos grandes o con equipos distribuidos, puede apuntar `"variables"` a archivos externos JSON o JavaScript:

::: tabs
::: tab "Archivo JSON Externo" icon:file-json
Apunte `variables` a un archivo JSON en su proyecto:

```json
{
  "variables": "./data/variables.json"
}
```

Contenido de `./data/variables.json`:

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token",
    "clientId": "acme-portal-production"
  },
  "limits": {
    "rateLimitPerMin": 1200
  }
}
```
::: /tab

::: tab "Módulo JavaScript Dinámico" icon:file-code
Apunte `variables` a un módulo JavaScript para calcular valores de forma dinámica:

```json
{
  "variables": "./data/variables.js"
}
```

Contenido de `./data/variables.js`:

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString('es-ES'),
  sdkVersion: require('./package.json').version,
  activeServices: ['auth', 'billing', 'analytics']
};
```
::: /tab
::: /tabs

::: card "Buenas Prácticas: Fuente Única de Verdad" icon:check-circle
Usar un módulo JavaScript permite importar números de versión directamente desde su `package.json`, asegurando que la documentación se mantenga siempre alineada con sus entregas de software.
:::
