---
title: "Asset-Verwaltung"
description: "Erfahren Sie, wie docmd CSS-, JavaScript- und Bild-Assets aus Quellverzeichnissen in Ausgabebuilds spiegelt."
---

`docmd` verwendet eine "Spiegeln & Zuordnen"-Architektur für statische Assets. Dies stellt sicher, dass lokale Entwicklungsdateipfade nahtlos mit kompilierten Produktions-Build-Ausgaben übereinstimmen.

## Verzeichnisstruktur

Standardmäßig verarbeitet `docmd` ein `assets/`-Verzeichnis im Stammverzeichnis Ihres Projekts:

```bash
my-docs/
  ├── assets/          # Quell-Assets (Bilder, Fonts, CSS, JS)
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Markdown-Inhaltsdateien
  ├── docmd.config.json
  └── site/            # Kompilierte Produktionsausgabe (Automatisch gespiegelt)
```

## Automatische Asset-Spiegelung

Beim Ausführen von `npx @docmd/core build` oder `npx @docmd/core dev`:

1. **Spiegelungslogik**: Der gesamte Inhalt von `assets/` wird rekursiv nach `site/assets/` kopiert.
2. **Build-Stabilität**: Das Kopieren von Assets verwendet eine gehärtete, asynchrone Kopier-Engine mit exponentiellen Wiederholungsversuchen, um Dateisystem-Sperrfehler auf macOS und SSD-Volumes zu verhindern.
3. **Pfadreferenzen**: Referenzieren Sie Assets in Markdown und Konfigurationsdateien mit **stammrelativen** Pfaden:
    ```markdown
    ![Architektur-Diagramm](/assets/images/architecture.png)
    ```

## Integration von eigenem CSS & JS

Verknüpfen Sie benutzerdefinierte Stylesheet- oder Skript-Assets über die Theme-Konfiguration in `docmd.config.json` auf allen Seiten:

```json "docmd.config.json"
{
  "theme": {
    "customCss": ["/assets/css/branding.css"],
    "customJs": ["/assets/js/analytics.js"]
  }
}
```

::: callout tip "Asset-Organisation für KI-Indexierer" icon:lightbulb
* **Strukturierte Unterverzeichnisse**: Halten Sie `/css`, `/js` und `/images` isoliert. Eine saubere Verzeichnistrennung ermöglicht es KI-Agenten, relevante Styling-Assets sofort zu lokalisieren.
* **Beschreibende Dateinamen**: Die Benennung von Bildern wie `authentication-flow-diagram.png` bietet Such-Indexierern und `llms.txt`-Crawlern im Vergleich zu generischen Namen wie `image1.png` reichhaltigen Kontext.
:::

## Öffentliche & statische Root-Assets (`public/`)

Für statische Dateien, die direkt im Stammverzeichnis der Website und nicht unter `/assets/` liegen müssen (wie `robots.txt`, `CNAME`, `funding.json`, Favicons oder Manifeste auf Domain-Ebene), bietet `docmd` eine native **Public Root Assets**-Pipeline.

### Zero-Config Auto-Erkennung

Erstellen Sie einfach ein `public/`-Verzeichnis im Stammverzeichnis Ihres Projekts (oder in Ihrem `docs/`-Inhaltsordner):

```bash
my-docs/
  ├── public/                  # Statische Root-Assets (Zero-Config)
  │   ├── CNAME                # -> https://example.com/CNAME
  │   ├── robots.txt           # -> https://example.com/robots.txt
  │   ├── funding.json         # -> https://example.com/funding.json
  │   ├── .well-known/
  │   │   └── funding.json     # -> https://example.com/.well-known/funding.json
  │   └── work/
  │       └── fund.json        # -> https://example.com/work/fund.json
  ├── assets/                  # Web-Assets (Gespiegelt nach /assets/)
  ├── docs/                    # Markdown-Dokumentation
  ├── docmd.config.json
  └── site/                    # Kompiliertes Build-Verzeichnis
```

Alle Dateien und verschachtelten Verzeichnisstrukturen in `public/` werden automatisch direkt in das Ausgabe-Stammverzeichnis (`site/`) kopiert, sodass Ihre Ordnerstruktur vollständig erhalten bleibt.

### Benutzerdefinierte Konfiguration (`static`)

Sie können festlegen, welche Dateien oder Ordner in das Root-Verzeichnis kopiert werden, indem Sie die Eigenschaft `static` in `docmd.config.json` verwenden:

```json "docmd.config.json"
{
  "static": ["work", "funding.json", "CNAME"]
}
```

* **Beibehaltung der Verzeichnishierarchie**: Die Angabe eines Ordners wie `"work"` behält diesen intakt unter `site/work/...` bei (z. B. wird `work/fund.json` zu `https://example.com/work/fund.json`).
* **Einzel- oder Mehrfachauswahl**: Übergeben Sie einen String oder ein Array von Strings für Verzeichnisse oder einzelne Dateien.
* **Ausfallsicherer Build**: Wenn ein konfigurierter Pfad nicht existiert, gibt `docmd` eine Warnung aus (`[static] Configured path "..." does not exist, skipping.`) und schließt den Build erfolgreich ab, ohne abzubrechen.
* **Deaktivierung**: Um das Kopieren statischer Root-Dateien vollständig zu deaktivieren, setzen Sie `"static": false`.

### Live-Updates im Entwicklungsserver

Während der lokalen Entwicklung mit `docmd dev` überwacht der Entwicklungsserver automatisch `public/` und alle konfigurierten statischen Verzeichnisse. Hinzugefügte, geänderte oder gelöschte Dateien lösen sofort einen Rebuild und ein Neuladen im Browser aus.