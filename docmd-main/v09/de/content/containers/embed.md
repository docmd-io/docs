---
title: "URL-Einbettungen"
description: "Betten Sie dynamische Video-, Social- und interaktive Inhalte sicher direkt in Ihre Dokumente ein."
---

docmd wird nativ mit dem hochoptimierten **[embed-lite](external:https://github.com/mgks/embed-lite)**-Parser ausgeliefert. Er wandelt externe URLs automatisch in sichere, latenzfreie UI-Komponenten um.

## Container-Syntax

```markdown
::: embed [url:"https://domain.com/ressource"] # URL-Einbettungs-Container Öffner
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Ressourcen-URL** | `"String"` \| `url:"..."` | Absolute URL der einzubettenden Ressource (1. Parameter oder `url:"..."`). |
| **Unterstützte Netzwerke** | Integriert | Erkennt automatisch YouTube, Vimeo, TikTok, X, Figma, Gists, CodePen, Spotify etc. |
| **Fallback-Button** | Automatisch | Nicht erkannte URLs werden sicher als formatierte Hyperlink-Schaltflächen gerendert. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Beispiele

### Videoeinbettung

Fügen Sie eine beliebige YouTube-, Vimeo- oder TikTok-URL ein, um einen nativen, responsiven Player zu rendern.

```markdown
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Fallback-Verhalten

Wenn der Parser auf eine nicht unterstützte oder ungültige URL stößt, fällt docmd elegant auf einen Hyperlink-Button zurück, anstatt die Seite zu beschädigen.

```markdown
::: embed url:"https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"