---
title: "URL-Einbettungen"
description: "Betten Sie dynamische Video-, Social- und interaktive Inhalte sicher direkt in Ihre Dokumente ein."
---

docmd wird nativ mit dem hochoptimierten **[embed-lite](external:https://github.com/mgks/embed-lite)**-Parser ausgeliefert. Er wandelt externe URLs automatisch in sichere, latenzfreie UI-Komponenten um.

## Unterstützte Plattformen

Die Engine unterstützt nativ strukturierte Formatierer für die folgenden Netzwerke:

*   **Video:** YouTube (einschließlich Shorts), Vimeo, Dailymotion, TikTok
*   **Soziale Netzwerke:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
*   **Code & Prototyping:** GitHub Gists, CodePen, Figma, Google Maps
*   **Musik:** Spotify, SoundCloud

## Syntax-Referenz

```markdown
::: embed "target_url"
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **URL** | `"String"` | Die absolute URL der einzubettenden externen Ressource (z. B. ein YouTube-Video, eine Figma-Datei oder ein GitHub-Gist). |

## Beispiele

### Videoeinbettung

Fügen Sie eine beliebige YouTube-, Vimeo- oder TikTok-URL ein, um einen nativen, responsiven Player zu rendern.

```markdown
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Fallback-Verhalten

Wenn der Parser auf eine nicht unterstützte oder ungültige URL stößt, fällt docmd elegant auf einen Hyperlink-Button zurück, anstatt die Seite zu beschädigen.

```markdown
::: embed "https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"