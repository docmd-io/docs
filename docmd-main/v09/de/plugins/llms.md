---
title: "LLM-Kontext-Plugin"
description: "Optimieren Sie Ihre Dokumentation für KI-Konsum mit automatisierter Generierung von llms.txt, llms-full.txt und llms.json."
---

Das `@docmd/plugin-llms`-Plugin folgt dem `llms.txt`-Standard. Es erzeugt zur Build-Zeit eine strukturierte Zusammenfassung (`llms.txt`) und einen vollständig verketteten Kontext (`llms-full.txt`). KI-Assistenten und Tools, die den Standard verstehen, können diese nutzen, um Ihre Dokumentation direkt aufzunehmen.

Das Plugin ist in 0.8.8 **standardmäßig aktiviert**. Um absolute Links zu erzeugen, setzen Sie `url` in Ihrer `docmd.config.json`.

## Generierte Ausgabe

Das Plugin erzeugt drei Dateien im Stammverzeichnis Ihrer Site:

- `llms.txt` — strukturierte Liste aller Seiten mit Titel + Beschreibung + URL
- `llms-full.txt` — dieselbe Liste, aber mit dem vollständigen Markdown-Body jeder Seite unter dem Eintrag verkettet
- `llms.json` — ein maschinenlesbares Manifest jeder Seite (Titel, URL, Beschreibung, Priorität)

Diese Dateien sind im `<head>` der Seite verlinkt, damit KI-Tools sie automatisch entdecken können.

## Konfiguration

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die LLM-Kontextgenerierung. |
| `fullContext` | `boolean` | `true` | Wenn true, wird eine `llms-full.txt`-Datei mit dem vollständigen Markdown jeder Seite erzeugt. |
| `maxTokenLimit` | `number` | `null` | Optionales Limit für die Gesamtzeichen/-Token der Kontextdateien. |
| `i18n` | `boolean` | `false` | Bei `true` werden zusätzlich pro Locale Dateien (`llms.<locale>.txt` usw.) neben den Default-Locale-Dateien geschrieben. Siehe [Mehrsprachige Ausgabe](#mehrsprachige-ausgabe) unten. |

### Beispiel

```json "docmd.config.json"
{
  "url": "https://docs.example.com",
  "plugins": {
    "llms": {
      "fullContext": true
    }
  }
}
```

## Standardverhalten (0.8.8)

Das Plugin schreibt Dateien **nur für die Standard-Locale**. Dies ist eine bewusste Änderung gegenüber früheren Versionen, in denen das Plugin standardmäßig pro Locale schrieb. Der Grund: die Namen ohne Suffix — `llms.txt` / `llms-full.txt` / `llms.json` — sind die Standardnamen, nach denen Downstream-Konsumenten (Cursor, Claude, GPT usw.) suchen. Sie in `llms.en.txt` + `llms.hi.txt` + `llms.fr.txt` aufzuspalten würde jede bestehende Integration brechen.

Für einsprachige Projekte (ohne `config.i18n`-Block) ist das unsichtbar — das Plugin schreibt einen einzelnen Satz Dateien im Site-Stammverzeichnis, wie zuvor. Für mehrsprachige Projekte enthält das Bundle nur die Seiten der Standard-Locale.

## Mehrsprachige Ausgabe (opt-in)

Um pro Locale zu schreiben, setzen Sie `i18n: true`:

```json "docmd.config.json"
{
  "plugins": {
    "llms": { "i18n": true }
  }
}
```

Das Plugin schreibt dann:

```text
site/llms.txt          ← Standard-Locale (en) — OHNE Suffix
site/llms-full.txt     ← Standard-Locale (en) — OHNE Suffix
site/llms.json         ← Standard-Locale (en) — OHNE Suffix
site/llms.ja.txt       ← Japanisch — mit Suffix
site/llms-full.ja.txt  ← Japanisch — mit Suffix
site/llms.ja.json      ← Japanisch — mit Suffix
site/llms.fr.txt       ← Französisch — mit Suffix
site/llms-full.fr.txt  ← Französisch — mit Suffix
site/llms.fr.json      ← Französisch — mit Suffix
```

Beachten Sie das Muster: **die Standard-Locale erhält nie einen Suffix** — ihre Dateien behalten die Namen ohne Suffix, damit bestehende Konsumenten nicht beeinträchtigt werden. Nur die Nicht-Standard-Locales erhalten einen `.<locale>`-Suffix.

Für Sites mit nur einer konfigurierten Locale werden unabhängig vom `i18n`-Flag keine pro-Locale-Dateien geschrieben (der Suffix würde nur Rauschen erzeugen).

## Eine Seite ausschließen

Wenn eine Seite sensible Informationen oder interne Notizen enthält, die KI-Modelle nicht lernen sollen, verwenden Sie das Flag `llms: false` in Ihrem Frontmatter:

```markdown
---
title: "Interne Entwicklungsgeheimnisse"
llms: false
---
```

Dies schließt die Seite aus den LLMS-Dateien aus. Die Seite wird weiterhin im regulären Site-HTML gerendert und bleibt in den Suchergebnissen enthalten.

## Siehe auch

- [OKF-Bundle-Plugin](./okf.md) — das ergänzende Bundle-Format für KI-Agenten-Konsum (typisiertes Manifest, Graph-Viewer, Concept-Dateien pro Seite). LLMS ist die flache Liste; OKF ist der strukturierte Graph.
- [KI-fähige Dokumentation erstellen](../guides/ai-optimisation/generating-ai-ready-docs.md)
- [Struktur für LLMs](../guides/ai-optimisation/structure-for-llms.md)

::: callout tip "KI-Genauigkeit maximieren"
Detaillierte Best Practices zur Strukturierung Ihres Markdown (semantische Überschriften, Alt-Texte usw.) finden Sie in unserem Leitfaden [Optimierung für KI-Agenten](../guides/ai-optimisation/generating-ai-ready-docs.md).
:::