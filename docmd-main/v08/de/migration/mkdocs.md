---
title: "Migration von MkDocs"
description: "Ein umfassender Leitfaden zur Überführung Ihres MkDocs- (oder Material for MkDocs-)Projekts zu docmd."
---

# Migration von MkDocs zu docmd

MkDocs ist ein beliebter Python-basierter Generator. docmd bietet eine ähnliche Markdown-First-Erfahrung. Es verwendet Node.js/Bun für unglaublich schnelle Builds ohne komplexe Python-Erweiterungen.

## Schritt 1: Migrations-Engine ausführen

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden MkDocs-Projekts aus:

```bash
npx @docmd/core migrate --mkdocs
```

### Was automatisch passiert

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues Verzeichnis `mkdocs-backup/` verschoben.
2.  **Content-Migration**: Ihr `docs/`-Ordner wird in das Stammverzeichnis zurückgespielt, damit docmd ihn verwenden kann.
3.  **Config-Generierung**: Eine `docmd.config.json` wird generiert, die Ihre `site_name` aus `mkdocs.yml` extrahiert.

## Schritt 2: Setup testen

Sobald der Befehl abgeschlossen ist, können Sie Ihre Inhalte in docmd in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar wird leer sein.

## Schritt 3: Manuelle Konfiguration

MkDocs verwendet `mkdocs.yml`, um Site-Navigation und Erweiterungen zu definieren. Sie müssen dieses Setup manuell für docmd übersetzen.

### 1. Navigations-Einrichtung

In MkDocs ist die Navigation streng im Schlüssel `nav` der `mkdocs.yml` definiert.

**Erforderliche Aktion:** Erstellen Sie eine `navigation.json` in Ihrem `docs/`-Ordner.

```yaml "mkdocs.yml"
nav:
  - Startseite: index.md
  - Leitfaden:
    - Einrichtung: setup.md
    - Verwendung: usage.md
```

```json "navigation.json"
[
  {
    "title": "Startseite",
    "path": "/"
  },
  {
    "title": "Leitfaden",
    "collapsible": true,
    "children": [
      { "title": "Einrichtung", "path": "/setup" },
      { "title": "Verwendung", "path": "/usage" }
    ]
  }
]
```

### 2. Python-Markdown-Erweiterungen ersetzen

Wenn Sie "Material for MkDocs" verwendet haben, haben Sie sich wahrscheinlich auf Python-Markdown-Erweiterungen für Tabs oder Admonitions verlassen.

**Erforderliche Aktion:** Konvertieren Sie MkDocs-spezifische Erweiterungs-Syntax in docmds native [Container](../content/containers/callouts.md).

#### Beispiel: Admonitions konvertieren

**MkDocs (PyMdown):**
```markdown
!!! note "Optionaler Titel"
    Dies ist ein Admonition-Inhaltsblock.
```

::: callout warning "Manuelle Konvertierung erforderlich"
MkDocs verwendet `!!!`-Syntax für Admonitions, die sich von docmds `:::`-Syntax unterscheidet. Sie müssen diese manuell konvertieren oder ein Suchen-und-Ersetzen-Tool verwenden.

**Mapping:**
- `!!! note` → `::: callout info` oder `:::note`
- `!!! tip` → `::: callout tip` oder `:::tip`
- `!!! warning` → `::: callout warning` oder `:::warning`
- `!!! danger` → `::: callout danger` oder `:::danger`
- `!!! example` → `::: callout info`
:::

**docmd:**
```markdown
::: callout info "Optionaler Titel"
Dies ist ein Admonition-Inhaltsblock.
:::
```

#### Beispiel: Tabs konvertieren

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

## Nächste Schritte

- docmd hat eine native Suche. Sie müssen kein Such-Plugin konfigurieren.
- Erkunden Sie die [Theming-Optionen](../theming/customisation.md), um Farben an Ihr altes Material-Theme anzupassen.