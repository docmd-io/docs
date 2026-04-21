---
title: "UI-Strings & SEO"
description: "Passen Sie System-UI-Texte pro Sprache an und verstehen Sie die automatischen SEO-Tags für mehrsprachige Websites."
---

## Integrierte Sprachunterstützung

docmd und seine offiziellen Plugins (Search, Threads usw.) werden mit integrierten Übersetzungen für gängige Sprachen ausgeliefert. Wenn Sie eine unterstützte Sprache konfigurieren, werden alle Systemtexte — Such-Platzhalter, Navigations-Labels, Theme-Umschalter — automatisch übersetzt.

Für nicht unterstützte Sprachen oder benutzerdefinierte Formulierungen fällt das System auf Englisch zurück. Sie können jeden String pro Sprache überschreiben.

## Benutzerdefinierte UI-Strings

Verwenden Sie die Eigenschaft `translations` bei jedem Sprachobjekt, um Systemtexte zu überschreiben:

```js
export default {
  i18n: {
    default: 'en',
    locales: [
      { id: 'en', label: 'English' },
      {
        id: 'ar',
        label: 'العربية',
        dir: 'rtl',
        translations: {
          onThisPage: 'في هذه الصفحة',
          previous: 'السابق',
          next: 'التالي',
          search: 'بحث',
          toggleTheme: 'تبديل المظهر',
          editThisPage: 'تعديل هذه الصفحة',
          selectLanguage: 'اخter اللغة',
          selectVersion: 'اختر الإصدار',
          fallbackMessage: 'هذه الصفحة غير متاحة بعد باللغة {active}. عرض اللغة الافتراضية ({default}).'
        }
      }
    ]
  }
}
```

Die Reihenfolge der Zusammenführung ist: **System-Übersetzungen → Plugin-Übersetzungen → Ihre Konfigurations-Übersetzungen**. Ihre Konfiguration gewinnt immer.

## Verfügbare Schlüssel

| Schlüssel | Standard (Englisch) |
|:----|:-------------------|
| `skipToContent` | Zum Hauptinhalt springen |
| `toggleSidebar` | Seitenleiste umschalten |
| `previous` | Vorherige |
| `next` | Nächste |
| `onThisPage` | Auf dieser Seite |
| `search` | Suche |
| `toggleTheme` | Theme umschalten |
| `selectLanguage` | Sprache wählen |
| `selectVersion` | Version wählen |
| `editThisPage` | Diese Seite bearbeiten |
| `builtWith` | Erstellt mit |
| `copyCode` | Code kopieren |
| `copiedToClipboard` | Kopiert! |
| `mainNavigation` | Hauptnavigation |
| `fallbackMessage` | Diese Seite ist noch nicht in {active} verfügbar. Es wird die Standardsprache ({default}) angezeigt. |

Der Schlüssel `fallbackMessage` unterstützt die Platzhalter `{active}` und `{default}`, die zur Build-Zeit durch die Sprachlabels ersetzt werden.

## SEO und hreflang

docmd generiert automatisch `<link rel="alternate" hreflang="...">`-Tags für jede Seite über alle Sprachen hinweg. Die Standardsprache erhält zusätzlich den Wert `x-default` für hreflang.

```html
<!-- Automatisch generiert auf jeder Seite -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

Es ist keine Konfiguration erforderlich — diese Tags werden in jede Seite eingefügt, wenn i18n aktiviert ist.

::: callout info "noStyle-Seiten"
Das oben beschriebene UI-String-System gilt für thematisierte Layout-Seiten (serverseitig). Für noStyle-Seiten, die benutzerdefiniertes HTML verwenden, siehe das [clientseitige String-Ersetzungssystem](/content/no-style-pages#string-replacement-i18n-for-nostyle), das `data-i18n`-Attribute und JSON-Dateien in `assets/i18n/` verwendet.
:::