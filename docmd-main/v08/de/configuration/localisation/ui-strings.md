---
title: "UI-Strings & SEO"
description: "Passen Sie System-UI-Texte pro Locale an und verstehen Sie die automatischen SEO-Tags für mehrsprachige Sites."
---

## Eingebaute Sprachunterstützung

docmd und seine offiziellen Plugins werden mit eingebauten Übersetzungen für gängige Sprachen ausgeliefert. Wenn Sie eine unterstützte Locale konfigurieren, übersetzt die Engine automatisch Systemtexte wie Suchplatzhalter, Navigationsbeschriftungen und Theme-Toggles.

Für nicht unterstützte Sprachen oder benutzerdefinierte Formulierungen fällt das System auf Englisch zurück. Sie können jeden String pro Locale überschreiben.

## Eigene UI-Strings

Verwenden Sie die `translations`-Eigenschaft auf einer beliebigen Locale, um Systemtexte zu überschreiben:

```json
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
```

Die Merge-Reihenfolge ist: **System-Übersetzungen → Plugin-Übersetzungen → Ihre Konfigurations-Übersetzungen**. Ihre Konfiguration gewinnt immer.

## Verfügbare Schlüssel

Anstatt eine Liste verfügbarer Schlüssel fest zu codieren, können Sie den vollständigen Satz unterstützter Sprachen und Übersetzungsschlüssel direkt im docmd-Quell-Repository einsehen.

**[Übersetzungsquelle auf GitHub ansehen](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

Der `fallbackMessage`-Schlüssel unterstützt die Platzhalter `{active}` und `{default}`. Die Engine ersetzt diese zur Build-Zeit durch die Locale-Labels.

## SEO und Hreflang

docmd generiert automatisch `<link rel="alternate" hreflang="...">`-Tags für jede Seite über alle Locales hinweg. Die Standard-Locale erhält zusätzlich den `x-default`-hreflang-Wert.

```html
<!-- Automatisch auf jeder Seite generiert -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

Es ist keine Konfiguration erforderlich. Die Engine injiziert diese Tags auf jeder Seite, wenn i18n aktiviert ist.

::: callout info "noStyle-Seiten" icon:info
Das UI-Strings-System gilt für Seiten mit Theme-Layout. Für noStyle-Seiten mit eigenem HTML siehe [Client-seitige String-Ersetzung](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle).
:::
