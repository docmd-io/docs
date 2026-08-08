---
title: "LLM-Kontext-Plugin"
description: "Optimieren Sie Ihre Dokumentation für KI-Agenten und LLM-Erfassung über die automatisierte Generierung von llms.txt und llms-full.txt."
---

Das `@docmd/plugin-llms`-Plugin implementiert den `llms.txt`-Standard, um während der Build-Kompilierung maschinenlesbare Kontextdateien zu erzeugen. KI-Tools, IDE-Erweiterungen (wie Cursor und Copilot) und autonome Agenten erfassen diese generierten Dateien, um hochpräzise Kontextmodelle Ihrer Website zu erstellen.

Das Plugin ist **standardmäßig aktiviert**. Setzen Sie die Eigenschaft [`url`](../configuration/overview.md) in `docmd.config.json`, um sicherzustellen, dass absolute URLs ausgegeben werden.

## Generierte Ausgabe-Assets

Während der Website-Kompilierung werden drei Dateien im Stammverzeichnis der Build-Ausgabe platziert:

* `llms.txt` — Strukturierte Übersicht mit Seitentiteln, Beschreibungen und kanonischen URLs.
* `llms-full.txt` — Vollständiger Dokumentationskontext mit an jeden Eintrag angehängtem rohen Markdown-Text.
* `llms.json` — Maschinenlesbares JSON-Manifest mit typisierten Metadaten (Titel, URL, Beschreibung, Priorität).

Erkennungs-`<link>`-Tags werden automatisch in die `<head>`-Header der Seiten injiziert.

## Konfigurationsoptionen

Konfigurieren Sie LLM-Kontextparameter in `docmd.config.json`:

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die LLM-Kontextdateigenerierung. |
| `fullContext` | `boolean` | `true` | Generieren Sie `llms-full.txt` mit vollständigem Markdown-Text. |
| `maxTokenLimit` | `number` | `null` | Optionale Zeichen-/Token-Obergrenze für Kontext-Bundle-Ausgaben. |
| `i18n` | `boolean` | `false` | Schreiben Sie sprachspezifische Dateien (`llms.<locale>.txt`) neben dem Standardzeichensatz. |

### Globales Konfigurationsbeispiel

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "llms": {
      "fullContext": true,
      "i18n": false
    }
  }
}
```

## Standard-Locale-Verhalten

Standardmäßig generiert das Plugin dateiendungslose Dateien (`llms.txt`, `llms-full.txt`, `llms.json`) für die **Standard-Locale**. Dies wahrt die Kompatibilität mit KI-Tools, die Standard-Stammdateinamen erwarten.

Für Websites mit einer einzigen Sprache wird ein einzelnes Set von Stammdateien erzeugt. Für mehrsprachige Websites werden Inhalte der Standard-Locale unter den Stamm-Pfade ohne Suffix bereitgestellt.

## Mehrsprachige Kontext-Bundles

Um dedizierte Kontextdateien für Sekundärsprachen zu generieren, setzen Sie `i18n: true`:

```json "docmd.config.json"
{
  "plugins": {
    "llms": {
      "i18n": true
    }
  }
}
```

Wenn dies aktiviert ist, enthält die Build-Ausgabe:

```text
site/llms.txt          ← Standard-Locale (ohne Suffix)
site/llms-full.txt     ← Standard-Locale (ohne Suffix)
site/llms.json         ← Standard-Locale (ohne Suffix)
site/llms.de.txt       ← Deutsche Locale (mit Suffix)
site/llms-full.de.txt  ← Deutsche Locale (mit Suffix)
site/llms.zh.txt       ← Chinesische Locale (mit Suffix)
site/llms-full.zh.txt  ← Chinesische Locale (mit Suffix)
```

Die Standard-Locale behält Pfade ohne Suffix bei, sodass externe Integrationen weiterhin nahtlos funktionieren.

## Sicherheit & Anonymisierung

Alle benutzergesteuerten Zeichenfolgen (Titel und Beschreibungen) werden vor der Bundle-Ausgabe einer strengen Bereinigung unterzogen:

* **Link-Integrität**: Markdown-Steuerzeichen (`` ` ``, `[`, `]`, Zeilenumbrüche) in Seitentiteln werden maskiert, um eine fehlerhafte `[Titel]\(Ziel-Pfad)`-Syntax zu verhindern.
* **Schutz vor CSV-/Tabellen-Injection**: Zeichenfolgen, die mit `=`, `+`, `-` oder `@` beginnen, wird ein einzelnes Anführungszeichen (`'`) vorangestellt, um die Ausführung von Zellformeln zu neutralisieren.

## Ausschluss von Inhaltsseiten

Um interne Notizen, Entwurfsseiten oder sicherheitsrelevante Dokumente aus KI-Kontextdateien auszuschließen, setzen Sie `llms: false` im [Seiten-Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Interne Release-Checkliste"
llms: false # Schließt die Seite aus llms.txt und llms-full.txt aus
---
```

Ausgeschlossene Seiten bleiben in der Standard-HTML-Ausgabe und in der lokalen Suche der Website sichtbar.

::: callout tip "Strukturierte Wissensgraphen" icon:cpu
Für tief strukturierte KI-Kontextgraph-Bundles (einschließlich typisierter Konzeptgraphen und Knotenvisualisierungen) kombinieren Sie dieses Plugin mit dem [OKF-Bundle-Plugin](./okf.md).
:::