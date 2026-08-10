---
title: "Configuración de la barra de menú"
description: "Configure la barra de menú de navegación superior, enlaces desplegables, logotipos de marca y menús de utilidades en docmd."
---

La `menubar` (barra de menú) es una barra de navegación superior principal que proporciona contexto global en sus subsitios de documentación. Posiciónela como una barra fija en la parte superior absoluta de la ventana gráfica o en línea por encima del encabezado de la página.

## Esquema de configuración

Configure los elementos de la barra de menú en el bloque `layout.menubar` de `docmd.config.json`:

```json "docmd.config.json"
{
  "layout": {
    "menubar": {
      "enabled": true,
      "position": "top", 
      "left": [
        { "type": "title", "text": "Marca", "url": "/", "icon": "home" },
        { "text": "Documentación", "url": "/docs" },
        { 
          "type": "dropdown", 
          "text": "Ecosistema", 
          "items": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" },
            { "text": "Editor en Vivo", "url": "https://live.docmd.io" }
          ]
        }
      ],
      "right": [
        { "text": "Soporte", "url": "/support", "icon": "help-circle" }
      ]
    }
  }
}
```

### Opciones de configuración

| Propiedad | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Interruptor principal para la visibilidad de la barra de menú. |
| `position` | `String` | `'top'` | `'top'` (fijado en la parte superior absoluta de la ventana gráfica) o `'header'` (en línea sobre el título de la página). |
| `left` | `Array` | `[]` | Elementos de navegación alineados a la izquierda de la barra de menú. |
| `right` | `Array` | `[]` | Elementos de navegación alineados a la derecha de la barra de menú. |

## Tipos de elementos compatibles

Los arrays `left` y `right` admiten tres tipos de elementos principales:

### 1. Enlace estándar
Renderiza un enlace de texto con icono opcional y comportamiento de nueva pestaña:
- `text`: Texto de la etiqueta del enlace.
- `url`: Ruta relativa o URL externa.
- `icon`: Nombre de icono de Lucide opcional.
- `external`: Cuando es `true`, se abre en una nueva pestaña del navegador.

### 2. Título de marca
Establezca `"type": "title"` para renderizar encabezados de marca con estilo (por ejemplo, pesos en negrita con activadores de icono de inicio).

### 3. Menú desplegable anidado
Establezca `"type": "dropdown"` y proporcione un array `items` para renderizar submenús desplegables emergentes interactivos.

## Integración del menú de utilidades

Para posicionar utilidades globales (como la búsqueda de texto completo, el interruptor de tema oscuro/claro y enlaces de patrocinio) en la barra de menú, establezca `optionsMenu.position` en `'menubar'`:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

Las utilidades se alinean en la **región derecha** automáticamente, renderizándose después de cualquier enlace personalizado definido en `right`.

::: callout info title:"Respaldo de reubicación" icon:sparkles
Si la `menubar` está desactivada mientras `optionsMenu.position` está establecido en `'menubar'`, las utilidades recurren automáticamente a la posición `sidebar-top`.
::: /callout

## Estilos personalizados

Personalice el estilo de la barra de menú anulando las propiedades personalizadas de CSS en sus hojas de estilo personalizadas. Consulte [CSS y JS personalizados](../theming/custom-css-js.md):

```css
:root {
  --menubar-h: 56px;
  --menubar-bg: var(--bg-color);
  --menubar-border: var(--border-color);
  --menubar-text: var(--text-color);
}
```