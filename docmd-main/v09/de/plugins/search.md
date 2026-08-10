---
title: "Such-Plugin"
description: "Aktivieren Sie ultraschnelle, offline-fähige Volltext-Schlüsselwortsuche und lokale semantische Embeddings in docmd."
---

Das `@docmd/plugin-search`-Plugin bietet eine clientseitige Sucherfahrung für Ihre Dokumentationsseite. Es verwendet [MiniSearch](external:https://github.com/lucaong/minisearch), um während der Kompilierung einen komprimierten Index aufzubauen, der Lesern die sofortige Durchsuchung technischer Dokumentationen ermöglicht, ohne dass serverseitige Datenbanken oder externe Crawling-Dienste erforderlich sind.

## Konfigurationsoptionen

Die Suche ist über Standard-`docmd`-Vorlagen hinweg standardmäßig aktiviert. Konfigurieren Sie Indexer-Parameter und Header-Platzierung in `docmd.config.json`:

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die Volltext-Suchindex-Generierung. |
| `placeholder` | `string` | `'Suchen...'` | Eingabe-Platzhaltertext in Suchdialogen. |
| `maxResults` | `number` | `10` | Maximale Anzahl der im Modal-Fenster zurückgegebenen Suchergebnisse. |

### Header-Integrationsbeispiel

```json "docmd.config.json"
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

## Funktionsweise der Schlüsselwortsuche

### 1. Indizierung zur Build-Zeit
Während der Website-Kompilierung (`npx @docmd/core build`) durchläuft `@docmd/plugin-search` jede Seite Ihrer Website. Es extrahiert Überschriften, Titel und Fließtext, um ein komprimiertes `search-index.json`-Bundle zu generieren:

* **Deep Linking**: Registriert Überschriften-Anker (`#`, `##`) als direkte Suchsprungziele.
* **Relevanz-Gewichtung**: Seitentitel erhalten die höchste Gewichtung, gefolgt von Abschnittsüberschriften und Fließtext-Absätzen.

### 2. Clientseitiger Abruf
Wenn ein Benutzer das Such-Modal öffnet (Drücken von `Strg+K` oder `/`), ruft der Browser `search-index.json` ab. Abfragen werden lokal mit Präfix-Matching und Fuzzy-String-Distanz-Matching ausgeführt, um geringfügige Tippfehler auszugleichen.

## Anpassen des Suchumfangs

Um bestimmte Seiten aus dem Suchindex auszuschließen, fügen Sie `noindex: true` zum [Seiten-Frontmatter](../content/frontmatter.md) hinzu:

```yaml
---
title: "Interne Entwurfsspezifikation"
noindex: true
---
```

::: callout tip title:"Datenschutz & Compliance" icon:shield-check
Da Suchabfragen vollständig im Arbeitsspeicher des Clients ausgeführt werden, verlässt kein einziger Sucheingabe- oder Tastaturanschlag-Telemetriedatenwert den Browser des Benutzers.
::: /callout

## Lokale semantische Offline-Suche

`@docmd/plugin-search` enthält Unterstützung für lokale semantische Suche, angetrieben von `docmd-search`. Die semantische Suche verwendet clientseitige Embedding-Modelle, um Abfragen konzeptionell zu verarbeiten, anstatt nur wörtliche Schlüsselwörter abzugleichen.

### Semantische Suche aktivieren

1. Installieren Sie `docmd-search` in Ihrem Dokumentations-Workspace:

```bash
npm install docmd-search
```

2. Aktivieren Sie die semantische Indizierung in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### Optionale semantische Sucheinstellungen

| Option | Typ | Standard | Technischer Zweck |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | Vektor-Embedding-Suche aktivieren. |
| `showConfidence` | `boolean` | `false` | Ähnlichkeitsprozent-Badges bei Suchergebnissen anzeigen. |
| `showFilters` | `boolean` | `true` | Steuerelemente für Versionsfilter in Suchdialogen anzeigen. |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | HuggingFace-Embedding-Modell-ID. |
| `chunkSize` | `number` | `512` | Token-Chunking-Grenze pro Dokumentationsabschnitt. |

### Unterstützte Embedding-Modelle

| Modell-ID | Download-Größe | Am besten geeignet für |
| :--- | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` *(Standard)* | ~23 MB | Englische technische Dokumentation |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | Mehrsprachige Websites (Deutsch, Chinesisch, Französisch) |
| `Xenova/multilingual-e5-small` | ~118 MB | Breite internationale Abdeckung von Sprachen |

::: callout info "Automatischer Fallback" icon:info
Wenn `docmd-search` aktiviert ist, aber Abhängigkeiten für Vektor-Embeddings nicht geladen werden können, fällt das Such-Plugin nahtlos auf die Standard-MiniSearch-Schlüsselwortindizierung zurück.
:::