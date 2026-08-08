---
title: "Eigene Styles & Skripte"
description: "Injizieren Sie benutzerdefinierte CSS- und JavaScript-Dateien in Ihre docmd-Website, um Layoutstile, Markenidentität und Client-Verhalten zu erweitern."
---

Während `docmd`-Themes flexible visuelle Standards bieten, können Sie benutzerdefinierte Stylesheets und interaktive Skripte über die Array-Optionen `theme.customCss` und `customJs` in `docmd.config.json` injizieren.

## Benutzerdefinierte CSS-Überschreibungen

Verwenden Sie `theme.customCss`, um Standard-Theme-Variablen zu überschreiben oder neue Layoutregeln einzuführen:

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

### Ausführungsschritte

1. Platzieren Sie Ihre CSS-Datei im Assets-Verzeichnis Ihres Projekts (z. B. `docs/assets/css/branding.css`).
2. `docmd` kopiert Assets während des Builds in das kompilierte Ausgabeverzeichnis und fügt `<link>`-Tags automatisch in die Seitenheader ein.
3. Benutzerdefinierte CSS-Dateien werden **nach** den Theme-Stilen geladen, um sicherzustellen, dass Ihre benutzerdefinierten Regeln die Standard-Theme-Deklarationen sauber überschreiben.

## Integration von eigenem JavaScript

Verwenden Sie das `customJs`-Array der obersten Ebene für Skripte, die interaktive Funktionen hinzufügen oder Analytics von Drittanbietern integrieren:

```json "docmd.config.json"
{
  "customJs": [
    "/assets/js/feedback-widget.js"
  ]
}
```

### Bewusstsein für den SPA-Router-Lebenszyklus

Benutzerdefinierte Skripte werden am Ende des `<body>`-Elements geladen. Da `docmd` während der Client-Navigation als **Single Page Application (SPA)** arbeitet:

* Vollständige Seitenneuladevorgänge finden beim Klicken auf interne Links nicht statt.
* Skripte, die DOM-Elemente untersuchen oder Event-Listener an diese anhängen, sollten SPA-Router-Lebenszyklus-Ereignisse abonnieren.

Vollständige Ereignissignaturen und Codebeispiele finden Sie unter [Clientseitige Ereignisse](../reference/client-side-events.md).

## Asset-Prioritätsreihenfolge

Jedes in einem `docmd`-Build registrierte CSS- und JS-Asset erhält ein **Prioritätsgewicht**, das die Kaskaden-Ladereihenfolge bestimmt (niedrigere Zahlen laden früher):

| Prioritätsgewicht | Schicht | Technische Beschreibung |
| :--- | :--- | :--- |
| `0` | Basis-Kern (`docmd-main.css`, `docmd-main.js`) | Immer in allen Builds vorhanden. |
| `5` | Theme-Paletten-Overlay (`docmd-theme-sky.css` usw.) | Über `theme.name` geladen. |
| `10` | Strukturelle Template-Stile | Von aktiven Template-Plugins injiziert. |
| `15` | Benutzer-`customCss` / `customJs` | **Höchste Priorität für Benutzerüberschreibungen**. |
| `20` | Plugin-Assets | Lightbox-, Such- und Analytics-Assets. |

Innerhalb jedes Prioritäts-Buckets werden Dateien in der Reihenfolge geladen, in der sie registriert wurden. Um mehr über strukturelle Layout-Überschreibungen zu erfahren, erkunden Sie [Templates](templates.md).

::: callout tip "Bereichsbezogene benutzerdefinierte Stile" icon:lightbulb
Bewahren Sie eine saubere Asset-Organisation durch die Trennung von `/css`- und `/js`-Unterverzeichnissen unter `assets/` wahren. Die Verwendung expliziter Klassennamen in `branding.css` verhindert Stilkonflikte mit den Kern-`docmd`-Containerregeln.
:::