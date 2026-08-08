---
title: "Weiterleitungen & 404-Seiten"
description: "Konfigurieren Sie statische HTML-Weiterleitungen und benutzerdefinierte Marken-404-Fehlerseiten in docmd."
---

Statischen Hosting-Umgebungen fehlen dynamische serverseitige Routing-Engines (wie Nginx-Rewrite-Regeln). `docmd` generiert native HTML-Ausfallsicherungen, um URL-Weiterleitungen und benutzerdefinierte Fehlerzustände automatisch zu verarbeiten.

## Server-lose HTML-Weiterleitungen

Leiten Sie Traffic von Legacy-URLs zu neuen Dokumentzielen weiter, indem Sie Pfadzuordnungen im `redirects`-Objekt deklarieren:

```json "docmd.config.json"
{
  "redirects": {
    "/setup": "/getting-started/installation", 
    "/v1/api": "/api-reference"                  
  }
}
```

### Technischer Weiterleitungsmechanismus

Bei der Deklaration einer Weiterleitungszuordnung generiert der Compiler eine `index.html`-Datei an der Ziel-Legacy-Route, die ein `<meta http-equiv="refresh">`-HTML-Tag enthält:

1. **Sofortige Benutzer-Weiterleitung**: Leser werden beim Landen sofort zur neuen Zielroute weitergeleitet.
2. **SEO-Wert-Erhaltung**: Suchmaschinen erkennen die Meta-Refresh-Richtung an, wodurch Link-Wert und Indizierungsautorität erhalten bleiben.
3. **Analytics-Tracking**: Clientseitige Analytics-Skripte protokollieren eingehende Seitenaufrufe vor der Weiterleitung.

## Benutzerdefinierte Marken-404-Fehlerseiten

Wenn Besucher eine nicht vorhandene URL-Route anfordern, stellen statische Hosting-Plattformen das Stamm-`404.html`-Dokument bereit. `docmd` kompiliert standardmäßig eine benutzerdefinierte `404.html`-Seite, die das Branding Ihrer Website, die Sidebar-Navigation und die SPA-Laufzeit erbt.

### Anpassen von 404-Fehlerinhalten

Passen Sie 404-Seitentitel und Fehler-Fließtext in `docmd.config.json` an:

```json "docmd.config.json"
{
  "notFound": {
    "title": "404: Seite nicht gefunden",
    "content": "Wir konnten die angeforderte Seite nicht finden. Verwenden Sie die Sidebar-Navigation, um zur aktiven Dokumentation zurückzukehren."
  }
}
```

::: callout tip "Lokales Testen von Fehlerseiten" icon:lightbulb
Der lokale Entwicklungsserver von `docmd` stellt Ihre benutzerdefinierte 404-Seite automatisch für fehlende Dateirouten bereit.
:::