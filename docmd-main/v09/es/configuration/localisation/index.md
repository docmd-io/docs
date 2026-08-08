---
title: "Localización"
description: "Sirva documentación en múltiples idiomas con enrutamiento prioritario por idioma, navegación traducida y respaldo automático."
---

Agregue soporte multilingüe a su sitio de documentación. docmd sirve cada idioma en su propio prefijo de URL, traduce cadenas del sistema de la interfaz y recurre de forma elegante cuando falta una traducción.

## Agregar idiomas a su configuración

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "hi", "label": "हिन्दी" },
      { "id": "zh", "label": "中文" }
    ]
  }
}
```

El idioma `default` se renderiza en la raíz del sitio (`/`). Todos los demás idiomas se renderizan en `/{id}/`. Usted elige los ID, las etiquetas y qué idioma es el predeterminado: no hay suposiciones codificadas de forma rígida. Si desea el hindi como predeterminado, establezca `default: 'hi'` y el hindi se renderizará en `/` mientras que el inglés se renderizará en `/en/`.

| Clave | Tipo | Descripción |
|:----|:-----|:------------|
| `default` | `string` | ID de idioma que se renderiza en `/`. Por defecto es el primer idioma si se omite. |
| `locales` | `array` | Lista de objetos de idioma. Cada uno debe tener un `id`. |
| `position` | `string` | Dónde aparece el selector de idiomas. `options-menu` (predeterminado), `sidebar-top` o `sidebar-bottom`. |
| `stringMode` | `boolean` | Cuando es `true`, genera páginas de idioma desde una sola fuente utilizando el reemplazo de atributos `data-i18n`. Por defecto es `false`. |
| `inPlace` | `boolean` | Cuando es `true` (con script del lado del cliente), intercambia cadenas sin navegación de URL. Solo para SPA/paneles de control. Por defecto es `false`. |

Cada objeto de idioma acepta:

| Clave | Tipo | Predeterminado | Descripción |
|:----|:-----|:--------|:------------|
| `id` | `string` | - | Cualquier identificador que elija (por ejemplo, `en`, `hi`, `fr-ca`). Se utiliza como nombre de carpeta y prefijo de URL. Requerido. |
| `label` | `string` | Igual que `id` | Nombre a mostrar mostrado en el selector de idiomas. |
| `dir` | `string` | `ltr` | Dirección del texto. Establezca en `rtl` para árabe, hebreo, etc. |
| `translations` | `object` | `{}` | Anulaciones de cadenas de UI personalizadas (consulte [Cadenas de UI personalizadas](ui-strings.md)). |

## Estructura de URL

El idioma predeterminado no tiene prefijo de URL. Los idiomas no predeterminados se anidan en `/{id}/`. Cuando se combina con el [control de versiones](../versioning.md), la URL es `/{locale}/{version}/page`.

```
/                       ← idioma predeterminado, versión actual
/getting-started        ← página del idioma predeterminado
/05/                    ← idioma predeterminado, versión anterior
/hi/                    ← idioma no predeterminado, versión actual
/hi/getting-started     ← página del idioma no predeterminado
/hi/05/                 ← idioma no predeterminado, versión anterior
```

El selector de idiomas conserva su página y versión actuales cuando cambia de idioma. El selector de versiones conserva su idioma actual.

## Directorios de idioma faltantes

Si se declara un idioma en `locales` pero su directorio fuente no existe (por ejemplo, no hay carpeta `docs/hi/`), docmd **desactiva** automáticamente ese idioma en el selector de idiomas. El idioma aún aparece en el menú desplegable (con una insignia de "N/A" y un estilo grisáceo), pero al hacer clic en él no hace nada.

Esto evita errores 404 cuando enumera idiomas planificados antes de que su contenido esté listo.

## Posicionar el selector de idiomas

<img width="500" class="with-border" src="/assets/previews/menu-i18n.webp">

Controle dónde aparece el selector de idiomas mediante la opción `position`:

```json "docmd.config.json"
{
  "i18n": {
    "position": "sidebar-top"
  }
}
```

| Posición | Comportamiento |
|:---------|:----------|
| `options-menu` | Icono de globo compacto junto al interruptor de tema y la búsqueda. Predeterminado. |
| `sidebar-top` | Desplegable completo con etiqueta en la parte superior de la barra lateral. |
| `sidebar-bottom` | Desplegable completo con etiqueta en la parte inferior de la barra lateral. |

## Modo cadena (solo páginas noStyle)

El i18n estándar utiliza directorios separados por idioma (`docs/en/`, `docs/hi/`), cada uno con sus propios archivos Markdown. El **Modo cadena** es una alternativa más simple diseñada específicamente para [páginas noStyle](../../content/no-style-pages.md): páginas que usan HTML directo en lugar de Markdown.

```json "docmd.config.json"
  "i18n": {
    "default": "en",
    "stringMode": true,
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "zh", "label": "中文" }
    ]
  }
```

Con `stringMode: true`:

1. Los archivos fuente permanecen en el directorio raíz `docs/` (sin subdirectorios de idioma)
2. El idioma predeterminado se compila en `/` como de costumbre
3. Para cada idioma no predeterminado, docmd clona el HTML renderizado y aplica **reemplazo de cadenas en el servidor** utilizando archivos JSON de `assets/i18n/{locale}.json`
4. La salida va a `/{locale}/` (por ejemplo, `/zh/index.html`) con SEO completo (etiquetas hreflang, atributo `lang` correcto)
5. Si falta un archivo de traducción, la página se renderiza con el texto del idioma predeterminado

Para conocer todos los detalles sobre la sintaxis del atributo `data-i18n` y el formato del archivo JSON, consulte [reemplazo de cadenas noStyle](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle).

::: callout warning "El Modo cadena no traduce el contenido Markdown" icon:info
El reemplazo de cadenas funciona buscando atributos `data-i18n` en el HTML renderizado. El contenido Markdown estándar (`## Encabezado`, párrafos, listas) se renderiza en etiquetas HTML simples sin estos atributos, por lo que no hay nada que el reemplazador pueda encontrar.

- **Sitios de documentación** → utilice el modo directorio (el predeterminado). Cada idioma tiene sus propios archivos Markdown con prosa totalmente traducida.
- **Páginas de inicio, sitios de marketing, paneles de control** → utilice el modo cadena. Estas son páginas noStyle con HTML personalizado donde usted controla cada etiqueta y puede agregar atributos `data-i18n`.

Si su sitio tiene ambos (por ejemplo, una página de inicio noStyle más documentación), utilice el modo directorio para la documentación y agregue atributos `data-i18n` a su página noStyle. El modo cadena traducirá el HTML noStyle mientras que el modo directorio gestionará el contenido de la documentación.
:::

## Próximos pasos

- [Contenido traducido](translated-content.md): estructura de directorios, escritura de traducciones, navegación
- [Cadenas de UI y SEO](ui-strings.md): personalización del texto del sistema, etiquetas hreflang
- [Reemplazo de cadenas noStyle](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle): sintaxis de atributos `data-i18n` y formato JSON para páginas noStyle