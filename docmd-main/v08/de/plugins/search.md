---
title: "Such-Plugin"
description: "Aktivieren Sie eine extrem schnelle, Offline-first Volltextsuche für Ihre Dokumentation mit MiniSearch."
---

Das `@docmd/plugin-search`-Plugin bietet ein leistungsstarkes, clientseitiges Sucherlebnis für Ihre Dokumentation. Es verwendet [MiniSearch](external:https://github.com/lucaong/minisearch), um während des Build-Prozesses einen leichtgewichtigen Index zu erstellen, der es Benutzern ermöglicht, technische Informationen sofort und ohne serverseitige Datenbank zu finden.

## Konfiguration

Die Suche ist in den meisten `docmd`-Templates standardmäßig aktiviert. Sie können ihre Sichtbarkeit und Platzierung über die `layout`-Konfiguration steuern.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  layout: {
    optionsMenu: {
      position: 'header', // 'header', 'sidebar-top', 'sidebar-bottom' oder 'menubar'
      components: {
        search: true // Auf false setzen, um das Such-Plugin vollständig zu deaktivieren
      }
    }
  }
});
```

## Funktionsweise

### 1. Indizierung (Build-Zeit)
Während des `docmd build`-Prozesses iteriert das Such-Plugin über jede Seite Ihrer Website. Es extrahiert den Titel, Überschriften und den Fließtext und komprimiert diese Daten dann in eine `search-index.json`-Datei.

*   **Deep Linking**: Der Indexer registriert automatisch jede Überschrift (`#`, `##` etc.) als suchbares Ziel.
*   **Relevanz-Gewichtung**: Titel erhalten das höchste Gewicht, gefolgt von Überschriften und schließlich dem Seiteninhalt.

### 2. Abruf (Client-seitig)
Wenn ein Benutzer das Suchmodal öffnet (normalerweise über `/` oder `Strg+K`), wird die `search-index.json` vom Browser geladen. Suchen werden lokal mit Fuzzy-Matching (erlaubt kleine Tippfehler) und sofortigem Präfix-Matching durchgeführt.

## Suchverhalten anpassen

Obwohl das Such-Plugin auf Einfachheit ohne Konfiguration ausgelegt ist, können Sie bestimmte Seiten vom Index ausschließen, indem Sie das `noindex`-Flag in deren Frontmatter verwenden:

```yaml
---
title: "Interne Spezifikation"
noindex: true # Diese Seite wird nicht in den Suchergebnissen oder Sitemaps erscheinen
---
```

## Technische Implementierung

Das Plugin injiziert ein leichtgewichtiges Suchmodal in den `<body>` Ihrer Website. Es ist vollständig barrierefrei (ARIA-konform) und unterstützt die Tastaturnavigation für ein Erlebnis, das sich wie eine native App anfühlt.

::: callout tip "Such-Analyse"
Wenn Sie das [Analytics-Plugin](./analytics.md) aktiviert haben, werden die von Ihren Lesern verwendeten Suchbegriffe automatisch erfasst und an Ihren Analytics-Anbieter gesendet. So erhalten Sie Einblicke, welche Informationen fehlen oder am schwersten zu finden sind.
:::

Da die Suche vollständig auf dem Client stattfindet, werden niemals Daten — nicht einmal Tastaturanschläge — an einen Server gesendet. Dies macht `docmd` zum Goldstandard für die Dokumentationssuche in datenschutzsensiblen Branchen (Gesundheitswesen, Finanzen, Sicherheit).

## Vergleich

Viele Dokumentationsgeneratoren (wie Docusaurus) verlassen sich auf **Algolia DocSearch**. Obwohl Algolia leistungsstark ist, bringt es Hürden mit sich:

| Feature | docmd Suche | Algolia / Extern |
| :--- | :--- | :--- |
| **Einrichtung** | **Zero Config** (Automatisch) | Komplex (API-Keys, CI/CD Crawling) |
| **Datenschutz** | **100% Privat** (Client-seitig) | Daten werden an Drittserver gesendet |
| **Offline** | **Ja** | Nein |
| **Kosten** | **Kostenlos** | Kostenloses Kontingent oder kostenpflichtig |
| **Geschwindigkeit** | **Sofort** (In-Memory) | Schnell (Abhängig von Netzwerklatenz) |