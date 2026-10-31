---
title: Referenz der integrierten Variablen
description: Vollständige Referenz aller sofort verfügbaren integrierten Variablen, die von docmd während des Builds und der Laufzeit bereitgestellt werden.
---

# Referenz der integrierten Variablen

docmd registriert bei jedem Build automatisch eine umfassende Sammlung integrierter Variablen. Diese Variablen erfordern keinerlei Konfiguration und können sofort in Markdown-Inhalten, Vorlagen-Bannern, Fußzeilen-Copyright-Angaben und Meta-Tags verwendet werden.

## System- & Build-Variablen

| Variable | Alias | Beispielwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | Die aktuelle Version des docmd-Compilers. |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | Das 4-stellige Kalenderjahr, in dem die Dokumentation erstellt wurde. |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | Das ISO-Datum (YYYY-MM-DD) des Builds. |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | Der vollständige ISO-8601-UTC-Zeitstempel des Builds. |

### Beispiel: Dynamisches Copyright-Jahr in der Fußzeile

Verwenden Sie in Ihrer `docmd.config.json` die Variable `{{ docmd.buildYear }}`, damit Ihr Copyright-Jahr bei jeder Bereitstellung automatisch aktuell bleibt:

```json
{
  "footer": {
    "copyright": "Copyright © {{ docmd.buildYear }} Acme Technologies, Inc. Alle Rechte vorbehalten."
  }
}
```

## Git- & Repository-Metadaten

Wenn Sie innerhalb eines Git-Repositories arbeiten, prüft docmd die Metadaten der Versionskontrolle:

| Variable | Alias | Beispielwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `GIT_COMMIT` | `7a9b1c2` | Der 7-stellige Kurz-SHA des aktuellen Git-Commits. |
| `docmd.gitBranch` | `GIT_BRANCH` | `main` | Der aktuell aktive Git-Branch-Name. |

### Beispiel: Commit- und Build-Informationen anzeigen

```markdown
> Diese Dokumentation wurde aus Commit `{{ docmd.gitCommit }}` auf Branch `{{ docmd.gitBranch }}` am {{ docmd.buildDate }} generiert.
```

## Website- & Seitenkontext-Variablen

docmd stellt kontextbezogene Variablen für das Projekt und das aktuell gerenderte Dokument bereit:

| Variable | Beispielwert | Beschreibung |
| :--- | :--- | :--- |
| `site.title` | `Docmd-Dokumentation` | Der in `docmd.config.json` konfigurierte Titel der Website. |
| `site.base` | `/docs/` | Der konfigurierte Basis-URL-Pfad. |
| `page.title` | `Erste Schritte` | Der Titel der aktuellen Seite (aus Frontmatter oder `# Erste Überschrift`). |
| `page.slug` | `getting-started/installation` | Der relative URL-Pfad oder Slug der aktuellen Seite. |

### Beispiel: Dynamische Hero-Überschrift

```markdown
# Willkommen bei {{ site.title }}

Sie betrachten derzeit **{{ page.title }}** (`{{ page.slug }}`).
```
