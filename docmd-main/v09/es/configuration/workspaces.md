---
title: "Espacios de trabajo multiproyecto"
description: "Cree y despliegue sitios de documentación multiproyecto desde un solo repositorio con recursos compartidos y selectores de proyectos en docmd."
---

Los espacios de trabajo le permiten crear y desplegar múltiples proyectos de documentación independientes desde un solo repositorio. Cada subproyecto mantiene sus propias opciones de configuración mientras hereda los valores predeterminados globales definidos en la raíz del espacio de trabajo.

```text
docs.ejemplo.com/           → Documentación principal del producto
docs.ejemplo.com/sdk/       → Referencia de API del SDK
docs.ejemplo.com/cli/       → Guía de herramientas CLI
```

## Configuración de directorios

Organice su repositorio en subdirectorios de proyectos separados. Los recursos estáticos compartidos y las configuraciones globales del espacio de trabajo residen en la raíz del repositorio:

```text
mis-docs/
├── assets/                   ← recursos estáticos compartidos (heredados por todos los proyectos)
├── main-docs/
│   ├── docmd.config.json     ← config. a nivel de proyecto (anula los valores predeterminados raíz)
│   └── docs/                 ← contenido Markdown del proyecto principal
├── sdk-docs/
│   ├── docmd.config.json     ← config. del proyecto SDK
│   └── docs/                 ← contenido Markdown del proyecto SDK
├── docmd.config.json         ← configuración raíz del espacio de trabajo
└── package.json
```

## Esquema de configuración del espacio de trabajo

El archivo `docmd.config.json` raíz utiliza la clave `workspace` para declarar proyectos. Los parámetros de nivel superior (por ejemplo, `theme`, `menubar`, `logo`) actúan como **valores predeterminados globales** en todos los subproyectos:

```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "Referencia SDK" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg"
  },
  "menubar": [
    { "text": "GitHub", "url": "https://github.com/docmd-io/docmd", "external": true }
  ]
}
```

### Opciones de `workspace`

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `projects` | `Array` | Lista de entradas de proyectos. Exactamente un proyecto debe asignar `prefix: "/"`. |
| `switcher` | `Object` | Controla la posición y renderizado del [Selector de proyectos](#selector-de-proyectos). |

### Campos de entrada de proyectos

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `prefix` | `String` | Sí | Prefijo de ruta URL. Utilice `"/"` para el proyecto raíz. |
| `src` | `String` | Sí | Ruta del subdirectorio que contiene el contenido del proyecto y el `docmd.config.json` opcional. |
| `title` | `String` | No | Nombre a mostrar renderizado en el menú desplegable del Selector de proyectos. |

## Anulaciones a nivel de proyecto

Los subproyectos pueden mantener manifiestos `docmd.config.json` dedicados. Los parámetros definidos a nivel de proyecto **anulan** los valores predeterminados de la raíz del espacio de trabajo:

```json "docmd.config.json"
{
  "title": "Referencia SDK",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

Si un subproyecto omite un archivo de configuración local, el compilador aplica el enrutamiento automático de cero configuración utilizando los valores predeterminados del espacio de trabajo.

## Jerarquía en cascada de configuración

Las opciones de configuración se aplican en cascada a través de un modelo de precedencia de 3 capas:

| Capa | Prioridad | Descripción |
| :--- | :--- | :--- |
| **Config. raíz del espacio de trabajo** | Predeterminado base | Se aplica primero en todos los proyectos del espacio de trabajo. |
| **Config. de proyecto (`docmd.config.json`)** | Superior | Anula los valores predeterminados de la raíz del espacio de trabajo para ese proyecto específico. |
| **Navegación de proyecto (`navigation.json`)** | Máxima prioridad | Siempre tiene prioridad para renderizar barras laterales. |

::: callout info title:"Prioridad de navegación" icon:info
Un manifiesto `navigation.json` a nivel de proyecto **siempre tiene prioridad** sobre cualquier array global `navigation` definido en la configuración de la raíz del espacio de trabajo.
::: /callout

## El selector de proyectos en la interfaz

El Selector de proyectos renderiza un componente desplegable accesible que permite a los lectores saltar entre los subproyectos del espacio de trabajo:

```json "docmd.config.json"
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| Posición | Ubicación de renderizado |
| :--- | :--- |
| `sidebar-top` (predeterminado) | Fijado en la parte superior de la barra lateral, sobre los enlaces de navegación. |
| `sidebar-bottom` | Fijado en la parte inferior de la barra lateral. |
| `options-menu` | Integrado en el menú de opciones del encabezado junto a la búsqueda y los conmutadores de tema. |

El Selector de proyectos se renderiza automáticamente cuando se declaran dos o más proyectos en el espacio de trabajo.

## Gestión de recursos

- **Recursos compartidos**: Coloque logotipos, favicons y CSS personalizado global en el directorio raíz `assets/`. Todos los proyectos del espacio de trabajo heredan estos recursos durante el desarrollo y la compilación.
- **Recursos del proyecto**: Los subproyectos pueden mantener subdirectorios `assets/` locales. Los recursos específicos del proyecto anulan los recursos raíz compartidos cuando los nombres de archivo colisionan.

## Comandos de desarrollo y compilación

::: tabs
== tab "Servidor de desarrollo" icon:play
Ejecute el servidor de desarrollo multiproyecto:
```bash
npx @docmd/core dev
```
Compila todos los proyectos del espacio de trabajo y los sirve en un solo puerto HTTP. Las ediciones de archivos activan actualizaciones en caliente orientadas por proyecto sin volver a compilar todo el espacio de trabajo.
== tab "Compilación de producción" icon:box
Genere el paquete de producción:
```bash
npx @docmd/core build
```
Genera un único directorio estático consolidado. Todos los proyectos se compilan en sus respectivas subrutas sin requerir configuraciones de proxy inverso.
:::

## Restricciones del espacio de trabajo

1. **Requisito del proyecto raíz**: Exactamente un proyecto debe asignar `prefix: "/"`.
2. **Prefijos de ruta únicos**: Cada proyecto debe utilizar una cadena de prefijo de URL única.
3. **Control de `out` a nivel raíz**: El directorio de salida (`out`) se configura exclusivamente a nivel de la raíz del espacio de trabajo; las configuraciones de subproyectos no deben especificar `out`.

## Migración del esquema de configuración

Para actualizar las definiciones de espacio de trabajo heredadas al formato de esquema `workspace` moderno, ejecute el asistente de migración automatizado de la CLI:

::: callout tip "Actualización de configuración automatizada" icon:sparkles
Ejecute `npx @docmd/core migrate --upgrade` para reescribir automáticamente los archivos de configuración heredados al esquema de espacio de trabajo v0.9.0.
:::
