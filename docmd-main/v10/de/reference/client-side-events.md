---
title: "Client-seitige Events"
description: "Haken Sie in den docmd-SPA-Lebenszyklus ein, um interaktive Features hinzuzufügen."
---

docmd verwendet einen leichtgewichtigen Single Page Application (SPA)-Router, um sofortige Seitenübergänge zu bieten. Da der Browser während der Navigation keinen vollständigen Reload durchführt, werden Skripte, die auf `DOMContentLoaded` basieren, nicht erneut ausgeführt.

Um dies zu handhaben, dispatcht docmd benutzerdefinierte Lifecycle-Events, die Sie in Ihren `customJs`-Dateien abonnieren können.

## `docmd:page-mounted`

Dieses Event wird jedes Mal dispatched, wenn eine neue Seite erfolgreich abgerufen und in den DOM injiziert wurde.

### Verwendung

Fügen Sie dem `document`-Objekt einen Listener hinzu, um Drittanbieter-Libraries neu zu initialisieren oder benutzerdefinierte Animationen auszulösen.

```javascript
document.addEventListener("docmd:page-mounted", (event) => {
  const { url } = event.detail;
  console.log(`Navigiert zu: ${url}`);
});
```

### Event-Details (`event.detail`)

| Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| `url` | `String` | Die absolute URL der soeben eingebundenen Seite. |

## Best Practices

1.  **Idempotenz**: Stellen Sie sicher, dass Ihre Initialisierungs-Logik gefahrlos mehrfach auf derselben Seite aufgerufen werden kann oder vor der nächsten Navigation aufgeräumt wird.
2.  **Globaler Scope**: Skripte, die über `customJs` hinzugefügt werden, laufen im globalen Scope. Verwenden Sie eine IIFE (Immediately Invoked Function Expression), um das `window`-Objekt nicht zu verschmutzen.
3.  **Cleanup**: Falls Ihr Skript globale Event-Listener hinzufügt (z. B. `window.onresize`), ziehen Sie in Betracht, den aktuellen Pfad zu verfolgen, um sie zu entfernen, wenn der Benutzer wegnavigiert.