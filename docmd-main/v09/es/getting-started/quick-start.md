---
title: "Inicio Rápido"
description: "Aprenda a crear, configurar y publicar su primer sitio de documentación con docmd en menos de 5 minutos."
---

Empiece a usar `docmd` en cuestión de segundos. Este tutorial le guiará a través de la creación de su primera estructura de documentación sin necesidad de configuración previa.

::: steps

1.  **Inicializar el Proyecto**
    Ejecute el comando de inicialización en el directorio de su proyecto:

    ```bash
    npx @docmd/core init
    ```

    Esto creará la estructura básica de carpetas `docs/` y el archivo de configuración por defecto.

2.  **Iniciar el Servidor de Desarrollo**
    Inicie el servidor local con recarga en tiempo real:

    ```bash
    npx @docmd/core dev
    ```

    Abra `http://localhost:3000` en su navegador para ver la documentación en vivo.

3.  **Compilar para Producción**
    Genere el sitio estático optimizado listo para producción:

    ```bash
    npx @docmd/core build
    ```

    Los archivos estáticos finales se generarán en el directorio `site/`.

:::

::: callout tip "Siguiente Paso" icon:arrow-right
Consulte la guía de [Estructura del Proyecto](./project-structure.md) para organizar su contenido de manera óptima.
:::
