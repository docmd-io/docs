---
title: "Redirecciones y páginas 404"
description: "Configure redirecciones HTML estáticas y páginas de error 404 con marca personalizada en docmd."
---

Los entornos de alojamiento estático carecen de motores de enrutamiento dinámico en el servidor (como las reglas de reescritura de Nginx). `docmd` genera sistemas de protección HTML nativos para gestionar la redirección de URL y los estados de error personalizados automáticamente.

## Redirecciones HTML sin servidor

Redirija el tráfico desde URLs heredadas a nuevos destinos de documentos declarando mapas de rutas en el objeto `redirects`:

```json "docmd.config.json"
{
  "redirects": {
    "/setup": "/getting-started/installation", 
    "/v1/api": "/api-reference"                  
  }
}
```

### Mecanismo técnico de redirección

Al declarar un mapa de redirección, el compilador genera un archivo `index.html` en la ruta heredada de destino que contiene una etiqueta HTML `<meta http-equiv="refresh">`:

1. **Redirección instantánea del usuario**: Los lectores son redirigidos a la nueva ruta de destino al instante al acceder.
2. **Preservación de equidad SEO**: Los motores de búsqueda reconocen la dirección de actualización meta, preservando la autoridad del enlace y la indexación.
3. **Seguimiento de analítica**: Los scripts de analítica del lado del cliente registran las visitas a páginas entrantes antes de la redirección.

## Páginas de error 404 con marca personalizada

Cuando los visitantes solicitan una ruta URL inexistente, las plataformas de alojamiento estático sirven el documento `404.html` de la raíz. `docmd` compila una página `404.html` personalizada de forma predeterminada, heredando la marca de su sitio, la navegación de la barra lateral y el entorno de ejecución SPA.

### Personalización del contenido de error 404

Personalice los títulos de las páginas 404 y el texto del cuerpo del error en `docmd.config.json`:

```json "docmd.config.json"
{
  "notFound": {
    "title": "404: Página no encontrada",
    "content": "No pudimos ubicar la página solicitada. Utilice la navegación de la barra lateral para volver a la documentación activa."
  }
}
```

::: callout tip "Prueba local de páginas de error" icon:lightbulb
El servidor de desarrollo local de `docmd` sirve automáticamente su página 404 personalizada para las rutas de archivos que faltan.
:::