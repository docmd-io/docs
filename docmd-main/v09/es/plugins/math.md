---
title: "Plugin de matemáticas"
description: "Renderizado nativo de expresiones matemáticas KaTeX y LaTeX con carga condicional de hojas de estilo."
---

El plugin `@docmd/plugin-math` proporciona renderizado de ecuaciones matemáticas LaTeX y KaTeX en docmd. Con la tecnología de `markdown-it-texmath` y KaTeX, las fórmulas se compilan en elementos HTML estáticos con inyección condicional de CSS.

## Instalación y configuración

Instale el plugin mediante la CLI:

```bash
npx @docmd/core add math
```

Habilite el plugin en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "math": {}
  }
}
```

## Capacidades principales

* **Sintaxis en línea y en bloque**: Analiza ecuaciones delimitadas por `$` (en línea) o `$$` (en bloque).
* **Inyección condicional de hojas de estilo**: El archivo CSS de KaTeX (~30 KB) se inyecta exclusivamente en las páginas que contengan fórmulas matemáticas (`class="katex"` o `class="katex-display"`). Las páginas sin ecuaciones no reciben ninguna carga innecesaria.
* **Inicialización ultraveloz**: El marcado matemático se resuelve durante la compilación, garantizando ausencia de cambios de diseño visual (layout shift) al cargar la página.

## Sintaxis y uso

### Matemáticas en línea

Incruste expresiones en el flujo de texto utilizando signos de dólar simples (`$`):

```markdown
La ecuación de equivalencia entre masa y energía es $E = mc^2$.
```

La ecuación de equivalencia entre masa y energía es $E = mc^2$.

### Matemáticas en bloque

Renderice demostraciones y ecuaciones centradas en múltiples líneas con doble signo de dólar (`$$`):

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$

::: callout tip "Optimización de rendimiento" icon:zap
Dado que los recursos de KaTeX se cargan de forma condicional por página, incluir fórmulas en algunas secciones no afectará la velocidad de carga del resto de su documentación.
:::
