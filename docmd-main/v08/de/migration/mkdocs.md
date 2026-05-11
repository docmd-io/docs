---
title: "Migration von MkDocs"
description: "Ein umfassender Leitfaden zum Umzug Ihres MkDocs- (oder Material for MkDocs-) Projekts zu docmd."
---

# Migration von MkDocs zu docmd

MkDocs, insbesondere mit dem Material-Theme, ist ein beliebter Python-basierter Dokumentationsgenerator. `docmd` bietet eine ähnliche Markdown-First-Erfahrung, setzt jedoch auf Node.js/Bun für unglaublich schnelle Builds und reichhaltige interaktive Funktionen, ohne dass komplexe Python-Erweiterungen erforderlich sind.

## Schritt 1: Ausführen der Migration-Engine

Führen Sie den folgenden Befehl im Root-Verzeichnis Ihres bestehenden MkDocs-Projekts aus (dort, wo sich Ihre `mkdocs.yml` befindet):

```bash
npx @docmd/core migrate --mkdocs
```

### Was automatisch passiert

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues Verzeichnis `mkdocs-backup/` verschoben.
2.  **Inhaltsmigration**: Ihr `docs/`-Ordner wird im Root-Verzeichnis wiederhergestellt, damit `docmd` ihn verwenden kann.
3.  **Konfigurationserstellung**: Eine `docmd.config.js` wird generiert, wobei der Projektname (`site_name`) aus Ihrer `mkdocs.yml` extrahiert wird.

## Schritt 2: Testen des Setups

Sobald der Befehl abgeschlossen ist, zeigen Sie Ihre Inhalte in `docmd` in der Vorschau an:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Seitenleiste wird leer sein.

## Schritt 3: Manuelle Konfiguration

MkDocs verwendet die `mkdocs.yml`, um die Navigation und Erweiterungen der Website zu definieren. Sie müssen dieses Setup auf `docmd` übertragen.

### 1. Navigations-Setup

In MkDocs wird die Navigation strikt im Schlüssel `nav` der `mkdocs.yml` definiert.

**Erforderliche Aktion:** Sie müssen eine `navigation.json` in Ihrem `docs/`-Ordner erstellen.

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
    "title": "Startseite",
    "path": "/"
  },
  {
    "title": "Leitfaden",
    "collapsible": true,
    "children": [
      { "title": "Einrichtung", "path": "/setup" },
      { "title": "Nutzung", "path": "/usage" }
    ]
  }
]
```

### 2. Ersetzen von Python-Markdown-Erweiterungen

Wenn Sie "Material for MkDocs" verwendet haben, haben Sie sich wahrscheinlich auf Python-Markdown-Erweiterungen wie PyMdown Extensions für Tabs, Admonitions oder Aufgabenlisten verlassen.

**Erforderliche Aktion:** Wandeln Sie die MkDocs-spezifische Erweiterungssyntax in die nativen [Container](../content/containers/callouts.md) von `docmd` um.

#### Beispiel: Umwandeln von Admonitions (Hinweisen)

**MkDocs (PyMdown):**
```markdown
!!! note "Optionaler Titel"
    Dies ist ein Inhaltsblock für einen Hinweis.
```

**docmd:**
```markdown
::: callout info "Optionaler Titel"
Dies ist ein Inhaltsblock für einen Hinweis.
:::
```

#### Beispiel: Umwandeln von Tabs

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

- `docmd` verfügt über eine integrierte Suche. Sie müssen kein Such-Plugin konfigurieren.
- Entdecken Sie die [Theme-Optionen](../theming/customization.md), um die Farben Ihrer Website an Ihr altes Material-Theme anzupassen.
