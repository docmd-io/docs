---
title: Referencia de Variables Integradas
description: Referencia completa de todas las variables integradas que docmd proporciona de forma automática durante la compilación y en tiempo de ejecución.
---

# Referencia de Variables Integradas

docmd registra automáticamente un conjunto completo de variables integradas durante cada compilación. No requieren configuración previa y se pueden utilizar de inmediato en contenido Markdown, banners de plantilla, avisos de derechos de autor en el pie de página y etiquetas meta.

## Variables del Sistema y Compilación

| Variable | Alias | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | La versión del compilador docmd que procesa el sitio. |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | El año de 4 dígitos en el que se compiló la documentación. |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | La fecha en formato ISO (AAAA-MM-DD) de la compilación. |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | Marca de tiempo completa en formato ISO 8601 UTC. |

### Ejemplo: Año de Copyright Dinámico en el Pie de Página

Utilice `{{ docmd.buildYear }}` en su archivo `docmd.config.json` para que el año de copyright se mantenga actualizado de forma automática en cada despliegue:

```json
{
  "footer": {
    "copyright": "Copyright © {{ docmd.buildYear }} Acme Technologies, Inc. Todos los derechos reservados."
  }
}
```

## Metadatos de Git y Repositorio

Al compilar dentro de un repositorio Git, docmd extrae información del sistema de control de versiones:

| Variable | Alias | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `GIT_COMMIT` | `7a9b1c2` | El código SHA corto de 7 caracteres del commit actual. |
| `docmd.gitBranch` | `GIT_BRANCH` | `main` | El nombre de la rama activa de Git. |

### Ejemplo: Mostrar Información del Commit y Compilación

```markdown
> Esta documentación fue generada a partir del commit `{{ docmd.gitCommit }}` en la rama `{{ docmd.gitBranch }}` el {{ docmd.buildDate }}.
```

## Variables de Contexto del Sitio y la Página

docmd expone variables contextuales sobre el proyecto y el documento renderizado:

| Variable | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- |
| `site.title` | `Documentación de Docmd` | El título configurado en `docmd.config.json`. |
| `site.base` | `/docs/` | La ruta base configurada para la URL. |
| `page.title` | `Primeros Pasos` | El título de la página actual (del frontmatter o `# Primer Encabezado`). |
| `page.slug` | `getting-started/installation` | La ruta relativa o identificador URL de la página. |

### Ejemplo: Encabezado Dinámico

```markdown
# Bienvenido a {{ site.title }}

Está visualizando actualmente **{{ page.title }}** (`{{ page.slug }}`).
```
