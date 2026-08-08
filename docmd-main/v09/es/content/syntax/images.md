---
title: "Imágenes y medios visuales"
description: "Incruste imágenes adaptables, aplique clases de atributos para tamaño y alineación, y configure cajas de luz interactivas en docmd."
---

`docmd` utiliza la sintaxis de imagen estándar de Markdown. Centralice los recursos multimedia dentro del directorio `assets/` en la raíz de su proyecto para referencias de ruta consistentes.

```markdown
![Texto alternativo](/assets/images/architecture.png "Título de información emergente opcional")
```

![Ejemplo de estilo avanzado](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-centre}

## Clases de tamaño de imagen

Aplique un tamaño explícito utilizando la notación de clase de atributo `{ }`:

```markdown
![Vista previa de icono pequeño](/assets/icon.png){ .size-small }
![Vista de interfaz de usuario estándar](/assets/preview.png){ .size-medium }
![Banner de diseño de ancho completo](/assets/banner.png){ .size-large }
```

## Atributos de alineación y estilo

Combine clases de alineación y decoración visual en un solo bloque de atributos:

```markdown
![Diagrama arquitectónico centrado](/assets/img.png){ .align-centre }
![Vista previa alineada a la derecha con sombra](/assets/img.png){ .align-right .with-shadow .with-border }
```

## Leyendas de figuras HTML5

Utilice elementos HTML5 estándar `<figure>` y `<figcaption>` para leyendas de imágenes accesibles:

```html
<figure>
  <img src="/assets/diagram.png" alt="Arquitectura de infraestructura en la nube">
  <figcaption>Figura 1.1: Arquitectura de despliegue en la nube multirregión.</figcaption>
</figure>
```

## Galerías de imágenes adaptables

Envuelva múltiples componentes `<figure>` en un contenedor `div.image-gallery` para renderizar rejillas de medios adaptables:

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/screen1.jpg" alt="Pantalla de analítica de panel de control">
    <figcaption>Panel de control de rendimiento en tiempo real</figcaption>
  </figure>
  <figure>
    <img src="/assets/screen2.jpg" alt="Pantalla de panel de configuración">
    <figcaption>Interfaz de configuración global</figcaption>
  </figure>
</div>
```

## Superposiciones de zoom con caja de luz (Lightbox)

Cuando los scripts del cliente están activos, `docmd` adjunta automáticamente un comportamiento de zoom de caja de luz a pantalla completa a las imágenes etiquetadas con `.lightbox` o anidadas dentro de contenedores `.image-gallery`:

```markdown
![Vista previa del esquema del sistema](/assets/sample.png){ .lightbox }
```

::: callout tip "Accesibilidad y optimización de búsqueda" icon:sparkles
Proporcione siempre un **texto alternativo** descriptivo para cada imagen. Un texto alternativo de alta calidad proporciona contexto semántico para lectores de pantalla y agentes de IA que analizan el flujo de contexto `llms.txt`.
:::