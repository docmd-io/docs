---
title: "Von Astro Starlight migrieren"
description: "Ein umfassender Leitfaden zur Migration Ihres Astro Starlight-Projekts zu docmd."
---

# Von Astro Starlight migrieren zu docmd

Starlight ist ein hervorragendes Dokumentations-Theme, das auf dem Astro-Framework basiert. `docmd` bietet eine ähnliche Standarderfahrung ohne JavaScript, macht jedoch die Konfiguration eines vollständigen Web-Frameworks (Astro) überflüssig, was die Lernkurve für technische Redakteure drastisch reduziert.

## Schritt 1: Führen Sie die Migrations-Engine aus

Führen Sie den folgenden Befehl im Hauptverzeichnis Ihres bestehenden Starlight-Projekts aus (dort, wo sich Ihre `astro.config.mjs` befindet):

```bash
npx @docmd/core migrate --starlight
```

### Was passiert automatisch

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues `starlight-backup/`-Verzeichnis verschoben.
2.  **Inhaltsmigration**: Starlight speichert die Dokumentation in `src/content/docs/`. Die Migrations-Engine extrahiert dieses spezifische Verzeichnis automatisch und verschiebt seinen Inhalt zur Nutzung durch `docmd` in den Stammordner `docs/`.
3.  **Konfigurationsgenerierung**: Eine `docmd.config.js` wird generiert, die Ihren Website-`title` aus der Starlight-Integration innerhalb der `astro.config.mjs` extrahiert.

## Schritt 2: Testen Sie das Setup

Sobald der Befehl abgeschlossen ist, können Sie Ihre Inhalte in `docmd` in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar bleibt zunächst leer.

## Schritt 3: Manuelle Konfiguration

### 1. Navigations-Setup

Starlight definiert die Navigation in der `astro.config.mjs` über das Array `sidebar`.

**Aktion erforderlich:** Sie müssen eine `navigation.json` in Ihrem neuen `docs/`-Ordner erstellen.

**Starlight (`astro.config.mjs`):**
```js
sidebar: [
  {
    label: 'Guides',
    items: [
      { label: 'Setup', link: '/guides/setup/' }
    ],
  },
]
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guides",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/guides/setup" }
    ]
  }
]
```

### 2. Astro-Komponenten ersetzen (MDX/Markdoc)

Starlight verwendet Astro-Komponenten (`<Tabs>`, `<Card>` usw.), die über MDX oder Markdoc eingebettet sind. Da sich `docmd` auf reine Markdown-Syntax anstelle von UI-Komponenten verlässt, müssen diese konvertiert werden.

**Aktion erforderlich:** Ersetzen Sie Astro-Komponenten durch `docmd` [Container](/content/containers/callouts).

#### Beispiel: Tabs konvertieren

**Starlight:**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Stars">Sirius, Vega, Betelgeuse</TabItem>
  <TabItem label="Moons">Io, Europa, Ganymede</TabItem>
</Tabs>
```

**docmd:**
```markdown
::: tabs
== tab "Stars"
Sirius, Vega, Betelgeuse

== tab "Moons"
Io, Europa, Ganymede
:::
```

#### Beispiel: Admonitions (Asides) konvertieren

**Starlight:**
```mdx
:::note[Optional Title]
Some note content.
:::
```

**docmd:**
```markdown
::: note "Optional Title"
Some note content.
:::
```

### 3. Frontmatter-Zuordnung

Starlight verfügt über eine strikte Frontmatter-Typisierung über Astro Content Collections. Das Frontmatter von `docmd` ist einfacher gehalten.
Wenn Sie in Starlight `hero`- oder `banner`-Frontmatter-Eigenschaften für Landingpages verwendet haben, müssen Sie diese durch [Hero-Bereiche](/content/containers/hero) von `docmd` ersetzen, die direkt in den Markdown-Text geschrieben werden.

## Nächste Schritte

- Entdecken Sie das integrierte [Such-Plugin](/plugins/search) von `docmd` (Starlight verwendet Pagefind, während `docmd` nativ einen hochoptimierten lokalen Suchindexer mitliefert).
