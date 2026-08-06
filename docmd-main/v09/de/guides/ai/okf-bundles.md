---
title: "OKF-Bundles — Deep Dive"
description: "So organisieren Sie Ihre docmd-Inhalte für das beste OKF-Bundle – typisierte Konzepte, Querverweise und die Disziplin für eine KI-agentenfreundliche Wissensbasis."
---

Das Plugin [`@docmd/plugin-okf`](../../plugins/okf.md) generiert ein [Open Knowledge Format][okf-spec]-Bundle aus Ihrer docmd-Website. Dieser Leitfaden erklärt, wie das Bundle aufgebaut ist, wie Sie Ihre Inhalte für die optimale Nutzung durch KI-Agenten strukturieren und wie sich OKF vom flachen [`llms.txt`](../../plugins/llms.md)-Format unterscheidet.

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Das mentale Modell: ein Wiki, kein Sitemap

Eine traditionelle Dokumentationsseite ist ein Baum — Abschnitte und Unterabschnitte mit darin hängenden Seiten. Ein Benutzer navigiert den Baum von oben nach unten, um Gesuchtes zu finden.

Ein OKF-Bundle ist ein **Wiki** — ein flaches Verzeichnis typisierter Konzeptdateien mit Querverweisen untereinander. Ein KI-Agent navigiert horizontal durch den Graphen und folgt Links von einem Konzept zu dessen Nachbarn.

Die beiden Strukturen sehen auf der Festplatte identisch aus (Markdown-Dateien in Verzeichnissen), aber das Navigationsmodell unterscheidet sich. Die [drei Designprinzipien][okf-principles] der OKF-Spezifikation sind es wert, vollständig zitiert zu werden:

> 1. **Minimal meinungsstark.** OKF verlangt genau eine Sache von jedem Konzept: ein `type`-Feld. Alles andere (welche Typen existieren, welche weiteren Felder enthalten sind, welche Abschnitte der Body hat) bleibt dem Ersteller überlassen.
> 2. **Unabhängigkeit von Ersteller/Konsument.** Ein von Hand erstelltes Bundle kann von einem KI-Agenten konsumiert werden. Ein von einer Metadaten-Export-Pipeline generiertes Bundle kann in einem Visualisierer durchsucht werden. Ein von einem LLM synthetisiertes Bundle kann von einem anderen abgefragt werden. Das Format ist der Vertrag; die Werkzeuge an jedem Ende sind unabhängig austauschbar.
> 3. **Format, keine Plattform.** OKF ist an keine spezifische Cloud, Datenbank, Modell-Anbieter oder Agenten-Framework gebunden.

[okf-principles]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Wie ein OKF-Bundle aussieht

```text
site/okf/
├── okf.yaml              ← Typisiertes Manifest
├── index.md              ← Katalog im Karpathy-Stil
├── graph/                ← Opt-in: nur wenn plugins.okf.graph: true
│   ├── index.html        ← Interaktiver Force-Directed-Viewer
│   ├── graph.json        ← Graphendaten
│   ├── graph.js          ← Viewer-Laufzeit
│   └── graph.css         ← Viewer-Styles
├── concepts/
│   ├── weekly-active-users.md
│   ├── orders-table.md
│   └── api-authentication.md
└── _meta/
    ├── bundle.json
    └── lint-report.txt
```

Jede `concepts/<slug>.md`-Datei enthält ein `type`-Feld im Frontmatter sowie den vollständigen Markdown-Body der Seite. Das `okf.yaml`-Manifest listet jedes Konzept mit Typ, Pfad, Sprach-Locale, Version und Tags auf — der Katalog, den ein KI-Agent nutzt, um zu entscheiden, welche Konzepte gelesen werden sollen.

## Was in ein `type`-Feld gehört

Das `type`-Feld ist der einzige erforderliche Frontmatter-Schlüssel. Es teilt dem Agenten mit, welche Art von Wissen dieses Konzept repräsentiert. Das Plugin `@docmd/plugin-okf` besitzt eine Typerkennungsmap basierend auf Pfad-Präfixen:

| URL-Präfix | Erkannter Typ |
| :--- | :--- |
| `/api/` | `api` |
| `/guides/` | `guide` |
| `/reference/` | `reference` |
| `/concepts/` | `concept` |
| `/runbooks/` | `runbook` |
| `/datasets/` | `dataset` |
| `/metrics/` | `metric` |
| `/tables/` | `table` |
| (alles andere) | `concept` (Standard) |

