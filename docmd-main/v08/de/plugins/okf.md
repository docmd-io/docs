---
title: "OKF-Bundle-Plugin"
description: "Erzeugen Sie ein Open Knowledge Format (OKF)-Bundle aus Ihrer docmd-Site, damit KI-Agenten Ihre Dokumentation direkt konsumieren können."
---

Das `@docmd/plugin-okf`-Plugin erzeugt ein **[Open Knowledge Format][okf-spec]**-Bundle (OKF) für den Konsum durch KI-Agenten. OKF ist ein herstellerneutraler, agenten- und menschenfreundlicher Standard zur Repräsentation der Metadaten, des Kontexts und des kuratierten Wissens, das moderne KI-Systeme benötigen. Das Bundle liegt neben Ihrer Site (z. B. `site/okf/`), sodass Agenten direkt darauf verwiesen werden können.

Das Plugin ist in 0.8.8 **standardmäßig aktiviert** — keine Konfiguration erforderlich. Das Bundle wird bei jedem `docmd build` erzeugt.

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Was ist OKF?

OKF ist eine offene Spezifikation, die Google Cloud im Juni 2026 angekündigt hat und die das [LLM-Wiki-Muster](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) in ein portables, interoperables Format formalisiert. Die Motivation:

::: callout info
Da Foundation-Modelle weiterhin besser werden, begrenzt das Fehlen relevanter Kontexte oft, was sie tun können, insbesondere wenn sie zum Aufbau agentenbasierter Systeme verwendet werden. Diese Modelle können zwar beim Schreiben von Code, beim Zusammenfassen von Dokumenten oder beim Analysieren von Datensätzen helfen, benötigen aber dennoch die richtigen Informationen, um genaue und umsetzbare Ergebnisse zu liefern — [Introducing the Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
:::

OKF repräsentiert organisatorisches Wissen als ein Verzeichnis von Markdown-Dateien mit YAML-Frontmatter, plus ein typisiertes Manifest, einen interaktiven Graph-Viewer und eine maschinenlesbare Bundle-Zusammenfassung. Die drei Designprinzipien:

1. **Minimal eigenwillig.** OKF verlangt von jedem Konzept genau eine Sache: ein `type`-Feld. Alles andere (welche Typen existieren, welche weiteren Felder enthalten sind, welche Abschnitte der Body hat) bleibt dem Produzenten überlassen.
2. **Produzent-/Konsument-Unabhängigkeit.** Ein von einem Menschen handverfasstes Bundle kann von einem KI-Agenten konsumiert werden. Ein von einer Metadaten-Export-Pipeline erzeugtes Bundle kann in einem Visualizer durchsucht werden. Ein von einem LLM synthetisiertes Bundle kann von einem anderen abgefragt werden. Das Format ist der Vertrag; die Werkzeuge an jedem Ende sind unabhängig austauschbar.
3. **Format, nicht Plattform.** OKF ist an keine spezifische Cloud, Datenbank, Modell-Anbieter oder Agenten-Framework gebunden.

## Was Sie erhalten

```text
site/okf/
├── okf.yaml              ← typisiertes Manifest (Bundle-Zusammenfassung)
├── index.md              ← Karpathy-ähnlicher Katalog, nach Typ gruppiert
├── graph/                ← optional: nur wenn `plugins.okf.graph: true`
│   ├── index.html        ← interaktiver Force-Directed-Viewer (öffnen unter /okf/graph/)
│   ├── graph.json        ← Graph-Daten (Knoten + Kanten)
│   ├── graph.js          ← Viewer-Laufzeit (Vanilla, keine CDN-Abhängigkeiten)
│   └── graph.css         ← Viewer-Styles (Theme-fähig)
├── concepts/
│   └── <slug>.md         ← eine Markdown-Datei pro Seite
└── _meta/
    ├── bundle.json       ← JSON-Spiegel von okf.yaml
    └── lint-report.txt   ← während der Erzeugung erzeugte Warnungen
```

Jede Konzeptdatei trägt das OKF-vorgeschriebene `type`-Feld im Frontmatter sowie den ursprünglichen Markdown-Body wörtlich, sodass ein Agent sowohl das Manifest navigieren als auch ganze Seiten lesen kann.

## Standardverhalten

OKF ist in 0.8.8 ein **Kern-Plugin**. Der Build lädt es automatisch und erzeugt das Bundle mit sinnvollen Standardwerten:

- **Nur Standard-Locale** standardmäßig (das Bundle enthält nur Seiten der Standard-Locale; die Dateien der Standard-Locale liegen im Bundle-Stammverzeichnis).
- **Typ-Inferenz** — Seiten unter `/api/`, `/guides/`, `/reference/`, `/concepts/`, `/runbooks/`, `/datasets/`, `/metrics/`, `/tables/` werden automatisch klassifiziert; alles andere fällt auf `concept` zurück.
- **Vollständiges Markdown** in jeder Konzeptdatei (der ursprüngliche Seiten-Body wird eingebunden, nicht nur ein Frontmatter-Stub).

Sie müssen `docmd.config.json` nichts hinzufügen, um ein OKF-Bundle zu erhalten. Das Plugin läuft mit leeren Optionen und verwendet alle Standardwerte.

### Deaktivieren

Drei Deaktivierungspfade werden unterstützt:

```json "docmd.config.json"
{
  "plugins": {
    "okf": false
  }
}
```

```json "docmd.config.json"
{
  "plugins": {
    "okf": { "enabled": false }
  }
}
```

```json "docmd.config.json"
{
  "plugins": {
    "okf": { "capabilities": ["head"] }
  }
}
```

Die letzte Form verwendet das Plugin-Vertrauensmodell — das `okf`-Plugin deklariert `capabilities: ['post-build']`; wenn Ihr `config.plugins.okf.capabilities`-Array `post-build` nicht enthält, wird das Plugin geladen, aber sein `onPostBuild`-Hook läuft nicht. Dies ist konsistent mit allen anderen Kern-Plugins.

## Konfiguration

Alle Schlüssel sind optional. Die aufgeführten Werte sind die Standardwerte:

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die OKF-Bundle-Erzeugung. |
| `outputDir` | `string` | `'okf'` | Bundle-Verzeichnis, relativ zur Site-Ausgabe. |
| `bundleName` | `string` | slugifizierter `config.title` | Name, der in `okf.yaml` und im Graph-Viewer-Titel verwendet wird. |
| `defaultType` | `string` | `'concept'` | Typ, der Seiten ohne expliziten Typ zugewiesen wird. |
| `typeField` | `string` | `'type'` | Frontmatter-Feldname für den OKF-Typ. |
| `warnOnMissingType` | `boolean` | `true` | TUI-Warnung für Seiten ausgeben, die auf `defaultType` zurückgefallen sind. |
| `includeFullMarkdown` | `boolean` | `true` | Rohtext des `.md`-Body in jede Konzeptdatei kopieren. |
| `graph` | `boolean` | `false` | Ein `graph/`-Unterverzeichnis mit `index.html`, `graph.js`, `graph.css` und `graph.json` ausgeben. Ab 0.8.8 Opt-in — die OKF-Spezifikation verlangt keinen Viewer, daher wird standardmäßig ein sauberes Bundle ohne ihn ausgeliefert. Der Viewer ruft `graph.json` zur Laufzeit aus demselben Verzeichnis ab, sodass `site/okf/graph/index.html` auch über `file://` funktioniert, solange die vier Dateien zusammen bleiben. |
| `generateGraphViewer` | `boolean` | — | **Veralteter** Alias für `graph`. Wird für ein Release berücksichtigt, damit bestehende Konfigurationen den Viewer nicht stillschweigend verlieren; beim Build wird eine Veralteter-Warnung ausgegeben. Migrieren Sie zu `graph: true`. |
| `localeStrategy` | `'default-only' \| 'folders' \| 'mixed' \| 'latest-only'` | `'default-only'` | Standard: nur die Standard-Locale, im Bundle-Stammverzeichnis. Auf `'folders'` setzen, um Nicht-Standard-Locales unter `<locale>/` zu verschachteln. |
| `versionStrategy` | `'folders' \| 'mixed' \| 'latest-only'` | `'latest-only'` | Verschachtelt Konzepte nach Versions-ID, wenn Versionierung aktiviert ist. |
| `excludePatterns` | `string[]` | `[]` | Zusätzliche Glob-Muster, die zusätzlich zu `frontmatter.noindex` / `frontmatter.okf === false` übersprungen werden. |

### Beispiel — benutzerdefiniertes Ausgabeverzeichnis + benutzerdefinierter Standardtyp

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "outputDir": "knowledge",
      "defaultType": "doc",
      "warnOnMissingType": true
    }
  }
}
```

### Beispiel — mehrsprachige Ausgabe (opt-in)

```json "docmd.config.json"
{
  "plugins": {
    "okf": { "localeStrategy": "folders" }
  }
}
```

```text
site/okf/                    ← Standard-Locale (en) im Bundle-Stammverzeichnis
├── okf.yaml
├── index.md
├── concepts/<slug>.md
└── _meta/, graph/, ...

site/okf/ja/                 ← Japanisch — verschachtelt unter <locale>/
├── okf.yaml
└── concepts/<slug>.md
```

Die Dateien der Standard-Locale liegen **immer** im Bundle-Stammverzeichnis, damit bestehende Konsumenten nicht beeinträchtigt werden. Nur Nicht-Standard-Locales erhalten ein `<locale>/`-Unterverzeichnis.

## Pro-Seite-Opt-out

Seiten können auf zwei Arten aus dem OKF-Bundle ausgenommen werden:

```markdown
---
noindex: true   # schließt auch aus sitemap, llms.txt usw. aus
---

---
okf: false       # schließt nur aus dem OKF-Bundle aus
---
```
