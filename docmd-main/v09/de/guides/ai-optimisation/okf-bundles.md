---
title: "OKF-Bundles — Tiefeneinblick"
description: "Wie Sie Ihre docmd-Inhalte für das beste OKF-Bundle organisieren — typisierte Konzepte, Querverweise und die Disziplin, die eine KI-agentenfreundliche Wissensbasis ausmacht."
---

[`@docmd/plugin-okf`](../../plugins/okf.md) erzeugt ein [Open Knowledge Format][okf-spec]-Bundle aus Ihrer docmd-Site. Dieser Leitfaden erklärt, wie das Bundle aussieht, wie Sie Ihre Inhalte für den besten KI-Agenten-Konsum organisieren und wie sich OKF vom [`llms.txt`](../../plugins/llms.md)-Flachlistenformat unterscheidet.

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Das mentale Modell: ein Wiki, keine Sitemap

Eine traditionelle Dokumentations-Site ist ein Baum — Abschnitte und Unterabschnitte, mit Seiten, die jeweils darunter hängen. Ein Benutzer navigiert den Baum top-down, um zu finden, was er braucht.

Ein OKF-Bundle ist ein **Wiki** — ein flaches Verzeichnis typisierter Konzeptdateien mit Querverweisen zwischen ihnen. Ein KI-Agent navigiert den Graphen horizontal, folgt Links von einem Konzept zu seinen Nachbarn.

Die beiden Strukturen sehen auf der Festplatte gleich aus (Markdown-Dateien in Verzeichnissen), aber das Navigationsmodell ist anders. Die [drei Designprinzipien][okf-principles] der OKF-Spezifikation sind eine vollständige Wiedergabe wert:

> 1. **Minimal eigenwillig.** OKF verlangt von jedem Konzept genau eine Sache: ein `type`-Feld. Alles andere (welche Typen existieren, welche weiteren Felder enthalten sind, welche Abschnitte der Body hat) bleibt dem Produzenten überlassen.
> 2. **Produzent-/Konsument-Unabhängigkeit.** Ein von einem Menschen handverfasstes Bundle kann von einem KI-Agenten konsumiert werden. Ein von einer Metadaten-Export-Pipeline erzeugtes Bundle kann in einem Visualizer durchsucht werden. Ein von einem LLM synthetisiertes Bundle kann von einem anderen abgefragt werden. Das Format ist der Vertrag; die Werkzeuge an jedem Ende sind unabhängig austauschbar.
> 3. **Format, nicht Plattform.** OKF ist an keine spezifische Cloud, Datenbank, Modell-Anbieter oder Agenten-Framework gebunden.

[okf-principles]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Wie ein OKF-Bundle aussieht

```text
site/okf/
├── okf.yaml              ← typisiertes Manifest
├── index.md              ← Karpathy-ähnlicher Katalog
├── graph/                ← optional: nur wenn plugins.okf.graph: true
│   ├── index.html        ← interaktiver Force-Directed-Viewer
│   ├── graph.json        ← Graph-Daten
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

Jede `concepts/<slug>.md`-Datei trägt ein `type`-Feld im Frontmatter sowie den vollständigen Markdown-Body der Seite. Das `okf.yaml`-Manifest listet jedes Konzept mit Typ, Pfad, Locale, Version und Tags auf — der Katalog, den ein KI-Agent verwendet, um zu entscheiden, welche Konzepte er lesen soll.

## Was in ein `type` kommt

Das `type`-Feld ist der einzige erforderliche Frontmatter-Schlüssel. Es sagt dem Agenten, welche Art von Wissen dieses Konzept repräsentiert. Das `@docmd/plugin-okf`-Plugin hat eine Pfad-Präfix-Typ-Inferenz-Zuordnung:

| URL-Präfix | Inferierter Typ |
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

Sie können den inferierten Typ mit explizitem Frontmatter überschreiben:

```markdown
---
type: api
title: "Authentication API"
description: "OAuth 2.0 + JWT auth flow for the user API."
---

# Authentication API
...
```

Oder verwenden Sie die verschachtelte `okf.type`-Form:

```markdown
---
okf:
  type: api
title: "Authentication API"
---
```

Der Agent liest das `type`-Feld zuerst. Ein Konzept mit `type: runbook` wird als Schritt-für-Schritt-Playbook behandelt (z. B. "Wie man sich von einem Teilausfall erholt"); ein Konzept mit `type: api` wird als API-Referenz behandelt; ein Konzept mit `type: dataset` wird als Datenwörterbuch behandelt.

## Querverweise ergeben den Graphen

OKF ist ein Graph, kein Baum. Die Beziehungen zwischen Konzepten werden aus internen Markdown-Links inferiert. Wenn `api-authentication.md` auf `users-table.md` verlinkt, zeichnet das OKF-Bundle diese Kante in `graph.json` auf und der Graph-Viewer zeichnet eine Linie zwischen den beiden Knoten.

Das `okf-bundle` (lies: "Graph von Konzepten") ist nützlicher als ein Baum, weil es dem Agenten ermöglicht, verwandte Konzepte zu finden, an die der Autor nicht in einem Unterabschnitt gedacht hat. Das LLM-Wiki-Muster, das OKF formalisiert, geht explizit davon aus, dass der Agent Links folgt, um benachbartes Wissen zu entdecken.

Best Practices für Querverweise:

- **Vorwärts verlinken** — wenn Sie ein Konzept vorstellen, verlinken Sie zu den Konzepten, von denen es abhängt. "Um dies zu verwenden, siehe [users table](../tables/users.md)".
- **Rückwärts verlinken** — in dem Konzept, das von diesem abhängt, verlinken Sie zurück. "Verwendet von [API auth](../api/auth.md)".
- **Nicht übermäßig verlinken** — jeder Link sollte Informationen hinzufügen. Jedes Wort zu verlinken verwässert den Graphen und verwirrt den Agenten.

## Pro-Seite-Opt-out

Manche Seiten sind für KI-Agenten nicht nützlich — rechtliche Boilerplate, interne "Über das Team"-Seiten, Marketing-Texte. Verwenden Sie `frontmatter.okf: false`, um eine einzelne Seite aus dem OKF-Bundle auszuschließen:

```markdown
---
okf: false
---

