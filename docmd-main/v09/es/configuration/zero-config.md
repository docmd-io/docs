---
title: "Arquitectura de cero configuración"
description: "Descubra el motor heurístico de cero configuración de docmd que descubre automáticamente archivos de documentación, enruta rutas y estructura sitios sin configuración."
---

`docmd` cuenta con un motor heurístico inteligente diseñado para analizar, descubrir y estructurar la documentación automáticamente. Los desarrolladores pueden compilar, servir y traducir sitios técnicos sin escribir una sola línea de configuración inicial.

## Cómo funciona el descubrimiento heurístico

Cuando se ejecuta en un directorio sin un manifiesto `docmd.config.json`, el motor inicializa el **Modo de cero configuración**. Escanea el espacio de trabajo en busca de contenido de documentación y aplica heurísticas automatizadas:

::: steps

1. **Descubrimiento del directorio fuente**: Escanea los directorios candidatos en orden de prioridad: `docs/`, `src/docs/`, `documentation/`, `content/` y `.` (alternativa de directorio raíz).
2. **Extracción de versión y ubicación**: Analiza automáticamente carpetas de versión que coinciden con `v[0-9]+` (por ejemplo, `v1.0`, `v09`) y códigos de ubicación de dos letras (por ejemplo, `en`, `de`, `zh`).
3. **Enrutamiento automatizado de la barra lateral**: Genera un árbol de navegación limpio analizando las jerarquías de archivos y convirtiendo nombres de base con guiones (`getting-started.md` → `Getting Started`).

:::

Si no se ubica ningún contenido de documentación en el espacio de trabajo de destino, `docmd` inicializa automáticamente una nueva plantilla de inicio.

## Convenciones de directorio de cero configuración

Para maximizar la efectividad del modo de cero configuración, adopte estas convenciones de directorio:

- **Nombramiento explícito de archivos**: Utilice nombres de archivo claros, con guiones o camelCase. El cargador automático los convierte en etiquetas de la barra lateral legibles para humanos.
- **Agrupación de directorios**: Agrupe documentos Markdown relacionados dentro de subcarpetas para crear automáticamente categorías desplegables en la barra lateral.
- **Página de inicio alternativa**: Coloque un `index.md` o `README.md` en la raíz de cada carpeta de contenido para que sirva como su página de inicio predeterminada.
- **Ruta de salida limpia**: Cuando utilice la raíz `.` como su carpeta fuente, los recursos estáticos compilados se envían a `./site/`, que es ignorado automáticamente por los controles de código fuente y compiladores.

## Comportamientos predeterminados integrados

Un sitio `docmd` funciona de forma predeterminada con valores razonables. Configure propiedades individuales en `docmd.config.json` solo cuando anule los valores predeterminados.

::: callout info "Desactivación de comportamientos predeterminados" icon:sliders
Para desactivar un comportamiento predeterminado, establezca su clave en `false` o en un valor vacío. Por ejemplo, al establecer `pageNavigation: false` se eliminan los enlaces inferiores de página anterior/siguiente.
:::

### Valores predeterminados de nivel superior

| Propiedad | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `pageNavigation` | `true` | Renderiza enlaces de artículos anteriores/siguientes en la parte inferior de las páginas. |
| `copyCode` | `true` | Añade botones de copia a los bloques de código. |
| `autoTitleFromH1` | `true` | Resuelve los títulos de página faltantes usando el primer encabezado `# H1` del archivo. |

### Valores predeterminados de diseño e interfaz

| Propiedad | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `layout.spa` | `true` | Navegación de rutas en el cliente de aplicación de una sola página (SPA). |
| `layout.breadcrumbs` | `true` | Barra de migas de pan contextuales sobre los encabezados de página. |
| `layout.header.enabled` | `true` | Barra de encabezado de navegación superior persistente. |
| `layout.sidebar.collapsible` | `true` | Grupos de categorías desplegables en la barra lateral en vistas de escritorio. |
| `layout.sidebar.defaultCollapsed` | `false` | Las categorías de la barra lateral comienzan en un estado expandido. |
| `layout.optionsMenu.position` | `"header"` | Posiciona los controles de búsqueda y tema en el encabezado. |
| `layout.optionsMenu.components.search` | `true` | Habilita el activador del modal de búsqueda de texto completo integrado. |
| `layout.optionsMenu.components.themeSwitch` | `true` | Habilita el interruptor de modo de apariencia claro/oscuro. |
| `layout.optionsMenu.components.sponsor` | `null` | URL de enlace de patrocinio opcional. |

### Valores predeterminados del pie de página

| Propiedad | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `layout.footer.style` | `"minimal"` | Barra de pie de página compacta de una sola línea. |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | Cadena dinámica de derechos de autor del año actual. |
| `layout.footer.branding` | `true` | Muestra el enlace de atribución "Creado con docmd". |

### Valores predeterminados de tema y estilo

| Propiedad | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `theme.name` | `"default"` | Tema base (`default`, `sky`, `ruby`, `retro`). Los nombres personalizados se promocionan automáticamente a [nombres de plantilla](../theming/templates.md). |
| `theme.appearance` | `"system"` | Modo de color predeterminado que sigue las preferencias del sistema (`system`, `light`, `dark`). |
| `theme.codeHighlight` | `true` | Resaltado de sintaxis en bloques de código. |

### Características extendidas opcionales

| Propiedad | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `cookie` | `null` | Diálogo de consentimiento de cookies opcional. Consulte [Consentimiento de cookies](./cookie-consent.md). |
| `layout.banner` | `null` | Banner de anuncio del sitio opcional. Consulte [Banner del sitio](./site-banner.md). |
| `theme.template` | `null` | Selección de plantilla de sitio personalizada opcional. Consulte [Plantillas](../theming/templates.md). |
