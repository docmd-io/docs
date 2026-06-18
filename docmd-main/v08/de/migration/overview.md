---
title: "Migrations-Übersicht"
description: "Erfahren Sie, wie Sie Ihre bestehende Dokumentation einfach zu docmd migrieren."
---

# Zu docmd migrieren

docmd bietet eine vollständig automatisierte **Migration-Engine**. Wechseln Sie mit einem einzigen Befehl von Legacy-Plattformen. Die Engine eliminiert die mühselige Arbeit, Markdown-Dateien zu verschieben und Verzeichnisse umzustrukturieren.

## Wie es funktioniert

Der Migrate-Befehl wird:

1.  **Erkennen** Ihrer bestehenden Konfigurationsdatei (z. B. `docusaurus.config.js`, `mkdocs.yml`).
2.  **Extrahieren** von Kern-Metadaten wie dem `title` Ihrer Site.
3.  **Sichern** Ihrer bestehenden Dateien und Verzeichnisse sicher in einem `*-backup/`-Verzeichnis.
4.  **Kopieren** Ihrer Markdown-Inhalte in das Standard `docs/`-Verzeichnis von docmd.
5.  **Generieren** einer frischen `docmd.config.json`, die auf Ihre Inhalte zugeschnitten ist.

Sie können dann sofort `npx @docmd/core dev` ausführen, um Ihre Inhalte gerendert zu sehen.

## Was migriert wird

| Feature | Automatisch migriert? |
| :--- | :--- |
| **Markdown-Dateien** | ✅ Ja, alle `.md` und `.mdx` Dateien werden nach `docs/` verschoben |
| **Verzeichnisstruktur** | ✅ Ja, Ihre Ordner-Verschachtelung bleibt erhalten |
| **Site-Titel** | ✅ Ja, aus Ihrer Konfiguration extrahiert |
| **Container-Syntax** | ✅ Ja, VitePress/Docusaurus-Container funktionieren ohne Änderungen |
| **Navigation / Sidebar** | ⚠️ **Nein**, erfordert manuelles Mapping |
| **Lokalisierung (i18n)** | ⚠️ **Nein**, erfordert manuelles Mapping |
| **Versionierung** | ⚠️ **Nein**, erfordert manuelles Mapping |
| **Eigene React/Vue-Komponenten** | ❌ Nein, diese müssen durch docmd-Container ersetzt werden |

::: callout success "Kompatibilität der Container-Syntax"
Container-Syntax von **VitePress** (`:::tip`, `:::warning`, `:::danger`, `:::info`, `:::details`) und **Docusaurus** (`:::note`, `:::caution`) funktioniert ohne Modifikation. Ihre bestehenden Admonitions und Collapsible-Sections werden in docmd korrekt gerendert.

**MkDocs** verwendet `!!!`-Syntax, die manuelle Konvertierung in das `:::`-Format erfordert.
:::

## Warum Navigation und i18n nicht automatisch migriert werden

Jede Plattform behandelt Navigations-Sidebars, Übersetzungen und Mehrfach-Versionierung anders. Beispielsweise verwendet Docusaurus komplexe JavaScript-Objekte. MkDocs verlässt sich auf streng eingerückte YAML-Strukturen.

Anstatt eine fehlerhafte Migration durch das Erraten komplexer Konfigurationen zu riskieren, verschiebt docmd Ihre Inhalte sicher. Sie müssen Navigation, Lokalisierung und Versionierung nativ mit docmds JSON-basierten APIs konfigurieren.

- **Navigation:** Erfahren Sie, wie Sie eine `navigation.json` in der [Navigations-Einrichtung](../configuration/navigation.md) erstellen.
- **Lokalisierung:** Siehe [Lokalisierungs-Leitfaden](../configuration/localisation/index.md) zur Einrichtung mehrsprachiger Dokumentation.
- **Versionierung:** Siehe [Versionierungs-Einrichtung](../configuration/versioning.md).

## Unterstützte Plattformen

Wählen Sie Ihre aktuelle Plattform für spezifische Migrations-Anweisungen:

- [Migration von Docusaurus](./docusaurus.md)
- [Migration von MkDocs](./mkdocs.md)
- [Migration von VitePress](./vitepress.md)
- [Migration von Astro Starlight](./starlight.md)
