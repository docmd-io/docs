---
title: "Weiterleitungen & 404"
description: "Konfigurieren Sie Metadaten-basierte Weiterleitungen und benutzerdefinierte 404-Fehlerseiten für statische Deployments."
---

In einer statischen Hosting-Umgebung gibt es keine serverseitige Logik (wie Nginx-Regeln oder `.htaccess`-Dateien), um dynamisches Routing zu verarbeiten. `docmd` löst dies durch das Generieren nativer HTML-Sicherungsmechanismen, die Weiterleitungen und Fehlerzustände automatisch behandeln.

## Serverlose Weiterleitungen (Redirects)

Sie können Traffic von alten URLs auf neue Ziele umleiten, indem Sie ein Mapping im `redirects`-Objekt definieren.

```javascript
export default defineConfig({
  redirects: {
    '/setup': '/getting-started/installation', // Kurz-URL zu Deep-Link
    '/v1/api': '/api-reference'                  // Alte Version zu modernem Pfad
  }
});
```

### Technische Umsetzung

Wenn eine Weiterleitung definiert ist, erstellt `docmd` eine `index.html`-Datei am alten Pfad, die ein `<meta http-equiv="refresh">`-Tag enthält. Diese Strategie gewährleistet:

1.  **Nahtlose Weiterleitung**: Benutzer werden sofort nach dem Laden der Seite zum neuen Ziel weitergeleitet.
2.  **SEO-Erhalt**: Suchmaschinen erkennen die Weiterleitung, was hilft, die Link-Autorität (Link Equity) zu erhalten.
3.  **Analytics-Tracking**: Seitenaufrufe werden erfasst, bevor die Weiterleitung stattfindet, wodurch Ihre Traffic-Daten erhalten bleiben.

## Markenkonforme 404-Seiten

Wenn ein Benutzer versucht, auf eine nicht existierende URL zuzugreifen, suchen die meisten statischen Hosting-Anbieter (Netlify, Vercel, GitHub Pages) automatisch nach einer `404.html`-Datei im Stammverzeichnis. `docmd` generiert diese Datei standardmäßig und stellt sicher, dass sie das Theme, die Seitenleiste und die SPA-Funktionalität Ihrer Website erbt.

### Fehlerinhalt anpassen

Sie können die 404-Fehlermeldung in Ihrer Konfiguration personalisieren:

```javascript
export default defineConfig({
  notFound: {
    title: '404: Seite nicht gefunden',
    content: "Wir konnten die gesuchte Seite nicht finden. Nutzen Sie die Seitenleiste, um zurückzufinden."
  }
});
```

::: callout tip "Lokale Entwicklung"
Der `docmd dev`-Server liefert automatisch Ihre benutzerdefinierte 404-Seite aus, wann immer eine angeforderte Datei fehlt, sodass Sie das Fehlererlebnis lokal testen können.
:::