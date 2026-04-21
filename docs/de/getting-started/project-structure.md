---
title: "Projektstruktur"
description: "Wie docmd Ihre Dateien und Ordner auf Seiten, URLs und Navigation abbildet."
---

docmd verwendet Ihr Dateisystem als Quelle der Wahrheit. Ordner werden zu Abschnitten, Markdown-Dateien zu Seiten und die Verzeichnishierarchie definiert die URL-Routen.

<!-- SCREENSHOT: VS Code oder Dateiexplorer, der die Standard-docmd-Projektstruktur zeigt — docs/-Ordner mit Markdown-Dateien, docmd.config.js im Stammverzeichnis und assets/-Verzeichnis. -->

## Ein Projekt initialisieren

```bash
mkdir meine-dokumentation && cd meine-dokumentation
npx @docmd/core init
```

Dies erstellt das Standard-Projektgerüst:

```text
meine-dokumentation/
├── docs/               ← Quellverzeichnis. Ihre .md-Dateien kommen hierher.
│   └── index.md        ← Startseite (/)
├── assets/             ← Statische Assets (Bilder, eigenes CSS/JS)
│   ├── css/
│   ├── js/
│   └── images/
├── docmd.config.js     ← Konfigurationsdatei
├── package.json        ← Projektmetadaten und Skripte
└── site/               ← Generierte Ausgabe (nach dem Build)
```

<!-- SCREENSHOT: Screenshot des Terminals nach dem Ausführen von npx @docmd/core init, der den generierten Dateibaum zeigt -->

## Datei-zu-URL-Mapping

docmd bildet Ihre `docs/`-Verzeichnisstruktur direkt auf URLs ab:

| Datei | URL |
|:-----|:----|
| `docs/index.md` | `/` |
| `docs/api.md` | `/api` |
| `docs/guides/setup.md` | `/guides/setup` |

::: callout tip "Automatische Titel"
Wenn ein Seitentitel nicht im Frontmatter definiert ist, extrahiert docmd die erste `H1`-Überschrift als Titel.
:::

## Entwicklungsserver starten

```bash
npx @docmd/core dev
```

Öffnet `http://localhost:3000` mit Live-Reload. Änderungen an `.md`-Dateien oder der `docmd.config.js` werden sofort übernommen.

## Für die Produktion erstellen

```bash
npx @docmd/core build
```

Gibt eine statische Website in `./site/` aus. Die Ausgabe besteht ausschließlich aus statischem HTML — stellen Sie sie auf GitHub Pages, Vercel, Netlify oder einem beliebigen statischen Host bereit.

Vor der Bereitstellung lokal überprüfen:

```bash
npx serve site
```