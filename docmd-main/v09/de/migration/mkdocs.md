---
title: "Migration von MkDocs"
description: "Ein umfassender Leitfaden zur Überführung Ihres MkDocs- (oder Material for MkDocs-)Projekts zu docmd."
---

MkDocs ist ein Python-basierter statischer Website-Generator. `docmd` bietet ein schnelles, Markdown-fokussiertes Erlebnis auf Basis von Node.js/Bun ohne komplexe virtuelle Python-Umgebungen oder zusätzliche Pip-Abhängigkeiten.

::: steps

### 1. Ausführen der Migrations-Engine

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden MkDocs-Projekts aus:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --mkdocs
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --mkdocs
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --mkdocs
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --mkdocs
```
:::

#### Was automatisch passiert

::: steps

1. **Backup**: Ihr gesamtes Projektverzeichnis (ausgenommen `node_modules`, `.git`, `package.json` und Lockfiles) wird sicher in ein neues `mkdocs-backup/`-Verzeichnis gesichert.
2. **Inhalts-Migration**: Ihr `docs/`-Ordner wird im Stammverzeichnis zur Verwendung durch `docmd` wiederhergestellt.
3. **Konfigurations-Generierung**: Eine `docmd.config.json` wird generiert, die Ihren `site_name` und `site_dir` aus `mkdocs.yml` extrahiert.
4. **Automatische Navigations-Übersetzung**: Der `nav:`-Block auf oberster Ebene in `mkdocs.yml` wird geparst und in das `navigation`-Array-Format von `docmd` (einschließlich verschachtelter `children`) übersetzt.

:::

### 2. Vorschau der Migrations-Ausgabe

Zeigen Sie Ihre Inhalte sofort in `docmd` an:

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

### 3. Manuelle Konfiguration & Erweiterungs-Zuordnung

MkDocs verwendet `mkdocs.yml`, um die Navigationsstruktur und PyMdown-Erweiterungen zu definieren. Übersetzen Sie jedes benutzerdefinierte Setup in `docmd`-Container.

#### Navigations-Einrichtung

`nav:`-Blöcke auf oberster Ebene in `mkdocs.yml` werden automatisch in das `navigation`-Array von `docmd` übersetzt. Wenn Sie erweiterte Navigationsfunktionen benötigen (z. B. benutzerdefinierte Icons oder externe URLs), erstellen Sie eine `navigation.json` in Ihrem `docs/`-Ordner:

```yaml "mkdocs.yml"
nav:
  - Home: index.md
  - Guide:
    - Setup: setup.md
    - Usage: usage.md
```

```json "navigation.json"
[
  {
    "title": "Home",
    "path": "/"
  },
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/setup" },
      { "title": "Usage", "path": "/usage" }
    ]
  }
]
```

#### Ersetzen von Python-Markdown-Erweiterungen

Konvertieren Sie die MkDocs PyMdown-Erweiterungssyntax in die nativen [Container](../content/containers/callouts.md) von `docmd`.

##### Konvertierung von Admonitions

MkDocs verwendet die `!!!`-Block-Syntax, die eine Konvertierung in das `:::`-Format erfordert.

**MkDocs (PyMdown):**
```markdown
!!! note "Optionaler Titel"
    Dies ist ein Admonition-Inhaltsblock.
```

**docmd:**
```markdown
::: callout info "Optionaler Titel"
Dies ist ein Admonition-Inhaltsblock.
:::
```

##### Konvertierung von Tabs

**MkDocs (SuperFences):**
```markdown
=== "Tab 1"
    Inhalt für Tab 1.

=== "Tab 2"
    Inhalt für Tab 2.
```

**docmd:**
```markdown
::: tabs
== tab "Tab 1"
Inhalt für Tab 1.

== tab "Tab 2"
Inhalt für Tab 2.
:::
```

:::

## Nächste Schritte

- `docmd` verfügt über eine integrierte Suche. Es sind keine zusätzlichen Such-Plugins oder externen Indexierer erforderlich.
- Erkunden Sie die [Theming-Optionen](../theming/customisation.md), um Farben und Branding an Ihr vorheriges Theme anzupassen.