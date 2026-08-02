---
title: "Firebase Hosting"
description: "Deploy your docmd documentation to Firebase Hosting. Works manually or via GitHub Actions."
---

[Firebase Hosting](https://firebase.google.com/products/hosting) delivers your docmd static site over a global CDN with SSL included. It integrates cleanly into CI/CD pipelines via the Firebase CLI or GitHub Actions.

## Prerequisites

Install the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
```

## Setup

1.  Build your site:

    ```bash
    npx @docmd/core build
    ```

2.  Initialise Firebase Hosting in your project root:

    ```bash
    firebase init hosting
    ```

    When prompted:
    - Select your Firebase project (or create a new one).
    - Set the **public directory** to `site`.
    - Configure as a single-page app: **No** (docmd generates individual `index.html` files per page. No catch-all rewrite is needed).
    - Do not overwrite `site/index.html`.

3.  Deploy:

    ```bash
    firebase deploy --only hosting
    ```

## CI/CD with GitHub Actions

To deploy automatically on every push, create `.github/workflows/firebase.yml`:

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

Set `FIREBASE_SERVICE_ACCOUNT` in your repository's **Settings → Secrets** using a Firebase service account JSON key.

::: callout info "Why `npx @docmd/core`?"
In CI/CD environments where docmd is not globally installed, `npx @docmd/core` fetches and runs the package directly. If your project lists `@docmd/core` as a `devDependency`, running `npx @docmd/core build` after `npm install` works perfectly.
:::

## Custom Domain

Add a custom domain in the Firebase Console under **Hosting → Add custom domain**. Firebase provisions SSL automatically.

Set the `url` field in `docmd.config.json` to match your domain. This ensures canonical tags and sitemaps generate correct absolute URLs.