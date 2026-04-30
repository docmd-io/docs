---
title: "Client-seitige Ereignisse"
description: "Nutzen Sie den SPA-Lebenszyklus von docmd, um interaktive Funktionen hinzuzufügen."
---

`docmd` nutzt einen leichtgewichtigen Single Page Application (SPA) Router, um sofortige Seitenübergänge zu ermöglichen. Da der Browser beim Navigieren kein vollständiges Neuladen durchführt, werden Skripte, die auf `DOMContentLoaded` basieren, nicht erneut ausgeführt.

Um dies zu handhaben, sendet `docmd` benutzerdefinierte Lebenszyklus-Ereignisse (Events), auf die Sie in Ihren `customJs`-Dateien hören können.

## `docmd:page-mounted`

Dieses Ereignis wird immer dann ausgelöst, wenn eine neue Seite erfolgreich abgerufen und in das DOM eingefügt wurde.

### Verwendung

Fügen Sie einen Listener zum `document`-Objekt hinzu, um Bibliotheken von Drittanbietern neu zu initialisieren oder benutzerdefinierte Animationen auszulösen.

```javascript
document.addEventListener('docmd:page-mounted', (event) => {
  const { url } = event.detail;
  console.log(`Navigiert zu: ${url}`);

  // Komponenten neu initialisieren
  // Beispiel: Prism.highlightAll();
});
```

### Ereignis-Details (`event.detail`)

| Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| `url` | `String` | Die absolute URL der Seite, die gerade gemountet wurde. |

## Best Practices

1.  **Idempotenz**: Stellen Sie sicher, dass Ihre Initialisierungslogik sicher mehrmals auf derselben Seite aufgerufen werden kann oder vor der nächsten Navigation bereinigt wird.
2.  **Globaler Scope**: Skripte, die über `customJs` hinzugefügt werden, laufen im globalen Geltungsbereich. Verwenden Sie eine IIFE (Immediately Invoked Function Expression), um eine Verschmutzung des `window`-Objekts zu vermeiden.
3.  **Bereinigung**: Wenn Ihr Skript globale Event-Listener hinzufügt (z. B. `window.onresize`), sollten Sie in Erwägung ziehen, den aktuellen Pfad zu verfolgen, um diese zu entfernen, wenn der Benutzer die Seite verlässt.