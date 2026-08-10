---
title: "Schaltflächen"
description: "Fügen Sie klare, gut sichtbare Call-to-Actions direkt in Ihre Dokumentation ein."
---

Schaltflächen sind interaktive Komponenten für Navigation und Call-to-Actions. Sie können auf interne Dokumentationsseiten oder externe Ressourcen verweisen.

## Container-Syntax

```markdown
# Einzelne Zeilenschaltfläche
::: button ["Label-Text"] ["Ziel-URL" | url:"Ziel-URL"] [icon:Icon-Name] [color:#hex|css_farbe] [::: /button]

# Explizites Key-Value
::: button title:"Label-Text" url:"Ziel-URL" icon:Icon-Name color:#hex [::: /button]

# Inline-Satzschaltfläche
Klicken Sie ::: button title:"Label-Text" url:"Ziel-URL" icon:Icon-Name ::: /button um fortzufahren.
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Titel / Label** | `"String"` \| `title:"..."` | Textbeschriftung der Schaltfläche (1. positionaler Parameter oder `title:"..."`). |
| **Ziel-URL** | `"URL"` \| `url:URL` | Navigationsziel (2. positionaler Parameter oder `url:"..."`). Unterstützt SPA-Pfade, Mailto, Tel oder externe Links. |
| **Externer Link** | `external:URL` | Öffnet das Ziel in einem neuen Tab (`target="_blank"` mit `rel="noopener noreferrer"`). |
| **Hintergrundfarbe** | `color:VALUE` | Benutzerdefinierte Hintergrund- und Rahmenfarbe (unterstützt CSS-Farbnamen oder Hex-Codes). |
| **Symbolik** | `icon:NAME` | Fügt ein [Lucide](external:https://lucide.dev/icons)-Symbol vor dem Text-Label ein. |
| **Selbstschließend & Inline** | `::: /button` \| `:::` | Standardmäßig selbstschließend, optional mit `::: /button` bei Inline-Nutzung geschlossen. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::

## Beispiele

### Interne Navigation

Verwenden Sie relative Markdown-Pfade, um nahtlose Übergänge innerhalb der docmd-SPA sicherzustellen.

```markdown
::: button title:"Install docmd" url:"../../getting-started/installation.md"
```

::: button "Install docmd" ../../getting-started/installation.md

### Link zu externer Ressource

Stellen Sie `external:` der URL voran, um den Link in einem neuen Tab zu öffnen.

```markdown
::: button title:"View GitHub Repository" url:"external:https://github.com/docmd-io/docmd"
```

::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd

### Styling & Symbole

Passen Sie Schaltflächen mit Farbüberschreibungen und Lucide-Symbolen an Ihre Markenidentität an.

```markdown
::: button title:"Success Confirmation" url:"./#success" color:#228B22
::: button title:"Danger Action" url:"./#delete" color:crimson icon:alert-circle
::: button title:"View Source" url:"external:https://github.com/docmd-io/docmd" icon:github
```

::: button "Success Confirmation" ./#success color:#228B22
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

### Inline-Schaltflächen in Sätzen

Schaltflächen können inline in Fließtexten verwendet werden:

```markdown
Klicken Sie auf ::: button title:"Download v0.9.1" url:"https://docmd.io" icon:download ::: /button um zu starten!
```

Klicken Sie auf ::: button "Download v0.9.1" https://docmd.io icon:download ::: /button um zu starten!