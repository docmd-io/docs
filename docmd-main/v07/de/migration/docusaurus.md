---
title: "Migration von Docusaurus"
description: "Ein umfassender Leitfaden zum Umzug Ihres Docusaurus v2/v3-Projekts zu docmd."
---

# Migration von Docusaurus zu docmd

Docusaurus ist ein beliebtes Dokumentations-Framework, das auf React basiert. `docmd` bietet eine schnelle, konfigurationsfreie Alternative, die deutlich schneller kompiliert und keine React-Komponenten benötigt, um umfangreiche Funktionen zu rendern.

## Schritt 1: Ausführen der Migration-Engine

Führen Sie den folgenden Befehl im Root-Verzeichnis Ihres bestehenden Docusaurus-Projekts aus (dort, wo sich Ihre `docusaurus.config.js` oder `docusaurus.config.ts` befindet):

```bash
npx @docmd/core migrate --docusaurus
```

### Was automatisch passiert

1.  **Backup**: Ihr gesamtes Projekt (außer `node_modules` und `.git`) wird sicher in ein neues Verzeichnis `docusaurus-backup/` verschoben.
2.  **Inhaltsmigration**: Ihr `docs/`-Ordner wird im Root-Verzeichnis wiederhergestellt, damit `docmd` ihn verwenden kann.
3.  **Konfigurationserstellung**: Eine `docmd.config.js` wird generiert, wobei der Seitentitel (`title`) aus Ihrer Docusaurus-Konfiguration extrahiert wird.

## Schritt 2: Testen des Setups

Sobald der Befehl abgeschlossen ist, können Sie Ihre Markdown-Inhalte sofort in `docmd` in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Seitenleiste wird leer sein.

## Schritt 3: Manuelle Konfiguration

Docusaurus verfügt über komplexe programmatische Konfigurationen, die `docmd` nicht zu erraten versucht. Diese müssen Sie manuell zuordnen.

### 1. Navigations-Setup

Docusaurus-Seitenleisten werden oft automatisch generiert oder in `sidebars.js` konfiguriert.

**Erforderliche Aktion:** Erstellen Sie eine `navigation.json` in Ihrem neuen `docs/`-Verzeichnis, um Ihre `docmd`-Seitenleiste zu strukturieren. Siehe den [Leitfaden zur Navigation](../configuration/navigation.md).

### 2. Ersetzen von MDX-Komponenten

Docusaurus stützt sich stark auf MDX (`.mdx`), um benutzerdefinierte React-Komponenten (wie Tabs, Admonitions oder benutzerdefinierte UI-Elemente) zu rendern. `docmd` wird rein über Markdown gesteuert und verwendet kein React.

**Erforderliche Aktion:** Sie müssen alle benutzerdefinierten `<MyReactComponent />`-Tags in Standard-Markdown umwandeln oder die nativen [Container](../content/containers/callouts.md) von `docmd` verwenden.

#### Beispiel: Umwandeln von Admonitions (Hinweisen)

**Docusaurus:**
```markdown
:::tip Mein Tipp
Dies ist ein hilfreicher Tipp.
:::
```

**docmd:** (Die Lernkurve ist fast bei Null, außer einigen geänderten Schlüsselwörtern für eine bessere Benutzererfahrung. `docmd` unterstützt nativ Admonitions im Docusaurus-Stil als Callouts).
```markdown
::: callout tip "Mein Tipp"
Dies ist ein hilfreicher Tipp.
:::
```

#### Beispiel: Umwandeln von Tabs

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

**docmd:** (Umwandlung in die native `docmd`-Tabs-Container-Syntax)
```markdown
::: tabs
== tab "Apple"
Dies ist ein Apfel.

== tab "Orange"
Dies ist eine Orange.
:::
```

### 3. Lokalisierung (i18n)

Wenn Sie die `i18n`-Funktionen von Docusaurus verwendet haben, befanden sich Ihre übersetzten Dateien wahrscheinlich in `i18n/locale/docusaurus-plugin-content-docs/current/`.

**Erforderliche Aktion:** Verschieben Sie diese Dateien in die Verzeichnisstruktur von `docmd` (`docs/en/`, `docs/de/` usw.) und konfigurieren Sie die Locales in der `docmd.config.js`. Siehe den [Leitfaden zur Lokalisierung](../configuration/localisation/index.md).

## Nächste Schritte

- Entdecken Sie die Einstellungen für [Layout & UI](../configuration/layout-ui.md), um Ihr Docusaurus-Theme anzupassen.
- Wandeln Sie React-basierte Hero-Header in `docmd` [Hero-Container](../content/containers/hero.md) um.
