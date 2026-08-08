---
title: "Entwicklungs-Setup"
description: "So richten Sie die lokale Entwicklung ein, verknüpfen lokale Framework-Builds und führen Verifizierungs-Pipelines für die docmd-Dokumentation aus."
---

# Entwicklungs-Setup

::: callout info "Beitrag zum docmd-Kern" icon:git-pull-request
Möchten Sie zum docmd-Kernframework beitragen? Siehe den [GitHub-Contributing-Leitfaden](external:https://github.com/docmd-io/docmd?tab=contributing-ov-file) für Anweisungen zur Einrichtung des Repositorys.
:::

Dieser Leitfaden behandelt das Erstellen und Aktualisieren dieses Dokumentations-Repositorys (`docmd-io/docs`).

## Voraussetzungen

* **Node.js**: v22.x oder neuer (LTS empfohlen)
* **pnpm**: v10.x oder neuer

## Lokale Entwicklung

```bash
git clone https://github.com/docmd-io/docs.git
cd docs
pnpm install
npx @docmd/core dev
```

Der lokale Entwicklungsserver startet unter `http://localhost:3000` mit sofortigem Hot Module Replacement (HMR).

### Verknüpfung von lokalem Framework-Code

Um lokale Änderungen innerhalb von `docmd-io/docmd` gegen diese Dokumentations-Website zu testen:

```bash
# Im docmd-Framework-Repository
pnpm build

# In diesem Dokumentations-Website-Repository den lokalen Build verknüpfen
npx @docmd/core link ../docmd/packages/core
```

Starten Sie `npx @docmd/core dev` neu, um lokale Framework-Build-Aktualisierungen anzuwenden.

## Qualitäts-Gates

Führen Sie die Verifizierungs-Pipeline vor dem Einreichen von Pull Requests aus:

```bash
# Markdown-Dateien linten und Link-Integrität prüfen
pnpm lint

# Vollständige Verifizierungs-Pipeline ausführen (Lint + Build + Dead-Link-Check)
pnpm verify
```

## Übersetzungs-Workflow

Workflow zum Hinzufügen oder Aktualisieren von lokalisierten Inhalten in `de/` und `zh/`:

1. Aktualisieren Sie die kanonischen englischen Quelldateien in `docmd-main/v09/en/...`.
2. Spiegeln Sie Bearbeitungen in `de/` und `zh/` unter übereinstimmenden Pfaden, während Frontmatter-Schlüssel, Container-Marker und Code-Snippet-Dateititel erhalten bleiben.
3. Führen Sie `pnpm verify` aus, um die Link-Integrität zu bestätigen.

## Projekt-Verzeichnislayout

```text
docs/
├── docmd-main/v09/
│   ├── en/                  # Kanonische englische Quelle
│   ├── de/                  # Deutsche Übersetzungen (spiegelt en/)
│   ├── zh/                  # Chinesische Übersetzungen (spiegelt en/)
│   └── navigation.json      # Gemeinsame Navigationshierarchie
├── docmd-search/            # Suchmaschinen-Assets
├── docs/                    # Unterprojekt-Ziele
└── package.json
```

## Was kommt als Nächstes

- [Plugins entwickeln](./building-plugins.md) — schreiben Sie ein benutzerdefiniertes docmd-Plugin.
- [Plugin-Beispiele](./plugin-examples.md) — sehen Sie einen vollständigen Plugin-Walkthrough.
- [Templates entwickeln](./building-templates.md) — erstellen Sie ein docmd-Template.
- [Node-API-Referenz](./node-api-reference.md) — programmatische Build-API.