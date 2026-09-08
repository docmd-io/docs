---
title: "GitHub Action"
description: "Compila y despliega documentación de docmd en GitHub Pages utilizando la GitHub Action oficial docmd-io/deploy."
---

La GitHub Action `docmd-io/deploy` compila tu sitio de documentación y expone la ruta del artefacto de compilación generado para pasos de publicación posteriores.

::: button "Ver en GitHub Marketplace" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Código fuente" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "¿Iniciando un nuevo proyecto?" icon:rocket
Usa la [Plantilla inicial](./starter-template) para nuevos repositorios. La GitHub Action independiente está diseñada para integrar la compilación de docmd en repositorios **existentes**.
:::

## Configuración del flujo de trabajo

Añade la acción a `.github/workflows/docs.yml`:

```yaml ".github/workflows/docs.yml"
name: Deploy Docs

on:
  push:
    branches: [main]

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  docs:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: docmd-io/deploy@v1
        id: build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ steps.build.outputs.site-dir }}

      - uses: actions/deploy-pages@v4
        id: deploy
```

## Patrón de flujo de trabajo reutilizable

Para configuraciones sin código repetitivo, haz referencia al flujo de trabajo reutilizable alojado:

```yaml ".github/workflows/docs.yml"
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## Entradas y salidas de la acción

### Entradas

| Parámetro | Tipo | Valor por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `node` | `string` | `"20"` | Versión del motor de Node.js de destino para la ejecución de la compilación. |

### Salidas

| Parámetro | Descripción técnica |
| :--- | :--- |
| `site-dir` | Ruta relativa al directorio de salida del sitio estático compilado (por ejemplo, `site/`). |

## Pasos de ejecución de la compilación

La acción ejecuta internamente el siguiente flujo de trabajo:

1. **Configuración del entorno**: Configura la versión del entorno de ejecución de Node.js especificada.
2. **Detección automática de configuración**: Busca hasta 2 niveles de directorios de profundidad archivos `docmd.config.json`, `docmd.config.js` o `docmd.config.ts`.
3. **Inicialización automática**: Si no se detecta ninguna configuración, ejecuta automáticamente `npx @docmd/core init`.
4. **Resolución de dependencias**: Ejecuta `npm ci` si existe `package.json`; de lo contrario, instala `@docmd/core` directamente.
5. **Compilación del sitio estático**: Ejecuta `npx @docmd/core build` y captura la ubicación del directorio de salida.

## Configuración del repositorio en GitHub Pages

Configura GitHub Pages para desplegar desde **GitHub Actions**:

1. Abre tu repositorio en GitHub.
2. Navega a **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.

## Configuración de subrutas y dominios personalizados

### Despliegue en subrutas

GitHub Pages sirve sitios de proyectos bajo subrutas (`https://<username>.github.io/<repository>/`). Especifica la URL completa de tu sitio en `docmd.config.json`:

```json "docmd.config.json"
{
  "url": "https://username.github.io/my-repo"
}
```

docmd extrae automáticamente el prefijo de ruta `/my-repo/` y lo aplica a las referencias internas de recursos y enlaces de navegación.

### Dominios personalizados

Para configurar un dominio personalizado:

1. Añade un archivo `CNAME` que contenga tu nombre de host (por ejemplo, `docs.ejemplo.com`) dentro de `docs/`.
2. Actualiza la propiedad `url` en `docmd.config.json` para que coincida con tu dominio.
3. Configura el dominio personalizado en **Settings → Pages → Custom domain**.

::: callout tip "Fijar versiones de la acción" icon:shield-check
Para entornos de producción, fija los pasos de tu flujo de trabajo a etiquetas de versión explícitas (por ejemplo, `uses: docmd-io/deploy@v1.0.0`) para protegerte contra cambios incompatibles inesperados.
:::
