---
title: "Eigene Styles & Skripte"
description: "Injizieren Sie Ihre eigenen CSS- und JS-Dateien, um docmds Funktionalität und Branding zu erweitern."
---

Während `docmd`-Themes sehr flexibel sind, möchten Sie möglicherweise eigene Stylesheets oder interaktive Skripte injizieren. Dies geschieht über die `theme.customCss`- und `customJs`-Arrays in Ihrer Konfiguration.

## Eigene CSS

Verwenden Sie `theme.customCss`, um bestehende Stile zu überschreiben oder neue hinzuzufügen.

```json
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

### Funktionsweise
1.  Platzieren Sie Ihre CSS-Datei im assets-Ordner Ihres Projekts (z. B. `docs/assets/css/branding.css`).
2.  `docmd` kopiert sie automatisch in den Build-Ordner und injiziert ein `<link>`-Tag auf jeder Seite.
3.  Eigenes CSS wird **nach** den Theme-Stilen geladen, sodass Ihre Überschreibungen Priorität haben.

## Eigenes JavaScript

Verwenden Sie das Top-Level-`customJs`-Array für Skripte, die Verhalten hinzufügen oder 3rd-Party-Dienste integrieren.

```json
{
  "customJs": [
    "/assets/js/feedback-widget.js"
  ]
}
```

### Lebenszyklus-Bewusstsein
Skripte werden am Ende des `<body>`-Tags injiziert. Da `docmd` eine **Single Page Application (SPA)** ist, beachten Sie:
*   Die Seite wird beim Navigieren zwischen Links nicht vollständig neu geladen.
*   Möglicherweise müssen Sie auf benutzerdefinierte Lebenszyklus-Ereignisse hören, um Ihre Skripte auf neuen Seiten neu zu initialisieren.

Die vollständige Ereignisliste und Verwendungsbeispiele finden Sie unter [Client-Ereignisse](../api/client-side-events.md).

::: callout tip
Das Hinzufügen von eigenem CSS und JS ermöglicht es KI-Modellen (wie ChatGPT), viel gezieltere UI-Verbesserungen vorzuschlagen. Wenn Sie erwähnen „Ich habe eine eigene `branding.css`-Datei", kann das Modell spezifische Selektoren bereitstellen, die nicht mit der Kern-`docmd`-Engine kollidieren.
:::

## Asset-Prioritätskette (neu in 0.8.7)

Jede CSS- und JS-Datei in einem docmd-Build erhält eine **Priorität**, die ihre Ladereihenfolge bestimmt. Niedrigere Prioritäten laden zuerst.

| Priorität | Schicht | Hinweise |
|---|---|---|
| 0  | Basis (`docmd-main.css`, `docmd-main.js`) | Immer vorhanden. |
| 5  | Theme-Farb-Overlay (`docmd-theme-sky.css` usw.) | Aus `theme.name`. |
| 10 | **Template-Struktur** (neu) | Von Template-Plugins geladen. |
| 15 | Benutzerdefiniertes `customCss` / `customJs` | **Gewinnt immer** — das ist der Vertrag. |
| 20 | Plugin-CSS/JS | Lightbox, Search, Analytics usw. |

Innerhalb eines Prioritäts-Buckets laden Dateien in der Reihenfolge ihrer Registrierung. Wenn Sie feinere Kontrolle benötigen, autorisieren Sie ein kleines Plugin, das `Asset[]`-Einträge mit expliziten `priority`-Werten zurückgibt.

Den vollständigen Template-Plugin-Authoring-Leitfaden finden Sie unter [Templates](templates.md).
