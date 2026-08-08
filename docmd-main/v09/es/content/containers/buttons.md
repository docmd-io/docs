---
title: "Botones"
description: "Inyecte botones destacados de llamada a la acción para la navegación SPA interna y enlaces externos en docmd."
---

Los botones son componentes interactivos diseñados para la navegación y llamadas a la acción explícitas. Admiten enrutamiento SPA interno, enlaces externos, anulaciones de color personalizadas e iconos de Lucide.

## Referencia de sintaxis

```markdown
::: button "Texto de la etiqueta" URL_destino [propiedad:valor...]
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Ruta** | `/ruta/` | URL relativa del proyecto. Se resuelve automáticamente a través del enrutador SPA. |
| **Externa** | `external:URL` | Abre la URL de destino en una nueva pestaña del navegador (`target="_blank"`). |
| **Color** | `color:VALOR` | Aplica un color de fondo (admite nombres CSS estándar o códigos hexadecimales). |
| **Icono** | `icon:NOMBRE` | Agrega un icono de [Lucide](external:https://lucide.dev/icons) antes del texto de la etiqueta. |

## Ejemplos de uso

### Navegación SPA interna

Utilice rutas relativas de Markdown para garantizar transiciones fluidas dentro del enrutador de una sola página:

```markdown
::: button "Guía de instalación" ../../getting-started/installation.md
```

::: button "Guía de instalación" ../../getting-started/installation.md

### Enlaces a recursos externos

Anteponga `external:` a la URL para forzar que los enlaces se abran en una nueva pestaña del navegador:

```markdown
::: button "Ver monorepositorio en GitHub" external:https://github.com/docmd-io/docmd
```

::: button "Ver monorepositorio en GitHub" external:https://github.com/docmd-io/docmd

### Marca e iconografía personalizadas

Adapte los botones a la identidad de su marca utilizando anulaciones de color y nombres de iconos de Lucide:

```markdown
::: button "Acción exitosa" ./#success color:#228B22 icon:check
::: button "Acción peligrosa" ./#delete color:crimson icon:alert-circle
::: button "Ver código fuente" external:https://github.com/docmd-io/docmd icon:github
```

::: button "Acción exitosa" ./#success color:#228B22 icon:check
::: button "Acción peligrosa" ./#delete color:crimson icon:alert-circle
::: button "Ver código fuente" external:https://github.com/docmd-io/docmd icon:github

## Comportamiento de análisis de autocierre

Los botones son componentes de una sola línea y autocerrados. Agregar una línea final `:::` inmediatamente después de un botón finaliza el **contenedor primario** (por ejemplo, una tarjeta o pestaña envolvente), lo que interrumpirá su diseño.

**Secuencia incorrecta:**
```markdown
::: card "Configuración"
    ::: button "Iniciar configuración" ../../setup.md
    :::        <-- Error: Esto cierra la tarjeta prematuramente.
:::
```

**Secuencia correcta:**
```markdown
::: card "Configuración"
    ::: button "Iniciar configuración" ../../setup.md
:::        <-- Correcto: Esto cierra la tarjeta limpiamente.
```