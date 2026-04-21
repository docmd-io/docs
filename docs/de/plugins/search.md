---
title: "Such-Plugin"
description: "Aktivieren Sie eine schnelle, Offline-first Volltextsuche für Ihre Dokumentation unter Verwendung von MiniSearch."
---

Das Plugin `@docmd/plugin-search` bietet eine leistungsfähige clientseitige Sucherfahrung für Ihre Dokumentation. Es nutzt [MiniSearch](https://github.com/lucaong/minisearch), um während des Build-Prozesses einen leichtgewichtigen Index zu erstellen. So können Benutzer technische Informationen sofort finden, ohne dass eine serverseitige Datenbank erforderlich ist.

## Konfiguration

Die Suche ist in den meisten `docmd`-Templates standardmäßig aktiviert. Sie können deren Sichtbarkeit und Platzierung über die `layout`-Konfiguration steuern.

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

<!-- SCREENSHOT: Such-Modal geöffnet mit einer eingegebenen Abfrage, zeigt passende Ergebnisse mit hervorgehobenen Titeln und Deep-Links zu Überschriften. Der Hinweis auf das Tastaturkürzel (Strg+K oder /) sollte sichtbar sein. -->

### 1. Indexierung (Build-Zeit)
Während des `docmd build`-Prozesses durchläuft das Such-Plugin jede Seite Ihrer Website. Es extrahiert den Titel, die Überschriften und den Fließtext und kompiliert diese Daten in eine komprimierte `search-index.json`-Datei.

*   **Deep Linking**: Der Indexierer registriert automatisch jede Überschrift (`#`, `##`, etc.) als suchbares Ziel.
*   **Relevanz-Gewichtung**: Titel erhalten die höchste Gewichtung, gefolgt von Überschriften und dann dem Seiteninhalt.

### 2. Abfrage (Clientseitig)
Wenn ein Benutzer das Such-Modal öffnet (normalerweise über `/` oder `Strg+K`), wird die `search-index.json` vom Browser geladen. Suchvorgänge werden lokal mit Fuzzy-Matching (erlaubt kleine Tippfehler) und sofortigem Präfix-Matching durchgeführt.

## Suchverhalten anpassen

Obwohl das Such-Plugin auf Einfachheit ohne Konfiguration ausgelegt ist, können Sie bestimmte Seiten vom Index ausschließen, indem Sie das `noindex`-Flag im Frontmatter verwenden:

```yaml
---
title: "Interne Spezifikation"
noindex: true # Diese Seite wird nicht in Suchergebnissen oder Sitemaps erscheinen
---
```

## Technische Umsetzung

Das Plugin fügt ein leichtgewichtiges Such-Modal in den `<body>` Ihrer Website ein. Es ist vollständig barrierefrei (ARIA-konform) und unterstützt die Tastaturnavigation für ein Benutzererlebnis, das einer nativen App ähnelt.

::: callout tip "Such-Analyse"
Wenn Sie das [Analytics-Plugin](./analytics) aktiviert haben, werden die von Ihren Lesern verwendeten Suchbegriffe automatisch erfasst und an Ihren Analytics-Anbieter gesendet. Dies gibt Ihnen Einblicke darüber, welche Informationen fehlen oder am schwersten zu finden sind.
:::

Da die Suche vollständig auf dem Client stattfindet, werden niemals Daten — nicht einmal Tastaturanschläge — an einen Server gesendet. Dies macht `docmd` zum Goldstandard für die Dokumentationssuche in datenschutzsensiblen Branchen (Gesundheitswesen, Finanzen, Sicherheit).

## Vergleich

Viele Dokumentationsgeneratoren (wie Docusaurus) verlassen sich auf **Algolia DocSearch**. Obwohl Algolia leistungsstark ist, bringt es Hürden mit sich:

| Funktion | docmd Suche | Algolia / Extern |
| :--- | :--- | :--- |
| **Setup** | **Zero Config** (Automatisch) | Komplex (API-Keys, CI/CD-Crawling) |
| **Datenschutz**| **100% Privat** (Clientseitig) | Daten werden an Drittserver gesendet |
| **Offline** | **Ja** | Nein |
| **Kosten** | **Kostenlos** | Limits im kostenlosen Plan oder Bezahlmodell |
| **Tempo** | **Sofort** (Arbeitsspeicher) | Schnell (abhängig von Netzwerklatenz) |