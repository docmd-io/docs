---
title: "Callouts"
description: "Heben Sie kritische Warnungen, Pro-Tipps und Hintergrundkontexte durch semantische visuelle Blöcke in docmd hervor."
---

Callouts isolieren Informationen, die die sofortige Aufmerksamkeit des Lesers erfordern. `docmd` bietet fünf semantische Callout-Typen, jeweils mit eigenem Styling, Hintergrundakzenten und Iconografie.

## Container-Syntax

```markdown
# Standard-Callout-Container
::: callout typ ["Header-Titel"] [icon:Icon-Name] # Container-Öffner
Inhalt mit voller Markdown-Unterstützung, Codeblöcken und Buttons...
::: /callout # Explizites Schließ-Tag

# Migrations-Alias (VitePress / Docusaurus)
::: typ ["Header-Titel"] [icon:Icon-Name]
Inhalt...
::: /typ
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Typ-Variante** | `info` \| `tip` \| `warning` \| `danger` \| `success` | Semantische Absicht für Hintergrundakzente, Rahmenstyling und Iconografie. |
| **Header-Titel** | `"String"` \| `title:"..."` | Optionaler Header-Titel (2. positionaler Parameter oder `title:"..."`). Überschreibt den Standardtitel. |
| **Symbolik** | `icon:NAME` | Optional. Überschreibt das Standard-Icon mit einem [Lucide](external:https://lucide.dev/icons)-Symbol. |
| **Migrations-Aliase** | `::: tip`, `::: warning`, `::: danger`, `::: info`, `::: note`, `::: caution` | Direkt unterstützt für Kompatibilität mit VitePress und Docusaurus. |
| **Schließ-Tags** | `::: /callout`, `::: /tip`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::

::: callout info "Migrationsfreundliche Aliase" icon:info
Beim Migrieren von VitePress oder Docusaurus funktionieren native Container-Aliase direkt nach der Installation:
- `:::tip`, `:::warning`, `:::danger`, `:::info` (VitePress)
- `:::note`, `:::caution` (Docusaurus)

Diese Aliase werden identisch mit nativen `docmd`-Callouts gerendert. Leerzeichenlose Syntax wie `:::callout` wird ebenfalls unterstützt.
:::


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
::: /callout
```

::: callout info
Legacy-Konfigurationsschemata werden weiterhin unterstützt, jedoch nicht mehr empfohlen.
:::

### Benutzerdefinierter Titel & Icon

Überschreiben Sie die Standardbeschriftung und das Icon mit einem benutzerdefinierten Titel und einem beliebigen Lucide-Iconnamen:

```markdown
::: callout warning title:"Hinweis zu Breaking Changes" icon:alert-triangle
Das interne WebSocket-RPC-System ist offiziell veraltet.
::: /callout
```

::: callout warning "Hinweis zu Breaking Changes" icon:alert-triangle
Das interne WebSocket-RPC-System ist offiziell veraltet.
:::

### Reichhaltige Inhaltskomposition

Callouts unterstützen die vollständige Markdown-Analyse. Betten Sie Codeblöcke und Schaltflächen direkt in Callout-Container ein:

````markdown
::: callout tip title:"Optimiertes lokales Testen" icon:command
Verwenden Sie das preserve-Flag, um Build-Dateien während lokaler Entwicklungssitzungen beizubehalten:

```bash
npx @docmd/core dev --preserve
```

::: button title:"CLI-Flag-Referenz" url:"./#cli-commands"
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