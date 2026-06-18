---
title: "Weiterleitungen & 404"
description: "Konfigurieren Sie metadatenbasierte Weiterleitungen und individuell gestaltete 404-Fehlerseiten für statische Deployments."
---

Statische Hosting-Umgebungen verfügen über keine serverseitige Logik (wie Nginx-Regeln) für dynamisches Routing. docmd erzeugt native HTML-Fallbacks, die Weiterleitung und Fehlerzustände automatisch behandeln.

## Server-lose Weiterleitungen

Leiten Sie Traffic von alten URLs auf neue Ziele um, indem Sie Mappings im `redirects`-Objekt definieren.

```json
{
  "redirects": {
    "/setup": "/getting-started/installation", 
    "/v1/api": "/api-reference"                  
  }
}
```

### Technische Umsetzung

Wenn Sie eine Weiterleitung definieren, erzeugt die Engine eine `index.html`-Datei am alten Pfad, die ein `<meta http-equiv="refresh">`-Tag enthält. Diese Strategie stellt sicher:

1.  **Nahtlose Weiterleitung**: Nutzer werden sofort zum neuen Ziel weitergeleitet.
2.  **SEO-Erhaltung**: Suchmaschinen erkennen die Weiterleitung und erhalten die Link-Gewichtung.
3.  **Analytics-Tracking**: Seitenaufrufe werden vor der Weiterleitung registriert.

## Marken-404-Seiten

Fordern Nutzer eine fehlende URL an, laden statische Hosts automatisch eine `404.html`-Datei im Stammverzeichnis. docmd erzeugt diese Datei standardmäßig. Sie übernimmt das Theme, die Sidebar und die SPA-Funktionalität Ihrer Site perfekt.

### Fehlerinhalt anpassen

Personalisieren Sie die 404-Fehlermeldung in Ihrer Konfiguration:

```json
{
  "notFound": {
    "title": "404: Page Not Found",
    "content": "We couldn't find the page you're looking for. Use the sidebar to find your way back."
  }
}
```

::: callout tip "Lokale Entwicklung" icon:lightbulb
Der Dev-Server liefert Ihre benutzerdefinierte 404-Seite automatisch für fehlende Dateien. Testen Sie das Fehlererlebnis lokal.
:::
