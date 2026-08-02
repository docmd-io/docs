---
title: "docmd mit eigenen Plugins erweitern"
description: "Wie Sie docmds Lifecycle-Hooks nutzen, um benutzerdefinierte Funktionalität zu bauen und die Dokumentations-Engine zu erweitern."
---

## Problem

Manchmal haben Sie spezifische Anforderungen, die nicht von eingebauten Features abgedeckt werden. Beispielsweise möchten Sie möglicherweise während des Build-Prozesses Daten aus einer internen API abrufen oder komplexe Transformationen am generierten HTML durchführen.

## Warum es wichtig ist

Erweiterbarkeit unterscheidet ein statisches Tool von einem professionellen Dokumentations-Framework. Ohne saubere Möglichkeit, benutzerdefinierte Logik zu injizieren, pflegen Teams fragile Shell-Skripte oder Post-Processing-Wrapper. Das macht den Build-Prozess schwer zu verwalten und zu debuggen.

## Ansatz

docmd bietet eine zuverlässige, hook-basierte [Plugin-API](../../plugins/building-plugins.md). Schreiben Sie einfache Node.js-Module, die den Dokumentations-Lebenszyklus in verschiedenen Stadien abfangen. Damit können Sie Inhalte und Verhalten beliebig modifizieren — von der initialen Konfiguration bis zur finalen HTML-Generierung.

## Implementierung

### 1. Erstellen Sie ein lokales Plugin

Ein Plugin ist ein Standard-JavaScript-Modul, das einen Deskriptor und Lifecycle-Hooks exportiert.

```javascript  "plugins/version-injector.js"

let latestVersion = "0.0.0";

export default {
  // Plugin-Deskriptor
  plugin: {
    "name": "version-injector",
    "version": "1.0.0",
    "capabilities": ["init", "build"]
  },

  // Lifecycle-Hooks
  async onConfigResolved(config) {
    // Externe Daten einmal während der Initialisierung abrufen
    const response = await fetch("https://api.example.com/version");
    latestVersion = await response.text();
    console.log(`[Plugin] Abgerufene Version: ${latestVersion}`);
  },

  // HTML vor dem Schreiben modifizieren
  async onBeforeRender(page) {
    if (!page.html) return;

    page.html = page.html.replace(/\{\{VERSION\}\}/g, latestVersion);
    page.frontmatter.computedVersion = latestVersion;
  }
};
```

### 2. Registrieren Sie das Plugin

Registrieren Sie Ihr lokales Plugin, indem Sie es in Ihre `docmd.config.js` (oder `docmd.config.ts`) importieren. JSON-Konfigurationsdateien können keine Imports verwenden — verwenden Sie das `.js`- oder `.ts`-Format für die Plugin-Registrierung.

```javascript "plugins/version-injector.js"
import VersionInjector from "./plugins/version-injector.js";

export default {
  "title": "Meine Projektdokumentation",
  "plugins": {
    // Lokales Plugin-Objekt injizieren
    "version-injector": VersionInjector
  }
};
```

## Abwägungen

Benutzerdefinierte Plugins laufen in der Node.js-Umgebung zur Build-Zeit. Auch wenn sie mächtig sind, können sie die Build-Performance beeinträchtigen, wenn sie nicht optimiert sind. Jede Logik in Hooks wie `onAfterParse` oder `onPageReady` läuft für *jede* Seite Ihrer Site. Stellen Sie sicher, dass Ihre Transformationen effizient sind (z. B. durch Verwendung optimierter Regex), um die Build-Zeiten kurz zu halten.