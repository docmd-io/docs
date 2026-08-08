---
title: "UI-Strings & SEO-Lokalisierung"
description: "Passen Sie System-UI-Texte pro Locale an und verstehen Sie automatisierte hreflang-SEO-Meta-Tags in docmd."
---

`docmd` wird mit eingebauten Übersetzungen für gängige System-Strings in wichtigen Sprachen ausgeliefert. Bei der Konfiguration einer unterstützten Locale werden Systembeschriftungen — wie Suchplatzhalter, Navigationsschaltflächen und Theme-Modus-Umschalter — automatisch übersetzt.

Für nicht unterstützte Sprachen oder benutzerdefinierte Formulierungen fällt das System auf Englisch zurück, ermöglicht jedoch benutzerdefinierte String-Überschreibungen pro Locale.

## Anpassen von UI-Strings

Definieren Sie benutzerdefinierte Beschriftungen im `translations`-Objekt einer beliebigen Locale-Konfiguration:

```json "docmd.config.json"
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

Die Auflösung von Übersetzungen folgt einer strikten Prioritätsreihenfolge: **Systemstandards → Plugin-Strings → Konfigurationsüberschreibungen**. Die Benutzerkonfiguration hat immer die höchste Priorität.

## Verfügbare Übersetzungsschlüssel

Der vollständige Satz unterstützter Sprachen und Systemübersetzungsschlüssel ist direkt im Core-Quell-Repository verfügbar:

**[Übersetzungsquelle auf GitHub ansehen](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

Die Zeichenfolge `fallbackMessage` unterstützt die Vorlagen-Platzhalter `{active}` und `{default}`, die zur Build-Zeit dynamisch durch aktive Locale-Beschriftungen ersetzt werden.

## Automatisierte SEO-Meta-Tags (`hreflang`)

Wenn i18n aktiviert ist, generiert `docmd` automatisch `<link rel="alternate" hreflang="...">`-Tags für jede Seite über alle konfigurierten Locales hinweg. Der Standard-Locale wird das Fallback-Tag `x-default` zugewiesen:

```html
<!-- Automatisch in HTML-Dokument-Header injiziert -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

Es ist keine manuelle Konfiguration erforderlich; die Engine injiziert diese Tags automatisch in alle generierten statischen Seiten.

::: callout info "Ungestaltete benutzerdefinierte Seiten" icon:info
Das Übersetzungssystem für UI-Strings gilt für Standard-Themen-Seiten. Für eigenständige benutzerdefinierte HTML-Seiten, die `noStyle: true` verwenden, siehe [Ungestaltete Beispielseiten](../../content/no-style-example.md).
:::