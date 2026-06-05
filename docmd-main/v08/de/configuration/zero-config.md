---
title: "Zero-Config"
description: "Erfahren Sie, wie die Heuristik-Engine von docmd Ihre Website automatisch und ohne Konfigurationsdateien strukturiert."
---

`docmd` verfügt über eine intelligente Heuristik-Engine, die Ihre Dokumentation automatisch analysiert und strukturiert. Sie können mit dem Schreiben, Bereitstellen und Übersetzen Ihrer Dokumentation beginnen, ohne eine einzige Zeile Konfiguration schreiben zu müssen.

## Wie es funktioniert

Wenn das Tool ohne eine `docmd.config.json`-Datei ausgeführt wird, aktiviert die Engine automatisch den **Zero-Config-Modus**. Sie scannt das Workspace-Verzeichnis nach Inhalten und wendet die folgenden Heuristiken an:

### 1. Erkennung des Quellverzeichnisses

Die Engine sucht in dieser Reihenfolge nach Dokumentationsdateien in den folgenden Kandidatenverzeichnissen:
1.  `docs/`
2.  `src/docs/`
3.  `documentation/`
4.  `content/`
5.  `.` (Fallback auf das Stammverzeichnis)

Wenn eines der Kandidatenverzeichnisse gefunden wird und Markdown-Dateien enthält, wird es als Quelle ausgewählt. Wenn kein Verzeichnis gefunden wird, aber das Projektstammverzeichnis Markdown-Dateien enthält, wird das Stammverzeichnis verwendet (wobei `node_modules`, `.git` sowie Ausgabeordner wie `site/`, `dist/` und `out/` automatisch ignoriert werden).

Wenn überhaupt kein Dokumentationsinhalt gefunden wird, initialisiert `docmd` automatisch eine neue Standardstruktur.

### 2. Heuristiken für Versionen und Locales

Die Ordnerstruktur wird gescannt, um Metadaten für Versionierung und Lokalisierung dynamisch zu extrahieren:
-   **Versionen**: Unterverzeichnisse, die auf `v[0-9]+` passen (z. B. `v1.0`, `v08`), werden als Dokumentationsversionen analysiert.
-   **Locales (Sprachen)**: Unterverzeichnisse mit zweistelligen Sprachcodes (z. B. `en`, `de`, `zh`) werden als lokalisierte Varianten behandelt.
-   **Strukturextraktion**: Die höchste Version wird als aktuelles Release festgelegt, und die erste gefundene Sprache (wobei `en` bevorzugt wird, falls vorhanden) wird als Standardsprache festgelegt.

### 3. Automatische Navigationsrouten

Wenn keine Versionen oder Sprachen auf Root-Ebene vorhanden sind, erstellt die Engine dynamisch einen Navigationsbaum, indem sie die Dateistruktur analysiert:
-   Unterverzeichnisse werden Navigationsgruppen zugeordnet.
-   Titel werden dynamisch aus den Dateinamen generiert. Z. B. wird `getting-started.md` als `Getting Started` formatiert.
-   Indexdateien (`index.md`, `README.md`) werden als Startseite des aktuellen Verzeichnisses geroutet.

## Best Practices für Zero-Config

Um den Zero-Config-Modus optimal zu nutzen, beachten Sie folgende Strukturempfehlungen:

-   **Eindeutige Dateibenennung**: Verwenden Sie klare Dateinamen mit Bindestrichen oder in camelCase. Der Autoloader konvertiert diese in lesbare Titel.
-   **Ordnerbasierte Abschnitte**: Platzieren Sie zusammengehörige Dokumente in Unterordnern, um sie automatisch in der Seitenleiste zu gruppieren.
-   **Index-Fallback**: Platzieren Sie immer eine `index.md` oder `README.md` im Stammverzeichnis Ihres Quellordners, um als Startseite zu dienen.
-   **Sauberer Ausgabepfad**: Wenn Sie das Stammverzeichnis `.` als Quelle verwenden, belassen Sie Ihre erstellten Assets im Standardordner `site/`, da dieser automatisch ignoriert wird.
