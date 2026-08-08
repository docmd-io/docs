---
title: "Schritte (Steps)"
description: "Wandeln Sie standardmäßige geordnete Listen in visuell wirkungsvolle Zeitachsen und Tutorials in docmd um."
---

Der `steps`-Container verwandelt standardmäßige geordnete Markdown-Listen in nummerierte vertikale Zeitachsen mit Hover-Permalinks. Er wurde für technische Tutorials und sequenzielle How-To-Anleitungen entwickelt.

::: callout info "Unterstützung leerzeichenloser Syntax" icon:info
Sowohl die Syntax `::: steps` als auch `:::steps` (ohne Leerzeichen) werden identisch gerendert. Wählen Sie den Stil, der am besten zu Ihrem Erstellungs-Workflow passt.
:::

## Syntax-Referenz

```markdown
::: steps

1.  **Schritt-Titel**
    Der Beschreibungstext des Schritts wird hier platziert.

2.  **Nächster Schritt-Titel**
    Fahren Sie mit der Sequenz fort.

:::
```

| Komponente | Beschreibung |
| :--- | :--- |
| **`::: steps`** | Übergeordneter Container, der untergeordnete Elemente einer geordneten Liste in eine nummerierte Zeitachse umwandelt. |
| **`1. `** | Standardmäßiges Element einer geordneten Markdown-Liste. Heben Sie die erste Zeile jedes Eintrags fett hervor, um einen Schritt-Titel zu erstellen. |

## Anwendungsbeispiele

### Grundlegende Workflow-Sequenz

Eine einfache Sequenz für typische Entwickler-Onboarding-Aufgaben:

```markdown
::: steps

1.  **Projekt initialisieren**
    Führen Sie `npx @docmd/core init` aus, um Ihre Verzeichnisstruktur aufzubauen.

2.  **Inhalt verfassen**
    Schreiben Sie Dokumentationen mit standardmäßigen Markdown-Dateien.

3.  **Erstellen & Bereitstellen**
    Führen Sie `npx @docmd/core build` aus, um statische Produktionsausgaben zu kompilieren.

:::
```

::: steps

1.  **Projekt initialisieren**
    Führen Sie `npx @docmd/core init` aus, um Ihre Verzeichnisstruktur aufzubauen.

2.  **Inhalt verfassen**
    Schreiben Sie Dokumentationen mit standardmäßigen Markdown-Dateien.

3.  **Erstellen & Bereitstellen**
    Führen Sie `npx @docmd/core build` aus, um statische Produktionsausgaben zu kompilieren.

:::

### Schritte mit reichhaltigem eingebettetem Inhalt

Schritte unterstützen eingebettete Codeblöcke, Callout-Warnungen und andere verschachtelte Container:

```markdown
::: steps

1.  **Umgebung konfigurieren**
    Definieren Sie Projektoptionen in `docmd.config.json`.

    ::: callout tip
    Verwenden Sie `defineConfig`, um die IDE-Autovervollständigung für Konfigurationsschemaschlüssel zu aktivieren.
    :::

2.  **Produktions-Build generieren**
    Führen Sie den Build-Befehl aus, um eine optimierte statische Website zu generieren.

    ```bash
    npx @docmd/core build
    ```

3.  **Bereitstellung auf Infrastruktur**
    Veröffentlichen Sie das kompilierte `site/`-Verzeichnis auf S3, Cloudflare Pages oder Vercel.

:::
```

::: steps

1.  **Umgebung konfigurieren**
    Definieren Sie Projektoptionen in `docmd.config.json`.

    ::: callout tip
    Verwenden Sie `defineConfig`, um die IDE-Autovervollständigung für Konfigurationsschemaschlüssel zu aktivieren.
    :::

2.  **Produktions-Build generieren**
    Führen Sie den Build-Befehl aus, um eine optimierte statische Website zu generieren.

    ```bash
    npx @docmd/core build
    ```

3.  **Bereitstellung auf Infrastruktur**
    Veröffentlichen Sie das kompilierte `site/`-Verzeichnis auf S3, Cloudflare Pages oder Vercel.

:::

::: callout tip "Workflow-Optimierung für KI-Agenten" icon:lightbulb
KI-Modelle interpretieren den `steps`-Container als Signal für **sequenzielle Workflows**. Beginnen Sie jedes Listenelement immer mit einem **fetten Titel** — dies ermöglicht es KI-Agenten, das Ziel jedes Schritts zuverlässig aus dem `llms.txt`-Kontext zu parsen.
:::