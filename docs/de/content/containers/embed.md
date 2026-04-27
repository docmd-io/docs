---
title: URL-Embeds
description: Wie Sie dynamische Komponenten, Videos und soziale Medien sicher direkt in Ihre Dokumente einbetten.
---

`docmd` wird nativ mit dem hochoptimierten **[embed-lite](external:https://github.com/mgks/embed-lite)**-Parser-Ökosystem ausgeliefert. Dies ermöglicht es Ihnen, rohe externe URLs strikt auf der Seite abzubilden und sie sofort in vollständig sichere UI-Komponenten mit Null-Latenz zu verwandeln!

## Unterstützte Plattformen
Die integrierte Engine stellt nativ strukturierte Formatter für die folgenden Netzwerke identisch zur Verfügung:
*   **Video-Ökosystem:** YouTube (einschließlich nativer 9:16 Shorts-Unterstützung), Vimeo, Dailymotion, TikTok
*   **Soziale Verbindungen:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
*   **Code & Prototyping:** GitHub Gists, CodePen, Figma, Google Maps
*   **Musikdienste:** Spotify, SoundCloud

## Nutzungssyntax
Sie verwenden einfach den `::: embed`-Container gefolgt von einer beliebigen Ziel-URL. Alle drei umschließenden Formate sind äquivalent:

```md
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

### Beispiel für Standardergebnis
Die Rendering-Engine parst diese URL strikt im Hintergrund, prüft die Validierungsmatrix und fügt native HTML-Knoten strukturell direkt und elegant in Ihre Seitenausgabe ein:

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

## Fallback-Sicherheit
Machen Sie sich keine Sorgen über die Generierung defekter Bildschirme. Wenn der interne Parser ein nicht verifiziertes oder strikt nicht verfügbares Domain-Konfigurations-Mapping scannt, fällt `docmd` elegant auf die Generierung einer einfachen, soliden `<a>`-Hyperlink-Schaltfläche zurück, die explizit auf das Ziel verweist:

```md
::: embed "https://docs.docmd.io/de/content/containers/embed/"
```
*(Fährt fort, genau das zu generieren, was Sie unten sehen würden)*

::: embed "https://docs.docmd.io/de/content/containers/embed/"