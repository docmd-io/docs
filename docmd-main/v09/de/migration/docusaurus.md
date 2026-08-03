---
title: "Migration von Docusaurus"
description: "Ein umfassender Leitfaden zur Überführung Ihres Docusaurus v2/v3-Projekts zu docmd."
---

# Migration von Docusaurus zu docmd

Docusaurus ist ein beliebtes React-basiertes Dokumentations-Framework. docmd bietet eine schnelle, Zero-Config-Alternative. Es kompiliert deutlich schneller und benötigt keine React-Komponenten, um reichhaltige Features zu rendern.

## Schritt 1: Migrations-Engine ausführen

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden Docusaurus-Projekts aus:

```bash
npx @docmd/core migrate --docusaurus
```

### Was automatisch passiert

1.  **Backup**: Ihr gesamtes Projekt (außer `node_modules` und `.git`) wird sicher in ein neues Verzeichnis `docusaurus-backup/` verschoben.
2.  **Content-Migration**: Ihr `docs/`-Ordner wird in das Stammverzeichnis zurückgespielt, damit docmd ihn verwenden kann.
3.  **Config-Generierung**: Eine `docmd.config.json` wird generiert, die den `title` Ihrer Site aus Ihrer Docusaurus-Konfiguration extrahiert.

## Schritt 2: Setup testen

Sobald der Befehl abgeschlossen ist, können Sie Ihre Markdown-Inhalte sofort in docmd in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar wird leer sein.

## Schritt 3: Manuelle Konfiguration

Docusaurus hat komplexe programmatische Konfigurationen, die docmd nicht zu erraten versucht. Sie müssen diese manuell zuordnen.

### 1. Navigations-Einrichtung

Docusaurus-Sidebars werden häufig automatisch generiert oder in `sidebars.js` konfiguriert.

**Erforderliche Aktion:** Erstellen Sie eine `navigation.json` in Ihrem neuen `docs/`-Verzeichnis, um Ihre docmd-Sidebar zu strukturieren. Siehe den [Navigations-Leitfaden](../configuration/navigation.md).

### 2. MDX-Komponenten ersetzen

Docusaurus stützt sich stark auf MDX (`.mdx`), um benutzerdefinierte React-Komponenten zu rendern. docmd ist rein Markdown-getrieben und verwendet kein React.

**Erforderliche Aktion:** Konvertieren Sie alle benutzerdefinierten `<MyReactComponent />`-Tags in Standard-Markdown oder verwenden Sie docmds native [Container](../content/containers/callouts.md).

#### Beispiel: Admonitions konvertieren

**Docusaurus:**
```markdown
:::tip Mein Tipp
Dies ist ein hilfreicher Tipp.
:::
```

::: callout success "Keine Änderungen erforderlich"
Docusaurus-Admonition-Syntax funktioniert **ohne jede Modifikation**. Die folgenden Aliase werden vollständig unterstützt:
- `:::note` → rendert als `callout info`
- `:::tip` → rendert als `callout tip`
- `:::info` → rendert als `callout info`
- `:::caution` → rendert als `callout warning`
- `:::danger` → rendert als `callout danger`

Auch die spacing-freie Syntax wird unterstützt. Ihre bestehenden Docusaurus-Admonitions werden in docmd ohne Änderungen korrekt gerendert.
:::

**docmd native Syntax** (optional, bietet mehr Features wie benutzerdefinierte Icons):
```markdown
::: callout tip "Mein Tipp"
Dies ist ein hilfreicher Tipp.
:::
```

#### Beispiel: Tabs konvertieren

**Docusaurus:**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    Dies ist ein Apfel.
  </TabItem>
  <TabItem value="orange" label="Orange">
    Dies ist eine Orange.
  </TabItem>
</Tabs>
```

**docmd:** (in native docmd-Tabs-Container-Syntax konvertieren)
```markdown
::: tabs
== tab "Apfel"
Dies ist ein Apfel.

== tab "Orange"
Dies ist eine Orange.
:::
```

### 3. Lokalisierung (i18n)

Wenn Sie Docusaurus's `i18n`-Features verwendet haben, befanden sich Ihre übersetzten Dateien wahrscheinlich in `i18n/locale/docusaurus-plugin-content-docs/current/`.

**Erforderliche Aktion:** Verschieben Sie diese Dateien in docmds Verzeichnisstruktur (`docs/en/`, `docs/es/` usw.) und konfigurieren Sie die Locales in `docmd.config.json`. Siehe [Lokalisierungs-Leitfaden](../configuration/localisation/index.md).

## Nächste Schritte

- Erkunden Sie die [Layout & UI](../configuration/layout-ui.md)-Einstellungen, um zu Ihrem Docusaurus-Theme zu passen.
- Konvertieren Sie React-basierte Hero-Header in docmd [Hero-Container](../content/containers/hero.md).