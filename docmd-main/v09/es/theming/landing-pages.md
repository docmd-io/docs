---
title: "Diseño de páginas de inicio personalizadas"
description: "Cree páginas de aterrizaje llamativas utilizando encabezados hero, contenedores de cuadrícula y el modo noStyle en docmd."
---

La página principal de su documentación actúa como el punto de bienvenida fundamental para los desarrolladores. `docmd` proporciona contenedores visuales nativos y modos de diseño para estructurar portadas atractivas sin necesidad de frameworks externos.

## Enfoques de diseño

`docmd` ofrece dos vías principales para construir páginas de inicio:

1. **Diseño estándar con Hero y Cuadrículas**: Conserva la navegación, barras laterales y menús superiores habituales mientras incorpora cabeceras hero dinámicas y tarjetas de funcionalidades.
2. **Lienzo en blanco (`noStyle: true`)**: Prescinde de la interfaz de documentación para ofrecer control total sobre estilos HTML y CSS personalizados.

## Ejemplos de implementación

### 1. Contenedor de cabecera Hero

El contenedor [Hero](../content/containers/hero.md) admite disposiciones divididas (`layout:split`) y efectos de resplandor de fondo (`glow:true`):

```markdown
::: hero layout:split glow:true
# Desarrolle más rápido con docmd
El compilador de documentación diseñado para humanos y máquinas.

::: button title:"Guía de inicio rápido" url:"../getting-started/quick-start.md" color:blue
::: button title:"Repositorio en GitHub" url:"external:https://github.com/docmd-io/docmd" color:gray

== side
::: embed url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
::: /hero
```

### 2. Navegación por características con cuadrículas

Combine [Cuadrículas y Tarjetas](../content/containers/grids.md) para presentar las cualidades principales de su producto:

```markdown
::: grids
  ::: grid
    ::: card title:"Inicio rápido" icon:rocket
    Póngase en marcha en menos de cinco minutos.
    ::: button title:"Comenzar" url:"../getting-started/quick-start.md"
    ::: /card
  ::: /grid
  ::: grid
    ::: card title:"Referencia de API" icon:code
    Documentación exhaustiva para todas las funciones principales.
    ::: button title:"Explorar API" url:"../api/index.md"
    ::: /card
  ::: /grid
::: /grids
```

### 3. Lienzo en blanco con `noStyle`

Para disfrutar de total libertad estética prescindiendo de barras y menús estándar, configure `noStyle: true` en el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Presentación del producto"
noStyle: true
components:
  meta: true
  css: true
  menubar: true
---
```

Cuando `noStyle: true` está habilitado, `docmd` renderiza únicamente el contenido aportado en el archivo, permitiéndole emplear clases de utilidad HTML combinadas con contenedores de `docmd`.

::: callout tip "Elegir el formato adecuado" icon:lightbulb
Para la inmensa mayoría de proyectos, combinar `::: hero` y `::: grids` en páginas de diseño estándar ofrece un impacto visual sobresaliente manteniendo al alcance el buscador instantáneo y los controles de tema.
:::
