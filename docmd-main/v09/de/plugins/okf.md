---
title: "OKF-Bundle-Plugin"
description: "Erzeugen Sie Open Knowledge Format (OKF)-Wissens-Bundles und interaktive Konzeptgraphen für KI-Agenten."
---

Das `@docmd/plugin-okf`-Plugin baut während der statischen Kompilierung ein **[Open Knowledge Format][okf-spec]**-Wissens-Bundle (OKF). OKF ist eine offene, herstellerneutrale Spezifikation zur Strukturierung von Dokumentationsmetadaten, Konzeptgraphen und Domainkontexten für KI-Agenten und LLM-Tool-Ketten.

Das Plugin ist **standardmäßig aktiviert**. OKF-Bundles werden bei jeder Site-Kompilierung in `site/okf/` platziert.

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Architektur-Übersicht

OKF formalisiert die Wissensarchitektur in eine portable Verzeichnisstruktur, die YAML-Manifeste, Markdown-Konzeptdateien und visuelle kraftgesteuerte Graph-Assets enthält.

### Designprinzipien

1. **Minimale strukturelle Anforderungen**: Jeder Konzepteintrag erfordert lediglich ein `type`-Feld.
2. **Produzent-/Konsument-Unabhängigkeit**: Von Menschen verfasste Markdown-Dateien werden in Standard-Schemas kompiliert, die von beliebigen LLM-Frameworks abgefragt werden können.
3. **Herstellerneutralität**: Unabhängig von spezifischen Cloud-Anbietern, Modell-Hosts oder Vektordatenbank-Engines.

## Generierte Ausgabe-Assets

Die Kompilierung erzeugt den folgenden Verzeichnisbaum:

```text
site/okf/
├── okf.yaml              ← Manifest-Zusammenfassungsdatei
├── index.md              ← Nach Typ gruppierter Konzeptkatalog
├── graph/                ← Interaktive Graph-Assets (wenn graph: true)
│   ├── index.html        ← Kraftgesteuerter Graph-Visualisierer
│   ├── graph.json        ← Graphknoten und Kanten
│   ├── graph.js          ← Eigenständige Graph-Laufzeit
│   └── graph.css         ← Themenbewusstes Styling
├── concepts/
│   └── <slug>.md         ← Einzelne Konzept-Markdown-Dateien
└── _meta/
    ├── bundle.json       ← JSON-Spiegel von okf.yaml
    └── lint-report.txt   ← Build-Linting-Berichte
```

## Standard-Build-Verhalten

Das OKF-Plugin wird während der Kompilierung automatisch geladen:

* **Standard-Locale-Bereich**: Gibt Konzepte für die Primärsprache im Bundle-Stammverzeichnis aus.
* **Automatische Typ-Inferenz**: Klassifiziert Pfade unter `/api/`, `/guides/`, `/reference/`, `/concepts/`, `/runbooks/`, `/datasets/`, `/metrics/` und `/tables/` in typisierte Konzepte.
* **Wörtliches Markdown**: Kopiert Seiteninhalte und Frontmatter in Konzeptdateien.

### Deaktivieren

Deaktivieren Sie die OKF-Bundle-Generierung in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "okf": false
  }
}
```

Alternativ setzen Sie `enabled: false`:

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "enabled": false
    }
  }
}
```

## Konfigurationsoptionen

Konfigurieren Sie OKF-Bundle-Parameter in `docmd.config.json`:

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die OKF-Bundle-Kompilierung. |
| `outputDir` | `string` | `'okf'` | Ziel-Ausgabeverzeichnis relativ zum Stammverzeichnis der Website. |
| `bundleName` | `string` | `config.title` | Bundle-Bezeichner, der in `okf.yaml` und Graph-Headern verwendet wird. |
| `defaultType` | `string` | `'concept'` | Fallback-Konzepttyp für getaggte Seiten ohne Typ. |
| `typeField` | `string` | `'type'` | Frontmatter-Schlüssel für die Typ-Klassifizierung. |
| `warnOnMissingType` | `boolean` | `true` | Gibt CLI-Warnungen für Seiten aus, die `defaultType` verwenden. |
| `includeFullMarkdown` | `boolean` | `true` | Kopiert den vollständigen Markdown-Text in Konzeptdateien. |
| `graph` | `boolean` | `false` | Generiert einen interaktiven kraftgesteuerten Graph-Visualisierer unter `graph/`. |
| `localeStrategy` | `'default-only' \| 'folders'` | `'default-only'` | Strategie für die mehrsprachige Bundle-Kompilierung. |

### Globales Konfigurationsbeispiel

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "outputDir": "knowledge",
      "defaultType": "concept",
      "graph": true
    }
  }
}
```

### Mehrsprachige Ordnerstrategie

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "localeStrategy": "folders"
    }
  }
}
```

Ausgabeverzeichnisstruktur:

```text
site/okf/                    ← Standard-Locale (Stammverzeichnis)
├── okf.yaml
├── index.md
└── concepts/

site/okf/de/                 ← Deutsche Locale (verschachtelt)
├── okf.yaml
└── concepts/
```

## Ausschluss von Seiten aus OKF

Schließen Sie bestimmte Seiten mithilfe von Frontmatter-Flags aus:

```yaml
---
title: "Interne Betriebsnotiz"
okf: false # Schließt die Seite ausschließlich aus OKF-Bundles aus
---
```

Um eine Seite global über Sitemaps, Suche, LLM-Dateien und OKF hinweg auszuschließen, setzen Sie `noindex: true`.

## Auflösung des Konzepttyps

Das Plugin bestimmt Konzepttypen in folgender Reihenfolge:

1. `frontmatter.okf.type` — Verschachtelte explizite Deklaration.
2. `frontmatter.type` — Explizite Deklaration auf oberster Ebene.
3. `frontmatter.okfType` — Älterer Alias.
4. **Pfad-Präfix-Inferenz**: Automatische Zuordnung für `/guides/`, `/api/`, `/reference/`, `/concepts/` usw.
5. `defaultType`-Fallback (`'concept'`).

::: callout tip "Wissensgraph-Visualisierung" icon:git-fork
Aktivieren Sie `graph: true` in Ihrer OKF-Plugin-Konfiguration, um interaktive kraftgesteuerte Graph-Visualisierungen (`site/okf/graph/index.html`) zu erstellen, die Querverweise und Konzeptbeziehungen abbilden.
:::
