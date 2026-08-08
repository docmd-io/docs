---
title: "Migration von VitePress"
description: "Ein umfassender Leitfaden zur Überführung Ihres VitePress-Projekts zu docmd."
---

VitePress ist ein Vue-gestützter statischer Website-Generator. `docmd` bietet eine vergleichbare Laufzeitgeschwindigkeit bei gleichzeitigem Verzicht auf den Overhead von clientseitigen JavaScript-Frameworks, was Vue-Hydratisierungsverzögerungen eliminiert.

::: steps

### 1. Ausführen der Migrations-Engine

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden VitePress-Projekts aus:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --vitepress
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --vitepress
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --vitepress
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --vitepress
```
:::

#### Was automatisch passiert

::: steps

1. **Backup**: Ihr gesamtes Projektverzeichnis (ausgenommen `node_modules`, `.git`, `package.json` und Lockfiles) wird sicher in ein neues `vitepress-backup/`-Verzeichnis gesichert.
2. **Inhalts-Migration**: Ihr `docs/`-Ordner (oder Ihre Stamm-Markdown-Dateien) wird im Projekt-Stammverzeichnis wiederhergestellt. Das versteckte Konfigurationsverzeichnis `.vitepress` wird entfernt, um Konflikte zu vermeiden.
3. **Konfigurations-Generierung**: Eine `docmd.config.json` wird generiert, die Ihren Website-`title` aus `.vitepress/config.js`, `ts` oder `mjs` extrahiert.

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

VitePress konfiguriert die Navigation in JavaScript-Konfigurationsmodulen und ermöglicht das Einbetten von Vue-Komponenten. Übersetzen Sie diese in `docmd`-Container.

#### Navigations-Einrichtung

VitePress verwendet ein Array von Objekten in `themeConfig.sidebar`. Erstellen Sie eine `navigation.json` in Ihrem `docs/`-Verzeichnis:

**VitePress (`.vitepress/config.js`):**
```javascript
themeConfig: {
  sidebar: [
    {
      text: "Guide",
      items: [
        { text: "Introduction", link: "/introduction" },
        { text: "Getting Started", link: "/getting-started" }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Introduction", "path": "/introduction" },
      { "title": "Getting Started", "path": "/getting-started" }
    ]
  }
]
```

#### Ersetzen von Vue-Komponenten & Container-Syntax

Da `docmd` Vue nicht clientseitig ausführt, ersetzen Sie benutzerdefinierte Komponenten durch `docmd`- [Container](../content/containers/callouts.md).

VitePress-Admonition-Container funktionieren **direkt nach der Installation** ohne Modifikation:
- `:::tip` → rendert als `callout tip`
- `:::warning` → rendert als `callout warning`
- `:::danger` → rendert als `callout danger`
- `:::info` → rendert als `callout info`
- `:::details` → rendert als `collapsible`

::: callout success "Null Änderungen erforderlich" icon:check-circle
Die Container-Syntax von VitePress wird nativ unterstützt. Bestehende Admonition-Blöcke und ausklappbare Details-Bereiche werden ohne Bearbeitung Ihrer Markdown-Dateien korrekt gerendert.
:::

:::

## Nächste Schritte

- Erkunden Sie den [Bereitstellungs-Leitfaden](../deployment/index.md) von `docmd`, um GitHub Actions-, Vercel-, Netlify- oder Docker-Builds einzurichten.
- Überprüfen Sie das vollständige Set visueller [Container](../content/containers/index.md).