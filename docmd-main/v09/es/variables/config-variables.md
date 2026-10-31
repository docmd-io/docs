---
title: Variables de Configuración y Personalizadas
description: Cómo definir variables personalizadas en docmd.config.json, cargar archivos externos y utilizar variables en cadenas de configuración y contenido Markdown.
---

# Variables de Configuración y Personalizadas

Puede definir variables personalizadas directamente en `docmd.config.json`, cargarlas desde archivos JSON o módulos JavaScript externos y utilizarlas en toda su documentación.

## Definir Variables en `docmd.config.json`

Añada un bloque `variables` a su archivo `docmd.config.json`:

```json
{
  "title": "Documentación de Acme Cloud",
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

Puede acceder a objetos anidados mediante la notación de punto estándar:

```markdown
Para ponerse en contacto con nuestro equipo, escriba a [{{ supportEmail }}](mailto:{{ supportEmail }}).

Todas las peticiones deben dirigirse a nuestro punto de conexión de producción:
```bash
curl -X GET {{ cloud.apiEndpoint }}/status \
  -H "X-Region: {{ cloud.region }}"
```
```

Durante la compilación, esto genera:

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: eu-west-1"
```

## Uso de Variables en Campos de Configuración

docmd ejecuta una fase de registro de variables **antes** de procesar las plantillas del sitio, el pie de página y los banners.

Esto le permite utilizar tanto variables integradas (como `{{ docmd.buildYear }}`) como sus propias variables personalizadas dentro de las opciones de configuración:

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © {{ docmd.buildYear }} {{ companyName }}. Todos los derechos reservados."
  },
  "layout": {
    "banners": {
      "top": {
        "content": "Ejecutando {{ title }} v{{ docmd.version }} en la región {{ env.DEPLOY_REGION || 'global' }}."
      }
    }
  }
}
```

### Funcionamiento del Ciclo de Resolución

1. **Registro**: Al iniciar `docmd build`, `VariableRegistry` registra las variables integradas (`docmd.buildYear`, `docmd.version`, etc.), las variables de entorno y las definidas en `variables`.
2. **Interpolación de Configuración**: docmd recorre de forma recursiva `docmd.config.json` (como `footer.copyright`, `layout.banners`, `title`) y sustituye cualquier expresión `{{ variable }}`.
3. **Procesamiento de Markdown**: El compilador de Markdown emplea estas mismas variables registradas para generar el contenido de las páginas.
4. **Resultado**: Tanto el pie de página como las páginas de documentación reflejan exactamente los mismos valores sin necesidad de duplicación manual.

## Archivos de Variables Externos

Para proyectos grandes o datos compartidos entre equipos, puede apuntar la opción `"variables"` hacia un archivo JSON o JavaScript externo:

### Archivo JSON Externo

```json
{
  "variables": "./data/variables.json"
}
```

Donde `./data/variables.json` contiene:

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token"
  }
}
```

### Módulo JavaScript Dinámico

También puede utilizar un archivo JavaScript para calcular variables de manera dinámica:

```json
{
  "variables": "./data/variables.js"
}
```

Donde `./data/variables.js` exporta un objeto o función:

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString(),
  sdkVersion: require('./package.json').version
};
```
