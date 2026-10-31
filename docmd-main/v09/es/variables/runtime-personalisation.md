---
title: Tiempo de Ejecución y Personalización
description: Utilice el SDK de cliente docmd-runtime.js y window.docmd para habilitar sesiones de usuario interactivas, bloques de código dinámicos y personalización sin recargas.
---

# Tiempo de Ejecución y Personalización

docmd incluye un script de ejecución en el cliente sin interfaz, `docmd-runtime.js`, incorporado automáticamente en todas las plantillas (incluyendo la plantilla predeterminada y temas como `summer`).

Este motor expone la API de navegador `window.docmd`, lo que permite actualizar variables de forma interactiva en función de la autenticación de usuarios, los entornos seleccionados o entradas de formulario sin necesidad de recargar la página.

## Declaración de Variables Dinámicas

Indique en su `docmd.config.json` qué variables deben gestionarse de forma dinámica:

```json
{
  "variables": {
    "dynamic": [
      "user.name",
      "user.apiKey",
      "selectedProject",
      "activeRegion"
    ]
  }
}
```

Al compilar las páginas, cualquier variable definida como dinámica (o que empiece por `user.`) se envuelve en un marcador DOM:

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## API de JavaScript en el Navegador: `window.docmd`

El entorno de ejecución proporciona una API ergonómica:

### Asignar Variables: `docmd.var.set()`

Actualice una variable en tiempo real en toda la página y en los bloques de código:

```javascript
// Asignar una sola variable
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// Asignar varias variables simultáneamente
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'eu-west-1'
});
```

Todos los elementos `<span data-docmd-var="...">` y tokens en bloques de código se actualizan en el DOM al instante.

### Obtener Variables: `docmd.var.get()`

Consulte el valor activo de una variable:

```javascript
const key = window.docmd.var.get('user.apiKey');
console.log('Clave API activa:', key);
```

### Listar Variables: `docmd.var.list()`

Inspeccione todas las variables de ejecución registradas:

```javascript
const allVars = window.docmd.var.list();
console.table(allVars);
```

### Sincronizar el DOM: `docmd.var.sync()`

Si inserta contenido HTML dinámicamente o navega mediante un enrutador en el cliente, invoque `docmd.sync()` para rehidratar los marcadores:

```javascript
window.docmd.var.sync();
```

## Ejemplo: Bloques de Código Interactivos

Un caso de uso destacado es permitir a los lectores probar comandos con sus propias credenciales:

```markdown
### Autenticación con la API

Ejecute el siguiente comando en su terminal:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'SU_CLAVE_API' }}"
```
```

Puede incrustar un campo de entrada en su portal:

```html
<input 
  type="text" 
  id="apiKeyInput" 
  placeholder="Pegue aquí su clave API..."
  oninput="window.docmd.var.set('user.apiKey', this.value || 'SU_CLAVE_API')"
/>
```

A medida que el lector escribe en el campo de texto, el comando curl se actualiza en tiempo real.

## Detección de Cambios en Variables

Puede suscribirse a los eventos emitidos por el bus de ejecución:

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`La variable ${key} cambió a:`, value);
});
```

## Sincronización entre Marcos (iFrames y Portales)

Si su documentación está incrustada en un iframe dentro de su aplicación, la ventana principal puede actualizar las variables mediante `postMessage`:

```javascript
// Desde la aplicación principal:
const docIframe = document.getElementById('docs-frame');
docIframe.contentWindow.postMessage({
  type: 'docmd:set-variables',
  variables: {
    'user.name': 'Alex',
    'user.apiKey': 'sk_live_449911'
  }
}, '*');
```

El listener en `docmd-runtime.js` procesa el mensaje y actualiza las variables de toda la página automáticamente.

## Arquitectura: Por qué `docmd-runtime.js` es Universal

`docmd-runtime.js` está desacoplado de estilos, temas y animaciones de la interfaz. Su implementación se enfoca exclusivamente en la máquina de estados, el registro de variables, el bus de eventos y la hidratación del DOM.

Al ser headless, resulta seguro incluirlo en cualquier diseño o plantilla sin interferir con otros scripts.
