---
title: "Contenedores anidados"
description: "Combine tarjetas, pestañas, avisos y pasos de forma recursiva en diseños de página de alta fidelidad en docmd."
---

`docmd` utiliza un analizador sintáctico de contenedores recursivo con seguimiento de profundidad. Puede anidar componentes unos dentro de otros para crear estructuras de interfaz de usuario complejas e interactivas puramente en Markdown sin HTML personalizado.

::: callout warning "Sintaxis de botón de autocierre" icon:alert-triangle
El componente `::: button` es de autocierre (una sola línea). Nunca agregue una línea final `:::` inmediatamente después de un botón; al hacerlo, finaliza el **contenedor primario**, lo que resulta en diseños de página rotos.
:::

## Ejemplos de composición

### Bloque de recursos interactivo

Combine una **Tarjeta** para el marco estructural, **Pestañas** para comandos específicos del entorno y un **Aviso** para alertas:

````markdown
::: card "Inicio rápido de monorepositorio"
Elija su ruta de inicialización preferida:

   ::: tabs
   == tab "Automatizado"
      ```bash
      pnpm onboard
      ```
      ::: callout success
      Este script gestiona la instalación de paquetes y el enlace de espacios de trabajo automáticamente.
      :::

   == tab "Manual"
      Obtenga y enlace manualmente los paquetes del motor principal.
      ::: button "Ir a la guía del desarrollador" ./#developer-guide
   :::
:::
````

### Pasos de tutorial específicos de la plataforma

Anidar **Pestañas** dentro de **Pasos** es un patrón estándar para proporcionar comandos específicos del sistema operativo dentro de un tutorial secuencial:

```markdown
::: steps

1.  **Configuración del entorno**
    Configure su sistema operativo local.

    ::: tabs
    == tab "macOS"
    Asegúrese de que Homebrew esté instalado y actualizado.
    == tab "Linux"
    Verifique la presencia de `curl` y `bash`.
    :::

2.  **Verificación principal**
    Ejecute la comprobación de versión para confirmar la conectividad.

:::
```

::: steps

1.  **Configuración del entorno**
    Configure su sistema operativo local.

    ::: tabs
    == tab "macOS"
    Asegúrese de que Homebrew esté instalado y actualizado.
    == tab "Linux"
    Verifique la presencia de `curl` y `bash`.
    :::

2.  **Verificación principal**
    Ejecute la comprobación de versión para confirmar la conectividad.

:::

## Reglas de diseño y límites

| Regla | Nota técnica |
| :--- | :--- |
| **Pestañas recursivas** | Se desaconseja anidar pestañas dentro de otras pestañas, ya que crea una experiencia de usuario compleja en ventanas gráficas móviles. |
| **Conflictos secuenciales** | Si necesita pasos numerados dentro de un panel de pestañas, utilice una lista ordenada estándar en lugar de `::: steps`. |
| **Sangría de código fuente** | La sangría es opcional, pero la sangría de 2 o 4 espacios mejora la legibilidad de Markdown. |

::: callout tip "Segmentación de conocimientos para IA" icon:sparkles
El anidamiento de contenedores proporciona **Límites semánticos** claros. Un `callout` anidado dentro de una `card` delimita explícitamente ese consejo al tema de la tarjeta en el flujo `llms.txt`, evitando la filtración de contexto en secciones no relacionadas.
:::