---
title: "Asset-Management"
description: "Wie docmd während des Build-Prozesses mit CSS, JavaScript und Bild-Assets umgeht."
---

`docmd` verfolgt bei Assets einen "Mirror & Map"-Ansatz. Dies stellt sicher, dass Ihre lokalen Entwicklungspfade mit Ihrem Produktions-Build konsistent bleiben.

## Verzeichnisstruktur

Standardmäßig sucht `docmd` nach einem `assets/`-Ordner in Ihrem Projekt-Root.

```bash
mein-projekt/
  ├── assets/          # Quell-Assets
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Inhalte
  ├── docmd.config.js
  └── site/            # Build-Ausgabe (Automatisch gespiegelt)
```

## Automatisches Kopieren (v0.5.1+)

Wenn Sie `docmd build` oder `docmd dev` ausführen:
1.  **Die Spiegelungslogik**: Der gesamte Inhalt Ihres `assets/`-Ordners wird rekursiv nach `site/assets/` kopiert.
2.  **Stabilität**: Wir verwenden eine gehärtete Kopier-Engine mit automatischen Wiederholungsversuchen, um "File Busy"- oder "ENOENT"-Fehler auf macOS und modernen SSDs zu verhindern.
3.  **Referenzierung**: Sie sollten Assets in Ihrem Markdown oder in der Konfiguration immer über den **Wurzel-relativen** Pfad referenzieren:
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## Integration von eigenem CSS & JS

Um Ihre Assets mit jeder Seite zu verknüpfen, fügen Sie diese Ihrer Theme-Konfiguration hinzu:

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/assets/css/branding.css']
  },
  customJs: ['/assets/js/utils.js']
}
```

## Erkennungsstrategie für KI

Beachten Sie beim Hinzufügen von Assets:
*   **Nach Typ organisieren**: Halten Sie `/css`, `/js` und `/images` getrennt. Dies hilft KI-Agenten, relevante Styles oder Skripte sofort zu finden, wenn Sie sie bitten, "die Farbe des Headers zu ändern".
*   **Aussagekräftige Dateinamen**: Ein Bild namens `authentifizierungs-flow-diagramm.png` liefert dem `llms.txt`-Crawler wesentlich mehr Kontext als `bild_01.png`.