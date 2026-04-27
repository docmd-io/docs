---
title: "Callouts"
description: "Heben Sie kritische Warnungen, Pro-Tipps und Hintergrundkonformationen durch semantische visuelle Blöcke hervor."
---

Callouts werden verwendet, um Informationen hervorzuheben, die die sofortige Aufmerksamkeit des Lesers erfordern. `docmd` bietet fünf semantische Typen an, die jeweils ein unterschiedliches visuelles Design und thematische Icons besitzen.

## Syntax-Referenz

```markdown
::: callout typ "Optionaler Titel"
Der technische Inhalt oder die Warnung wird hier platziert.
:::
```

Fügen Sie einen optionalen `icon:`-Parameter hinzu, um das Standard-Icon des Typs durch ein beliebiges [Lucide](external:https://lucide.dev/icons)-Icon zu ersetzen:
```markdown
::: callout info "Benutzerdefiniertes Icon" icon:sparkles
Dieser Callout verwendet ein benutzerdefiniertes Icon anstelle des Standard-Info-Icons.
:::
```

### Unterstützte semantische Typen

| Typ | Absicht | Visuelles Signal |
| :--- | :--- | :--- |
| `info` | **Allgemeine Daten** | Kontextueller Hintergrund oder hilfreiche, nicht kritische Infos. |
| `tip` | **Optimierung** | Performance-Shortcuts oder "Pro-Tipps". |
| `warning`| **Vorsicht** | Potenzielle Probleme oder veraltete Funktionen, die beachtet werden sollten. |
| `danger` | **Kritisch** | Risiko von Datenverlust, Breaking Changes oder Systemausfall. |
| `success`| **Verifizierung** | Bestätigung einer erfolgreichen Konfiguration oder eines erfolgreichen Builds. |

## Implementierungsgalerie

### 1. Minimalistischer Informationshinweis
```markdown
::: callout info
Legacy-Konfigurationsschemata werden weiterhin unterstützt, aber nicht mehr empfohlen.
:::
```
::: callout info
Legacy-Konfigurationsschemata werden weiterhin unterstützt, aber nicht mehr empfohlen.
:::

### 2. Warnung mit hoher Priorität und benutzerdefiniertem Titel
```markdown
::: callout warning "Ziel für Breaking Changes"
Ab `v0.7.0` wird das interne WebSocket-RPC-System offiziell als veraltet eingestuft.
:::
```
::: callout warning "Ziel für Breaking Changes"
Ab `v0.7.0` wird das interne WebSocket-RPC-System offiziell als veraltet eingestuft.
:::

### 3. Kombination mit reichhaltigem Inhalt
Callouts unterstützen das volle Spektrum von Markdown, sodass Sie Buttons und Code-Blöcke innerhalb der Warnung einbetten können.

````markdown
::: callout tip "Optimiertes lokales Testen" icon:command
Verwenden Sie das preserve-Flag, um Build-Dateien während der Entwicklungssitzungen beizubehalten:

```bash
docmd dev --preserve
```

::: button "CLI-Flag-Referenz" /cli-commands
:::
````

::: callout info "Optimiertes lokales Testen" icon:command
Verwenden Sie das preserve-Flag, um Build-Dateien während der Entwicklungssitzungen beizubehalten:

```bash
docmd dev --preserve
```

::: button "CLI-Flag-Referenz" ./#cli-commands
:::

::: callout tip "Priorisierte Logik für KI"
Für LLMs fungieren Callouts als **Anker mit hoher Priorität**. Durch die Verwendung von `::: callout danger` zur Dokumentation von Breaking Changes oder Systembeschränkungen geben Sie ein klares Signal, dass das KI-Modell diese Informationen während seines Denk- und Generierungsprozesses gegenüber dem umgebenden Text priorisieren muss.
:::