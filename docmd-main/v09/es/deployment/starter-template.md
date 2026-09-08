---
title: "Plantilla inicial"
description: "Inicializa nuevos repositorios de documentación utilizando la plantilla inicial oficial de docmd con despliegue en GitHub Pages."
---

El repositorio `docmd-template` proporciona un punto de partida listo para usar para proyectos de docmd. Incluye un archivo `docmd.config.json` preconfigurado, páginas Markdown de muestra, scripts de desarrollo local y un flujo de trabajo automatizado de despliegue con GitHub Actions.

::: button "Usar esta plantilla" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "Ver repositorio" external:https://github.com/docmd-io/docmd-template icon:external-link

## Configuración de inicio rápido

### 1. Generar el repositorio

Haz clic en **[Use this template](https://github.com/docmd-io/docmd-template/generate)** en GitHub para crear una copia limpia y no bifurcada del repositorio en tu cuenta.

### 2. Configurar parámetros

Actualiza `docmd.config.json` con el título de tu proyecto y la URL de destino:

```json "docmd.config.json"
{
  "title": "My Docs",
  "url": "https://<username>.github.io/<repository>"
}
```

### 3. Habilitar GitHub Pages

Configura los ajustes de publicación de Pages en GitHub:

1. Navega a **Settings → Pages**.
2. En **Source**, selecciona **GitHub Actions**.
3. Guarda la selección.

### 4. Confirmar y publicar

Envía los cambios a `main`. El flujo de trabajo incluido compila tu sitio y lo publica en:

```text
https://<username>.github.io/<repository>/
```

## Estructura del repositorio

```text
.github/
  workflows/
    docs.yml          # Flujo de trabajo automatizado de CI/CD para compilación y publicación
docmd.config.json     # Archivo de configuración
docs/
  index.md            # Página de inicio predeterminada
package.json          # Scripts de desarrollo
```

## Flujo de trabajo de desarrollo local

Clona tu repositorio localmente e inicia el servidor de desarrollo:

```bash
npm install
npm run dev
```

El sitio se sirve localmente en `http://localhost:3000` con recarga rápida.

Para verificar una compilación de producción localmente:

```bash
npm run build
```

El directorio de salida se compila en `site/` por defecto.

## Flujo de trabajo de despliegue CI/CD

La plantilla incluye `.github/workflows/docs.yml`:

```yaml ".github/workflows/docs.yml"
name: Docs

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: docs
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install
        run: npm install @docmd/core

      - name: Build
        run: npx @docmd/core build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./site

      - name: Deploy
        id: deploy
        uses: actions/deploy-pages@v4
```

## Dominios personalizados

Para vincular un dominio personalizado (por ejemplo, `docs.ejemplo.com`):

1. Configura `url` en `docmd.config.json`:
   ```json
   { "url": "https://docs.ejemplo.com" }
   ```
2. Añade y confirma un archivo `CNAME` que contenga tu dominio dentro de `docs/`.
3. Configura el enrutamiento del dominio en **Settings → Pages → Custom domain**.

::: callout tip "Plantilla vs GitHub Action" icon:git-branch
La plantilla inicial proporciona una estructura de repositorio lista para usar en proyectos nuevos. Si vas a añadir documentación a un proyecto o código base existente, utiliza directamente la [GitHub Action](./github-action).
:::
