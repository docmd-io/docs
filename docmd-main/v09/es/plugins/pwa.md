---
title: "Plugin PWA y soporte sin conexión"
description: "Transforme sitios de documentación en Aplicaciones Web Progresivas instalables con caché sin conexión mediante service workers."
---

El plugin `@docmd/plugin-pwa` convierte su sitio de documentación en una Aplicación Web Progresiva (PWA) instalable. Genera el manifiesto estándar del W3C (`manifest.webmanifest`) y registra un service worker para almacenar en caché los contenidos y posibilitar la instalación en dispositivos móviles y de escritorio.

## Opciones de configuración

Configure las propiedades de la PWA en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la generación del manifiesto y el service worker. |
| `themeColor` | `string` | `'#1e293b'` | Color del encabezado y la interfaz del navegador. |
| `bgColor` | `string` | `'#ffffff'` | Color de fondo de la pantalla de bienvenida durante la instalación. |
| `logo` | `string` | `null` | Ruta al icono de la aplicación (relativa a la raíz de la documentación). |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {
      "themeColor": "#1e293b",
      "bgColor": "#ffffff",
      "logo": "assets/app-icon.png"
    }
  }
}
```

## Capacidades principales

* **Service Worker sin conexión**: Implementa una estrategia de almacenamiento *stale-while-revalidate*. Las páginas se cargan al instante desde la caché local mientras se valida la conexión a la red en segundo plano.
* **Instalación en pantalla de inicio**: Genera los metadatos necesarios para que los usuarios puedan anclar la documentación en iOS, Android, macOS y Windows.
* **Redimensionamiento de iconos**: Genera automáticamente los tamaños requeridos para la PWA (192x192, 512x512) a partir de la imagen corporativa del sitio.

## Prioridad en la resolución del icono

El plugin busca el icono evaluando las siguientes propiedades de arriba hacia abajo:

1. `plugins.pwa.icons` — Matriz explícita de iconos definida en la configuración.
2. `plugins.pwa.logo` — Ruta de icono específica del plugin.
3. `config.logo` — Ruta del logotipo global del sitio.
4. `config.favicon` — Ruta del favicon global del sitio.

::: callout tip "Pruebas de funcionamiento sin conexión" icon:smartphone
El registro del service worker se desactiva durante el desarrollo local (`npx @docmd/core dev`) para evitar que los recursos en caché interfieran con la edición en vivo. Para probar la PWA, compile el sitio (`npx @docmd/core build`) y sirva la carpeta de salida (`site/`) bajo HTTPS o en localhost.
:::
