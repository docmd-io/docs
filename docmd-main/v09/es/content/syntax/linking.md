---
title: "Enlaces y referencias"
description: "Domine los enlaces cruzados internos, la normalización de URL, los activadores de nuevas pestañas externas y las referencias a recursos estáticos en docmd."
---

`docmd` proporciona un sistema de enlaces consciente del sistema de archivos. Escriba enlaces que hagan referencia a archivos `.md` de origen de forma natural; el compilador normaliza las rutas de destino en URLs canónicas y limpias automáticamente.

::: callout info "Normalización automática de rutas" icon:info
Escriba rutas de destino utilizando extensiones `.md`, barras diagonales finales o nombres de archivo directos (`overview.md`, `overview/` u `overview`). El compilador de compilación las resuelve en URLs canónicas idénticas.
:::

## Mecánica de normalización de URL

Durante la compilación, `docmd` normaliza los destinos de enlaces internos automáticamente en la prosa de Markdown, contenedores de botones, etiquetas y árboles de navegación:

| Ruta de entrada | URL de salida compilada | Regla de resolución |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | Elimina la extensión `.md`, añade la barra `/` final. |
| `overview` | `overview/` | Añade la barra `/` final automáticamente. |
| `overview/` | `overview/` | Conserva el formato canónico existente. |
| `api/commands.md` | `api/commands/` | Normaliza la ruta del subdirectorio. |
| `localisation/index.md` | `localisation/` | Elimina `index`, resuelve la raíz del directorio. |
| `../index.md` | `../` | Resuelve la raíz del directorio primario. |
| `overview.md#settings` | `overview/#settings` | Preserva el fragmento de hash de la URL. |
| `https://example.com` | `https://example.com` | Conserva la URL externa sin cambios. |

## Enlaces a documentos internos

Haga referencia a documentos internos utilizando rutas relativas del sistema de archivos:

| Destino del enlace | Ejemplo de sintaxis |
| :--- | :--- |
| **Página hermana** | `[Descripción general del sistema](overview.md)` |
| **Página de subdirectorio** | `[Referencia de la API](api/node-api.md)` |
| **Índice del directorio** | `[Localización](localisation/index.md)` |
| **Directorio primario** | `[Volver a inicio](../index.md)` |

## Enlaces de ancla de sección

Navegue a encabezados de documentos específicos utilizando fragmentos de hash de URL:

```markdown
<!-- Ancla de sección dentro de la página -->
[Ir a la hoja de ruta](#project-roadmap)

<!-- Ancla de sección entre páginas -->
[Revisar marcadores de CLI](../api/cli-commands.md#available-flags)
```

Los fragmentos de hash se conservan mediante la normalización de URL. El enlace entre páginas anterior se compila como `../api/cli-commands/#available-flags`.

## Apertura de enlaces externos en nuevas pestañas

Anteponga `external:` a cualquier destino URL para forzar que el enlace se abra en una nueva pestaña del navegador (`target="_blank"`):

```markdown
[Abrir en nueva pestaña](external:./configuration/overview.md)
[Repositorio de GitHub](external:https://github.com/docmd-io/docmd)
```

La cadena del prefijo `external:` se elimina de los atributos href de HTML renderizados.

## Enlaces directos a recursos no procesados (`raw:`)

Utilice el prefijo `raw:` para omitir la normalización de URL y dirigirse directamente a archivos descargables estáticos:

```markdown
[Descargar código fuente no procesado](raw:docs/readme.md)
```

## Contenedores enriquecidos y elementos interactivos

Los contenedores de botones (`::: button`) y etiquetas (`::: tag`) admiten todos los prefijos de enlace, incluidos los modificadores `external:` y `raw:`:

```markdown
::: button "Guía de inicio rápido" ./getting-started/quick-start.md icon:rocket
::: button "Repositorio de GitHub" external:https://github.com/docmd-io/docmd icon:github
::: button "Descargar manifiesto" raw:docs/manifest.json icon:download

::: tag "Lanzamiento v0.9.0" link:release-notes/0-9-0.md icon:tag color:#22c55e
::: tag "Sitio externo" link:external:https://docmd.io icon:external-link
:::
```

## Enlaces de configuración de navegación

Las entradas de ruta en `navigation.json` y `docmd.config.json` se normalizan automáticamente durante la compilación:

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

Para forzar que un elemento de navegación se abra en una nueva pestaña, establezca `"external": true`:

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout tip "Vincular a directorios de categorías" icon:lightbulb
Al vincular a la página de índice de un subdirectorio, haga referencia a la ruta de la carpeta directamente (`localisation/`) en lugar de añadir `index.md`.
:::

## Protocolos y rutas de recursos

El compilador conserva los protocolos de red estándar y las rutas de recursos estáticos:

- **Protocolos HTTPS**: `[Página de inicio de docmd](https://docmd.io)` (se abre en la misma pestaña a menos que se anteponga `external:`).
- **Protocolos de correo**: `[Mesa de ayuda](mailto:help@docmd.io)` (activa el cliente de correo electrónico).
- **Recursos estáticos**: `[Descargar recurso](/assets/bin/docmd-mac.zip)` (omite la normalización de URL).

::: callout tip "Anclas descriptivas para el contexto de IA" icon:sparkles
Utilice **texto de ancla descriptivo** (`[Configurar el almacenamiento en caché de PWA](../plugins/pwa.md)`) en lugar de etiquetas genéricas (`[Leer más](../plugins/pwa.md)`). El texto de enlace explícito mejora la comprensión semántica para los indexadores de búsqueda y los agentes de IA.
:::