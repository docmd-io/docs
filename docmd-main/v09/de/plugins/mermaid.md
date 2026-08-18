---
title: "Mermaid Diagramme Plugin"
description: "Zero-Config-Integration für Mermaid.js-Diagramme mit automatischer Theme-Synchronisation und verzögertem Laden von Assets."
---

Das Plugin `@docmd/plugin-mermaid` integriert [Mermaid.js](external:https://mermaid.js.org/) in `docmd`. Es registriert sowohl das Parsing von Standard-Markdown-Codeblöcken (` ```mermaid `) als auch den expliziten `::: mermaid` Container-Renderer für interaktive SVG-Diagramme.

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: mermaid` ... `::: /mermaid`), explizite Key-Value-Eigenschaften (`title:"..."`, `align:center`) und nachfolgende `# Kommentare` ein. Individuelle Diagrammanpassungen erfolgen über die Container-Syntax, während globale Standardwerte in der `docmd.config.json` festgelegt werden.
:::

::: callout success "v0.9.3+ Offline- & Air-Gap-Bundling" icon:zap
Ab **v0.9.3** bündelt `@docmd/plugin-mermaid` die vollständige Mermaid-Laufzeit lokal als eigenständiges klassisches IIFE-Skript. Diagramme rendern zu 100% offline ohne CDN-Abhängigkeiten (`jsdelivr.net`) für air-gapped Deployments und lokales `file://`-Browsing.
:::

## Plugin-Konfiguration

Konfigurieren Sie globale Optionen in Ihrer `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "mermaid": {
      "enabled": true,
      "theme": "default",
      "darkTheme": "dark",
      "zoom": true
    }
  }
}
```

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktiviert oder deaktiviert das Diagramm-Rendering global. |
| `theme` | `string` | `"default"` | Standard-Helligkeits-Theme für Diagramme (`default`, `forest`, `neutral`). |
| `darkTheme` | `string` | `"dark"` | Standard-Dunkelheits-Theme für die Dark-Mode-Synchronisation. |
| `zoom` | `boolean` | `true` | Aktiviert interaktive Zoom- und Pan-Steuerelemente standardmäßig. |

::: callout tip "Plugin deaktivieren" icon:slash
Wenn `@docmd/plugin-mermaid` in der `docmd.config.json` deaktiviert oder ausgelassen wird, werden sowohl das `::: mermaid` Container-Rendering als auch das ` ```mermaid ` Codeblock-Parsing sauber deaktiviert, und es werden keine clientseitigen JS-Assets injiziert.
:::

## Verwendung & Erstellung von Diagrammen

`docmd` unterstützt ein hybrides Erstellungsmodell für Diagramme:

* **[Mermaid Container Anleitung](../content/containers/mermaid.md)**: Erfahren Sie mehr über die empfohlene `::: mermaid` Container-Syntax für Titel pro Diagramm, Ausrichtung, benutzerdefinierte Themes und explizite Schließungs-Tags.
* **Standard-Codeblöcke**: Verwenden Sie Standard-Codeblöcke (` ```mermaid `) für 100 % Kompatibilität mit GitHub Flavored Markdown (GFM).

### Kurzes Beispiel

```markdown
::: mermaid title:"Authentifizierungs-Ablauf" align:center zoom:true # Container
sequenceDiagram
    autonumber
    Client->>Server: POST /login
    Server-->>Client: 200 OK (Token)
::: /mermaid
```

Die vollständige Syntaxreferenz finden Sie in der **[Mermaid Container Referenz](../content/containers/mermaid.md)**.