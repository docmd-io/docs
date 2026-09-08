---
title: "Plugin de analíticas"
description: "Integre Google Analytics 4 (GA4) o Universal Analytics clásico con seguimiento automático de eventos."
---

El plugin `@docmd/plugin-analytics` incorpora scripts de seguimiento de Google Analytics en sus páginas de documentación. Es compatible con Google Analytics 4 (GA4) y Universal Analytics (UA), ofreciendo métricas de interacción automáticas pensadas para sitios de documentación técnica.

## Opciones de configuración

Configure los identificadores de seguimiento en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Objeto de configuración para Google Analytics 4 (requiere `measurementId`). |
| `googleUA` | `object` | `null` | Objeto de configuración para Universal Analytics clásico (requiere `trackingId`). |
| `autoEvents` | `boolean` | `true` | Registra automáticamente enlaces salientes, descargas, clics en anclas y navegación por la tabla de contenidos. |
| `trackSearch` | `boolean` | `true` | Captura automáticamente los términos introducidos en el modal de búsqueda. |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "plugins": {
    "analytics": {
      "googleV4": {
        "measurementId": "G-XXXXXXX"
      },
      "autoEvents": true,
      "trackSearch": true
    }
  }
}
```

## Eventos registrados automáticamente

Cuando `autoEvents` es `true`, el plugin captura las siguientes interacciones sin requerir scripts adicionales:

* **Enlaces salientes externos**: Clics dirigidos a dominios externos.
* **Descargas de archivos**: Clics en enlaces con el atributo `download` o extensiones binarias habituales (`.zip`, `.pdf`, `.gz`).
* **Interacción con la tabla de contenidos**: Clics de navegación en el panel de navegación derecho.
* **Anclas de encabezados**: Clics sobre los enlaces de encabezado.
* **Términos de búsqueda**: Palabras clave consultadas en el buscador modal (con intervalo de espera de 1 segundo).

::: callout info "Privacidad y protección de datos" icon:shield-check
Google Analytics 4 anonimiza las direcciones IP de manera predeterminada. Si su organización exige avisos de consentimiento de cookies conforme al RGPD, puede inyectar scripts personalizados mediante hooks de plugins.
:::
