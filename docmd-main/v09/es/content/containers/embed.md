---
title: "Incrustaciones de URL (Embeds)"
description: "Incruste de forma segura video dinámico, redes sociales y contenido interactivo utilizando el analizador embed-lite en docmd."
---

`docmd` incluye de forma nativa el analizador de alto rendimiento **[embed-lite](external:https://github.com/docmd-io/docmd)**. Transforma automáticamente las URLs externas en componentes de interfaz de usuario seguros y de latencia cero.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: embed [url:"https://domain.com/recurso"] # Apertura de incrustación de URL
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **URL del Recurso** | `"String"` \| `url:"..."` | URL absoluta del recurso a incrustar (1er parám posicional o `url:"..."`). |
| **Redes Soportadas** | Integrado | Detecta YouTube, Vimeo, TikTok, X, Figma, Gists, CodePen, Spotify, etc. |
| **Botón de Respaldo** | Automático | URLs no reconocidas se renderizan como botones de hipervínculo sin errores. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de uso

### Incrustación de video

Pegue cualquier URL de YouTube, Vimeo o TikTok para renderizar un reproductor de medios adaptable:

```markdown
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Comportamiento de respaldo

Si el analizador encuentra una URL no compatible, `docmd` recurre de forma elegante a un botón de hipervínculo formateado en lugar de lanzar un error de compilación:

```markdown
::: embed url:"https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"