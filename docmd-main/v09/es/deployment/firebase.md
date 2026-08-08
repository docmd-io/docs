---
title: "Firebase Hosting Deployment"
description: "Deploy static docmd documentation to Firebase Hosting manually or via GitHub Actions."
---

[Firebase Hosting](https://firebase.google.com/products/hosting) serves docmd static sites over Google's global CDN infrastructure with automated SSL certificate provisioning.

## Initial Setup & CLI Tools

Install Firebase CLI tools:

```bash
npm install -g firebase-tools
firebase login
```

### Initialisation Steps

1. Compile your site:
   ```bash
   npx @docmd/core build
   ```
2. Initialise Firebase Hosting configuration:
   ```bash
   firebase init hosting
   ```
   Select parameters when prompted:
   * **Public directory**: `site`
   * **Single-page app rewrite**: `No` (docmd compiles individual `index.html` pages).
   * **Overwrite `site/index.html`**: `No`
3. Deploy assets:
   ```bash
   firebase deploy --only hosting
   ```

## GitHub Actions CI/CD Integration

To automate publishing on push to `main`, create `.github/workflows/firebase.yml`:

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

Store `FIREBASE_SERVICE_ACCOUNT` in your repository under **Settings → Secrets and variables → Actions**.

::: callout tip "Custom Domain Mapping" icon:globe
Add custom domains in the Firebase Console under **Hosting → Custom domain**. Update the `url` property in `docmd.config.json` to match your domain so sitemaps and open graph metadata generate correctly.
:::