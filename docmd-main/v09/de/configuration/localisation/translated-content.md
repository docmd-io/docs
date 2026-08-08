---
title: "Übersetzte Inhalte & i18n-Routing"
description: "Organisieren Sie mehrsprachige Dokumentationsverzeichnisse, Fallback-Mechanismen und lokalisierte Navigationsstrukturen in docmd."
---

`docmd` bietet Mehrsprachenunterstützung (i18n), indem Inhalte in dedizierten Locale-Unterverzeichnissen organisiert werden. Sie können lokalisierte Inhalte verwalten, nahtlos auf Standardsprachen zurückgreifen und lokalisierte Navigations-Sidebars bereitstellen.

## Verzeichnisstruktur

Jede Locale lebt in einem eigenen Unterverzeichnis innerhalb des Quellverzeichnisses (`src`). Ordnernamen entsprechen der in Ihrer Konfiguration definierten Locale-`id`:

```text
docs/
├── en/                     ← Standard-Locale-Inhalte
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← zweite Locale (Hindi)
│   ├── index.md            ← übersetzte Startseite
│   ├── navigation.json     ← übersetzte Navigationsbeschriftungen
│   └── getting-started/
│       └── installation.md ← übersetzte Installationsanleitung
└── zh/                     ← dritte Locale (Chinesisch)
    └── index.md            ← übersetzte Startseite
```

Wenn i18n aktiviert ist, liegen alle Markdown-Quellinhalte innerhalb von Locale-Verzeichnissen. Auf der Stamm-Ebene befinden sich keine Inhaltsdateien.

::: callout info "Benutzerdefinierte Verzeichniskennungen" icon:info
Unterverzeichnisnamen entsprechen direkt den `id`-Werten in Ihrer Konfiguration. Wenn Ihre Konfiguration `{ "id": "fr-ca" }` definiert, lautet das entsprechende Inhaltsverzeichnis `docs/fr-ca/`.
:::

## Dateiweise Fallback-Auflösung

`docmd` erfordert nicht, jedes Dokument im Voraus zu übersetzen. Die Engine behandelt das **Standard-Locale-Verzeichnis** als kanonischen Inhaltsbaum. Wenn eine angeforderte Seite in einer sekundären Locale fehlt:

1. Wenn `docs/hi/getting-started/installation.md` existiert → wird die Hindi-Übersetzung ausgeliefert.
2. Wenn `docs/hi/getting-started/installation.md` fehlt → wird auf `docs/en/getting-started/installation.md` zurückgegriffen.

Beim Fallback auf die Standard-Locale zeigt `docmd` Lesern ein informatives Callout-Banner an. Passen Sie diese Nachricht über Ihre [UI-Strings-Konfiguration](./ui-strings.md) an.

## Locale-exklusive Seiten

Sekundäre Locales können einzigartige Dokumente hosten, die im Standard-Locale-Verzeichnis nicht existieren. Diese Seiten werden ausschließlich innerhalb ihrer jeweiligen Sprachrouten gerendert.

## Lokalisieren der Sidebar-Navigation

Jedes Locale-Verzeichnis kann ein unabhängiges `navigation.json`-Manifest enthalten. `docmd` verwendet ein Kaskadierungs-Prioritätsauflösungssystem für Sidebars. Lesen Sie die [Navigationskonfiguration](../navigation.md) für vollständige Hierarchiedetails.

```json "navigation.json"
[
  {
    "title": "शुरू करें",
    "children": [
      { "title": "इंस्टालेशन", "path": "/getting-started/installation" },
      { "title": "स्थानीयकरण", "path": "/configuration/localisation" }
    ]
  }
]
```

::: callout tip "Teilweise Navigations-Überschreibungen" icon:lightbulb
Stellen Sie eine `navigation.json`-Datei innerhalb eines Locale-Verzeichnisses nur dann bereit, wenn Sie Menübeschriftungen übersetzen. Wenn sie weggelassen wird, wird der Navigationsbaum der Standard-Locale automatisch angewendet.
:::

## Kombination von Versionierung mit Lokalisierung

Bei der Kombination von Versionierung und mehrsprachigem Routing organisieren Sie Verzeichnisse hierarchisch mit in Versionsordnern verschachtelten Locales:

```text
docs/                    ← aktuelle Version
  en/                    ← Standard-Locale
  hi/                    ← übersetzte Locale
docs-v1/                 ← alte Version
  en/                    ← Standard-Locale
  hi/                    ← übersetzte Locale
```

Die Ausgabe-URL-Hierarchie priorisiert Locale-Präfixe, gefolgt von Versionsrouten:

```text
/                        ← Standard-Locale, aktuelle Version
/hi/                     ← übersetzte Locale, aktuelle Version
/v1/                     ← Standard-Locale, alte Version
/hi/v1/                  ← übersetzte Locale, alte Version
```