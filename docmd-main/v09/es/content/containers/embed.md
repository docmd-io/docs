---
title: "Incrustaciones de URL (Embeds)"
description: "Incruste de forma segura video dinámico, redes sociales y contenido interactivo utilizando el analizador embed-lite en docmd."
---

`docmd` incluye de forma nativa el analizador de alto rendimiento **[embed-lite](external:https://github.com/docmd-io/docmd)**. Transforma automáticamente las URLs externas en componentes de interfaz de usuario seguros y de latencia cero.

## Plataformas de medios compatibles

El motor incluye formateadores integrados para redes populares:

* **Video:** YouTube (incluidos Shorts), Vimeo, Dailymotion, TikTok
* **Social:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
* **Código y prototipado:** GitHub Gists, CodePen, Figma, Google Maps
* **Audio:** Spotify, SoundCloud

## Referencia de sintaxis

```markdown
::: embed "URL_destino"
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **URL** | `"String"` | URL absoluta del recurso externo a incrustar (por ejemplo, video de YouTube, lienzo de Figma o GitHub Gist). |

## Ejemplos de uso

### Incrustación de video

Pegue cualquier URL de YouTube, Vimeo o TikTok para renderizar un reproductor de medios adaptable:

```markdown
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Comportamiento de respaldo

Si el analizador encuentra una URL no compatible, `docmd` recurre de forma elegante a un botón de hipervínculo formateado en lugar de lanzar un error de compilación:

```markdown
::: embed "https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"