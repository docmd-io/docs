---
title: "Banner del sitio"
description: "Configure banners de anuncios en todo el sitio desplegables con Markdown en línea, botones de llamada a la acción y persistencia de sesión en docmd."
---

`docmd` proporciona un banner de anuncio integrado y descartable posicionado en la parte superior del diseño. Úselo para mostrar anuncios de lanzamientos, ventanas de mantenimiento o llamadas a la acción promocionales en todas las páginas de documentación.

## Configuración rápida

Habilite el banner de anuncios en su manifiesto `docmd.config.json`:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**¡v0.9.0 ya está disponible!** — lea el anuncio completo del lanzamiento.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Leer anuncio", "url": "/blog/v0-9" }
    }
  }
}
```

El banner se renderiza en la parte superior de cada página. Al ser descartado por un lector, el estado cerrado se almacena en `sessionStorage` durante la duración de su sesión de navegador.

## Referencia de configuración

| Campo | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `content` | `""` | Cadena Markdown en línea (`**negrita**`, `` `código` ``). Mutuamente excluyente con `html`. |
| `html` | `""` | Cadena HTML directa. Tiene prioridad sobre `content` para diseños enriquecidos personalizados. |
| `type` | `"info"` | Tono de fondo visual (`"info"`, `"success"`, `"warning"`, `"danger"`). |
| `dismissible` | `true` | Cuando es `true`, renderiza un botón de cierre (X). Cuando es `false`, el banner permanece persistente. |
| `link` | `null` | Objeto opcional `{ text, url }` que renderiza un enlace de llamada a la acción (CTA). |
| `icon` | `null` | Nombre de cualquier [Icono de Lucide](external:https://lucide.dev/icons) renderizado a la izquierda (por ejemplo, `megaphone`, `bell`). |

### Ejemplos de configuración

::: tabs
== tab "Anuncio estándar" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "Mantenimiento programado del sistema el domingo de 02:00 a 04:00 UTC.",
      "type": "warning",
      "icon": "alert-triangle"
    }
  }
}
```
== tab "Llamada a la acción de lanzamiento" icon:sparkles
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "¡**v0.9.0 está en vivo!** Explore las nuevas funciones de búsqueda y componentes de la interfaz de usuario.",
      "type": "success",
      "icon": "party-popper",
      "link": { "text": "Notas del lanzamiento", "url": "/blog/v0-9-0" }
    }
  }
}
```
== tab "HTML personalizado" icon:code
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "html": "<strong>Nuevo:</strong> El motor del compilador de Rust ya está disponible en vista previa. <a href=\"/blog/rust-engine\">Más información →</a>",
      "type": "info",
      "dismissible": false
    }
  }
}
```
:::

## Comportamiento del diseño

- **Posicionamiento**: Se ubica en la parte superior de la ventana gráfica por encima de la barra de menú y el encabezado de la barra lateral. Creado con reglas CSS sin cambio de diseño para que descartar el banner no desplace bruscamente el contenido de la página.
- **Persistencia de sesión**: El estado de descartado se guarda en `sessionStorage`. Abrir una nueva sesión de navegador restaura el banner.
- **Personalización por página**: Para ocultar el banner en páginas de inicio específicas, establezca `layout.banner` en `null` en el frontmatter de la página.

## Estilos de banner personalizados

El banner utiliza nombres de clase BEM con el prefijo `.docmd-banner`. Personalice los colores y la tipografía a través de reglas CSS personalizadas:

```css
.docmd-banner--info {
  background: linear-gradient(90deg, #fef3c7 0%, #ffffff 100%);
  border-bottom: 2px solid #f59e0b;
}
.docmd-banner__link {
  font-weight: 600;
}
```

## Desactivación del banner del sitio

Para desactivar el banner del sitio globalmente, establezca `layout.banner` en `null` o elimine la clave `banner` de `docmd.config.json`.

::: callout tip "Integración con registro de cambios" icon:history
Combine los banners del sitio con páginas de registro de cambios o paquetes de plantillas para mantener un registro permanente de todas las actualizaciones de productos anunciadas.
:::