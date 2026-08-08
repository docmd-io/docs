---
title: "Pasos (Steps)"
description: "Convierta listas ordenadas estándar en líneas de tiempo visuales e instructivos de gran impacto en docmd."
---

El contenedor `steps` transforma las listas ordenadas estándar de Markdown en líneas de tiempo verticales numeradas con enlaces permanentes al pasar el cursor. Está diseñado para tutoriales técnicos y guías paso a paso secuenciales.

::: callout info "Soporte de sintaxis sin espacios" icon:info
Tanto la sintaxis `::: steps` como `:::steps` (sin espacios) se renderizan de forma idéntica. Elija el estilo que mejor se adapte a su flujo de trabajo de creación.
:::

## Referencia de sintaxis

```markdown
::: steps

1.  **Título del paso**
    El texto de descripción del paso va aquí.

2.  **Título del siguiente paso**
    Continúe la secuencia.

:::
```

| Componente | Descripción |
| :--- | :--- |
| **`::: steps`** | Contenedor primario que transforma los elementos de la lista ordenada secundaria en una línea de tiempo numerada. |
| **`1. `** | Elemento de lista ordenada estándar de Markdown. Ponga en negrita la primera línea de cada elemento para crear un título de paso. |

## Ejemplos de uso

### Secuencia de flujo de trabajo básica

Una secuencia sencilla para tareas comunes de incorporación de desarrolladores:

```markdown
::: steps

1.  **Inicializar proyecto**
    Ejecute `npx @docmd/core init` para estructurar el directorio de su proyecto.

2.  **Crear contenido**
    Escriba documentación utilizando archivos Markdown estándar.

3.  **Compilar y desplegar**
    Ejecute `npx @docmd/core build` para compilar la salida estática de producción.

:::
```

::: steps

1.  **Inicializar proyecto**
    Ejecute `npx @docmd/core init` para estructurar el directorio de su proyecto.

2.  **Crear contenido**
    Escriba documentación utilizando archivos Markdown estándar.

3.  **Compilar y desplegar**
    Ejecute `npx @docmd/core build` para compilar la salida estática de producción.

:::

### Pasos con contenido enriquecido incrustado

Los pasos admiten bloques de código incrustados, alertas de avisos y otros contenedores anidados:

```markdown
::: steps

1.  **Configurar el entorno**
    Defina las opciones del proyecto en `docmd.config.json`.

    ::: callout tip
    Utilice `defineConfig` para habilitar el autocompletado del IDE para las claves del esquema de configuración.
    :::

2.  **Generar compilación de producción**
    Ejecute el comando de compilación para generar un sitio estático optimizado.

    ```bash
    npx @docmd/core build
    ```

3.  **Desplegar en la infraestructura**
    Publique el directorio `site/` compilado en S3, Cloudflare Pages o Vercel.

:::
```

::: steps

1.  **Configurar el entorno**
    Defina las opciones del proyecto en `docmd.config.json`.

    ::: callout tip
    Utilice `defineConfig` para habilitar el autocompletado del IDE para las claves del esquema de configuración.
    :::

2.  **Generar compilación de producción**
    Ejecute el comando de compilación para generar un sitio estático optimizado.

    ```bash
    npx @docmd/core build
    ```

3.  **Desplegar en la infraestructura**
    Publique el directorio `site/` compilado en S3, Cloudflare Pages o Vercel.

:::

::: callout tip "Optimización de flujo de trabajo para agentes de IA" icon:lightbulb
Los modelos de IA interpretan el contenedor `steps` como una señal para **Flujos de trabajo secuenciales**. Comience siempre cada elemento de la lista con un **título en negrita**; esto permite a los agentes de IA analizar el objetivo de cada paso de forma fiable a partir del contexto `llms.txt`.
:::