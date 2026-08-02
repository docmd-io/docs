---
title: "Migration von Astro Starlight"
description: "Ein umfassender Leitfaden zur Überführung Ihres Astro-Starlight-Projekts zu docmd."
---

# Migration von Astro Starlight zu docmd

Starlight ist ein auf Astro basierendes Dokumentations-Theme. docmd bietet eine ähnliche Zero-JavaScript-by-default-Erfahrung. Es eliminiert die Notwendigkeit, ein vollständiges Web-Framework zu konfigurieren, und reduziert so die Lernkurve.

## Schritt 1: Migrations-Engine ausführen

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden Starlight-Projekts aus:

```bash
npx @docmd/core migrate --starlight
```

### Was automatisch passiert

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues Verzeichnis `starlight-backup/` verschoben.
2.  **Content-Migration**: Starlight bewahrt Dokumentation in `src/content/docs/`. Die Migrations-Engine extrahiert dieses Verzeichnis und verschiebt dessen Inhalt in den `docs/`-Ordner im Stammverzeichnis.
3.  **Config-Generierung**: Eine `docmd.config.json` wird generiert, die den `title` Ihrer Site aus der Starlight-Integration innerhalb von `astro.config.mjs` extrahiert.

## Schritt 2: Setup testen

Sobald der Befehl abgeschlossen ist, können Sie Ihre Inhalte in docmd in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar wird leer sein.

## Schritt 3: Manuelle Konfiguration

### 1. Navigations-Einrichtung

Starlight definiert Navigation in `astro.config.mjs` über das `sidebar`-Array.

**Erforderliche Aktion:** Erstellen Sie eine `navigation.json` in Ihrem neuen `docs/`-Ordner.

```javascript "astro.config.mjs"
sidebar: [
  {
    "label": "Leitfäden",
    "items": [
      { "label": "Einrichtung", "link": "/guides/setup/" }
    ]
  }
]
```

```json "navigation.json"
[
  {
    "title": "Leitfäden",
    "collapsible": true,
    "children": [
      { "title": "Einrichtung", "path": "/guides/setup" }
    ]
  }
]
```

### 2. Astro-Komponenten ersetzen (MDX/Markdoc)

Starlight verwendet Astro-Komponenten, die über MDX oder Markdoc eingebettet werden. Da docmd auf reiner Markdown-Syntax basiert, müssen diese konvertiert werden.

**Erforderliche Aktion:** Ersetzen Sie Astro-Komponenten durch docmd [Container](../content/containers/callouts.md).

#### Beispiel: Tabs konvertieren

**Starlight:**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Sterne">Sirius, Vega, Beteigeuze</TabItem>
  <TabItem label="Monde">Io, Europa, Ganymed</TabItem>
</Tabs>
```

**docmd:**
```markdown
::: tabs
== tab "Sterne"
Sirius, Vega, Beteigeuze

== tab "Monde"
Io, Europa, Ganymed
:::
```

#### Beispiel: Asides (Admonitions) konvertieren

**Starlight:**
```mdx
:::note[Optionaler Titel]
Etwas Notiz-Inhalt.
:::
```

**docmd:**
```markdown
::: note "Optionaler Titel"
Etwas Notiz-Inhalt.
:::
```

### 3. Frontmatter-Mapping

Starlight hat strikte Frontmatter-Typisierung über Astro-Content-Collections. docmd-Frontmatter ist einfacher.
Wenn Sie `hero` oder `banner`-Frontmatter-Eigenschaften in Starlight für Landing-Pages verwendet haben, ersetzen Sie diese durch docmds [Hero-Sections](../content/containers/hero.md), die direkt im Markdown-Body geschrieben werden.

## Nächste Schritte

- Erkunden Sie docmds eingebautes [Search-Plugin](../plugins/search.md). Starlight verwendet Pagefind, während docmd einen hochoptimierten lokalen Suchindexer nativ mitliefert.