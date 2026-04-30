---
title: "UI-Strings Lokalisierung"
description: "Passen Sie die in der docmd-Benutzeroberfläche angezeigten Texte (Such-Platzhalter, Navigations-Labels usw.) durch Konfiguration benutzerdefinierter Übersetzungen an."
---

Obwohl `docmd` über integrierte Übersetzungen für gängige Sprachen verfügt, möchten Sie möglicherweise UI-Texte für ein bestimmtes Projekt anpassen (z. B. "Search" in "In der Doku suchen" ändern).

## Globale Konfiguration

Sie können Übersetzungen für bestimmte Locales direkt in Ihrer `docmd.config.js` definieren.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  locales: {
    en: { title: 'English', label: 'English' },
    de: { title: 'German', label: 'Deutsch' }
  },
  plugins: {
    localisation: {
      translations: {
        de: {
          'search.placeholder': 'Dokumentation durchsuchen...',
          'nav.next': 'Nächste Seite',
          'nav.prev': 'Vorherige Seite',
          'toc.title': 'Auf dieser Seite'
        }
      }
    }
  }
});
```

## Verfügbare UI-Keys

Dies sind die am häufigsten verwendeten UI-Strings, die Sie überschreiben können:

| Key | Standardwert (EN) | Beschreibung |
| :--- | :--- | :--- |
| `search.placeholder` | `Search...` | Platzhalter im Sucheingabefeld. |
| `search.noResults` | `No results found` | Text, wenn keine Übereinstimmungen gefunden wurden. |
| `nav.next` | `Next` | Text für den "Weiter"-Button im Pagination-Bereich. |
| `nav.prev` | `Previous` | Text für den "Zurück"-Button im Pagination-Bereich. |
| `toc.title` | `On this page` | Überschrift über der Inhaltsverzeichnis-Seitenleiste. |
| `theme.light` | `Light` | Label für den hellen Modus im Theme-Switcher. |
| `theme.dark` | `Dark` | Label für den dunklen Modus im Theme-Switcher. |
| `theme.system` | `System` | Label für die Synchronisierung mit dem System im Theme-Switcher. |

## Plugin-Beiträge

Wenn Sie ein [Plugin entwickeln](../../plugins/building-plugins.md), können Sie auch neue Übersetzungsschlüssel über den `translations`-Hook bereitstellen:

```javascript
export default {
  name: 'mein-plugin',
  translations(localeId) {
    if (localeId === 'de') {
      return { 'meinplugin.status': 'Status' };
    }
    return { 'meinplugin.status': 'Status' };
  }
};
```

::: callout tip "KI-Übersetzungshilfe"
Wenn Sie einen KI-Assistenten bitten, Ihrer Website eine neue Sprache hinzuzufügen, stellen Sie ihm diese Liste der UI-Keys zur Verfügung. Dies stellt sicher, dass die KI nicht nur Ihren Inhalt übersetzt, sondern auch einen passenden Satz lokalisierter UI-Strings für Ihre `.config.js`-Datei liefert.
:::