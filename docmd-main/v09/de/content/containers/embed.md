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