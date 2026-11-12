---
title: Referenz der integrierten Variablen
description: Vollständige Referenz aller sofort verfügbaren integrierten Variablen in docmd zur Build-Zeit und im Browser.
---

# Referenz der integrierten Variablen

docmd registriert bei jedem Build automatisch eine Reihe integrierter Variablen. Diese Variablen erfordern keinerlei Konfiguration und stehen sofort in Markdown-Dateien, Bannern, Fußzeilen und Metatags zur Verfügung.

## System- & Build-Variablen

| Variable | Alias | Beispielwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | Die aktuelle Compiler-Version von docmd. |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | Das 4-stellige Kalenderjahr des aktuellen Builds. |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | Das ISO-Datum (JJJJ-MM-TT) des Builds. |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | Der vollständige ISO-8601 UTC-Zeitstempel. |

::: callout info "Live ausgewertete System-Variablen" icon:sparkles
Diese Werte werden in diesem Dokumentations-Build live bereitgestellt:
- **Compiler-Version:** `v{{ docmd.version }}`
- **Kalenderjahr:** `{{ docmd.buildYear }}`
- **Build-Zeitstempel:** `{{ docmd.buildTime }}`
:::

### Dynamisches Copyright-Jahr in der Fußzeile

Verwenden Sie `\{{ docmd.buildYear }}` in Ihrer `docmd.config.json`, damit das Copyright-Jahr bei jedem Deployment aktuell bleibt:

```json
{
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} Acme Technologies. Alle Rechte vorbehalten."
  }
}
```

## Git- & Repository-Metadaten

Befindet sich das Projekt in einem Git-Repository, extrahiert docmd Versionskontroll-Metadaten:

| Variable | Alias | Beispielwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `git.commit`, `GIT_COMMIT` | `7a9b1c2` | Der 7-stellige Kurz-SHA des aktuellen Git-Commits. |
| `docmd.gitBranch` | `git.branch`, `GIT_BRANCH` | `main` | Der Name des aktuell aktiven Git-Branches. |

### Commit-Informationen in Markdown einbinden

Nutzen Sie die Template-Syntax in Markdown-Dateien:

```markdown
> Diese Dokumentation wurde aus Commit `\{{ docmd.gitCommit }}` auf Branch `\{{ docmd.gitBranch }}` am \{{ docmd.buildDate }} generiert.
```

::: callout info "Live Git-Metadaten" icon:git-branch
Diese Dokumentationsseite wurde aus Commit `{{ docmd.gitCommit || 'HEAD' }}` auf Branch `{{ docmd.gitBranch || 'main' }}` am {{ docmd.buildDate }} erstellt.
:::

## Site- & Seiten-Kontextvariablen

docmd stellt kontextbezogene Variablen für das Projekt und das aktuell verarbeitete Dokument bereit:

| Variable | Beispielwert | Beschreibung |
| :--- | :--- | :--- |
| `site.title` | `docmd docs` | Der in `docmd.config.json` konfigurierte Site-Titel. |
| `site.base` | `/` | Der konfigurierte Basis-URL-Pfad. |
| `page.title` | `Referenz der integrierten Variablen` | Der Titel der aktuellen Seite (aus Frontmatter oder Überschrift). |
| `page.slug` | `variables/built-in-variables` | Der relative URL-Pfad der aktuellen Seite ohne Dateiendung. |
| `page.path` | `variables/built-in-variables.md` | Der relative Dateipfad der Quell-Markdown-Datei. |

### Dynamischer Header-Kontext

```markdown
# Willkommen bei \{{ site.title }}

Sie betrachten derzeit **\{{ page.title }}** (`\{{ page.slug }}`).
```

::: card "Aktueller Seitenkontext" icon:file-text
- **Seitentitel:** {{ page.title }}
- **Seiten-Slug:** `{{ page.slug }}`
- **Dateipfad:** `{{ page.path }}`
- **Site-Titel:** {{ site.title }}
- **Site-Basis:** `{{ site.base || '/' }}`
:::

::: callout tip "Verwendung in Konfigurationsfeldern" icon:lightbulb
Alle integrierten Variablen können direkt in Feldern wie `layout.banners.top.content` oder `footer.copyright` referenziert werden.
:::
