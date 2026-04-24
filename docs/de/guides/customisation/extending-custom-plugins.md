---
title: "docmd mit benutzerdefinierten Plugins erweitern"
description: "So nutzen Sie die Lifecycle-Hooks von docmd, um eigene Funktionen zu erstellen und die Dokumentations-Engine zu erweitern."
---

## Problem

Manchmal haben Sie eine sehr spezifische Anforderung, die nicht durch integrierte Funktionen oder vorhandene Plugins abgedeckt wird. Beispielsweise müssen Sie während des Build-Prozesses Daten von einer internen API abrufen oder komplexe Transformationen am generierten HTML vornehmen, die über einfaches CSS hinausgehen.

## Warum es wichtig ist

Erweiterbarkeit ist das, was ein statisches Tool von einem professionellen Dokumentations-Framework unterscheidet. Ohne eine saubere Möglichkeit, eigene Logik einzufügen, sind Teams oft gezwungen, fragile Shell-Skripte oder Post-Processing-Wrapper zu pflegen, was den Build-Prozess schwer verwaltbar und fehleranfällig macht.

## Ansatz

`docmd` verfügt über eine robuste, Hook-basierte [Plugin-API](../../plugins/api). Sie können einfache Node.js-Module schreiben, die den Dokumentations-Lifecycle in verschiedenen Phasen abfangen – von der initialen Konfiguration bis zur finalen HTML-Generierung – und so Inhalte und Verhalten beliebig anpassen.

## Implementierung

### 1. Erstellen eines lokalen Plugins

Ein Plugin ist ein Standard-JavaScript-Modul, das einen Deskriptor und mehrere Lifecycle-Hooks exportiert.

```javascript
// plugins/version-injector.js
export default {
  // Plugin-Metadaten
  plugin: {
    name: 'version-injector',
    version: '1.0.0',
    capabilities: ['build'] // Erforderlich, um 'build'-Hooks zu nutzen
  },

  // Status, der zwischen Hooks geteilt wird
  latestVersion: '0.0.0',

  // Wird ausgeführt, sobald die Konfiguration aufgelöst wurde
  async onConfigResolved(config) {
    // Daten von einer internen API abrufen
    const response = await fetch('https://api.internal.com/version');
    this.latestVersion = await response.text();
    console.log(`[Plugin] Version abgerufen: ${this.latestVersion}`);
  },

  // Fangt das HTML nach dem Markdown-Parsing ab
  async onAfterParse(html, frontmatter) {
    if (!html) return html;
    // Platzhalter durch dynamische Daten ersetzen
    return html.replace(/\{\{VERSION\}\}/g, this.latestVersion);
  }
};
```

### 2. Registrieren des Plugins

Sie können Ihr lokales Plugin registrieren, indem Sie es in Ihre `docmd.config.js` importieren.

```javascript
// docmd.config.js
import VersionInjector from './plugins/version-injector.js';

export default {
  title: 'Meine Projekt-Docs',
  plugins: {
    // Registrierung durch Angabe des importierten Moduls
    'version-injector': VersionInjector
  }
};
```

## Abwägungen

Benutzerdefinierte Plugins laufen während des Builds in der Node.js-Umgebung. Sie sind zwar leistungsstark, können aber die Build-Performance beeinträchtigen, wenn sie nicht optimiert sind. Jede Logik in Hooks wie `onAfterParse` oder `onPageReady` wird für *jede* Seite Ihrer Website ausgeführt. Stellen Sie sicher, dass Ihre Transformationen effizient sind (z. B. durch optimierte Regex), um die Build-Zeiten kurz zu halten.
