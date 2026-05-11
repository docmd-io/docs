---
title: "Schritte (Steps)"
description: "Verwandeln Sie standardmäßige geordnete Listen in visuell ansprechende Zeitachsen und Tutorials."
---

Der Container `steps` wurde speziell für Anleitungen ("How-to") und technische Tutorials entwickelt. Er verwandelt eine standardmäßige geordnete Markdown-Liste in eine elegante, nummerierte vertikale Zeitachse mit automatischer Beabstandung und visueller Hervorhebung.

## Syntax

Umschließen Sie jede standardmäßige geordnete Liste mit einem `::: steps`-Block.

```markdown
::: steps

1.  **Projekt initialisieren**
    Führen Sie den Befehl `docmd init` aus, um Ihr Verzeichnis zu erstellen.

2.  **Inhalte verfassen**
    Schreiben Sie Ihre Dokumentation in standardmäßigen Markdown-Dateien.

3.  **Erstellen & Bereitstellen**
    Generieren Sie statische Assets mit `docmd build`.

:::
```

## Detaillierte Implementierung

Die `steps`-Komponente unterstützt reichhaltige Markdown-Inhalte innerhalb jedes Elements, einschließlich Code-Blöcken, Bildern und verschachtelten Containern.

```markdown
::: steps

1.  **Produktions-Build generieren**
    Führen Sie den Build-Befehl aus, um eine hochoptimierte statische Website zu erstellen.
    ```bash
    docmd build
    ```

2.  **Asset-Integrität prüfen**
    Untersuchen Sie das Verzeichnis `site/`, um sicherzustellen, dass alle Assets korrekt kompiliert wurden.

3.  **Infrastruktur-Deployment**
    Synchronisieren Sie das Verzeichnis `site/` mit Ihrem bevorzugten Hosting-Anbieter (z. B. S3, Cloudflare Pages oder Vercel).

:::
```

::: steps

1.  **Produktions-Build generieren**
    Führen Sie den Build-Befehl aus, um eine hochoptimierte statische Website zu erstellen.
    ```bash
    docmd build
    ```

2.  **Asset-Integrität prüfen**
    Untersuchen Sie das Verzeichnis `site/`, um sicherzustellen, dass alle Assets korrekt kompiliert wurden.

3.  **Infrastruktur-Deployment**
    Synchronisieren Sie das Verzeichnis `site/` mit Ihrem bevorzugten Hosting-Anbieter (z. B. S3, Cloudflare Pages oder Vercel).

:::

## Fortgeschrittene Verschachtelung

Sie können andere Dokumentationskomponenten (wie **Callouts** oder **Buttons**) innerhalb eines Schritts verschachteln, ohne den chronologischen Fluss der Sequenz zu unterbrechen.

```markdown
::: steps

1.  **Umgebung konfigurieren**
    Definieren Sie Ihre projektspezifischen Variablen in der `docmd.config.js`.

    ::: callout tip
    Verwenden Sie `defineConfig`, um die IDE-Autovervollständigung für Konfigurationsschlüssel zu aktivieren.
    :::

2.  **Schema validieren**
    Führen Sie `docmd verify` aus, um sicherzustellen, dass Ihre Konfiguration strukturell einwandfrei ist.

:::
```

::: callout tip "Workflow-Optimierung"
Moderne KI-Modelle interpretieren den `steps`-Container als hochwertiges Signal für **sequenzielle Workflows**. Um die KI-Genauigkeit im `llms-full.txt`-Kontext zu maximieren, sollten Sie Ihre Listenelemente immer mit einem **fetten Titel** beginnen. Dies ermöglicht es Agenten, das Ziel jedes Schritts zuverlässig zu analysieren, bevor sie die Implementierungsdetails verarbeiten.
:::