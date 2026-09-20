---
title: "Banners del sitio"
description: "Configure banners de anuncios y promocionales en múltiples posiciones con Markdown, imágenes, botones de llamada a la acción y persistencia de sesión en docmd."
---

`docmd` proporciona un sistema de banners flexible y de múltiples posiciones que admite tanto barras de anuncios de ancho completo como tarjetas dedicadas para la barra lateral y la tabla de contenidos (TOC). Utilice banners para mostrar anuncios de versiones, alertas de mantenimiento, llamadas de patrocinio o campañas promocionales en toda su documentación.

## Configuración rápida

Puede configurar un solo banner de anuncio superior con `layout.banner`, o configurar banners de múltiples posiciones con `layout.banners` en su `docmd.config.json`:

::: tabs
== tab "Banner superior único" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**¡v0.9.6 ya está disponible!** Explore las nuevas funciones de Modo Enfoque y banners.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Notas del lanzamiento", "url": "/release-notes/0-9-6" }
    }
  }
}
```
== tab "Banners en múltiples posiciones" icon:layout
```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": {
        "content": "**¡v0.9.6 ya está disponible!** Descubra las últimas mejoras de documentación.",
        "type": "announcement",
        "dismissible": true,
        "link": { "text": "Novedades", "url": "/release-notes/0-9-6" }
      },
      "toc-top": {
        "image": "/assets/sponsor-badge.png",
        "alt": "Patrocinar Docmd",
        "content": "**Apoye la documentación de código abierto**",
        "link": { "text": "Hazte patrocinador", "url": "https://github.com/sponsors" }
      },
      "sidebar-bottom": {
        "icon": "book-open",
        "content": "¿Necesita soporte empresarial o temas personalizados?",
        "link": { "text": "Contáctenos", "url": "https://docmd.io/contact" }
      }
    }
  }
}
```
:::

---

## Posiciones de banner admitidas

`docmd` admite 7 posiciones de banner distintas:

| Posición | Tipo de visualización | Persistencia predeterminada | Descripción |
| :--- | :--- | :--- | :--- |
| `top` | Barra | Descartable (`dismissible: true`) | Barra de anuncios de ancho completo en la parte superior del viewport. |
| `header` | Barra | Descartable (`dismissible: true`) | Banner de anuncios ubicado directamente dentro o debajo de la barra de encabezado. |
| `sidebar-top` | Tarjeta | Persistente (`dismissible: false`) | Banner de tarjeta fijado en la parte superior de la barra lateral de navegación. |
| `sidebar-bottom` | Tarjeta | Persistente (`dismissible: false`) | Banner de tarjeta fijado en la parte inferior de la barra lateral de navegación. |
| `toc-top` | Tarjeta | Persistente (`dismissible: false`) | Banner de tarjeta fijado en la parte superior del carril de Tabla de Contenidos (TOC). |
| `toc-bottom` | Tarjeta | Persistente (`dismissible: false`) | Banner de tarjeta fijado en la parte inferior del carril de Tabla de Contenidos (TOC). |
| `footer` | Barra | Persistente (`dismissible: false`) | Banner amplio renderizado directamente sobre el pie de página. |

---

## Referencia de configuración

Cada objeto de banner dentro de `layout.banners[posición]` (o `layout.banner` para la barra superior) acepta las siguientes opciones:

| Campo | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `content` | `""` | Cadena Markdown en línea (`**negrita**`, `` `código` ``). Mutuamente excluyente con `html`. |
| `html` | `""` | Cadena HTML directa. Tiene prioridad sobre `content` para diseños enriquecidos personalizados. |
| `image` | `null` | URL o ruta relativa a un gráfico/logotipo de tarjeta (permitido en posiciones de tarjeta como `sidebar-*` y `toc-*`; ignorado en `top`). |
| `alt` | `""` | Texto alternativo accesible para la `image`. |
| `type` | `"info"` | Variante de estilo visual: `"info"`, `"success"`, `"warning"`, `"danger"`, o `"announcement"`. |
| `dismissible` | *Varía según la posición* | Si el banner muestra un botón de cierre (X). Predeterminado en `true` para `top`/`header`, y `false` (persistente) para posiciones de tarjeta. Alias: `dismissable`, `closable`. |
| `link` | `null` | Enlace de llamada a la acción. Acepta `{ text, url }` o una URL directa. |
| `icon` | `null` | Nombre de cualquier [Icono de Lucide](external:https://lucide.dev/icons) renderizado junto al contenido (p. ej. `sparkles`, `bell`, `heart`). |

---

## Banners de tarjeta (Barra lateral y Tabla de contenidos)

Los banners de tarjeta (`sidebar-top`, `sidebar-bottom`, `toc-top`, `toc-bottom`) están diseñados específicamente como widgets compactos y no invasivos para contenido complementario, avisos de patrocinio o recursos para desarrolladores.

### Valores predeterminados y persistencia

A diferencia de la barra de anuncios superior, **los banners de tarjeta son persistentes por defecto** (`dismissible: false`). Permanecen visibles en todas las páginas y no desaparecen al navegar.

Si desea que un banner de tarjeta sea descartable por el lector, configure explícitamente `dismissible: true` (o `dismissable: true`):

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "toc-top": {
        "image": "/assets/survey-banner.png",
        "content": "¡Complete nuestra breve encuesta para desarrolladores!",
        "dismissible": true,
        "link": { "text": "Iniciar encuesta", "url": "https://example.com/survey" }
      }
    }
  }
}
```

Al ser descartado, el estado se guarda en `sessionStorage` durante la sesión del navegador.

---

## Herencia de versiones y anulaciones

En sitios con varias versiones (`versions.all`), las configuraciones de versión heredan automáticamente los banners del proyecto raíz. Una versión puede sobrescribir una posición específica sin perder los banners de la raíz:

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": { "content": "¡Bienvenido a nuestra documentación!" },
      "toc-top": { "image": "/assets/sponsor.png", "link": "https://docmd.io" }
    }
  },
  "versions": {
    "current": "v2",
    "all": [
      {
        "id": "v1",
        "dir": "docs-v1",
        "label": "v1.0",
        "banners": {
          "top": {
            "content": "⚠️ Estás viendo la documentación heredada v1. Cambia a v2 para ver las últimas funciones.",
            "type": "warning",
            "dismissible": false
          }
        }
      },
      {
        "id": "v2",
        "dir": "docs-v2",
        "label": "v2.0"
      }
    ]
  }
}
```

---

## Estilos personalizados

Los banners se renderizan con clases BEM estándar:
- Banners: `.docmd-banner` (o `.summer-banner` en la plantilla Summer)
- Variantes de posición: `.docmd-banner--pos-top`, `.docmd-banner--pos-sidebar-top`, `.docmd-banner--pos-toc-top`, etc.
- Estilo de tarjeta: `.docmd-banner--card`
- Variantes de tipo: `.docmd-banner--info`, `.docmd-banner--warning`, `.docmd-banner--success`, `.docmd-banner--danger`

```css "custom.css"
.docmd-banner--pos-toc-top {
  border-radius: 8px;
  border: 1px solid var(--docmd-color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.docmd-banner--announcement {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: #ffffff;
}
```

## Desactivar banners

Para desactivar banners:
- Establezca `layout.banner` en `null` u omítalo.
- En `layout.banners`, elimine la clave de posición o establézcala en `null`.
- En una página concreta, configure `banner: null` en el frontmatter.