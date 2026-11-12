---
title: "Migrations-Übersicht"
description: "Erfahren Sie, wie Sie Ihr bestehendes Dokumentationsprojekt mit der integrierten Migrations-CLI-Engine einfach zu docmd migrieren."
---

`docmd` bietet eine automatisierte **Migrations-Engine**, die Ihre Dokumentation mit einem einzigen Befehl von Legacy-Plattformen überführt. Die Engine eliminiert das manuelle Kopieren von Dateien und das Umstrukturieren von Verzeichnissen.

## Wie es funktioniert

::: steps

1. **Quellkonfiguration erkennen**: Die Engine identifiziert bestehende Framework-Konfigurationsdateien (z. B. `docusaurus.config.js`, `mkdocs.yml`, `.vitepress/config.js` oder `astro.config.mjs`).
2. **Metadaten & Projektstruktur extrahieren**: Kern-Website-Eigenschaften wie `title`, Ausgabepfade und Navigationsblöcke der obersten Ebene werden automatisch extrahiert.
3. **Bestehende Dateien sichern**: Ihr ursprüngliches Projektverzeichnis (ausgenommen `node_modules`, `.git`, `package.json` und Paketmanager-Lockfiles) wird sicher in ein `*-backup/`-Verzeichnis gesichert.
4. **Dokumentationsinhalte wiederherstellen**: Markdown-Quellinhalte werden extrahiert und in das Standard-`docmd`-Stammverzeichnis `docs/` verschoben.
5. **`docmd.config.json` generieren**: Eine neue `docmd.config.json` wird mit Optionen generiert, die direkt aus Ihrer ursprünglichen Konfiguration extrahiert wurden.

:::

::: callout tip "Trockenlauf-Migrations-Vorschau" icon:help-circle
Fügen Sie `--dry-run` an einen beliebigen Migrationsbefehl an, um geplante Dateibewegungen und die generierte Konfiguration in der Vorschau anzuzeigen, ohne Änderungen auf die Festplatte zu schreiben:
```bash
npx @docmd/core migrate --docusaurus --dry-run
```
:::

Sie können direkt nach der Migration `npx @docmd/core dev` ausführen, um Ihre Website anzuzeigen.

## Matrix der automatisierten Funktions-Unterstützung

| Funktion | Automatisierte Unterstützung | Details |
| :--- | :---: | :--- |
| **Markdown-Dateien** | ✅ Ja | Verschiebt alle `.md`- und `.mdx`-Inhalte nach `docs/` |
| **Verzeichnisstruktur** | ✅ Ja | Bewahrt die bestehende Ordnerhierarchie |
| **Website-Metadaten** | ✅ Ja | Extrahiert Website-`title` und Ausgabeverzeichnisse |
| **Container-Syntax** | ✅ Ja | Native Unterstützung für VitePress- und Docusaurus-Admonition-Container |
| **Navigation / Seitenleiste** | ⚠️ Teilweise | Übersetzt MkDocs-`nav:`-Blöcke automatisch; andere Frameworks erfordern `navigation.json` |
| **Lokalisierung (i18n)** | ⚠️ Manuell | Erfordert die Zuordnung von Verzeichnis-Locales in `docmd.config.json` |
| **Versionierung** | ⚠️ Manuell | Erfordert das Platzieren versionierter Inhalte in `vXX/`-Unterverzeichnissen |
| **React- / Vue-Komponenten** | ❌ Manuell | Framework-Komponenten müssen durch native `docmd`-Container ersetzt werden |

::: callout success "Kompatibilität der Container-Syntax" icon:check-circle
Die Container-Syntax von **VitePress** (`:::tip`, `:::warning`, `:::danger`, `:::info`, `:::details`) und **Docusaurus** (`:::note`, `:::caution`) funktioniert direkt nach der Installation. Bestehende Admonitions werden ohne manuelle Bearbeitung gerendert.

**MkDocs** verwendet die `!!!`-Syntax, die eine Konvertierung in das standardmäßige `:::`-Format erfordert.
:::

## Navigations- und Lokalisierungs-Einrichtung

Da jedes Framework Navigations-Seitenleisten, Übersetzungen und Multi-Versionierung unterschiedlich strukturiert, verschiebt `docmd` Ihre Rohinhalte sicher, sodass Sie Navigation und i18n mithilfe des JSON-Schemas von `docmd` konfigurieren können:

- **Navigation:** Erfahren Sie im [Navigations-Leitfaden](../configuration/navigation.md), wie Sie Seitenleisten-Links definieren.
- **Lokalisierung:** Konfigurieren Sie mehrsprachige Dokumentation im [Lokalisierungs-Leitfaden](../configuration/localisation/index.md).
- **Versionierung:** Strukturieren Sie versionierte Dokumentation in der [Versionierungs-Einrichtung](../configuration/versioning.md).

## Unterstützte Migrations-Ziele

::: grids
    ::: grid
        ::: card "Docusaurus" icon:arrow-right-left
        Migrieren Sie von Docusaurus v2/v3 React-Dokumentations-Websites.
        [Leitfaden lesen](./docusaurus.md)
        :::
    :::
    ::: grid
        ::: card "MkDocs" icon:arrow-right-left
        Migrieren Sie von MkDocs- und Material for MkDocs Python-Projekten.
        [Leitfaden lesen](./mkdocs.md)
        :::
    :::
    ::: grid
        ::: card "VitePress" icon:arrow-right-left
        Migrieren Sie von Vue-gestützten VitePress-Dokumentations-Setups.
        [Leitfaden lesen](./vitepress.md)
        :::
    :::
    ::: grid
        ::: card "Astro Starlight" icon:arrow-right-left
        Migrieren Sie von Astro Starlight Framework-Projekten.
        [Leitfaden lesen](./starlight.md)
        :::
    :::
:::