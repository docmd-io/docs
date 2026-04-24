---
title: "Von MkDocs migrieren"
description: "Ein umfassender Leitfaden zur Migration Ihres MkDocs- (oder Material for MkDocs)-Projekts zu docmd."
---

# Von MkDocs migrieren

MkDocs, insbesondere in Kombination mit dem Material-Theme, ist ein beliebter Python-basierter Dokumentationsgenerator. `docmd` bietet eine ähnliche, auf Markdown fokussierte Erfahrung, verwendet jedoch Node.js/Bun für extrem schnelle Builds und bietet umfangreiche interaktive Funktionen, ohne dass komplexe Python-Erweiterungen erforderlich sind.

## Schritt 1: Führen Sie die Migrations-Engine aus

Führen Sie den folgenden Befehl im Hauptverzeichnis Ihres bestehenden MkDocs-Projekts aus (dort, wo sich Ihre `mkdocs.yml` befindet):

```bash
npx @docmd/core migrate --mkdocs
```

### Was passiert automatisch

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues `mkdocs-backup/`-Verzeichnis verschoben.
2.  **Inhaltsmigration**: Ihr `docs/`-Ordner wird im Stammverzeichnis wiederhergestellt, damit `docmd` ihn verwenden kann.
3.  **Konfigurationsgenerierung**: Eine `docmd.config.js` wird generiert, die den `site_name` Ihrer Website aus Ihrer `mkdocs.yml` extrahiert.

## Schritt 2: Testen Sie das Setup

Sobald der Befehl abgeschlossen ist, können Sie Ihre Inhalte in `docmd` in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar bleibt zunächst leer.

## Schritt 3: Manuelle Konfiguration

MkDocs verwendet die `mkdocs.yml`, um die Navigation und die Erweiterungen der Website zu definieren. Sie müssen diese Einrichtung auf `docmd` übertragen.

### 1. Navigations-Setup

In MkDocs wird die Navigation streng unter dem Schlüssel `nav` in der `mkdocs.yml` definiert.

**Aktion erforderlich:** Sie müssen eine `navigation.json` in Ihrem `docs/`-Ordner erstellen.

**MkDocs (`mkdocs.yml`):**
```yaml
nav:
  - Home: index.md
  - Guide:
    - Setup: setup.md
    - Usage: usage.md
```

**docmd (`navigation.json`):**
```json
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

### 2. Python-Markdown-Erweiterungen ersetzen

Wenn Sie "Material for MkDocs" verwendet haben, haben Sie sich wahrscheinlich auf Python-Markdown-Erweiterungen wie PyMdown Extensions für Tabs, Admonitions oder Aufgabenlisten verlassen.

**Aktion erforderlich:** Konvertieren Sie die MkDocs-spezifische Erweiterungssyntax in die nativen [Container](/content/containers/callouts) von `docmd`.

#### Beispiel: Admonitions (Callouts) konvertieren

**MkDocs (PyMdown):**
```markdown
!!! note "Optional Title"
    This is an admonition content block.
```

**docmd:**
```markdown
::: note "Optional Title"
This is an admonition content block.
:::
```

#### Beispiel: Tabs konvertieren

**MkDocs (SuperFences):**
```markdown
=== "Tab 1"
    Content for tab 1.

=== "Tab 2"
    Content for tab 2.
```

**docmd:**
```markdown
::: tabs
== tab "Tab 1"
Content for tab 1.

== tab "Tab 2"
Content for tab 2.
:::
```

## Nächste Schritte

- `docmd` verfügt über eine native Suchfunktion. Sie müssen kein zusätzliches Such-Plugin konfigurieren.
- Entdecken Sie die [Theme-Optionen](/theming/customization), um die Farben Ihrer Website an Ihr altes Material-Theme anzupassen.
