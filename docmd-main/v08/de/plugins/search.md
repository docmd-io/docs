---
title: "Such-Plugin"
description: "Aktivieren Sie schnelle, offline-fähige Volltextsuche für Ihre Dokumentation mit MiniSearch."
---

Das `@docmd/plugin-search`-Plugin bietet eine leistungsstarke, clientseitige Sucherfahrung für Ihre Dokumentation. Es verwendet [MiniSearch](external:https://github.com/lucaong/minisearch), um während des Build-Prozesses einen leichtgewichtigen Index aufzubauen, sodass Nutzer technische Informationen sofort finden können, ohne eine serverseitige Datenbank zu benötigen.

## Konfiguration

Die Suche ist in den meisten `docmd`-Templates standardmäßig aktiviert. Sie können ihre Sichtbarkeit und Platzierung über die `layout`-Konfiguration steuern.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie den Volltextsuchindexer. |
| `placeholder` | `string` | `'Search...'` | Benutzerdefinierter Platzhaltertext für das Suchfeld. |
| `maxResults` | `number` | `10` | Maximale Anzahl der im Modal angezeigten Ergebnisse. |

### Beispiel

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

## Funktionsweise

<img width="720" class="with-border" src="/assets/previews/search-ui-default.webp">

### 1. Indizierung (Build-Zeit)
Während des `npx @docmd/core build`-Prozesses iteriert das Such-Plugin durch jede Seite Ihrer Site. Es extrahiert Titel, Überschriften und reinen Text und kompiliert diese Daten dann in eine komprimierte `search-index.json`-Datei.

*   **Deep Linking**: Der Indexer registriert automatisch jede Überschrift (`#`, `##` usw.) als durchsuchbares Ziel.
*   **Relevanz-Boosting**: Titel erhalten das höchste Gewicht, gefolgt von Überschriften, dann Seiteninhalten.

### 2. Abfrage (Clientseitig)
Wenn ein Nutzer das Such-Modal öffnet (normalerweise über `/` oder `Ctrl+K`), wird die `search-index.json` vom Browser abgerufen. Suchen werden lokal mittels Fuzzy-Matching (erlaubt kleine Tippfehler) und sofortigem Präfix-Matching durchgeführt.

## Suchverhalten anpassen

Das Such-Plugin ist auf Zero-Config-Einfachheit ausgelegt, aber Sie können bestimmte Seiten über das `noindex`-Flag in ihrem Frontmatter vom Index ausschließen:

```yaml
---
title: "Internal Specification"
noindex: true # This page will not appear in search results or sitemaps
---
```

## Technische Umsetzung

Das Plugin injiziert ein leichtgewichtiges Such-Modal in den `<body>` Ihrer Site. Es ist vollständig barrierefrei (ARIA-konform) und unterstützt Tastaturnavigation für eine native App-ähnliche Erfahrung.

::: callout tip "Suchanalyse"
Wenn Sie das [Analytics-Plugin](./analytics.md) aktiviert haben, werden die von Ihren Lesern verwendeten Suchbegriffe automatisch erfasst und an Ihren Analyseanbieter gesendet, sodass Sie Einblicke erhalten, welche Informationen fehlen oder am schwersten zu finden sind.
:::
Da die Suche vollständig auf dem Client läuft, verlässt kein einziges Datum, nicht einmal Tastenanschläge, den Browser. Dies macht sie für datenschutzsensitive Branchen (Gesundheitswesen, Finanzen, Sicherheit) geeignet.

## Vergleich

Viele Dokumentations-Generatoren (wie Docusaurus) verlassen sich auf **Algolia DocSearch**. Obwohl Algolia leistungsfähig ist, bringt es Reibung mit sich:

| Funktion | docmd Search | Algolia / Extern |
| :--- | :--- | :--- |
| Einrichtung | Zero-Config (automatisch) | API-Schlüssel, CI-Crawling |
| Datenschutz | Clientseitig, keine Daten gesendet | Daten an Drittanbieter gesendet |
| Offline | Ja | Nein |
| Kosten | Kostenlos | Free-Tier-Grenzen oder kostenpflichtig |
| Geschwindigkeit | Im Speicher, sofort | Netzwerk-Latenz abhängig |

## Semantische Suche (Alpha-Vorschau)

::: callout tip "Einführung von docmd-search"
`docmd-search` ist eine vollständig offline-fähige semantische Suchmaschine für Dokumentation. Sie läuft komplett im Browser, benötigt keinen Server, keine API-Schlüssel und sendet nichts an irgendjemanden. Sie ist nicht an docmd gebunden: Sie können sie in jede Dokumentations-Engine oder statische Site einbinden.

Dies ist eine frühe Alpha. APIs und Verhalten werden sich ändern. Das Fundament (privat, offline, wirklich intelligente Suche) ist bereits vorhanden.

[→ Auf GitHub ansehen](https://github.com/docmd-io/docmd-search)
:::

> **Experimentelle Funktion** - Semantische Suche befindet sich derzeit in der Alpha-Vorschau. Die standardmäßige schlüsselwortbasierte Suche bleibt die empfohlene Option für den Produktionseinsatz.

<img width="720" class="with-border" src="/assets/previews/search-ui-semantic.webp">

Semantische Suche verwendet lokale Embeddings, um die Bedeutung hinter Anfragen zu verstehen, und ermöglicht intelligentere Ergebnisse jenseits einfacher Schlüsselwortübereinstimmung.

### Semantische Suche aktivieren

Installieren Sie zunächst das Paket `docmd-search`:

```bash
npm install docmd-search
```

Aktivieren Sie es dann in Ihrer Konfiguration:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### Funktionsweise der semantischen Suche

Im Gegensatz zur Schlüsselwortsuche, die exakte Begriffe abgleicht, geht die semantische Suche:

*   **Versteht Kontext** - Eine Anfrage nach „Authentifizierung" findet relevante Seiten, auch wenn diese unterschiedliche Begriffe wie „login" oder „sign-in" verwenden
*   **Behandelt Tippfehler natürlich** - Kein Fuzzy-Matching erforderlich; das Modell versteht die Absicht
*   **Findet verwandte Konzepte** - Die Suche nach „API" gibt relevante Endpunktdokumentation zurück, nicht nur Seiten, die „API" enthalten

### Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | Semantische Suche aktivieren (erfordert `docmd-search`-Paket) |
| `showConfidence` | `boolean` | `false` | Ähnlichkeits-Konfidenzwert-Badges in semantischen Suchergebnissen anzeigen |
| `showFilters` | `boolean` | `true` | Versionsfilter-Leiste über Suchergebnissen anzeigen (auf `false` setzen zum Ausblenden) |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | Zu verwendendes Embedding-Modell |
| `chunkSize` | `number` | `512` | Maximale Chunk-Größe in Zeichen |
| `chunkOverlap` | `number` | `50` | Überlappung zwischen Chunks in Zeichen |
| `indexDir` | `string` | - | Pfad zum vorgefertigten semantischen Index |

### Vergleich: Semantisch vs. Schlüsselwort

| Funktion | Semantische Suche | Schlüsselwortsuche |
| :--- | :--- | :--- |
| **Verständnis** | Kontextbezogen | Nur exakte Übereinstimmung |
| **Tippfehler-Toleranz** | Hoch | Begrenzt (Fuzzy-Matching) |
| **Synonyme** | Ja | Nein |
| **Einrichtung** | Erfordert `docmd-search` | Eingebaut |
| **Index-Größe** | Größer (1–2 MB pro 100 Dateien) | Kleiner |
| **Datenschutz** | 100 % Privat (clientseitig) | 100 % Privat (clientseitig) |
| **Offline** | Ja | Ja |

### Automatische Installation

Wenn `semantic: true` aktiviert ist, installiert das Plugin automatisch `docmd-search` und seine Peer-Abhängigkeiten (`@huggingface/transformers`, `onnxruntime-node`), falls diese noch nicht verfügbar sind. Dies funktioniert mit npm, pnpm, yarn und bun - der Package-Manager Ihres Projekts wird automatisch erkannt.

Wenn die automatische Installation fehlschlägt (z. B. in eingeschränkten CI-Umgebungen), fällt das Plugin elegant auf die Schlüsselwortsuche zurück.

### Verfügbare Modelle

Die Option `model` ermöglicht die Auswahl eines Embedding-Modells. Modelle werden einmal heruntergeladen und lokal zwischengespeichert.

| Modell | Größe | Sprachen | Am besten für |
| :---- | :--- | :-------- | :------- |
| `Xenova/all-MiniLM-L6-v2` *(Standard)* | ~23 MB | Nur Englisch | Schnelle, englischsprachige Dokumentation |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | 50+ Sprachen | **i18n-Dokumentation** (Chinesisch, Deutsch, Französisch usw.) |
| `Xenova/multilingual-e5-small` | ~118 MB | 100+ Sprachen | Breite Sprachabdeckung |
| `Xenova/paraphrase-multilingual-mpnet-base-v2` | ~270 MB | 50+ Sprachen | Beste mehrsprachige Qualität |

::: callout info "Benutzerdefinierte Modelle"
Sie können jedes mit Transformers.js kompatible HuggingFace-Modell verwenden. Durchsuchen Sie [huggingface.co/models](https://huggingface.co/models?pipeline_tag=feature-extraction&library=transformers.js) und filtern Sie nach der `transformers.js`-Bibliothek.
:::

### Fallback-Verhalten

Wenn die semantische Suche aktiviert ist, aber `docmd-search` nicht installiert oder gefunden werden kann, fällt das Plugin automatisch auf die Schlüsselwortsuche zurück. Dies stellt sicher, dass Ihre Dokumentation unabhängig von der Konfiguration durchsuchbar bleibt.

::: callout warning "Alpha-Einschränkungen"
Semantische Suche ist experimentell. Aktuelle Einschränkungen sind:

*   Nur englische Modelle (mehrsprachige Modelle verfügbar, aber weniger getestet)
*   Keine inkrementellen Updates (vollständiger Neuaufbau erforderlich)
*   Höhere Speichernutzung (~50–100 MB im Browser)
*   Erstes Laden kann langsamer sein, da Embeddings abgerufen werden
:::

### Best Practices

Für optimale Leistung der semantischen Suche:

1.  **Rauschen ausschließen** - Indizieren Sie keine Changelogs oder Entwurfsinhalte:
    ```json "docmd.config.json"
    {
      "plugins": {
        "search": {
          "semantic": true,
          "exclude": ["**/release-notes/**", "**/drafts/**"]
        }
      }
    }
    ```

2.  **Für CI/CD vorbauen** - Verwenden Sie die Option `indexDir`, um Indizes vorab zu generieren:
    ```bash
    npx docmd-search --ui
    ```

3.  **Überwachen Sie die Index-Größe** - Überprüfen Sie regelmäßig die Größe des `.docmd-search/`-Verzeichnisses

4.  **Gründlich testen** - Überprüfen Sie die Qualität der Suchergebnisse, bevor Sie in die Produktion deployen