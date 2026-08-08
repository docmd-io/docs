---
title: "Callouts"
description: "Heben Sie kritische Warnungen, Pro-Tipps und Hintergrundkontexte durch semantische visuelle Blöcke in docmd hervor."
---

Callouts isolieren Informationen, die die sofortige Aufmerksamkeit des Lesers erfordern. `docmd` bietet fünf semantische Callout-Typen, jeweils mit eigenem Styling, Hintergrundakzenten und Iconografie.

::: callout info "Migrationsfreundliche Aliase" icon:info
Beim Migrieren von VitePress oder Docusaurus funktionieren native Container-Aliase direkt nach der Installation:
- `:::tip`, `:::warning`, `:::danger`, `:::info` (VitePress)
- `:::note`, `:::caution` (Docusaurus)

Diese Aliase werden identisch mit nativen `docmd`-Callouts gerendert. Leerzeichenlose Syntax wie `:::callout` wird ebenfalls unterstützt.
:::

## Syntax-Referenz

```markdown
::: callout typ "Titeltext" [eigenschaft:wert...]
Der Inhalt oder die Warnmeldung wird hier platziert.
:::
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Typ** | `info` \| `tip` \| `warning` \| `danger` \| `success` | Semantische Absicht, die Standard-Hintergrundakzente und Iconografie definiert. |
| **Titel** | `"String"` | Optional. Überschreibt die standardmäßige semantische Header-Beschriftung mit einem benutzerdefinierten Titel. |
| **Icon** | `icon:NAME` | Optional. Überschreibt das Standard-Icon mit einem benutzerdefinierten [Lucide](external:https://lucide.dev/icons)-Icon. |

### Unterstützte Callout-Typen

| Typ | Visuelle Absicht |
| :--- | :--- |
| `info` | Kontextueller Hintergrund oder hilfreiche, nicht kritische Informationen. |
| `tip` | Performance-Shortcuts oder Best Practices. |
| `warning` | Potenzielle Probleme oder veraltete Funktionen, die beachtet werden sollten. |
| `danger` | Risiko von Datenverlust, Breaking Changes oder kritischen Ausfällen. |
| `success` | Bestätigung einer erfolgreichen Konfiguration oder eines erfolgreichen Build-Schritts. |

## Anwendungsbeispiele

### Grundlegender Callout

Ein minimaler Callout ohne expliziten Titel verwendet den Typschlüssel als Header-Beschriftung:

```markdown
::: callout info
Legacy-Konfigurationsschemata werden weiterhin unterstützt, jedoch nicht mehr empfohlen.
:::
```

::: callout info
Legacy-Konfigurationsschemata werden weiterhin unterstützt, jedoch nicht mehr empfohlen.
:::

### Benutzerdefinierter Titel & Icon

Überschreiben Sie die Standardbeschriftung und das Icon mit einem benutzerdefinierten Titel und einem beliebigen Lucide-Iconnamen:

```markdown
::: callout warning "Hinweis zu Breaking Changes" icon:alert-triangle
Das interne WebSocket-RPC-System ist offiziell veraltet.
:::
```

::: callout warning "Hinweis zu Breaking Changes" icon:alert-triangle
Das interne WebSocket-RPC-System ist offiziell veraltet.
:::

### Reichhaltige Inhaltskomposition

Callouts unterstützen die vollständige Markdown-Analyse. Betten Sie Codeblöcke und Schaltflächen direkt in Callout-Container ein:

````markdown
::: callout tip "Optimiertes lokales Testen" icon:command
Verwenden Sie das preserve-Flag, um Build-Dateien während lokaler Entwicklungssitzungen beizubehalten:

```bash
npx @docmd/core dev --preserve
```

::: button "CLI-Flag-Referenz" ./#cli-commands
:::
````

::: callout tip "Optimiertes lokales Testen" icon:command
Verwenden Sie das preserve-Flag, um Build-Dateien während lokaler Entwicklungssitzungen beizubehalten:

```bash
npx @docmd/core dev --preserve
```

::: button "CLI-Flag-Referenz" ./#cli-commands
:::

::: callout tip "Priorisierter Kontext für KI" icon:sparkles
Callout-Container fungieren als **Anker mit hoher Priorität** im kompilierten `llms.txt`-Kontextstrom. Verwenden Sie `::: callout danger` für Breaking Changes — dies signalisiert KI-Modellen, dass die enthaltene Anweisung Standardannahmen überschreibt.
:::