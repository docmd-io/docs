---
title: "Apariencia clara y oscura"
description: "Configure los modos de visualización claro y oscuro, variables CSS personalizadas y controles de cambio de tema en docmd."
---

`docmd` incorpora esquemas de color claro y oscuro adaptables de forma nativa. El motor responde automáticamente a las preferencias del sistema operativo del visitante y proporciona un botón para alternar el modo manualmente.

## Modo de visualización predeterminado

Establezca el modo inicial en `docmd.config.json`:

```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

| Configuración de apariencia | Comportamiento |
| :--- | :--- |
| **`system`** *(Por defecto)* | Sigue automáticamente la preferencia clara u oscura del sistema operativo (Recomendado). |
| **`light`** | Fuerza el modo claro al cargar la página por primera vez. |
| **`dark`** | Fuerza el modo oscuro al cargar la página por primera vez. |

## Configuración del conmutador de tema

El botón para alternar el tema reside dentro del **Menú de opciones**. Puede controlar su visibilidad y ubicación en `docmd.config.json`:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "themeSwitch": true
      }
    }
  }
}
```

## Mecanismo de atributos y variables CSS

El motor aplica el atributo `data-theme` a la etiqueta `<body>` en el renderizado:

* Tema estándar por defecto: `<body data-theme="light">` o `<body data-theme="dark">`
* Tema con paleta personalizada (ej., `sky`): `<body data-theme="sky-light">` o `<body data-theme="sky-dark">`

### Anulación de variables CSS

Los temas emplean variables CSS para toda la colorimetría de la interfaz. Puede anular estas variables en su hoja de estilo para ajustar aspectos específicos de cada modo:

```css
:root {
  --docmd-primary: #4f46e5; /* Color de acento para modo claro */
}

html[data-theme="dark"] {
  --docmd-primary: #818cf8; /* Color de acento para modo oscuro */
}
```

## Persistencia del estado

Cuando el usuario conmuta el modo en la interfaz, su preferencia queda guardada en `localStorage`. `docmd` lee este valor al inicio de cada carga de página, evitando parpadeos visuales (FOUC) durante la navegación.

::: callout tip "Legibilidad para herramientas de IA" icon:lightbulb
Los analizadores de IA se benefician de contrastes nítidos. `docmd` preserva relaciones de alto contraste entre texto y fondo en ambos modos, garantizando que los bloques de código y llamadas se extraigan con total claridad en los flujos de contexto de `llms.txt`.
:::
