---
title: "Botones"
description: "Inyecte botones destacados de llamada a la acción para la navegación SPA interna y enlaces externos en docmd."
---

Los botones son componentes interactivos diseñados para la navegación y llamadas a la acción explícitas. Admiten enrutamiento SPA interno, enlaces externos, anulaciones de color personalizadas e iconos de Lucide.

## Sintaxis de Contenedor (Container Syntax)

```markdown
# Botón en Línea Independiente
::: button ["Texto de la etiqueta"] ["URL_destino" | url:"URL_destino"] [icon:nombre_icono] [color:#hex|color_css] [::: /button]

# Sintaxis Explícita de Clave-Valor
::: button title:"Texto de la etiqueta" url:"URL_destino" icon:nombre_icono color:#hex [::: /button]

# Botón en Línea Dentro de Oración
Haz clic en ::: button title:"Texto" url:"URL_destino" icon:nombre_icono ::: /button para continuar.
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **Título / Etiqueta** | `"String"` \| `title:"..."` | Etiqueta de texto mostrada dentro del botón (1er parámetro posicional o `title:"..."`). |
| **URL de Destino** | `"URL"` \| `url:URL` | Destino de navegación (2do parámetro posicional o `url:"..."`). Soporta rutas relativas SPA, mailto, tel o enlaces externos. |
| **Enlace Externo** | `external:URL` | Abre el enlace en una nueva pestaña del navegador (`target="_blank"` con `rel="noopener noreferrer"`). |
| **Color de Fondo** | `color:VALOR` | Color de fondo y borde personalizado (soporta nombres CSS o códigos hexadecimales). |
| **Iconografía** | `icon:NOMBRE` | Inyecta un icono de [Lucide](external:https://lucide.dev/icons) antes del texto. |
| **Autocierre y En Línea** | `::: /button` \| `:::` | Autocierre por defecto, u opcionalmente cerrado con `::: /button` al usarse en línea. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::

## Ejemplos de uso

### Navegación SPA interna

Utilice rutas relativas de Markdown para garantizar transiciones fluidas dentro del enrutador de una sola página:

```markdown
::: button title:"Guía de instalación" url:"../../getting-started/installation.md"
```

::: button "Guía de instalación" ../../getting-started/installation.md

### Enlaces a recursos externos

Anteponga `external:` a la URL para forzar que los enlaces se abran en una nueva pestaña del navegador:

```markdown
::: button title:"Ver monorepositorio en GitHub" url:"external:https://github.com/docmd-io/docmd"
```

::: button "Ver monorepositorio en GitHub" external:https://github.com/docmd-io/docmd

### Marca e iconografía personalizadas

Adapte los botones a la identidad de su marca utilizando anulaciones de color y nombres de iconos de Lucide:

```markdown
::: button title:"Acción exitosa" url:"./#success" color:#228B22 icon:check
::: button title:"Acción peligrosa" url:"./#delete" color:crimson icon:alert-circle
::: button title:"Ver código fuente" url:"external:https://github.com/docmd-io/docmd" icon:github
```

::: button "Acción exitosa" ./#success color:#228B22 icon:check
::: button "Acción peligrosa" ./#delete color:crimson icon:alert-circle
::: button "Ver código fuente" external:https://github.com/docmd-io/docmd icon:github

### Botones en Línea Dentro de Texto

Los botones se pueden utilizar en línea dentro de oraciones de texto:

```markdown
¡Haz clic en ::: button title:"Descargar v0.9.1" url:"https://docmd.io" icon:download ::: /button para comenzar!
```

¡Haz clic en ::: button "Descargar v0.9.1" https://docmd.io icon:download ::: /button para comenzar!