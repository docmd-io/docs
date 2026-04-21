---
title: URL-Einbettungen (Embeds)
description: Wie Sie dynamische Komponenten, Videos und soziale Medien sicher direkt in Ihre Dokumente einbetten.
---

`docmd` wird nativ mit dem hochoptimierten `embed-lite`-Parser-Ökosystem ausgeliefert. Dies ermöglicht es Ihnen, externe URLs strikt auf die Seite abzubilden und sie sofort in absolut sichere UI-Komponenten ohne Latenz zu verwandeln!

## Unterstützte Plattformen
Die integrierte Engine stellt nativ strukturierte Formatierer für die folgenden Netzwerke bereit:
*   **Video-Ökosystem:** YouTube (einschließlich nativer Unterstützung für 9:16 Shorts), Vimeo, Dailymotion, TikTok
*   **Soziale Netzwerke:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
*   **Code & Prototyping:** GitHub Gists, CodePen, Figma, Google Maps
*   **Musikdienste:** Spotify, SoundCloud

## Syntax der Verwendung
Sie verwenden einfach den `::: embed`-Container gefolgt von einer beliebigen Ziel-URL. Alle umschließenden Formate sind äquivalent:

```md
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

### Beispiel für das Standardergebnis
Die Rendering-Engine analysiert diese URL im Hintergrund, prüft die Validierungsmatrix und fügt die nativen HTML-Knoten elegant direkt in Ihre Seitenausgabe ein:

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

## Sicherheit durch Fallback
Machen Sie sich keine Sorgen über kaputte Layouts. Wenn der interne Parser eine nicht verifizierte oder nicht verfügbare Domain-Konfiguration erkennt, greift `docmd` automatisch auf einen einfachen `<a>`-Hyperlink-Button zum Ziel zurück:

```md
::: embed "https://unsupported-example.com/status/123"
```
*(Es wird genau das generiert, was Sie unten sehen)*

::: embed "https://unsupported-example.com/status/123"