Sie können den erkannten Typ mit explizitem Frontmatter überschreiben:

```markdown
---
type: api
title: "Authentifizierungs-API"
description: "OAuth 2.0 + JWT Auth-Flow für die Benutzer-API."
---

# Authentifizierungs-API
...
```

Oder nutzen Sie die geschachtelte `okf.type`-Form:

```markdown
---
okf:
  type: api
title: "Authentifizierungs-API"
---
```

Der Agent liest zuerst das `type`-Feld. Ein Konzept mit `type: runbook` wird als Schritt-für-Schritt-Anleitung behandelt; ein Konzept mit `type: api` als API-Referenz; ein Konzept mit `type: dataset` als Daten-Wörterbuch.

## Querverweise bilden den Graphen

OKF ist ein Graph, kein Baum. Die Beziehungen zwischen Konzepten werden aus internen Markdown-Links abgeleitet. Wenn `api-authentication.md` auf `users-table.md` verlinkt, zeichnet das OKF-Bundle diese Kante in `graph.json` auf und der Graph-Viewer zieht eine Linie zwischen den beiden Knoten.

Best Practices für Querverweise:

- **Vorwärts verlinken** — beim Einführen eines Konzepts auf abhängige Konzepte verlinken (z. B. `[MCP-Einrichtung](./mcp-and-agent-skills.md)`).
- **Rückwärts verlinken** — im abhängigen Konzept zurückverlinken (z. B. `[KI-Assistent](./ai-assistant.md)`).
- **Nicht überverlinken** — jeder Link sollte Informationen hinzufügen.

## Seitenweise Abmeldung (Opt-out)

Manche Seiten sind für KI-Agenten nicht nützlich — rechtliche Vorlagen, interne Teamseiten, Marketingtexte. Verwenden Sie `frontmatter.okf: false`, um eine einzelne Seite aus dem OKF-Bundle auszuschließen:

```markdown
---
okf: false
---

# Interne Roadmap (Q3 2026)
...
```

Oder nutzen Sie `noindex: true`, um eine Seite von allen nachgelagerten Konsumenten auszuschließen.

## Unterschied zwischen OKF und `llms.txt`

Das [`llms.txt`-Plugin](../../plugins/llms.md) erzeugt eine flache Liste von Seiten:

```text
- [Page 1](https://example.com/page-1)
- [Page 2](https://example.com/page-2)
- [Page 3](https://example.com/page-3)
```

Das OKF-Plugin erzeugt einen typisierten Graphen:

```yaml
concepts:
  - id: api-authentication
    type: api
    title: "Authentifizierungs-API"
    path: /api/auth/
    file: concepts/api-authentication.md
    tags: [auth, security]
  - id: users-table
    type: table
    title: "Benutzertabelle"
    path: /tables/users/
    file: concepts/users-table.md
    tags: [schema, data]
```

Beide ergänzen sich:

- **llms.txt** ist für **flachen Konsum** — "gib mir alles".
- **OKF** ist für **typisierten Konsum** — "gib mir das Schema für Tabelle X".

## Häufige Fehler

### 1. Auslassen des `type`-Feldes
Setzen Sie `type: <name>` explizit für jede Seite mit klarer Kategorie.

### 2. Seiten ohne Querverweise
Fügen Sie mindestens einen eingehenden Link hinzu, damit eine Seite im Graphen auffindbar bleibt.

### 3. Interne Fachsprache in `description`
Verwenden Sie verständliches Deutsch, das ein Agent gegen Benutzeranfragen abgleichen kann.

### 4. OKF für Nicht-KI-Agenten-Websites
Deaktivieren Sie das Plugin explizit, wenn Sie keinen KI-Agenten als Zielgruppe haben:

```json
{
  "plugins": { "okf": false }
}
```

## Verifizierung

Inspezieren Sie das Bundle nach `docmd build` unter `site/okf/`:

```bash
# Das Manifest
cat site/okf/okf.yaml | head -30

# Der Katalog
open site/okf/index.md

# Der interaktive Graph
open site/okf/graph.html

# Vom Plugin erzeugte Warnungen
cat site/okf/_meta/lint-report.txt
```

- [KI-Assistent Einrichtung](./ai-assistant.md) — RAG-gestützte interaktive Assistenten-Konfiguration.
- [MCP & Agent Skills](./mcp-and-agent-skills.md) — Model Context Protocol Einrichtung und Agenten-Tools.
