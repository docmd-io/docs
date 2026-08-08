---
title: "Firebase Hosting-Bereitstellung"
description: "Stellen Sie statische docmd-Dokumentation manuell oder über GitHub Actions auf Firebase Hosting bereit."
---

[Firebase Hosting](https://firebase.google.com/products/hosting) stellt statische docmd-Websites über die globale CDN-Infrastruktur von Google mit automatischer SSL-Zertifikatsbereitstellung bereit.

## Erstes Setup & CLI-Tools

Installieren Sie die Firebase CLI-Tools:

```bash
npm install -g firebase-tools
firebase login
```

### Initialisierungsschritte

1. Kompilieren Sie Ihre Website:
   ```bash
   npx @docmd/core build
   ```
2. Initialisieren Sie die Firebase Hosting-Konfiguration:
   ```bash
   firebase init hosting
   ```
   Wählen Sie die Parameter aus, wenn Sie dazu aufgefordert werden:
   * **Öffentliches Verzeichnis**: `site`
   * **Single-Page-App-Rewrite**: `Nein` (docmd kompiliert einzelne `index.html`-Seiten).
   * **`site/index.html` überschreiben**: `Nein`
3. Assets bereitstellen:
   ```bash
   firebase deploy --only hosting
   ```

## GitHub Actions CI/CD-Integration

Um die Veröffentlichung beim Push auf `main` zu automatisieren, erstellen Sie `.github/workflows/firebase.yml`:

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

Speichern Sie `FIREBASE_SERVICE_ACCOUNT` in Ihrem Repository unter **Settings → Secrets and variables → Actions**.

::: callout tip "Zuordnung benutzerdefinierter Domains" icon:globe
Fügen Sie benutzerdefinierte Domains in der Firebase Console unter **Hosting → Custom domain** hinzu. Aktualisieren Sie die Eigenschaft `url` in `docmd.config.json` so, dass sie mit Ihrer Domain übereinstimmt, damit Sitemaps und Open-Graph-Metadaten korrekt generiert werden.
:::