---
title: "Übersetzte Inhalte"
description: "Organisieren Sie Übersetzungen in Locale-Unterverzeichnissen mit dateiweisem Fallback und Locale-spezifischer Navigation."
---

## Verzeichnisstruktur

Jede Locale lebt in einem eigenen Unterverzeichnis innerhalb des Quellverzeichnisses. Der Ordnername entspricht der Locale-`id` aus Ihrer Konfiguration.

```text
docs/
├── en/                     ← Standard-Locale-Inhalte
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← zweite Locale
│   ├── index.md            ← übersetzte Startseite
│   ├── navigation.json     ← übersetzte Navigationsbeschriftungen
│   └── getting-started/
│       └── installation.md ← übersetzte Seite
└── zh/                     ← dritte Locale
    └── index.md            ← nur die Startseite übersetzt
```

Das Quellverzeichnis enthält nur Locale-Ordner. Wenn i18n aktiviert ist, liegen im Stammverzeichnis keine Inhaltsdateien.

::: callout info "Ordnernamen sind Ihre Wahl" icon:info
Ordnernamen entsprechen den `id`-Werten in Ihrer Konfiguration. Wenn Ihre Konfiguration `{ id: 'fr-ca' }` setzt, ist Ihr Ordner `docs/fr-ca/`.
:::

## Dateiweiser Fallback

Sie müssen nicht jede Seite übersetzen. docmd durchsucht das **Standard-Locale-Verzeichnis** als kanonische Struktur. Für jede andere Locale wird eine übersetzte Seite gesucht:

- Wenn `docs/hi/getting-started/installation.md` existiert → wird die Hindi-Übersetzung ausgeliefert.
- Wenn sie nicht existiert → wird die Standard-Locale-Version ausgeliefert.

Greift ein Seiten-Fallback, zeigt docmd einen übersetzten Hinweis. Dieser informiert die Betrachter, dass die Seite in der Standardsprache angezeigt wird. Passen Sie diese Meldung über Ihre [UI-Strings](ui-strings.md)-Konfiguration an.

## Locale-exklusive Seiten

Eine Nicht-Standard-Locale kann Seiten hosten, die in der Standard-Locale nicht existieren. Diese werden nur für diese spezifische Locale gerendert.

## Navigation übersetzen

Jedes Locale-Verzeichnis kann eine eigene `navigation.json` enthalten. docmd verwendet ein Kaskadierungs-Prioritätssystem zur Auflösung der Sidebar.

Details zur Auflösungshierarchie finden Sie in der [Navigationskonfiguration](../navigation.md).

Die `navigation.json` einer Locale verwendet das Standardformat:

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

::: callout tip "Teilweise Navigation" icon:info
Erstellen Sie eine Locale-`navigation.json` nur, wenn Sie übersetzte Beschriftungen wünschen. Fehlt sie, wird die Standard-Navigation verwendet.
:::

## Versionierung und i18n

Wenn Sie Versionierung und i18n kombinieren, strukturieren Sie die Quellverzeichnisse hierarchisch:

```text
docs/                    ← aktuelle Version
  en/                    ← aktuelle Version, Standard-Locale
  hi/                    ← aktuelle Version, übersetzte Locale
docs-v1/                 ← vorherige Version
  en/                    ← v1, Standard-Locale
  hi/                    ← v1, übersetzte Locale
```

Die Ausgabe-URLs verschachteln zuerst die Locale, dann die Version:

```text
/                        ← Standard-Locale, aktuelle Version
/hi/                     ← übersetzte Locale, aktuelle Version
/v1/                     ← Standard-Locale, vorherige Version
/hi/v1/                  ← übersetzte Locale, vorherige Version
```