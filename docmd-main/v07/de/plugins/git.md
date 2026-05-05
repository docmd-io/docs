---
title: "Git-Plugin"
description: "Zeigt Zeitstempel der letzten Aktualisierung und Commit-Verlauf direkt aus Ihrem Git-Repository an."
---

Das **Git-Plugin** fügt Ihren Dokumentationsseiten Repository-basierte Metadaten hinzu. Es zeigt an, wann jede Seite zuletzt geändert wurde, wer beigetragen hat, und bietet optional einen "Diese Seite bearbeiten"-Link - alles direkt aus Ihrem Git-Verlauf ohne Konfiguration.

::: callout info "Core-Plugin"
Das Git-Plugin ist in `@docmd/core` enthalten und standardmäßig aktiviert. Es erkennt automatisch, ob sich Ihr Projekt in einem Git-Repository befindet, und deaktiviert sich selbst, wenn nicht. Für die Grundfunktionalität ist keine Installation oder Konfiguration erforderlich.
:::

## Funktionen

### Zeitstempel der letzten Aktualisierung

Jede Seite zeigt automatisch an, wann sie zuletzt geändert wurde. Der Zeitstempel wird aus dem letzten Git-Commit abgeleitet, der die Quelldatei betrifft.

<!-- SCREENSHOT: Seitenfußzeile mit "Zuletzt aktualisiert: vor 3 Tagen" links und "Diese Seite bearbeiten" rechts -->

Zeitstempel verwenden relative Formatierung für aktuelle Änderungen ("vor 2 Std.", "vor 3 T.") und wechseln zu absoluten Daten für ältere Inhalte ("15. März 2026").

### Commit-Verlauf-Tooltip

Bewegen Sie den Mauszeiger über den Text "Zuletzt aktualisiert", um einen Tooltip mit den letzten Commits für diese Seite anzuzeigen. Jeder Eintrag zeigt die Commit-Nachricht, den Autor und den relativen Zeitstempel.

<!-- SCREENSHOT: Commit-Verlauf-Tooltip mit 4-5 aktuellen Commits mit Autor-Avataren und Nachrichten -->

Dies bietet schnellen Kontext über aktuelle Änderungen, ohne die Seite zu verlassen - nützlich, um zu verstehen, was aktualisiert wurde und von wem.

### Bearbeitungslinks

Bei Konfiguration mit einer Repository-URL zeigt das Plugin einen "Diese Seite bearbeiten"-Link an, der die Quelldatei direkt im Web-Editor Ihres Git-Anbieters öffnet.

```javascript
plugins: {
  git: {
    repo: 'https://github.com/ihre-org/ihre-docs',
    branch: 'main'
  }
}
```

Das Plugin erkennt automatisch GitHub-, GitLab- und Bitbucket-URLs und erstellt das korrekte Bearbeitungslink-Format für jeden Anbieter.

## Konfiguration

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | Repository-URL (z.B. `https://github.com/org/repo`). Erforderlich für Bearbeitungslinks. |
| `branch` | `string` | `'main'` | Branch-Name für Bearbeitungslinks. |
| `editLink` | `boolean` | `true` | "Diese Seite bearbeiten"-Link anzeigen, wenn `repo` gesetzt ist. |
| `lastUpdated` | `boolean` | `true` | Zeitstempel der letzten Aktualisierung anzeigen. |
| `commitHistory` | `boolean` | `true` | Commit-Verlauf-Tooltip beim Hovern anzeigen. |
| `maxCommits` | `number` | `6` | Maximale Anzahl der Commits im Tooltip. |

### Vollständiges Beispiel

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    git: {
      repo: 'https://github.com/docmd-io/docs',
      branch: 'main',
      editLink: true,
      lastUpdated: true,
      commitHistory: true,
      maxCommits: 5
    }
  }
});
```

## Seitenspezifische Steuerung

Deaktivieren Sie das Git-Plugin für bestimmte Seiten über Frontmatter:

```markdown
---
title: "Interne Notizen"
plugins:
  git: false
---

Diese Seite zeigt keine Zeitstempel oder Bearbeitungslinks an.
```

## Funktionsweise

Das Plugin liest den Git-Verlauf zur Build-Zeit mit Standard-Git-Befehlen. Für jede Markdown-Datei:

1. Führt `git log` aus, um den Commit-Verlauf abzurufen
2. Extrahiert Zeitstempel, Autoren und Commit-Nachrichten
3. Fügt die Daten in den Seitenkontext ein
4. Client-seitiges JavaScript rendert die UI-Komponenten

::: callout tip "Performance"
Git-Daten werden während des Build-Prozesses gecacht. Der Verlauf jeder Datei wird nur einmal abgefragt, unabhängig davon, wie oft die Seite gerendert wird (z.B. über mehrere Sprachen hinweg).
:::

## Anforderungen

- Die Dokumentationsquelle muss sich in einem Git-Repository befinden
- Git muss in der Build-Umgebung verfügbar sein
- Dateien müssen mindestens einen Commit in ihrem Verlauf haben

Seiten ohne Git-Verlauf (neue, noch nicht committete Dateien) zeigen keine Zeitstempel oder Commit-Verlauf an.

## Migration von editLink

Wenn Sie zuvor die `editLink`-Konfigurationsoption verwendet haben, bietet das Git-Plugin dieselbe Funktionalität mit zusätzlichen Features:

**Vorher (editLink-Konfiguration):**
```javascript
export default defineConfig({
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/org/repo/edit/main/docs',
    text: 'Diese Seite bearbeiten'
  }
});
```

**Nachher (Git-Plugin):**
```javascript
export default defineConfig({
  plugins: {
    git: {
      repo: 'https://github.com/org/repo',
      branch: 'main'
    }
  }
});
```

Das Git-Plugin erstellt automatisch die Bearbeitungs-URL aus Repository und Branch, sodass Sie den vollständigen Bearbeitungspfad nicht mehr manuell angeben müssen.

::: callout warning "Hinweis zur Veraltung"
Die eigenständige `editLink`-Konfigurationsoption ist veraltet und wird in einer zukünftigen Version entfernt. Bitte migrieren Sie zum Git-Plugin für die Bearbeitungslink-Funktionalität.
:::

## Lokalisierung

Das Plugin enthält Übersetzungen für alle UI-Strings. Unterstützte Sprachen:

- Englisch (en)
- Deutsch (de)
- Chinesisch (zh)

Benutzerdefinierte Übersetzungen können über das Standard-[UI-Strings](../configuration/localisation/ui-strings.md)-System bereitgestellt werden.
