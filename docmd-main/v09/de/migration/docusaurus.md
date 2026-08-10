---
title: "Migration von Docusaurus"
description: "Ein umfassender Leitfaden zur Überführung Ihres Docusaurus v2/v3-Projekts zu docmd."
---

Docusaurus ist ein React-basiertes Dokumentations-Framework. `docmd` bietet eine schnelle, Zero-Config-Alternative, die deutlich schneller kompiliert und keine React-Komponenten zum Rendern reichhaltiger Dokumentationsfunktionen benötigt.

### 1. Ausführen der Migrations-Engine

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden Docusaurus-Projekts aus:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --docusaurus
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --docusaurus
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --docusaurus
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --docusaurus
```
:::

#### Was automatisch passiert

::: steps

1. **Backup**: Ihr gesamtes Projektverzeichnis (ausgenommen `node_modules`, `.git`, `package.json` und Lockfiles) wird sicher in ein neues `docusaurus-backup/`-Verzeichnis gesichert.
2. **Inhalts-Migration**: Ihr `docs/`-Ordner wird im Projekt-Stammverzeichnis wiederhergestellt.
3. **Frontmatter-Übersetzung**: Docusaurus `sidebar_label`-Frontmatter-Tags werden automatisch in `docmd`'s `nav_title` übersetzt, und alte `id`-Tags werden sicher entfernt.
4. **Konfigurations-Generierung**: Eine `docmd.config.json` wird generiert, die Ihren Website-`title` und Optionen für statische Verzeichnisse aus `docusaurus.config.js` oder `docusaurus.config.ts` extrahiert.

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

Docusaurus verwendet programmatische JavaScript-Konfigurationen und React-Komponenten, die nativen Markdown- und `docmd`-Containern zugeordnet werden müssen.

#### Navigations-Einrichtung

Docusaurus-Seitenleisten werden oft automatisch generiert oder in `sidebars.js` deklariert. Erstellen Sie eine `navigation.json` in Ihrem `docs/`-Verzeichnis, um explizite Seitenleisten-Navigation zu definieren. Siehe den [Navigations-Leitfaden](../configuration/navigation.md).

#### Ersetzen von MDX & React-Komponenten

Konvertieren Sie benutzerdefinierte `<MyReactComponent />`-Tags in Standard-Markdown oder verwenden Sie die nativen [Container](../content/containers/callouts.md) von `docmd`.

##### Admonition-Container-Aliase

Docusaurus-Admonitions funktionieren **direkt nach der Installation** ohne Dateimodifikationen:
- `:::note` → rendert als `callout info`
- `:::tip` → rendert als `callout tip`
- `:::info` → rendert als `callout info`
- `:::caution` → rendert als `callout warning`
- `:::danger` → rendert als `callout danger`

::: callout tip "Native Container-Syntax" icon:sparkles
Für erweiterte Funktionen (z. B. benutzerdefinierte Icons oder benutzerdefinierte Badge-Farben) konvertieren Sie Docusaurus-Admonitions in die native `docmd`-Syntax:
```markdown
::: callout tip title:"Benutzerdefinierter Titel" icon:sparkles
Dies ist ein Tipp-Container.
::: /callout
```
:::

##### Tabs mit Codeblöcken

**Docusaurus (React MDX):**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    Apple content.
  </TabItem>
  <TabItem value="orange" label="Orange">
    Orange content.
  </TabItem>
</Tabs>
```

**docmd (Nativer Container):**
```markdown
::: tabs
== tab "Apple" icon:apple
Apple content.

== tab "Orange" icon:citrus
Orange content.
::: /tabs
```

#### Lokalisierung (i18n)

Wenn Sie die `i18n`-Funktionen von Docusaurus verwendet haben, verschieben Sie übersetzte Dateien aus `i18n/<locale>/docusaurus-plugin-content-docs/current/` in die Locale-Verzeichnisse von `docmd` (`docs/en/`, `docs/de/`, `docs/zh/` usw.) und definieren Sie Locale-Codes in `docmd.config.json`. Siehe den [Lokalisierungs-Leitfaden](../configuration/localisation/index.md).

## Nächste Schritte

- Passen Sie das Erscheinungsbild der Website im [Layout- & UI-Leitfaden](../configuration/layout-ui.md) an.
- Ersetzen Sie benutzerdefinierte React-Hero-Landingpages durch native [Hero-Container](../content/containers/hero.md).