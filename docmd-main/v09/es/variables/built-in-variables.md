---
title: Referencia de Variables Integradas
description: Referencia completa de todas las variables integradas de cero configuración que docmd proporciona durante la compilación y ejecución.
---

# Referencia de Variables Integradas

docmd registra automáticamente un completo conjunto de variables integradas en cada compilación. No requieren configuración previa y pueden usarse inmediatamente en contenido Markdown, banners, pies de página y etiquetas meta.

## Variables de Sistema y Compilación

| Variable | Alias | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | La versión actual del compilador docmd. |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | El año de 4 dígitos en que se compiló la documentación. |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | La fecha del calendario ISO (AAAA-MM-DD). |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | Marca de tiempo UTC completa en formato ISO 8601. |

::: callout info "Variables de sistema evaluadas en vivo" icon:sparkles
Estos valores se renderizan en tiempo real en este build:
- **Versión del compilador:** `v{{ docmd.version }}`
- **Año de compilación:** `{{ docmd.buildYear }}`
- **Marca de tiempo:** `{{ docmd.buildTime }}`
:::

### Año de Copyright Dinámico en el Pie de Página

Utilice `\{{ docmd.buildYear }}` en su `docmd.config.json` para mantener el año de copyright siempre actualizado en cada despliegue:

```json
{
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} Acme Technologies, Inc. Todos los derechos reservados."
  }
}
```

## Metadatos de Git y Repositorio

Al compilar dentro de un repositorio Git, docmd inspecciona los metadatos de control de versiones:

| Variable | Alias | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `git.commit`, `GIT_COMMIT` | `7a9b1c2` | SHA corto de 7 caracteres del commit actual de Git. |
| `docmd.gitBranch` | `git.branch`, `GIT_BRANCH` | `main` | Nombre de la rama activa en Git. |

### Información de Commit en Markdown

```markdown
> Esta documentación fue generada a partir del commit `\{{ docmd.gitCommit }}` en la rama `\{{ docmd.gitBranch }}` el \{{ docmd.buildDate }}.
```

::: callout info "Metadatos Git en Vivo" icon:git-branch
Esta página fue generada desde el commit `{{ docmd.gitCommit || 'HEAD' }}` en la rama `{{ docmd.gitBranch || 'main' }}` el {{ docmd.buildDate }}.
:::

## Variables de Contexto de Sitio y Página

docmd expone variables contextuales sobre la configuración del proyecto y el documento actual:

| Variable | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- |
| `site.title` | `docmd docs` | El título del sitio configurado en `docmd.config.json`. |
| `site.base` | `/` | La ruta base configurada para la URL. |
| `page.title` | `Referencia de Variables Integradas` | El título de la página actual. |
| `page.slug` | `variables/built-in-variables` | El slug o ruta relativa de la página sin extensión. |
| `page.path` | `variables/built-in-variables.md` | La ruta relativa del archivo fuente Markdown. |

### Encabezado Dinámico de Página

```markdown
# Bienvenido a \{{ site.title }}

Actualmente está visualizando **\{{ page.title }}** (`\{{ page.slug }}`).
```

::: card "Contexto de la Página Actual" icon:file-text
- **Título de la página:** {{ page.title }}
- **Slug de página:** `{{ page.slug }}`
- **Ruta de archivo:** `{{ page.path }}`
- **Título del sitio:** {{ site.title }}
- **Base del sitio:** `{{ site.base || '/' }}`
:::

::: callout tip "Uso en Campos de Configuración" icon:lightbulb
Todas las variables integradas también están disponibles en campos como `layout.banners.top.content` o `footer.copyright`.
:::
