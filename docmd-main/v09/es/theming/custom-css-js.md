---
title: "Estilos y scripts personalizados"
description: "Inyecte archivos CSS y JavaScript personalizados en su sitio docmd para ampliar estilos, identidad corporativa y comportamiento del cliente."
---

Aunque los temas de `docmd` ofrecen una estética cuidada por defecto, puede inyectar hojas de estilo y scripts personalizados a través de las opciones `theme.customCss` y `customJs` en `docmd.config.json`.

## Anulaciones mediante CSS personalizado

Utilice `theme.customCss` para redefinir variables del tema o agregar reglas de diseño:

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

### Pasos de ejecución

1. Guarde su archivo CSS en la carpeta de recursos de su proyecto (por ejemplo, `docs/assets/css/branding.css`).
2. `docmd` transferirá los recursos al directorio compilado durante la generación e inyectará las etiquetas `<link>` automáticamente en el encabezado.
3. Las hojas de estilo personalizadas se cargan **después** de los temas, asegurando que sus declaraciones prevalezcan limpiamente sobre los estilos base.

## Integración de JavaScript personalizado

Utilice el arreglo de nivel superior `customJs` para scripts que introduzcan interactividad o integren analíticas de terceros:

```json "docmd.config.json"
{
  "customJs": [
    "/assets/js/feedback-widget.js"
  ]
}
```

### Compatibilidad con el enrutador SPA

Los scripts personalizados se cargan al final de la etiqueta `<body>`. Puesto que `docmd` opera como una **Single Page Application (SPA)** durante la navegación del usuario:

* No se producen recargas completas de página al hacer clic en enlaces internos.
* Los scripts que interactúen con elementos del DOM deben suscribirse a los eventos del ciclo de vida del enrutador SPA.

Consulte [Eventos del lado del cliente](../reference/client-side-events.md) para conocer los detalles de los eventos disponibles.

## Orden de prioridad de recursos

A cada recurso CSS o JS registrado en `docmd` se le asigna un **peso de prioridad** que determina el orden de carga en la cascada (los números menores cargan primero):

| Peso de prioridad | Capa | Descripción técnica |
| :--- | :--- | :--- |
| `0` | Núcleo base (`docmd-main.css`, `docmd-main.js`) | Siempre presentes en todas las compilaciones. |
| `5` | Esquema de color del tema (`docmd-theme-sky.css`, etc.) | Cargado mediante `theme.name`. |
| `10` | Estilos de estructura de plantilla | Inyectados por los plugins de plantilla activos. |
| `15` | `customCss` / `customJs` del usuario | **Prioridad máxima para personalizaciones del usuario**. |
| `20` | Recursos de plugins | Estilos de ampliación visual, búsqueda y analíticas. |

Dentro de un mismo rango de prioridad, los archivos se cargan en el orden en que fueron declarados. Para conocer cómo personalizar estructuras completas, explore [Plantillas](templates.md).

::: callout tip "Estilos personalizados organizados" icon:lightbulb
Mantenga sus recursos organizados separando los directorios `/css` y `/js` dentro de `assets/`. Emplear selectores con nombres específicos en `branding.css` evitará colisiones con las reglas predeterminadas de los contenedores de `docmd`.
:::
