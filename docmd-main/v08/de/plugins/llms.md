---
title: "LLM-Kontext-Plugin"
description: "Optimieren Sie Ihre Dokumentation für KI-Konsum mit automatisierter Generierung von llms.txt und llms-full.txt."
---

Das `@docmd/plugin-llms`-Plugin folgt dem `llms.txt`-Standard. Es erzeugt zwei Dateien zur Build-Zeit: eine strukturierte Zusammenfassung (`llms.txt`) und einen vollständig verketteten Kontext (`llms-full.txt`). KI-Assistenten und Tools, die den Standard verstehen, können diese nutzen, um Ihre Dokumentation direkt aufzunehmen.

## Konfiguration

Das Plugin ist standardmäßig aktiviert. Um absolute Links zu erzeugen, setzen Sie `url` in Ihrer `docmd.config.json`.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die LLM-Kontextgenerierung. |
| `fullContext` | `boolean` | `true` | Wenn true, wird eine `llms-full.txt`-Datei mit dem Inhalt aller Seiten erzeugt. |
| `maxTokenLimit` | `number` | `null` | Optionales Limit für die Gesamtzeichen/-Token der Kontextdateien. |

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

## Generierte Ausgabe

Sobald konfiguriert, erzeugt das Plugin bei jedem Build automatisch `llms.txt` und `llms-full.txt` im Stammverzeichnis Ihrer Site. Diese Dateien sind im `<head>` der Seite verlinkt, damit KI-Tools sie automatisch entdecken können.

### Eine Seite ausschließen

Wenn eine Seite sensible Informationen oder interne Notizen enthält, die KI-Modelle nicht lernen sollen, verwenden Sie das Flag `llms: false` in Ihrem Frontmatter:

```markdown
---
title: "Interne Entwicklungsgeheimnisse"
llms: false
---
```

::: callout tip "KI-Genauigkeit maximieren"
Detaillierte Best Practices zur Strukturierung Ihres Markdown (semantische Überschriften, Alt-Texte usw.) finden Sie in unserem Leitfaden [Optimierung für KI-Agenten](../guides/ai-optimisation/generating-ai-ready-docs.md).
:::