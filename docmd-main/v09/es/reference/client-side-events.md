---
title: "Eventos del lado del cliente"
description: "Suscríbase a eventos del ciclo de vida del lado del cliente en la navegación de Aplicaciones de Una Sola Página (SPA) de docmd."
---

docmd incorpora un enrutador ligero de Aplicación de Una Sola Página (SPA) para ejecutar transiciones de página del lado del cliente. Debido a que el enrutamiento del lado del cliente actualiza dinámicamente los elementos DOM sin activar recargas completas del navegador, los escuchadores estándar `DOMContentLoaded` no se activarán en las transiciones de subpáginas.

Para dar espacio a scripts de interfaz de usuario personalizados y a la reinicialización de componentes, docmd emite eventos del ciclo de vida DOM dedicados.

## `docmd:page-mounted`

Se envía en el nodo `document` inmediatamente después de que la carga útil de una nueva página se renderice en el DOM.

### Patrón de implementación

Adjunte un escuchador de eventos a `document` para reinicializar bibliotecas interactivas o activar transiciones de interfaz de usuario:

```javascript
document.addEventListener("docmd:page-mounted", (event) => {
  const { url } = event.detail;
  console.log(`Ruta montada: ${url}`);
});
```

### Carga útil del evento (`event.detail`)

| Atributo | Tipo | Descripción técnica |
| :--- | :--- | :--- |
| `url` | `string` | Ruta URL absoluta de la vista de página recién montada. |

## Directrices de implementación

1. **Ejecución idempotente**: Estructure los controladores de configuración para garantizar que se ejecuten de forma segura en cambios de ruta repetidos sin vincular controladores de eventos duplicados.
2. **Protección del espacio de nombres global**: Envuelva los scripts personalizados dentro de bloques IIFE (Expresión de Función Invocada Inmediatamente) para evitar la contaminación del alcance.
3. **Limpieza de eventos**: Desvincule los escuchadores de eventos a nivel de ventana (por ejemplo, `resize` o `scroll`) antes de gestionar transiciones de ruta posteriores.