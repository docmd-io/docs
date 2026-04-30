---
title: "Vorhandene Markdown-Repos"
description: "So generieren Sie aus Ihren vorhandenen Markdown-Dateien sofort eine professionelle Dokumentations-Website – ganz ohne Konfiguration."
---

## Problem

Sie verfügen über ein bestehendes Repository mit hunderten oder tausenden von Markdown-Dateien – vielleicht ein altes Wiki, ein Obsidian-Vault oder eine Sammlung technischer Notizen. Das manuelle Konvertieren von Frontmatter, das Reparieren fehlerhafter Links und das Umstrukturieren von Dateien für eine neue Engine ist eine gewaltige Aufgabe, die Teams oft davon abhält, ihre Dokumentation zu modernisieren.

## Warum es wichtig ist

Ihre Inhalte sollten portabel und tool-unabhängig bleiben. Eine hochwertige Dokumentations-Engine sollte sich an Ihre vorhandenen Dateien anpassen und nicht Ihre Dateien dazu zwingen, sich an die Engine anzupassen. Die Vermeidung von Vendor-Lock-in stellt sicher, dass Ihr geistiges Eigentum standardisiert, lesbar und zukunftssicher bleibt.

## Ansatz

`docmd` hält sich an strikte CommonMark-Spezifikationen und ist standardmäßig auf **Zero-Config** ausgelegt. Sie können die `docmd`-CLI auf ein beliebiges Verzeichnis mit Markdown-Dateien richten, und sie wird intelligent eine voll funktionsfähige Dokumentations-Website erstellen, ohne auch nur eine einzige Zeile Ihres Quellinhalts zu verändern.

## Implementierung

### 1. Sofortiges Bootstrapping

Navigieren Sie zu Ihrem vorhandenen Markdown-Ordner und starten Sie den Entwicklungsserver. `docmd` scannt Ihre Verzeichnisstruktur und erstellt sofort eine funktionale Website im Arbeitsspeicher.

```bash
cd meine-vorhandenen-docs/
npx @docmd/core dev
```

### 2. Automatische Navigation (Auto-Router)

Wenn keine `navigation.json` oder `docmd.config.js` gefunden wird, aktiviert `docmd` seinen [Auto-Router](../../configuration/navigation#automatic-sidebar-generation). Dieser bildet Ihre Ordnerstruktur rekursiv ab, verschönert Verzeichnisnamen (z. B. wird aus `getting-started` "Getting Started") und generiert automatisch eine logische Sidebar-Taxonomie.

### 3. Intelligente Titel-Ermittlung

Sie müssen nicht jeder Datei ein `title`-Frontmatter hinzufügen. `docmd` nutzt eine kaskadierende Strategie zur Ermittlung von Seitentiteln:
1.  **Frontmatter**: Prüft auf einen `title`- oder `h1`-Key.
2.  **Erste Überschrift**: Extrahiert die erste gefundene `# Überschrift` aus dem Dateiinhalt.
3.  **Dateiname**: Verschönert den Dateinamen als Fallback (z. B. wird aus `install-guide.md` "Install Guide").

### 4. Resiliente Syntax-Verarbeitung

`docmd` ist auf Resilienz ausgelegt. Wenn Ihre vorhandenen Dateien proprietäre Syntax oder veraltete Shortcodes von anderen Engines enthalten, werden diese sicher als Rohtext gerendert oder übersprungen. Dies stellt sicher, dass Ihr Build niemals aufgrund von Inhalten fehlschlägt, die Sie noch nicht migriert haben.

## Abwägungen

Automatisch generierte Sidebars werden in der Regel alphabetisch nach Dateinamen sortiert. Während Dateinamen wie `01-intro.md` und `02-setup.md` gut funktionieren, können rein beschreibende Dateinamen in einer nicht intuitiven Reihenfolge erscheinen. Für produktionsreife Websites empfehlen wir den Übergang zu einer manuellen [Navigations-Konfiguration](../../configuration/navigation), um die volle Kontrolle über die User Journey zu erhalten.
