---
title: "Callouts (Hinweise)"
description: "Heben Sie kritische Warnungen, Profi-Tipps und Hintergrundkontext durch semantische visuelle Blöcke hervor."
---

Callouts werden verwendet, um Informationen zu isolieren, die die sofortige Aufmerksamkeit des Lesers erfordern. `docmd` bietet fünf semantische Typen, die sich durch unterschiedliches visuelles Design und thematische Icons auszeichnen.

## Syntax-Referenz

```markdown
::: callout typ "Optionaler Titel"
Der technische Inhalt oder die Warnung wird hier platziert.
:::
```

Fügen Sie einen optionalen `icon:`-Parameter hinzu, um das Standard-Icon des Typs durch ein beliebiges [Lucide](https://lucide.dev/icons) Icon zu ersetzen:
```markdown
::: callout info "Benutzerdefiniertes Icon" icon:sparkles
Dieser Hinweis verwendet ein benutzerdefiniertes Icon anstelle des Standard-Info-Icons.
:::
```

### Unterstützte semantische Typen

| Typ | Absicht | Visuelles Signal |
| :--- | :--- | :--- |
| `info` | **Allgemeine Daten** | Kontextbezogener Hintergrund oder hilfreiche, nicht kritische Informationen. |
| `tip` | **Optimierung** | Performance-Shortcuts oder „Profi-Tipps“. |
| `warning`| **Warnung** | Potenzielle Probleme oder veraltete Funktionen, die beobachtet werden sollten. |
| `danger` | **Kritisch** | Risiko von Datenverlust, Breaking Changes oder Systemausfällen. |
| `success`| **Verifizierung** | Bestätigung einer erfolgreichen Konfiguration oder eines erfolgreichen Builds. |

## Implementierungs-Galerie

### 1. Minimalistische Info-Notiz
```markdown
::: callout info
Veraltete Konfigurationsschemata werden weiterhin unterstützt, aber nicht mehr empfohlen.
:::
```
::: callout info
Veraltete Konfigurationsschemata werden weiterhin unterstützt, aber nicht mehr empfohlen.
:::

### 2. Warnhinweis mit hoher Priorität und Titel
```markdown
::: callout warning "Ziel für Breaking Change"
Ab `v0.7.0` wird das interne WebSocket-RPC-System offiziell als veraltet eingestuft.
:::
```
::: callout warning "Ziel für Breaking Change"
Ab `v0.7.0` wird das interne WebSocket-RPC-System offiziell als veraltet eingestuft.
:::

### 3. Komposition mit reichhaltigem Inhalt
Callouts unterstützen das gesamte Spektrum von Markdown, sodass Sie Schaltflächen und Code-Blöcke direkt in den Hinweis einbetten können.

````markdown
::: callout tip "Optimiertes lokales Testen"
Verwenden Sie das Preserve-Flag, um Build-Dateien während der Entwicklungssitzungen beizubehalten:

```bash
docmd dev --preserve
```

::: button "CLI-Flag-Referenz" /cli-commands
:::
````

::: callout tip "Optimiertes lokales Testen"
Verwenden Sie das Preserve-Flag, um Build-Dateien während der Entwicklungssitzungen beizubehalten:

```bash
docmd dev --preserve
```

::: button "CLI-Flag-Referenz" ./#cli-commands
:::

::: callout tip "Priorisierte Logik für KI"
Für LLMs fungieren Callouts als **Anker mit hoher Priorität**. Durch die Verwendung von `::: callout danger` zur Dokumentation von Breaking Changes oder Systemeinschränkungen geben Sie ein klares Signal, dass das KI-Modell diese Information während seines Argumentations- und Generierungsprozesses gegenüber dem umgebenden Text priorisieren muss.
:::