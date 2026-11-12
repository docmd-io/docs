---
title: "Iconos"
description: "Integre iconos de Lucide en barras laterales, botones, etiquetas y componentes personalizados en docmd."
---

`docmd` incorpora compatibilidad nativa con la biblioteca de iconos [Lucide](external:https://lucide.dev/). Asigne iconos a enlaces de navegación, botones, etiquetas y pestañas para mejorar la legibilidad y el atractivo visual de su documentación.

## Iconos en la navegación lateral

Asigne nombres de iconos Lucide a los nodos de navegación en `docmd.config.json`. Utilice el identificador en minúsculas separado por guiones (kebab-case) de cualquier icono de la colección:

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Inicio", "path": "/", "icon": "home" },
    { "title": "Configuración", "path": "/setup", "icon": "settings" }
  ]
}
```

## Iconos en contenedores de interfaz

Utilice la propiedad `icon:` en contenedores como botones, etiquetas, pestañas o tarjetas:

```markdown
::: button "Descargar versión" /download icon:download
::: tag "Verificado" icon:check-circle color:green
:::
```

## Estilos CSS personalizados

Todos los iconos se renderizan como elementos SVG en línea con la clase `.lucide-icon`. Ajuste sus dimensiones o grosor de trazo en `customCss`:

```css
.lucide-icon {
  stroke-width: 1.5px; /* Trazo estilizado más fino */
  width: 1.2rem;
  height: 1.2rem;
}

/* Personalizar iconos concretos */
.icon-rocket {
  color: #ff5733;
}
```

## Directorio de iconos disponibles

Explore los miles de iconos vectoriales incluidos en la biblioteca de Lucide:

::: button "Explorar catálogo de iconos Lucide" external:https://lucide.dev/icons icon:globe
