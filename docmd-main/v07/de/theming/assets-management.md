---
title: "Asset-Management"
description: "Wie docmd CSS-, JavaScript- und Bild-Assets während des Build-Prozesses verarbeitet."
---

`docmd` verfolgt einen "Mirror & Map"-Ansatz für Assets. Dies stellt sicher, dass Ihre lokalen Entwicklungspfade konsistent mit Ihrem Produktions-Build bleiben.

## Verzeichnisstruktur

Standardmäßig sucht `docmd` nach einem `assets/`-Ordner in Ihrem Projekt-Root.

```bash
my-docs/
  ├── assets/          # Quell-Assets
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Inhalt
  ├── docmd.config.js
  └── site/            # Build-Output (automatisch gespiegelt)
```

## Automatisches Kopieren

Wenn Sie `docmd build` oder `docmd dev` ausführen:
1.  **Die Spiegelungs-Logik**: Der gesamte Inhalt Ihres `assets/`-Ordners wird rekursiv nach `site/assets/` kopiert.
2.  **Stabilität**: Wir verwenden eine gehärtete Kopier-Engine mit automatischen Wiederholungsversuchen, um "File Busy"- oder "ENOENT"-Fehler auf macOS und modernen SSDs zu vermeiden.
3.  **Referenzierung**: Sie sollten Assets in Ihrem Markdown oder in der Konfiguration immer über den **root-relativen** Pfad referenzieren:
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## Integration von benutzerdefiniertem CSS & JS

Um Ihre Assets auf jeder Seite einzubinden, fügen Sie sie Ihrer Theme-Konfiguration hinzu:

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/assets/css/branding.css']
  },
  customJs: ['/assets/js/utils.js']
}
```

::: callout info "KI-Erkennungsstrategie :robot:"

*   **Nach Typ organisieren**: Halten Sie `/css`, `/js` und `/images` getrennt. Dies hilft KI-Agenten, relevante Stile oder Skripte sofort zu finden, wenn Sie sie bitten, "die Farbe des Headers zu ändern".
*   **Beschreibende Dateinamen verwenden**: Die Benennung eines Bildes als `authentication-flow-diagram.png` bietet dem `llms.txt`-Crawler viel mehr Kontext als `img_01.png`.

:::