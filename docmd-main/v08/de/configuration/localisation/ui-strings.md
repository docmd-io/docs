---
title: "UI-Strings & SEO"
description: "Passen Sie System-UI-Texte pro Sprache an und verstehen Sie automatische SEO-Tags für mehrsprachige Websites."
---

## Integrierter Sprachsupport

`docmd` und seine offiziellen Plugins enthalten integrierte Übersetzungen für gängige Sprachen. Wenn Sie eine unterstützte Sprache konfigurieren, übersetzt die Engine Systemtexte wie Suchplatzhalter, Navigations-Labels und Theme-Umschalter automatisch.

Für nicht unterstützte Sprachen oder benutzerdefinierte Formulierungen greift das System auf Englisch zurück. Sie können jeden String pro Sprache überschreiben.

## Benutzerdefinierte UI-Strings

Verwenden Sie die Eigenschaft `translations` bei einer beliebigen Sprache, um Systemtexte zu überschreiben:

```json
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      {
        "id": "ar",
        "label": "العربية",
        "dir": "rtl",
        "translations": {
          "onThisPage": "في هذه الصفحة",
          "previous": "السابق",
          "next": "التالي",
          "search": "بحث",
          "toggleTheme": "تبديل المظهر",
          "editThisPage": "تعديل هذه الصفحة",
          "selectLanguage": "اختر اللغة",
          "selectVersion": "اختر الإصدار",
          "fallbackMessage": "هذه الصفحة غير متاحة بعد باللغة {active}. عرض اللغة الافتراضية ({default})."
        }
      }
    ]
  }
}
```

Die Zusammenführungsreihenfolge lautet: **Systemübersetzungen → Plugin-Übersetzungen → Ihre Konfigurationsübersetzungen**. Ihre Konfiguration gewinnt immer.

## Verfügbare Schlüssel

Statt eine feste Liste der verfügbaren Schlüssel bereitzustellen, können Sie die vollständige Sammlung der unterstützten Sprachen und Übersetzungsschlüssel direkt im docmd-Quellcode-Repository einsehen.

**[Übersetzungsquellen auf GitHub anzeigen](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

Der Schlüssel `fallbackMessage` unterstützt die Platzhalter `{active}` und `{default}`. Die Engine ersetzt diese zur Build-Zeit durch die entsprechenden Sprach-Labels.

## SEO und Hreflang

`docmd` generiert automatisch `<link rel="alternate" hreflang="...">`-Tags für jede Seite über alle Sprachen hinweg. Die Standardsprache erhält zudem den `x-default` hreflang-Wert.

```html
<!-- Automatisch auf jeder Seite generiert -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

Es ist keine Konfiguration erforderlich. Die Engine fügt diese Tags in jede Seite ein, wenn i18n aktiviert ist.

::: callout info "noStyle-Seiten"
Das UI-Strings-System gilt für Standard-Themen-Layout-Seiten. Für noStyle-Seiten, die benutzerdefiniertes HTML verwenden, siehe [Clientseitige String-Ersetzung](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle).
:::