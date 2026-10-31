---
title: Tiempo de Ejecución en Cliente y Personalización
description: Utilice el SDK docmd-runtime.js y window.docmd para crear sesiones interactivas, bloques de código reactivos y personalización sin recargar la página.
---

# Tiempo de Ejecución en Cliente y Personalización

docmd incluye un script de ejecución en cliente ligero y headless, `docmd-runtime.js`, que se incorpora automáticamente en todas las plantillas (incluyendo el diseño por defecto y temas como `summer`).

Este entorno expone la API de navegador `window.docmd`, permitiendo actualizar variables dinámicamente según la autenticación del usuario, el entorno seleccionado o entradas de formularios sin necesidad de recargar la página.

## Declarar Variables como Dinámicas

En su `docmd.config.json`, especifique qué claves son dinámicas:

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

Al compilar, docmd envuelve cada variable dinámica (o que empiece por `user.`) con un elemento marcador reactivo:

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## API JavaScript de Navegador: `window.docmd`

La API del cliente ofrece funciones claras y directas:

::: grids
    ::: grid
        ::: card "Definir Variables" icon:sliders
        `window.docmd.var.set(key, val)`
        Actualiza variables en todo el DOM y en los bloques de código en tiempo real.
        :::
    :::
    ::: grid
        ::: card "Obtener Variable" icon:search
        `window.docmd.var.get(key)`
        Devuelve el valor activo de una variable registrada.
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "Listar Todas" icon:list
        `window.docmd.var.list()`
        Devuelve un objeto con todas las variables dinámicas registradas.
        :::
    :::
    ::: grid
        ::: card "Sincronizar DOM" icon:refresh-cw
        `window.docmd.var.sync()`
        Vuelve a examinar el HTML inyectado para rehidratar los marcadores.
        :::
    :::
::: /grids

### Ejemplo: Actualizar Variables

```javascript
// Establecer una variable individual
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// Establecer múltiples variables a la vez
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'eu-central-1'
});
```

Todos los elementos `<span data-docmd-var="...">` y fragmentos de código se actualizan en el acto.

## Demostración Interactiva con Bloques de Código

Un caso de uso destacado es permitir a los desarrolladores probar comandos API con su propia clave:

```markdown
### Autenticación con la API

Ejecute el siguiente comando en su terminal:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer \{{ user.apiKey || 'SU_CLAVE_API' }}"
```
```

::: card "Demostración Interactiva en Vivo" icon:play
Escriba una clave de API de prueba en el siguiente campo para comprobar la actualización reactiva:

<div style="margin: 12px 0;">
  <label style="display:block; font-size:12px; font-weight:600; margin-bottom:6px; opacity:0.8;">SU CLAVE DE PRUEBA:</label>
  <input 
    type="text" 
    id="apiKeyInputDemoEs" 
    placeholder="ej. sk_test_mi_token_seguro_88" 
    style="width: 100%; max-width: 400px; padding: 8px 12px; border: 1px solid var(--docmd-border-color, #e2e8f0); border-radius: 6px; background: var(--docmd-bg-secondary, #f8fafc); font-family: monospace;"
    oninput="if(window.docmd && window.docmd.var) { window.docmd.var.set('user.apiKey', this.value || 'SU_CLAVE_API'); }"
  />
</div>

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'SU_CLAVE_API' }}"
```
:::

## Integración con Frameworks

::: tabs
::: tab "Vanilla JavaScript" icon:code
```javascript
function onUserLogin(session) {
  window.docmd.var.set({
    'user.name': session.fullName,
    'user.apiKey': session.activeToken,
    'user.orgId': session.organisationId
  });
}
```
::: /tab

::: tab "React / Next.js" icon:atom
```tsx
import { useEffect } from 'react';

export function DocsPersonaliser({ user }: { user: any }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).docmd) {
      (window as any).docmd.var.set({
        'user.name': user.name,
        'user.apiKey': user.apiKey
      });
    }
  }, [user]);

  return null;
}
```
::: /tab

::: tab "Vue / Nuxt" icon:feather
```vue
<script setup>
import { watchEffect } from 'vue';

const props = defineProps(['currentUser']);

watchEffect(() => {
  if (typeof window !== 'undefined' && window.docmd) {
    window.docmd.var.set({
      'user.name': props.currentUser?.name,
      'user.apiKey': props.currentUser?.token
    });
  }
});
</script>
```
::: /tab
::: /tabs

## Escuchar Cambios de Variables

Puede reaccionar a los eventos emitidos por el bus del cliente:

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`Variable ${key} modificada a:`, value);
});
```

## Sincronización entre Marcos (iFrames y Portales)

Si la documentación se aloja en un iframe dentro de su aplicación, el portal puede enviar variables mediante `postMessage`:

```javascript
const docIframe = document.getElementById('docs-frame');
docIframe.contentWindow.postMessage({
  type: 'docmd:set-variables',
  variables: {
    'user.name': 'Alex',
    'user.apiKey': 'sk_live_449911'
  }
}, '*');
```

::: callout tip "Arquitectura Headless Independiente" icon:cpu
`docmd-runtime.js` opera exclusivamente mediante marcadores de datos (`data-docmd-var`), por lo que no interfiere con estilos CSS, transiciones SPA o plugins de terceros.
:::
