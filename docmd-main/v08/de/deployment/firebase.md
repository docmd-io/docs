---
title: "Firebase Hosting"
description: "Stellen Sie Ihre docmd-Dokumentation auf Firebase Hosting bereit. Funktioniert manuell oder über GitHub Actions."
---

[Firebase Hosting](https://firebase.google.com/products/hosting) stellt Ihre statische docmd-Website über ein globales CDN mit integriertem SSL bereit. Es lässt sich über die Firebase-CLI oder GitHub Actions sauber in CI/CD-Pipelines integrieren.

## Voraussetzungen

Installieren Sie die Firebase-CLI:

```bash
npm install -g firebase-tools
firebase login
```

## Einrichtung

1.  Bauen Sie Ihre Website:

    ```bash
    npx @docmd/core build
    ```

2.  Initialisieren Sie Firebase Hosting in Ihrem Projekt-Root:

    ```bash
    firebase init hosting
    ```

    Nach Aufforderung:
    - Wählen Sie Ihr Firebase-Projekt aus (oder erstellen Sie ein neues).
    - Setzen Sie das **öffentliche Verzeichnis** auf `site`.
    - Als Single-Page-App konfigurieren: **Nein** (docmd generiert pro Seite eine eigene `index.html`. Ein universeller Rewrite ist nicht erforderlich).
    - Überschreiben Sie `site/index.html` nicht.

3.  Bereitstellen:

    ```bash
    firebase deploy --only hosting
    ```

## CI/CD mit GitHub Actions

Um bei jedem Push automatisch bereitzustellen, erstellen Sie `.github/workflows/firebase.yml`:

```yaml
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

Richten Sie `FIREBASE_SERVICE_ACCOUNT` in den **Settings → Secrets** Ihres Repositories unter Verwendung des JSON-Schlüssels eines Firebase-Dienstkontos ein.

::: callout info "Warum `npx @docmd/core`?"
In CI/CD-Umgebungen, in denen docmd nicht global installiert ist, lädt `npx @docmd/core` das Paket direkt herunter und führt es aus. Wenn Ihr Projekt `@docmd/core` als `devDependency` auflistet, funktioniert die Ausführung von `npx @docmd/core build` nach `npm install` einwandfrei.
:::

## Eigene Domain

Fügen Sie eine benutzerdefinierte Domain in der Firebase-Konsole unter **Hosting → Add custom domain** hinzu. Firebase stellt SSL automatisch bereit.

Setzen Sie das Feld `url` in der Datei `docmd.config.json` so, dass es Ihrer Domain entspricht. Dies stellt sicher, dass kanonische Tags und Sitemaps korrekte absolute URLs generieren.