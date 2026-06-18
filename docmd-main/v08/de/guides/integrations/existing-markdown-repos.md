---
title: "Bestehende Markdown-Repositories"
description: "Wie Sie aus Ihren bestehenden Markdown-Dateien sofort eine professionelle Dokumentations-Site mit Zero Configuration generieren."
---

## Problem

Sie haben ein etabliertes Repository mit Hunderten roher Markdown-Dateien — vielleicht ein Legacy-Wiki, ein Obsidian-Vault oder technische Notizen. Frontmatter manuell zu konvertieren, defekte Links zu reparieren und Dateien für eine neue Engine umzustrukturieren ist eine schwierige Aufgabe, die Modernisierung häufig verhindert.

## Warum es wichtig ist

Ihre Inhalte sollten portabel und tool-agnostisch bleiben. Eine hochwertige Dokumentations-Engine passt sich an Ihre bestehenden Dateien an, statt Dateien zur Engine zwingen. Vendor-Lock-in zu vermeiden stellt sicher, dass Ihr geistiges Eigentum standardisiert, lesbar und zukunftssicher bleibt.

## Ansatz

docmd hält sich strikt an die CommonMark-Spezifikation und ist standardmäßig auf **Zero-Config** ausgelegt. Zeigen Sie das docmd-CLI auf ein beliebiges Verzeichnis mit Markdown-Dateien, und es bootet intelligent eine voll funktionsfähige Dokumentations-Site, ohne eine einzige Zeile Quellinhalt zu verändern.

## Implementierung

### 1. Sofortiges Bootstrapping

Navigieren Sie zu Ihrem bestehenden Markdown-Ordner und starten Sie den Development-Server. docmd scannt Ihre Verzeichnisstruktur und baut sofort eine funktionale Site im Speicher.

```bash
cd my-existing-docs/
npx @docmd/core dev
```

### 2. Automatische Navigation (Auto-Router)

Wird keine `navigation.json` oder `docmd.config.json` gefunden, löst docmd seinen [Auto-Router](../../configuration/navigation.md#automatic-sidebar-generation) aus. Er kartiert rekursiv Ihre Ordnerstruktur, verschönert Verzeichnisnamen (z. B. wird `getting-started` zu `Getting Started`) und generiert automatisch eine logische Sidebar-Taxonomie.

### 3. Intelligente Titel-Ableitung

Sie müssen nicht in jeder Datei `title`-Frontmatter hinzufügen. docmd verwendet eine kaskadierende Auflösungsstrategie, um Seitentitel zu bestimmen:
1.  **Frontmatter**: Prüft auf einen Schlüssel `title` oder `h1`.
2.  **Erste Überschrift**: Extrahiert die erste im Dateiinhalt gefundene `# Heading`.
3.  **Dateiname**: Verschiebt den Dateinamen als Fallback (z. B. wird `install-guide.md` zu `Install Guide`).

### 4. Robuste Syntax-Verarbeitung

docmd ist auf Robustheit ausgelegt. Enthalten bestehende Dateien proprietäre Syntax oder Legacy-Shortcodes anderer Engines, werden sie sicher als Rohtext gerendert oder übersprungen. Das stellt sicher, dass Ihr Build niemals aufgrund nicht migrierter Inhalte fehlschlägt.

## Abwägungen

Automatische Sidebars werden typischerweise alphabetisch nach Dateiname sortiert. Während Dateinamen wie `01-intro.md` und `02-setup.md` gut funktionieren, können beschreibende Dateinamen in unintuitiver Reihenfolge erscheinen. Für produktionsreife Sites empfehlen wir den Übergang zur manuellen [Navigationskonfiguration](../../configuration/navigation.md), um die User Journey vollständig zu kontrollieren.
