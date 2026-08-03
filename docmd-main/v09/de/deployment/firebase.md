---
title: "Firebase Hosting"
description: "Stellen Sie Ihre docmd-Dokumentation auf Firebase Hosting bereit. Funktioniert manuell oder über GitHub Actions."
---

[Firebase Hosting](https://firebase.google.com/products/hosting) liefert Ihre docmd-Statik-Site über ein globales CDN mit enthaltenem SSL aus. Es lässt sich sauber in CI/CD-Pipelines über die Firebase CLI oder GitHub Actions integrieren.

## Voraussetzungen

Installieren Sie die Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
```

## Einrichtung

1.  Bauen Sie Ihre Site:

    ```bash
    npx @docmd/core build
    ```

2.  Initialisieren Sie Firebase Hosting im Projektstamm:

    ```bash
    firebase init hosting
    ```

    Wenn Sie dazu aufgefordert werden:
    - Wählen Sie Ihr Firebase-Projekt (oder erstellen Sie ein neues).
    - Setzen Sie das **public-Verzeichnis** auf `site`.
    - Als Single-Page-App konfigurieren: **Nein** (docmd generiert einzelne `index.html`-Dateien pro Seite. Es ist kein Catch-All-Rewrite erforderlich).
    - Überschreiben Sie `site/index.html` nicht.

3.  Bereitstellen:

    ```bash
    firebase deploy --only hosting
    ```

## CI/CD mit GitHub Actions

Um bei jedem Push automatisch bereitzustellen, erstellen Sie `.github/workflows/firebase.yml`:

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

Setzen Sie `FIREBASE_SERVICE_ACCOUNT` in den **Settings → Secrets** Ihres Repository mit einem Firebase-Servicekonto-JSON-Schlüssel.

::: callout info "Warum `npx @docmd/core`?"
In CI/CD-Umgebungen, in denen docmd nicht global installiert ist, ruft `npx @docmd/core` das Paket direkt ab und führt es aus. Wenn Ihr Projekt `@docmd/core` als `devDependency` auflistet, funktioniert die Ausführung von `npx @docmd/core build` nach `npm install` einwandfrei.
:::

## Benutzerdefinierte Domain

Fügen Sie in der Firebase-Konsole unter **Hosting → Add custom domain** eine benutzerdefinierte Domain hinzu. Firebase stellt SSL automatisch bereit.

Setzen Sie das `url`-Feld in `docmd.config.json` so, dass es mit Ihrer Domain übereinstimmt. Dies stellt sicher, dass kanonische Tags und Sitemaps korrekte absolute URLs generieren.