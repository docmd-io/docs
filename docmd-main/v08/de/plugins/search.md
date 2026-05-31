---
title: "Such-Plugin"
description: "Aktivieren Sie eine extrem schnelle, Offline-first Volltextsuche für Ihre Dokumentation mit MiniSearch."
---

Das `@docmd/plugin-search`-Plugin bietet ein leistungsstarkes, clientseitiges Sucherlebnis für Ihre Dokumentation. Es verwendet [MiniSearch](external:https://github.com/lucaong/minisearch), um während des Build-Prozesses einen leichtgewichtigen Index zu erstellen, der es Benutzern ermöglicht, technische Informationen sofort und ohne serverseitige Datenbank zu finden.

## Konfiguration

Die Suche ist in den meisten `docmd`-Templates standardmäßig aktiviert. Sie können ihre Sichtbarkeit und Platzierung über die `layout`-Konfiguration steuern.

| Option | Typ | Standardwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `true` | Aktiviert oder deaktiviert den Volltext-Suchindexer. |
| `placeholder` | `String` | `'Search...'` | Benutzerdefinierter Platzhaltertext für das Sucheingabefeld. |
| `maxResults` | `Number` | `10` | Maximale Anzahl an Suchergebnissen, die im Modal angezeigt werden. |

### Beispiel

```json
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true
      }
    }
  }
}
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

Da die Suche vollständig auf dem Client stattfindet, werden niemals Daten - nicht einmal Tastaturanschläge - an einen Server gesendet. Dies macht `docmd` zum Goldstandard für die Dokumentationssuche in datenschutzsensiblen Branchen (Gesundheitswesen, Finanzen, Sicherheit).

## Vergleich

Viele Dokumentationsgeneratoren (wie Docusaurus) verlassen sich auf **Algolia DocSearch**. Obwohl Algolia leistungsstark ist, bringt es Hürden mit sich:

| Feature | docmd Suche | Algolia / Extern |
| :--- | :--- | :--- |
| **Einrichtung** | **Zero Config** (Automatisch) | Komplex (API-Keys, CI/CD Crawling) |
| **Datenschutz** | **100% Privat** (Client-seitig) | Daten werden an Drittserver gesendet |
| **Offline** | **Ja** | Nein |
| **Kosten** | **Kostenlos** | Kostenloses Kontingent oder kostenpflichtig |
| **Geschwindigkeit** | **Sofort** (In-Memory) | Schnell (Abhängig von Netzwerklatenz) |

## Semantische Suche (Alpha-Vorschau)

::: callout tip "Neu: docmd-search"
Wir haben etwas gebaut, auf das wir ziemlich stolz sind.

**`docmd-search`** ist nach unserem Wissen die erste vollständig offline-fähige semantische Suchmaschine für Dokumentationen - und sie ist nicht an docmd gebunden. Sie läuft vollständig im Browser, benötigt weder Server noch API-Schlüssel, und keine Nutzerdaten verlassen das Gerät. Integrierbar in jede Dokumentations-Engine, jede statische Website oder jede beliebige Webseite. Einfach einstecken und loslegen.

Dies ist eine frühe Alpha-Version. Vieles wird sich verbessern und weiterentwickeln. Doch das Fundament - private, offline und wirklich intelligente Suche - steht bereits.

[→ Auf GitHub ansehen](https://github.com/docmd-io/docmd-search)
:::

> **Experimentelles Feature** - Die semantische Suche befindet sich derzeit in der Alpha-Vorschau. Die standardmäßige keyword-basierte Suche bleibt die empfohlene Option für den produktiven Einsatz.

Die semantische Suche verwendet lokale Embeddings, um die Bedeutung hinter Suchanfragen zu verstehen. Dies ermöglicht intelligentere Ergebnisse über einfache Keyword-Treffer hinaus.

### Semantische Suche aktivieren

Installieren Sie zuerst das Paket `docmd-search`:

```bash
npm install docmd-search
```

Aktivieren Sie es dann in Ihrer Konfiguration:

```json
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### Wie die semantische Suche funktioniert

Im Gegensatz zur Keyword-Suche, die exakte Begriffe abgleicht, bietet die semantische Suche:

*   **Kontextverständnis** - Eine Anfrage nach „Authentifizierung“ findet relevante Seiten, selbst wenn dort Begriffe wie „Anmeldung“ oder „Login“ verwendet werden.
*   **Natürliche Fehlertoleranz** - Keine Notwendigkeit für klassische Fuzzy-Logik; das Modell versteht die Absicht.
*   **Erkennung verwandter Konzepte** - Die Suche nach „API“ gibt relevante Endpoint-Dokumentationen zurück, nicht nur Seiten, die das Wort „API“ enthalten.

### Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | Semantische Suche aktivieren (erfordert das Paket `docmd-search`) |
| `showConfidence` | `boolean` | `false` | Ähnlichkeits-Konfidenz-Badges (Übereinstimmungs-Scores) in den semantischen Suchergebnissen anzeigen |
| `showFilters` | `boolean` | `true` | Versionsfilter-Leiste über den Suchergebnissen anzeigen (auf `false` setzen, um sie auszublenden) |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | Zu verwendendes Embedding-Modell |
| `chunkSize` | `number` | `512` | Maximale Chunk-Größe in Zeichen |
| `chunkOverlap` | `number` | `50` | Überlappung zwischen Chunks in Zeichen |
| `indexDir` | `string` | - | Pfad zum vorgefertigten semantischen Index |

### Vergleich: Semantisch vs. Keyword

| Feature | Semantische Suche | Keyword-Suche |
| :--- | :--- | :--- |
| **Verständnis** | Kontextsensitiv | Nur exakte Treffer |
| **Fehlertoleranz** | Hoch | Begrenzt (Fuzzy-Matching) |
| **Synonyme** | Ja | Nein |
| **Einrichtung** | Erfordert `docmd-search` | Integriert |
| **Indexgröße** | Größer (1–2 MB pro 100 Dateien) | Kleiner |
| **Datenschutz** | 100 % privat (clientseitig) | 100 % privat (clientseitig) |
| **Offline** | Ja | Ja |

### Fallback-Verhalten

Wenn die semantische Suche aktiviert ist, das Paket `docmd-search` jedoch nicht installiert ist, fällt das Plugin automatisch auf die Keyword-Suche zurück. Dadurch bleibt Ihre Dokumentation in jedem Fall suchbar.

::: callout warning "Alpha-Einschränkungen"
Die semantische Suche ist experimentell. Zu den aktuellen Einschränkungen gehören:

*   Modelle nur für Englisch (mehrsprachige Modelle verfügbar, aber weniger getestet)
*   Keine inkrementellen Updates (vollständiger Rebuild erforderlich)
*   Höhere Speichernutzung (~50–100 MB im Browser)
*   Das erste Laden kann langsamer sein, da die Embeddings geladen werden müssen
:::

### Best Practices

Für optimale Leistung der semantischen Suche:

1.  **Rauschen ausschließen** - Indizieren Sie keine Changelogs oder Entwürfe:
    ```json
    {
      "plugins": {
        "search": {
          "semantic": true,
          "exclude": ["**/release-notes/**", "**/drafts/**"]
        }
      }
    }
    ```

2.  **Für CI/CD vorbauen** - Nutzen Sie die Option `indexDir`, um Indizes vorab zu generieren:
    ```bash
    npx docmd-search --ui
    ```

3.  **Indexgröße überwachen** - Überprüfen Sie regelmäßig die Größe des Ordners `.docmd-search/`

4.  **Gründlich testen** - Überprüfen Sie die Qualität der Suchergebnisse, bevor Sie sie in der Produktion bereitstellen