---
title: "Estilos y scripts personalizados"
description: "Inyecte archivos CSS y JavaScript personalizados en su sitio docmd para ampliar estilos, identidad corporativa y comportamiento del cliente."
---

Aunque los temas de `docmd` ofrecen una estética cuidada por defecto, puede inyectar hojas de estilo y scripts personalizados a través de las opciones `theme.customCss` y `theme.customJs` en `docmd.config.json`.

## Configuración de estilos y scripts personalizados

Las hojas de estilo y los scripts del cliente se configuran de forma simétrica bajo el bloque `theme`:

```json "docmd.config.json"
{
  "theme": {
    "name": "default",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

::: callout info title:"Compatibilidad con versiones anteriores" icon:history
En versiones anteriores de docmd, el JavaScript personalizado se configuraba mediante un arreglo de nivel superior `"customJs"` y el CSS mediante `"customCss"`. Ambas claves raíz continúan siendo totalmente compatibles como opciones alternativas, pero anidarlas bajo `"theme"` es el estándar moderno recomendado.
:::

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

Utilice `theme.customJs` para scripts que introduzcan interactividad o integren analíticas de terceros:

```json "docmd.config.json"
{
  "theme": {
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

### Compatibilidad con el enrutador SPA

Los scripts personalizados se cargan al final de la etiqueta `<body>`. Puesto que `docmd` opera como una **Single Page Application (SPA)** durante la navegación del usuario:

* No se producen recargas completas de página al hacer clic en enlaces internos.
* Los scripts que interactúen con elementos del DOM deben suscribirse a los eventos del ciclo de vida del enrutador SPA.

Consulte [Eventos del lado del cliente](../reference/client-side-events.md) para conocer los detalles de los eventos disponibles.

## Orden de la cascada

Las hojas de estilo y los scripts se cargan en un orden predecible de tres etapas para que sus reglas personalizadas siempre tengan prioridad:

1. **Núcleo y Tema**: Los estilos base y esquemas de color cargan primero.
2. **Plantillas y Plugins**: Las plantillas estructurales y los recursos de plugins cargan a continuación.
3. **CSS y JS Personalizados**: Sus archivos `customCss` y `customJs` cargan al final, garantizando que sus declaraciones anulen los valores predeterminados.

Para conocer cómo personalizar estructuras completas, explore [Plantillas](templates.md).

::: callout tip "Estilos personalizados organizados" icon:lightbulb
Mantenga sus recursos organizados separando los directorios `/css` y `/js` dentro de `assets/`. Emplear selectores con nombres específicos en `branding.css` evitará colisiones con las reglas predeterminadas de los contenedores de `docmd`.
:::
