---
title: "Migrationsübersicht"
description: "Erfahren Sie, wie Sie Ihre bestehende Dokumentation einfach auf docmd migrieren können."
---

# Migration zu docmd

`docmd` bietet eine vollautomatische **Migrations-Engine**, mit der Sie mit nur einem einzigen Befehl von alten oder konkurrierenden Dokumentationsplattformen wechseln können. Das Ziel der Migrations-Engine ist es, Ihnen die mühsame Arbeit des Verschiebens von Markdown-Dateien und der Umstrukturierung Ihres Projektverzeichnisses abzunehmen.

## Wie es funktioniert

Der Migrationsbefehl führt Folgendes aus:

1. **Erkennt** Ihre bestehende Konfigurationsdatei (z.B. `docusaurus.config.js`, `mkdocs.yml`).
2. **Extrahiert** grundlegende Metadaten wie den `title` Ihrer Website.
3. **Sichert** Ihre bestehenden Dateien und Verzeichnisse sicher in einem `*-backup/`-Verzeichnis (z.B. `docusaurus-backup/`).
4. **Kopiert** Ihre Markdown-Inhalte in das standardmäßige `docmd` `docs/`-Verzeichnis.
5. **Erzeugt** eine neue, speziell auf Ihre Inhalte zugeschnittene `docmd.config.js`.

Anschließend können Sie direkt `npx @docmd/core dev` ausführen, um Ihre Inhalte sofort in der `docmd`-Engine zu sehen.

## Was wird migriert?

| Funktion | Automatisch migriert? |
| :--- | :--- |
| **Markdown-Dateien** | ✅ Ja, alle `.md` und `.mdx` Dateien werden nach `docs/` verschoben |
| **Verzeichnisstruktur** | ✅ Ja, Ihre Ordner-Verschachtelung bleibt erhalten |
| **Website-Titel** | ✅ Ja, aus Ihrer Konfiguration extrahiert |
| **Navigation / Sidebar** | ⚠️ **Nein**, erfordert eine manuelle Zuordnung |
| **Lokalisierung (i18n)** | ⚠️ **Nein**, erfordert eine manuelle Zuordnung |
| **Versionierung** | ⚠️ **Nein**, erfordert eine manuelle Zuordnung |
| **Eigene React/Vue-Komponenten** | ❌ Nein, diese müssen durch `docmd` Container ersetzt werden |

## Warum Navigation und i18n nicht automatisch migriert werden

Jede Dokumentationsplattform behandelt Navigations-Sidebars, Übersetzungen und Multi-Versionierung unterschiedlich. Beispielsweise verwendet Docusaurus komplexe JavaScript-Objekte oder automatisch generierte Sidebars, während MkDocs auf strikt eingerückte YAML-Strukturen setzt.

Um fehlerhafte Migrationen durch das Erraten komplexer Konfigurationen zu vermeiden, verschiebt `docmd` Ihre Inhalte sicher und bittet Sie darum, die Navigation, Lokalisierung und Versionierung mithilfe der einfachen JSON-basierten APIs von `docmd` nativ zu konfigurieren.

- **Navigation:** Erfahren Sie unter [Navigations-Setup](../configuration/navigation.md), wie Sie eine `navigation.json` erstellen.
- **Lokalisierung:** Lesen Sie den [Leitfaden zur Lokalisierung](../configuration/localisation/index.md), um mehrsprachige Dokumentationen einzurichten.
- **Versionierung:** Beziehen Sie sich auf das [Versions-Setup](../configuration/versioning.md).

## Unterstützte Plattformen

Wählen Sie Ihre aktuelle Plattform für spezifische Migrationsanweisungen aus:

- [Von Docusaurus migrieren](./docusaurus.md)
- [Von MkDocs migrieren](./mkdocs.md)
- [Von VitePress migrieren](./vitepress.md)
- [Von Astro Starlight migrieren](./starlight.md)
