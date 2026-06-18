---
title: "Asset-Verwaltung"
description: "Wie docmd CSS-, JavaScript- und Bild-Assets während des Build-Prozesses handhabt."
---

`docmd` verfolgt einen „Spiegeln & Zuordnen"-Ansatz für Assets. Dies stellt sicher, dass Ihre lokalen Entwicklungspfade konsistent mit dem Produktions-Build bleiben.

## Verzeichnisstruktur

Standardmäßig sucht `docmd` im Projektstamm nach einem `assets/`-Ordner.

```bash
my-docs/
  ├── assets/          # Quell-Assets
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Inhalte
  ├── docmd.config.json
  └── site/            # Build-Ausgabe (automatisch gespiegelt)
```

## Automatisches Kopieren

Wenn Sie `npx @docmd/core build` oder `npx @docmd/core dev` ausführen:
1.  **Die Spiegelungslogik**: Der gesamte Inhalt Ihres `assets/`-Ordners wird rekursiv nach `site/assets/` kopiert.
2.  **Stabilität**: Wir verwenden eine gehärtete Kopier-Engine mit automatischen Wiederholungsversuchen, um „File Busy"- oder „ENOENT"-Fehler auf macOS und modernen SSDs zu verhindern.
3.  **Referenzierung**: Sie sollten Assets aus Ihrem Markdown oder Ihrer Konfiguration immer über den **wurzelrelativen Pfad** referenzieren:
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## Integration von eigenem CSS & JS

Um Ihre Assets mit jeder Seite zu verknüpfen, fügen Sie sie Ihrer Theme-Konfiguration hinzu:

```json
{
  "theme": {
    "customCss": ["/assets/css/branding.css"]
  },
  "customJs": ["/assets/js/utils.js"]
}
```

::: callout info "KI-Erkennungsstrategie :robot:"

*   **Nach Typ organisieren**: Halten Sie `/css`, `/js` und `/images` getrennt. Dies hilft KI-Agenten, relevante Stile oder Skripte sofort zu finden, wenn Sie sie bitten, „die Header-Farbe zu bearbeiten".
*   **Verwenden Sie beschreibende Dateinamen**: Ein Bild `authentication-flow-diagram.png` zu nennen, bietet dem `llms.txt`-Crawler viel mehr Kontext als `img_01.png`.

:::
