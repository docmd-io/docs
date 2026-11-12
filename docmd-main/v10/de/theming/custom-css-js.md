---
title: "Eigene Styles & Skripte"
description: "Injizieren Sie benutzerdefinierte CSS- und JavaScript-Dateien in Ihre docmd-Website, um Layoutstile, Markenidentität und Client-Verhalten zu erweitern."
---

Während `docmd`-Themes flexible visuelle Standards bieten, können Sie benutzerdefinierte Stylesheets und interaktive Skripte über die Array-Optionen `theme.customCss` und `theme.customJs` in `docmd.config.json` injizieren.

## Konfiguration für eigene Styles & Skripte

Eigene Stylesheets und clientseitige Skripte werden symmetrisch unter dem `theme`-Block konfiguriert:

```json "docmd.config.json"
{
  "theme": {
    "name": "default",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

::: callout info title:"Abwärtskompatibilität" icon:history
In früheren Versionen von docmd wurde benutzerdefiniertes JavaScript über ein Top-Level-Array `"customJs"` und eigenes CSS über `"customCss"` konfiguriert. Beide Top-Level-Schlüssel werden weiterhin vollständig als Fallbacks unterstützt, die Verschachtelung unter `"theme"` ist jedoch der empfohlene moderne Standard.
:::

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

Verwenden Sie `theme.customJs` für Skripte, die interaktive Funktionen hinzufügen oder Analytics von Drittanbietern integrieren:

```json "docmd.config.json"
{
  "theme": {
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

### Bewusstsein für den SPA-Router-Lebenszyklus

Benutzerdefinierte Skripte werden am Ende des `<body>`-Elements geladen. Da `docmd` während der Client-Navigation als **Single Page Application (SPA)** arbeitet:

* Vollständige Seitenneuladevorgänge finden beim Klicken auf interne Links nicht statt.
* Skripte, die DOM-Elemente untersuchen oder Event-Listener an diese anhängen, sollten SPA-Router-Lebenszyklus-Ereignisse abonnieren.

Vollständige Ereignissignaturen und Codebeispiele finden Sie unter [Clientseitige Ereignisse](../reference/client-side-events.md).

## Kaskaden-Reihenfolge

Stylesheets und Skripte werden in einer vorhersehbaren dreistufigen Reihenfolge geladen, sodass Ihre benutzerdefinierten Regeln immer Vorrang haben:

1. **Kern und Theme**: Basisstile und Farbpaletten laden zuerst.
2. **Templates und Plugins**: Strukturelle Layout-Templates und Plugin-Assets laden als Nächstes.
3. **Benutzerdefiniertes CSS und JS**: Ihre `customCss`- und `customJs`-Dateien laden zuletzt, sodass Ihre Deklarationen die Standardwerte sicher überschreiben.

Um mehr über strukturelle Layout-Überschreibungen zu erfahren, erkunden Sie [Templates](templates.md).

::: callout tip "Bereichsbezogene benutzerdefinierte Stile" icon:lightbulb
Bewahren Sie eine saubere Asset-Organisation durch die Trennung von `/css`- und `/js`-Unterverzeichnissen unter `assets/` wahren. Die Verwendung expliziter Klassennamen in `branding.css` verhindert Stilkonflikte mit den Kern-`docmd`-Containerregeln.
:::