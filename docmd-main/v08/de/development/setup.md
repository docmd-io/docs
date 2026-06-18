---
title: "Setup"
description: "Diese Dokumentations-Site lokal ausführen, mit Ihrer globalen docmd-Installation verknüpfen und die gesamte Verifizierungs-Pipeline laufen lassen."
---

# Setup

> **Für Mitwirkende an der Dokumentations-Site.** Möchten Sie zu *docmd selbst* (dem Framework) beitragen? Sehen Sie stattdessen den [GitHub-Contributing-Leitfaden](https://github.com/docmd-io/docmd?tab=contributing-ov-file) an — dort befindet sich der Framework-Entwicklungs-Workflow.

Diese Seite behandelt die Arbeit an **dieser Dokumentations-Site** (`docmd-io/docs`), nicht am docmd-Framework (`docmd-io/docmd`).

## Voraussetzungen

- **Node.js**: v22.x oder neuer (LTS empfohlen)
- **pnpm**: v10.x oder neuer

## Lokale Entwicklung

```bash
git clone https://github.com/docmd-io/docs.git
cd docs
pnpm install
npx @docmd/core dev
```

Die Site wird unter `http://localhost:3000` mit Live-Reload ausgeliefert.

### Framework lokal beobachten

Wenn Sie Framework-Code in `docmd-io/docmd` bearbeiten und die Änderungen in dieser Dokumentations-Site sehen möchten:

```bash
# Im Framework-Repo
pnpm build

# In diesem Docs-Repo den lokalen Build verknüpfen
npx @docmd/core link ../docmd/packages/core
```

Starten Sie dann `npx @docmd/core dev` neu. Ihre Änderungen am Framework werden nach einem Framework-Rebuild übernommen.

## Qualitäts-Gates

Bevor Sie einen Pull Request öffnen:

```bash
# Markdown linten und auf defekte Links prüfen
pnpm lint

# Vollständige Verifizierungs-Pipeline (Lint + Build + Dead-Link-Check)
pnpm verify
```

Die Verifizierungs-Pipeline spiegelt, was die Maintainer bei jedem PR ausführen. Ein grüner Durchlauf ist Voraussetzung für einen Merge.

## Übersetzungen

Übersetzungs-Workflow zum Hinzufügen/Aktualisieren von `de/`- und `zh/`-Inhalten:

1. Bearbeiten Sie die EN-Quelle in `docmd-main/v08/en/...`.
2. Spiegeln Sie die Änderung in `de/` und `zh/` (gleicher Pfad, übersetzte Prosa, erhaltene Frontmatter-Schlüssel, erhaltene Container-Marker, Code-Blöcke unverändert).
3. Behalten Sie alle Datei-Titel in Code-Blöcken (z. B. ` ```json "docmd.config.json"`).
4. Führen Sie `pnpm verify` aus, um zu bestätigen, dass Links und Struktur weiterhin passen.

Die Übersetzungs-Hausstil-Regeln und die Codeblock-Datei-Titel-Regel finden Sie im Projektspeicher.

## Projekt-Layout

```
docs/
├── docmd-main/v08/
│   ├── en/                  # Kanonische englische Quelle
│   ├── de/                  # Deutsche Übersetzungen (spiegelt en/)
│   ├── zh/                  # Chinesische Übersetzungen (spiegelt en/)
│   └── navigation.json      # Eine Navigation, pro Locale repliziert
├── docmd-search/            # Suchindex-Assets
├── docs/                    # Andere Doc-Projekte (docmd-search, docmd-main usw.)
└── package.json
```

## Nächste Schritte

- [Plugins entwickeln](/development/building-plugins) — schreiben Sie ein benutzerdefiniertes docmd-Plugin.
- [Plugin-Beispiele](/development/plugin-examples) — sehen Sie einen vollständigen Plugin-Walkthrough.
- [Templates entwickeln](/development/building-templates) — erstellen Sie ein docmd-Template.
- [Node-API-Referenz](/development/node-api-reference) — programmatische Build-API.
