---
title: "Rezept: Eigene Favicons implementieren"
description: "Etablieren Sie ein projektweites Branding, indem Sie ein benutzerdefiniertes Favicon zu Ihrem Build hinzufügen."
---

Das Favicon ist ein entscheidendes Branding-Element, das im Browser-Tab angezeigt wird. `docmd` bietet einen zentralen Konfigurationsschlüssel, um das Einfügen und Auflösen dieser Assets zu automatisieren.

## 1. Vorbereitung des Formats

Obwohl `docmd` `.png`- und `.svg`-Quellen unterstützt, sollten Sie für maximale Kompatibilität mit älteren Browsern ein `.ico`-Bundle verwenden. Stellen Sie sicher, dass Ihr Asset mindestens 32x32px groß ist.

## 2. Bereitstellung des Assets

Platzieren Sie Ihr bearbeitetes Bild im `assets/`-Verzeichnis Ihres Projekt-Roots.

```bash
# Empfohlene Verzeichnisstruktur
mein-projekt/
  ├── assets/
  │   └── brand-favicon.ico  <-- Quell-Asset
  ├── docs/
  └── docmd.config.js
```

## 3. Konfigurations-Bindung

Definieren Sie die Eigenschaft `favicon` in Ihrer `docmd.config.js`. Der Pfad sollte den Ort relativ zum endgültigen `site/`-Ausgabeverzeichnis widerspiegeln.

```javascript
export default {
  // ...
  // Verweist auf site/assets/brand-favicon.ico
  favicon: '/assets/brand-favicon.ico', 
  // ...
};
```

## 4. Finaler Build & Verifizierung

Führen Sie `docmd build` aus. Die Engine wird automatisch:
1.  Das Asset in das Produktions-Build-Verzeichnis kopieren.
2.  Priorisierte `<link rel="icon">`-Tags in den `<head>` jeder generierten HTML-Seite einfügen.