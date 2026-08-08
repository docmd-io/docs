---
title: "Comparativa"
description: "Cómo se compara docmd frente a Docusaurus, VitePress, MkDocs, Starlight y Mintlify: números reales, características reales."
---

Aquí se muestra cómo se compara `docmd` frente a las alternativas, con mediciones tomadas de un sitio de documentación de 50 páginas creado en hardware idéntico.

## Empiece a escribir en 3 segundos, no en 30 minutos

::: tabs
== tab "docmd" icon:rocket
```bash
npx @docmd/core dev
```
Listo. Su documentación está en vivo. Sin archivos de configuración, sin andamiaje de proyecto, sin sobrecarga de dependencias.

== tab "Docusaurus" icon:box
```bash
npx create-docusaurus@latest mi-sitio classic
cd mi-sitio
npm install
npm start
```
Cuatro comandos, un proyecto generado que consume aproximadamente 250 MB en `node_modules`, y un archivo de configuración que requiere modificaciones antes de que se renderice algo útil.

== tab "VitePress" icon:zap
```bash
npx vitepress init
```
Solicita 5 preguntas interactivas, genera archivos de configuración y luego ejecuta `vitepress dev`. Limpio, pero aún requiere andamiaje de proyecto.

== tab "MkDocs" icon:terminal
```bash
pip install mkdocs-material
mkdocs new mi-sitio && cd mi-sitio
mkdocs serve
```
Dependencia del ecosistema Python. Requiere `pip`, un entorno virtual y un `mkdocs.yml` antes de que se renderice la primera página.
:::

## La brecha de carga útil es real

Los lectores no deberían descargar un paquete de framework JavaScript de varios megabytes para leer texto técnico. Aquí está la carga útil real de red en el navegador para un sitio de 50 páginas:

| Generador | Carga Inicial Total | Carga útil JS | Carga útil CSS |
| :--- | :---: | :---: | :---: |
| **docmd** | **~18 KB** | **~12 KB** | **~6 KB** |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Por qué importa el tamaño de la carga útil" icon:lightbulb
Cada 100 KB de JavaScript cuesta ~50 ms de tiempo de análisis y ejecución en un procesador móvil de gama media. La huella de JavaScript de 12 KB de `docmd` garantiza un renderizado de página instantáneo incluso en conexiones móviles limitadas. Docusaurus transfiere 16 veces más JavaScript para el mismo contenido.
:::

## Rendimiento de compilación

Puntos de referencia de compilación en frío y recompilación en caliente para un sitio de 50 páginas en un MacBook Air M1:

| Generador | Compilacion en Frío | Recompilación en Caliente (Dev) |
| :--- | :---: | :---: |
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

Las recompilaciones de `docmd` ocurren al instante, actualizando el navegador antes de que cambie el foco de la ventana.

## i18n que gestiona traducciones faltantes de forma elegante

La mayoría de los generadores de documentación fallan cuando un usuario cambia a un idioma donde páginas específicas carecen de traducción. `docmd` resuelve las alternativas al idioma por defecto automáticamente en el momento de la compilación.

| Capacidad | docmd | VitePress | Docusaurus | Starlight |
| :--- | :---: | :---: | :---: | :---: |
| Alternativa por página al idioma por defecto | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Advertencia localizada de "no traducido" | ✅ | ❌ | ❌ | ✅ |
| Desactivar automáticamente idiomas faltantes en selector | ✅ | ❌ | ❌ | ❌ |
| Comprobación instantánea de existencia de página (sin red) | ✅ | ❌ | ❌ | ❌ |
| Control de versiones + i18n combinado | ✅ | ❌ | ❌ | ❌ |
| Cero configuración (sin React/Vue personalizado) | ✅ | Parcial | ❌ | ✅ |

::: callout warning "Errores 404 en VitePress y Docusaurus" icon:info
Si un lector cambia a un idioma donde una página específica no ha sido traducida, VitePress y Docusaurus generan un **error 404**. Evitar esto requiere redirecciones de servidor personalizadas o componentes de framework personalizados. `docmd` gestiona las traducciones faltantes en el momento de la compilación: las páginas no traducidas recurren al idioma por defecto sin problemas con un aviso de notificación localizado.
:::

## Soporte para espacio de trabajo multiproyecto

Los equipos que mantienen múltiples productos bajo un solo dominio (como el núcleo de la plataforma, SDK y herramientas CLI) requieren navegación independiente, configuraciones distintas y ciclos de lanzamiento separados.

| Capacidad | docmd | Docusaurus | VitePress | MkDocs | Starlight |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Soporte nativo para espacios de trabajo | ✅ | Plugin | ❌ | Plugin | ❌ |
| Una sola línea de configuración por proyecto | ✅ | ❌ | ❌ | ❌ | ❌ |
| Control de versiones independiente por proyecto | ✅ | ✅ | ❌ | ❌ | ❌ |
| i18n independiente por proyecto | ✅ | ❌ | ❌ | ❌ | ❌ |
| Recursos compartidos entre proyectos | ✅ | ❌ | ❌ | ❌ | ❌ |
| Salida única `site/` (sin necesidad de proxy) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Detección sin configuración | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "Configuración nativa del espacio de trabajo" icon:info
```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/", "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs", "title": "SDK" }
    ]
  }
}
```
Cada carpeta de proyecto del espacio de trabajo conserva su propio `docmd.config.json` para las anulaciones a nivel de proyecto. Al ejecutar `npx @docmd/core build` se compila un directorio de distribución unificado y consolidado sin proxies inversos ni canalizaciones de CI de varias etapas.
:::

Docusaurus requiere configuraciones complejas de plugins con múltiples instancias con archivos de configuración duplicados. MkDocs depende de `mkdocs-monorepo-plugin`. VitePress, Starlight y Mintlify no proporcionan soporte nativo para espacios de trabajo.

## Matriz de características completa

| Característica | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Inicio sin configuración** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Configuración requerida** | Ninguna | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **Monorrepos de espacio de trabajo** | ✅ | Plugin | ❌ | Plugin | ❌ | ❌ |
| **Navegación SPA** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Control de versiones nativo** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **i18n nativo** | ✅ | ✅ | Manual | Plugin | ✅ | ✅ |
| **Búsqueda integrada** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Nube |
| **Soporte llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Servidor MCP nativo** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Agent Skills** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Imagen Docker** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **Discusiones integradas** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Soporte PWA** | ✅ | Comunidad | ❌ | ❌ | ❌ | ❌ |
| **Autohospedado** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Generador de conf. de despliegue** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Sobrecarga de configuración

Líneas de configuración requeridas para un sitio con control de versiones, i18n, búsqueda y generación de mapa del sitio:

| Generador | Líneas de Configuración | Archivos Requeridos |
| :--- | :---: | :---: |
| **docmd** | **~15 líneas** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 líneas | 1 + plugins |
| VitePress | ~80 líneas | 1 + dir. tema |
| Docusaurus | ~120 líneas | 3+ arch. config. |

## Garantía de calidad automatizada

`docmd` viene con un conjunto integral de pruebas de integración que valida **25 escenarios distintos** a través de **85 aserciones**, cubriendo cada característica principal y plugin de forma aislada y en combinación. Cada versión debe pasar las 85 aserciones y 13 comprobaciones internas de seguridad antes de su publicación.

::: callout tip "Ejecutar la suite de pruebas localmente" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::
