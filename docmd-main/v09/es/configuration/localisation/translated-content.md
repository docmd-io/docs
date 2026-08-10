---
title: "Contenido traducido y enrutamiento i18n"
description: "Organice directorios de documentación multilingüe, mecánicas de respaldo y estructuras de navegación localizadas en docmd."
---

`docmd` proporciona soporte multilingüe (i18n) al organizar el contenido en subdirectorios de idioma dedicados. Puede gestionar el contenido localizado, recurrir sin problemas a los idiomas predeterminados y proporcionar barras laterales de navegación localizadas.

## Estructura de directorios

Cada idioma reside en su propio subdirectorio dentro de la raíz fuente (`src`). Los nombres de las carpetas coinciden con el `id` de idioma definido en su configuración:

```text
docs/
├── en/                     ← contenido del idioma predeterminado
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← idioma secundario (Hindi)
│   ├── index.md            ← página de inicio traducida
│   ├── navigation.json     ← etiquetas de navegación traducidas
│   └── getting-started/
│       └── installation.md ← guía de instalación traducida
└── zh/                     ← idioma terciario (Chino)
    └── index.md            ← página de inicio traducida
```

Cuando i18n está habilitado, todo el contenido de origen Markdown vive dentro de los directorios de idioma. Ningún archivo de contenido se ubica en el nivel raíz.

::: callout info "Identificadores de directorio personalizados" icon:info
Los nombres de los subdirectorios corresponden directamente a los valores `id` en su configuración. Si su configuración define `{ "id": "fr-ca" }`, el directorio de contenido correspondiente es `docs/fr-ca/`.
:::

## Resolución de respaldo archivo por archivo

`docmd` no requiere traducir cada documento por adelantado. El motor trata el **directorio de idioma predeterminado** como el árbol de contenido canónico. Cuando falta una página solicitada en un idioma secundario:

1. Si existe `docs/hi/getting-started/installation.md` → sirve la traducción al hindi.
2. Si falta `docs/hi/getting-started/installation.md` → recurre a `docs/en/getting-started/installation.md`.

Al recurrir al idioma predeterminado, `docmd` muestra un banner aviso informativo a los lectores. Personalice este mensaje a través de su [Configuración de cadenas de interfaz de usuario](./ui-strings.md).

## Páginas exclusivas por idioma

Los idiomas secundarios pueden albergar documentos únicos que no existen en el directorio del idioma predeterminado. Estas páginas se renderizan exclusivamente dentro de sus respectivas rutas de idioma.

## Localización de la navegación de la barra lateral

Cada directorio de idioma puede incluir un manifiesto `navigation.json` independiente. `docmd` utiliza un sistema de resolución de prioridad en cascada para las barras laterales. Consulte la [Configuración de navegación](../navigation.md) para conocer los detalles completos de la jerarquía.

```json "navigation.json"
[
  {
    "title": "शुरू करें",
    "children": [
      { "title": "इंस्टालेशन", "path": "/getting-started/installation" },
      { "title": "स्थानीयकरण", "path": "/configuration/localisation" }
    ]
  }
]
```

::: callout tip title:"Anulaciones parciales de navegación" icon:lightbulb
Proporcione un archivo `navigation.json` dentro de un directorio de idioma solo cuando traduzca etiquetas de menú. Si se omite, el árbol de navegación del idioma predeterminado se aplica automáticamente.
::: /callout

## Combinación del control de versiones con la localización

Al combinar el control de versiones y el enrutamiento multilingüe, organice los directorios jerárquicamente con los idiomas anidados dentro de las carpetas de versión:

```text
docs/                    ← versión actual
  en/                    ← idioma predeterminado
  hi/                    ← idioma traducido
docs-v1/                 ← versión heredada
  en/                    ← idioma predeterminado
  hi/                    ← idioma traducido
```

La jerarquía de URL de salida prioriza los prefijos de idioma, seguidos de las rutas de versión:

```text
/                        ← idioma predeterminado, versión actual
/hi/                     ← idioma traducido, versión actual
/v1/                     ← idioma predeterminado, versión heredada
/hi/v1/                  ← idioma traducido, versión heredada
```