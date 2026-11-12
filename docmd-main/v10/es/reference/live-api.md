---
title: "Editor en vivo"
description: "Referencia de arquitectura y ejecución para el entorno del Editor en vivo basado en el navegador de docmd."
---

El Editor en vivo de docmd proporciona un entorno de creación nativo del navegador. Utilizando el núcleo de compilación isomórfico, presenta vistas previas instantáneas de Markdown lado a lado sin requerir pasos de compilación en el disco local.

## Comandos de inicio

Inicie la instancia local del Editor en vivo:

```bash
npx @docmd/core live
```

El editor se abre en `http://localhost:3000` de forma predeterminada.

## Arquitectura

A diferencia del proceso del servidor `dev` que supervisa los cambios de archivos en el disco, el Editor en vivo ejecuta el motor de compilación directamente dentro del tiempo de ejecución del navegador:

1. **Retroalimentación instantánea**: El contenido se vuelve a renderizar en tiempo real mientras el usuario escribe.
2. **Entornos de prueba independientes**: El editor se puede exportar como un paquete Web estático para alojarlo en GitHub Pages o proveedores de alojamiento estático.
3. **Paridad**: Las vistas previas aprovechan la misma canalización de renderizado que las salidas de `build` de producción.

## Compilaciones estáticas independientes

Exporte un paquete independiente y compartible del Editor en vivo:

```bash
npx @docmd/core live --build-only
```

Emite un directorio `dist/` que contiene la aplicación HTML del editor y el motor isomórfico empaquetado.