---
title: "Etiquetas (Tags)"
description: "Utilice contenedores de etiquetas para etiquetar versiones, estados o destacar fragmentos de texto cortos en línea en docmd."
---

El contenedor `tag` es un componente de autocierre que inyecta insignias compactas en forma de píldora en línea. Las etiquetas conservan sus proporciones compactas en todos los contextos; no heredan los tamaños de fuente de encabezado circundantes ni los pesos de texto.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: tag [title:"Texto de la insignia"] [color:color_css|#hex] [icon:nombre_icono] [url:[external:]direccion]
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **Texto de Insignia** | `"String"` \| `title:"..."` | Texto dentro de la insignia de píldora (1er parám posicional o `title:"..."`). |
| **Color de Fondo** | `color:VALOR` | Aplica color de fondo (nombres CSS o Hex). El contraste del texto es automático. |
| **Iconografía** | `icon:NOMBRE` | Agrega un icono de [Lucide](external:https://lucide.dev/icons) dentro de la insignia. |
| **URL de Hipervínculo** | `url:URL` | Convierte la insignia en un enlace. Anteponga `external:` para nueva pestaña. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de uso

### Insignias de versión en línea

Utilice una etiqueta de color en línea para indicar introducciones de características o restricciones de versión:

```markdown
Esta capacidad se introdujo en ::: tag "v0.9.0" color:blue y es totalmente compatible.
```

Esta capacidad se introdujo en ::: tag "v0.9.0" color:blue y es totalmente compatible.

### Indicadores de estado

Inserte etiquetas de estado en todas sus páginas de documentación con acentos de color personalizados:

```markdown
::: tag title:"Obsoleto" color:#ef4444
::: tag title:"Beta" color:#eab308
::: tag title:"Estable" color:#22c55e
::: tag title:"Verificado" icon:check-circle color:#10b981
```

::: tag "Obsoleto" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Estable" color:#22c55e
::: tag "Verificado" icon:check-circle color:#10b981

### Insignias de etiquetas enlazadas

Agregue `url:` para que una etiqueta actúe como un hipervínculo, útil para hacer referencias cruzadas de notas de lanzamiento o recursos externos.

```markdown
Consulte las últimas ::: tag "Notas de lanzamiento" icon:external-link url:./#release-notes
```

Consulte las últimas ::: tag "Notas de lanzamiento" icon:external-link url:./#release-notes

### Enlaces externos

Anteponga `external:` a la URL para forzar que el enlace se abra en una nueva pestaña del navegador:

```markdown
::: tag title:"GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd