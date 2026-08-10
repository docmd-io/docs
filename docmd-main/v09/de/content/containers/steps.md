---
title: "Schritte (Steps)"
description: "Wandeln Sie nummerierte Schritte und geordnete Listen in ansprechende visuelle Zeitleisten und Tutorials in docmd um."
---

Der `steps`-Container verwandelt aufeinanderfolgende Anweisungen in nummerierte vertikale Zeitleisten mit Hover-Permalinks. Er ist für technische Tutorials und Schritt-für-Schritt-Anleitungen konzipiert.

## Container-Syntax

```markdown
::: steps # Äußerer sequentieller Zeitleisten-Container Öffner
::: step [title:"Schritt-Überschrift"] # Einzelner Schritt Öffner
Inhalt für Schritt 1 (Markdown-Text, Code-Blöcke, Hinweisfelder, Bilder)...
::: /step # Expliziter Schritt-Schließer

::: step [title:"Schritt 2 Überschrift"] # Zweiter Schritt Öffner
Inhalt für Schritt 2...
::: /step
::: /steps # Expliziter Zeitleisten-Schließer
```

## Funktionen & Unterstützte Attribute

| Parameter / Element | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Schritt-Titel** | `"String"` \| `title:"..."` | Überschriftentext am Kopf jedes Zeitleistenknotens (1. Parameter oder `title:"..."`). |
| **Zeitleistenknoten** | Automatisch | Jeder `::: step`-Block inkrementiert den Schrittindex automatisch (1, 2, 3...). |
| **Sub-Container** | `::: step` ... `::: /step` | Explizite Schritt-Wrapper. Alte Listen-Syntax (`1.`, `2.`) wird ebenfalls unterstützt. |
| **Schließ-Tags** | `::: /steps`, `::: /step`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Anwendungsbeispiele

### Grundlegende Workflow-Sequenz

Eine einfache Sequenz für Developer-Onboarding-Aufgaben mit expliziten `::: step`-Containern:

```markdown
::: steps # Onboarding-Workflow
::: step "Projekt initialisieren" # Schritt 1
Führen Sie `npx @docmd/core init` aus, um Ihre Verzeichnisstruktur zu erstellen.
::: /step

::: step "Inhalte verfassen" # Schritt 2
Schreiben Sie Dokumentationen in Standard-Markdown-Dateien.
::: /step

::: step "Bauen & Bereitstellen" # Schritt 3
Führen Sie `npx @docmd/core build` aus, um die Produktionsausgabe zu kompilieren.
::: /step
::: /steps
```

::: steps # Onboarding-Workflow
::: step "Projekt initialisieren" # Schritt 1
Führen Sie `npx @docmd/core init` aus, um Ihre Verzeichnisstruktur zu erstellen.
::: /step

::: step "Inhalte verfassen" # Schritt 2
Schreiben Sie Dokumentationen in Standard-Markdown-Dateien.
::: /step

::: step "Bauen & Bereitstellen" # Schritt 3
Führen Sie `npx @docmd/core build` aus, um die Produktionsausgabe zu kompilieren.
::: /step
::: /steps

::: callout note "Legacy-Listen-Syntax" icon:archive
Bestehende Dokumentationen mit geordneten Listen (`1.`, `2.`) werden weiterhin nahtlos verarbeitet:

```markdown
::: steps
1.  **Umgebung konfigurieren**
    Definieren Sie Optionen in `docmd.config.json`.
::: /steps
```
:::