# Internal Roadmap (Q3 2026)
...
```

Oder verwenden Sie `noindex: true`, um eine Seite aus allen nachgelagerten Konsumenten auszuschließen (Sitemap, Suche, llms.txt, OKF). Die beiden Flags unterscheiden sich:

- `okf: false` — nur aus OKF ausgeschlossen; weiterhin in Suche und llms.txt
- `noindex: true` — aus allen nachgelagerten Konsumenten ausgeschlossen

## Wie sich OKF von `llms.txt` unterscheidet

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
    title: "Authentication API"
    path: /api/auth/
    file: concepts/api-authentication.md
    tags: [auth, security]
  - id: users-table
    type: table
    title: "Users table"
    path: /tables/users/
    file: concepts/users-table.md
    tags: [schema, data]
```

Die beiden ergänzen sich:

- **llms.txt** ist für **flachen Konsum** — "gib mir alles". Ein Agent liest die Datei und hat den vollständigen Text in seinem Kontextfenster.
- **OKF** ist für **typisierten Konsum** — "gib mir das Schema für Tabelle X". Ein Agent liest das Manifest, wählt die benötigten Konzepte aus und lädt sie selektiv.

Für Projekte mit weniger als 50 Seiten ist llms.txt allein oft ausreichend. Für Projekte mit 50+ Seiten ist OKF das effizientere Format — der Agent muss nicht jede Seite laden, nur um die eine zu finden, die er braucht.

## Häufige Fehler

### 1. Das `type`-Feld weglassen

Das OKF-Manifest ist am nützlichsten, wenn jedes Konzept einen eindeutigen `type` hat. Wenn 80% Ihrer Seiten als `concept` inferiert werden, kann der Agent nicht erkennen, welche Referenzdokumente, welche Tutorials und welche Runbooks sind. Setzen Sie `type: <name>` explizit für jede Seite mit einer klaren Kategorie.

### 2. Seiten ohne Querverweise

Wenn eine Seite eine Sackgasse ist (keine internen Links zu oder von ihr), zeigt der Graph-Viewer sie als isolierten Knoten an. Der Agent liest sie isoliert und verliert den Kontext. Fügen Sie mindestens einen eingehenden Link (von einer anderen Seite referenziert) für jede Seite hinzu, die Sie sichtbar machen möchten.

### 3. Internen Jargon in `description` verwenden

Das `description`-Feld wird im Manifest und in llms.txt-Zusammenfassungen angezeigt. Ein KI-Agent verwendet es, um zu beurteilen, ob ein Konzept relevant ist. Verwenden Sie einfaches Deutsch, das der Agent mit einer Benutzeranfrage abgleichen kann: "wöchentlich aktive Benutzer für die Marketing-Site, berechnet aus dem Events-Stream", nicht "WAU (ms)".

### 4. OKF für Sites ohne KI-Agenten-Zielgruppe

Wenn Ihre Dokumentations-Site keine KI-Agenten-Zielgruppe hat, bringt OKF nichts. `@docmd/plugin-okf` ist standardmäßig aktiviert, also deaktivieren Sie es explizit:

```json
{
  "plugins": { "okf": false }
}
```

Das `llms.txt`-Plugin ist das richtige Werkzeug für "AI-durchsuchbaren Flachtext"; OKF ist das richtige Werkzeug für "KI-Agenten-typisierten Wissensgraphen".

## Wie verifizieren

Nach `docmd build` überprüfen Sie das Bundle unter `site/okf/`:

```bash
# Das Manifest (jedes Konzept, Typ, Pfad)
cat site/okf/okf.yaml | head -30

# Der Katalog (Karpathy-Stil, nach Typ gruppiert)
open site/okf/index.md

# Der interaktive Graph (Force-Directed, Theme-fähig)
open site/okf/graph.html

# Vom Plugin erzeugte Warnungen
cat site/okf/_meta/lint-report.txt
```

Der Lint-Bericht ist das Erste, was Sie prüfen sollten — er listet Seiten ohne `type`-Feld, Seiten mit defekten internen Links und verwaiste Konzepte (keine eingehenden Links) auf. Beheben Sie diese für eine reibungslosere Agenten-Erfahrung.

## Siehe auch

- [OKF-Bundle-Plugin-Dokumentation](../../plugins/okf.md) — die Plugin-Referenz: jede Konfigurationsoption, die Pro-Seite-Opt-out-Flags, die Typ-Auflösungsreihenfolge.
- [Open Knowledge Format — Google Cloud Blog-Post](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) — die Spezifikationsankündigung mit der Designbegründung.
- [LLM-Kontext-Plugin](../../plugins/llms.md) — das ergänzende Flachlistenformat. LLMS ist "gib mir alles", OKF ist "gib mir das Schema für Tabelle X".
- [KI-fähige Dokumentation erstellen](../generating-ai-ready-docs.md) — umfassenderer Leitfaden zum KI-Agenten-Konsum.
- [Struktur für LLMs](../structure-for-llms.md) — wie Inhalte für den Maschinenkonsum organisiert werden.