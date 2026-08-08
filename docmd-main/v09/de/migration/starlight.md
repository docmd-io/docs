---
title: "Migration von Astro Starlight"
description: "Ein umfassender Leitfaden zur Überführung Ihres Astro-Starlight-Projekts zu docmd."
---

Starlight ist ein auf Astro basierendes Dokumentations-Theme. `docmd` bietet eine ähnliche Standard-Zero-JavaScript-Erfahrung, ohne vollständige Web-Framework-Konfigurationen oder komplexe Astro-Integrationen zu erfordern.

::: steps

### 1. Ausführen der Migrations-Engine

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden Starlight-Projekts aus:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --starlight
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --starlight
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --starlight
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --starlight
```
:::

#### Was automatisch passiert

::: steps

1. **Backup**: Ihr gesamtes Projektverzeichnis (ausgenommen `node_modules`, `.git`, `package.json` und Lockfiles) wird sicher in ein neues `starlight-backup/`-Verzeichnis gesichert.
2. **Inhalts-Migration**: Starlight speichert die Dokumentation in `src/content/docs/`. Die Migrations-Engine extrahiert diesen Ordner und verschiebt dessen Inhalt in den Stammordner `docs/`.
3. **Konfigurations-Generierung**: Eine `docmd.config.json` wird generiert, die Ihren Website-`title` aus der Starlight-Integration in `astro.config.mjs` oder `astro.config.ts` extrahiert.

:::

### 2. Vorschau der Migrations-Ausgabe

Zeigen Sie Ihre Markdown-Inhalte sofort in `docmd` an:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

### 3. Manuelle Konfiguration & Komponenten-Ersatz

#### Navigations-Einrichtung

Starlight definiert die Seitenleisten-Navigation in `astro.config.mjs` über das Array `sidebar`. Erstellen Sie eine `navigation.json` in Ihrem `docs/`-Verzeichnis:

**Starlight (`astro.config.mjs`):**
```javascript
sidebar: [
  {
    label: "Guides",
    items: [
      { label: "Setup", link: "/guides/setup/" }
    ]
  }
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

#### Ersetzen von Astro-Komponenten (MDX / Markdoc)

Starlight verwendet Astro-Komponenten, die über MDX oder Markdoc eingebettet werden. Ersetzen Sie diese durch native `docmd`- [Container](../content/containers/callouts.md).

##### Konvertierung von Tab-Komponenten

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
== tab "Stars" icon:sparkles
Sirius, Vega, Betelgeuse

== tab "Moons" icon:moon
Io, Europa, Ganymede
:::
```

##### Konvertierung von Asides (Admonitions)

**Starlight:**
```mdx
:::note[Optional Title]
Some note content.
:::
```

**docmd:**
```markdown
::: callout info "Optional Title"
Some note content.
:::
```

#### Frontmatter-Zuordnung

Starlight erzwingt eine strikte Frontmatter-Typisierung über Astro-Content-Collections. Wenn Sie `hero`- oder `banner`-Frontmatter-Eigenschaften für Landingpages verwendet haben, ersetzen Sie diese durch native [Hero-Bereiche](../content/containers/hero.md) von `docmd`, die direkt im Markdown-Fließtext geschrieben werden.

:::

## Nächste Schritte

- Erkunden Sie das integrierte [Such-Plugin](../plugins/search.md) von `docmd`. Während Starlight auf eine Pagefind-Integration angewiesen ist, enthält `docmd` direkt einen schnellen, Zero-Config-lokalen Such-Indexierer.