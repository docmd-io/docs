---
title: "Despliegue en Firebase Hosting"
description: "Despliega documentación estática de docmd en Firebase Hosting manualmente o a través de GitHub Actions."
---

[Firebase Hosting](https://firebase.google.com/products/hosting) sirve sitios estáticos de docmd a través de la infraestructura CDN global de Google con aprovisionamiento automatizado de certificados SSL.

## Configuración inicial y herramientas de CLI

Instala las herramientas de CLI de Firebase:

```bash
npm install -g firebase-tools
firebase login
```

### Pasos de inicialización

1. Compila tu sitio:
   ```bash
   npx @docmd/core build
   ```
2. Inicializa la configuración de Firebase Hosting:
   ```bash
   firebase init hosting
   ```
   Selecciona los parámetros cuando se te solicite:
   * **Directorio público**: `site`
   * **Reescritura para aplicación de página única (SPA)**: `No` (docmd compila páginas individuales `index.html`).
   * **Sobrescribir `site/index.html`**: `No`
3. Despliega los recursos:
   ```bash
   firebase deploy --only hosting
   ```

## Integración CI/CD con GitHub Actions

Para automatizar la publicación con cada push a `main`, crea `.github/workflows/firebase.yml`:

```yaml ".github/workflows/firebase.yml"
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm install
      - run: npx @docmd/core build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
```

Guarda `FIREBASE_SERVICE_ACCOUNT` en tu repositorio bajo **Settings → Secrets and variables → Actions**.

::: callout tip "Mapeo de dominios personalizados" icon:globe
Añade dominios personalizados en la consola de Firebase en **Hosting → Custom domain**. Actualiza la propiedad `url` en `docmd.config.json` para que coincida con tu dominio de modo que los mapas del sitio y los metadatos de Open Graph se generen correctamente.
:::
