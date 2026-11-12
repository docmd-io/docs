---
title: "Plugin de integración con Git"
description: "Incorpore información de repositorios Git: fechas de última modificación, historial de commits y enlaces para editar el contenido."
---

El plugin `@docmd/plugin-git` añade información del repositorio a su documentación. Consulta el historial local de Git durante la compilación para mostrar fechas de última actualización, autores y enlaces automatizados para editar las páginas.

## Opciones de configuración

Configure los parámetros del repositorio en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | URL pública del repositorio (ej., `https://github.com/org/repo`). Requerida para los enlaces de edición. |
| `branch` | `string` | `'main'` | Rama de destino para los enlaces de edición. |
| `editLink` | `boolean` | `true` | Muestra el botón "Editar esta página" en el pie de página. |
| `lastUpdated` | `boolean` | `true` | Muestra la fecha de última actualización en el pie de página. |
| `commitHistory` | `boolean` | `true` | Muestra un globo emergente con el historial reciente al pasar el cursor sobre la fecha. |
| `maxCommits` | `number` | `5` | Número máximo de commits mostrados en el globo emergente. |
| `dateFormat` | `string` | `'relative'` | Formato de fecha: `relative` (por defecto), `iso` o adaptado al idioma (`locale-aware`). |

### Ejemplo de configuración

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/docmd-io/docmd",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## Capacidades principales

* **Marcas de tiempo de última actualización**: Calculadas por archivo y mostradas en el pie de página.
* **Historial de commits interactivo**: Al pasar el cursor sobre la fecha, se muestran los hashes de commits recientes, mensajes y avatares de los autores.
* **Enlaces automáticos de edición**: Genera enlaces directos hacia GitHub, GitLab o Bitbucket.
* **Caché en compilación**: Las consultas de Git se ejecutan en tiempo de compilación y se guardan en caché local para no impactar en el rendimiento del navegador.

## Controles a nivel de página

Desactive las funciones de Git en páginas específicas mediante el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Notas internas"
plugins:
  git: false
---
```

## Integración en pipelines de CI/CD

El plugin de Git ejecuta comandos locales de la CLI `git` durante la compilación. Muchos servicios de CI/CD (como GitHub Actions o GitLab CI) realizan clonaciones superficiales (`fetch-depth: 1`), lo que trunca el historial y provoca que todas las páginas muestren la misma fecha de actualización.

Asegúrese de que su flujo de trabajo descargue el historial completo:

::: tabs

== tab "GitHub Actions"

Agregue `fetch-depth: 0` en el paso de checkout:

```yaml ".github/workflows/docs.yml"
- name: Checkout del repositorio
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

Establezca la variable de entorno `GIT_DEPTH` en `0`:

```yaml ".gitlab-ci.yml"
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify descarga el historial completo por defecto. Si utiliza scripts de compilación personalizados, verifique que el directorio `.git` se conserve en el entorno de trabajo.

:::

::: callout warning "Disponibilidad de la CLI de Git" icon:alert-triangle
El directorio `.git` y el ejecutable binario de `git` deben ser accesibles dentro de su contenedor de compilación o entorno de CI.
:::

## Soporte de localización

El plugin de Git admite traducción de cadenas de texto y formatos de fecha según el idioma activo mediante la [configuración de localización de interfaz](../configuration/localisation/ui-strings.md).
