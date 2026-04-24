---
title: "Von Docusaurus migrieren"
description: "Ein umfassender Leitfaden zur Migration Ihres Docusaurus v2/v3-Projekts zu docmd."
---

# Von Docusaurus migrieren

Docusaurus ist ein beliebtes Dokumentations-Framework, das auf React basiert. `docmd` bietet eine schnelle, konfigurationsfreie Alternative, die wesentlich schneller kompiliert und keine React-Komponenten erfordert, um umfangreiche Funktionen zu rendern.

## Schritt 1: Führen Sie die Migrations-Engine aus

Führen Sie den folgenden Befehl im Hauptverzeichnis Ihres bestehenden Docusaurus-Projekts aus (dort, wo sich Ihre `docusaurus.config.js` oder `docusaurus.config.ts` befindet):

```bash
npx @docmd/core migrate --docusaurus
```

### Was passiert automatisch

1.  **Backup**: Ihr gesamtes Projekt (mit Ausnahme von `node_modules` und `.git`) wird sicher in ein neues `docusaurus-backup/`-Verzeichnis verschoben.
2.  **Inhaltsmigration**: Ihr `docs/`-Ordner wird im Stammverzeichnis wiederhergestellt, damit `docmd` ihn verwenden kann.
3.  **Konfigurationsgenerierung**: Eine `docmd.config.js` wird generiert, die Ihren Website-`title` aus Ihrer Docusaurus-Konfiguration extrahiert.

## Schritt 2: Testen Sie das Setup

Sobald der Befehl abgeschlossen ist, können Sie Ihre Markdown-Inhalte sofort in `docmd` in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar bleibt zunächst leer.

## Schritt 3: Manuelle Konfiguration

Docusaurus verfügt über komplexe programmatische Konfigurationen, die `docmd` nicht zu erraten versucht. Diese müssen Sie manuell zuordnen.

### 1. Navigations-Setup

Docusaurus-Sidebars werden häufig automatisch generiert oder in der `sidebars.js` konfiguriert.

**Aktion erforderlich:** Erstellen Sie eine `navigation.json` in Ihrem neuen `docs/`-Verzeichnis, um Ihre `docmd`-Sidebar zu strukturieren. Weitere Informationen finden Sie im [Navigations-Leitfaden](/configuration/navigation).

### 2. MDX-Komponenten ersetzen

Docusaurus verlässt sich stark auf MDX (`.mdx`), um benutzerdefinierte React-Komponenten (wie Tabs, Admonitions oder benutzerdefinierte UI-Elemente) darzustellen. `docmd` wird rein über Markdown gesteuert und verwendet kein React.

**Aktion erforderlich:** Sie müssen alle benutzerdefinierten `<MyReactComponent />`-Tags in Standard-Markdown konvertieren oder die nativen [Container](/content/containers/callouts) von `docmd` verwenden.

#### Beispiel: Admonitions (Callouts) konvertieren

**Docusaurus:**
```markdown
:::tip My Tip
This is a helpful tip.
:::
```

**docmd:** (Keine Änderung erforderlich! `docmd` unterstützt von Haus aus Admonitions im Docusaurus-Stil als Callouts).
```markdown
::: tip "My Tip"
This is a helpful tip.
:::
```

#### Beispiel: Tabs konvertieren

**Docusaurus:**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple.
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange.
  </TabItem>
</Tabs>
```

**docmd:** (Konvertieren in die native `docmd`-Tab-Container-Syntax)
```markdown
::: tabs
== tab "Apple"
This is an apple.

== tab "Orange"
This is an orange.
:::
```

### 3. Lokalisierung (i18n)

Wenn Sie die `i18n`-Funktionen von Docusaurus verwendet haben, befanden sich Ihre übersetzten Dateien wahrscheinlich in `i18n/locale/docusaurus-plugin-content-docs/current/`.

**Aktion erforderlich:** Verschieben Sie diese Dateien in die Verzeichnisstruktur von `docmd` (`docs/en/`, `docs/de/` usw.) und konfigurieren Sie die Sprachen in der `docmd.config.js`. Weitere Informationen finden Sie im [Lokalisierungs-Leitfaden](/configuration/localisation).

## Nächste Schritte

- Entdecken Sie die [Layout & UI](/configuration/layout-ui)-Einstellungen, um Ihr Docusaurus-Theme nachzubilden.
- Konvertieren Sie React-basierte Hero-Header in `docmd` [Hero-Container](/content/containers/hero).
