---
title: "Übersetzte Inhalte"
description: "Organisieren Sie Übersetzungen in Sprach-Unterverzeichnissen mit Fallback pro Datei und sprachspezifischer Navigation."
---

## Verzeichnisstruktur

Jede Sprache — einschließlich der Standardsprache — lebt in ihrem eigenen Unterverzeichnis innerhalb des Quellverzeichnisses. Der Ordnername entspricht der Sprach-`id` aus Ihrer Konfiguration.

```
docs/
├── en/                     ← Inhalt der Standardsprache
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← Zweite Sprache
│   ├── index.md            ← Übersetzte Homepage
│   ├── navigation.json     ← Übersetzte Navigations-Labels
│   └── getting-started/
│       └── installation.md ← Übersetzte Seite
└── zh/                     ← Dritte Sprache
    └── index.md            ← Nur die Homepage übersetzt
```

Das Quellverzeichnis dient als sauberer Container — es enthält ausschließlich Sprachordner. Wenn i18n aktiviert ist, befinden sich keine Inhaltsdateien auf der Stammebene.

::: callout info "Ordnernamen sind Ihre Wahl"
Die Ordnernamen stammen direkt aus den `id`-Werten in Ihrer Konfiguration. Wenn Ihre Konfiguration `{ id: 'fr-ca' }` angibt, lautet Ihr Ordner `docs/fr-ca/`. Wenn Hindi Ihre Standardsprache ist (`default: 'hi'`), dann ist `docs/hi/` das Verzeichnis für den kanonischen Inhalt.
:::

## Fallback pro Datei

Sie müssen nicht jede Seite übersetzen. docmd scannt das **Verzeichnis der Standardsprache** als kanonische Liste der Seiten. Für jede andere Sprache wird geprüft, ob eine übersetzte Version der jeweiligen Seite existiert:

- Wenn `docs/hi/getting-started/installation.md` existiert → wird die Hindi-Übersetzung ausgeliefert
- Wenn sie nicht existiert → wird die Version der Standardsprache für diese Seite ausgeliefert

Wenn eine Seite auf den Fallback zurückgreift, kann docmd einen übersetzten Callout (Hinweis) anzeigen, der die Besucher informiert, dass die Seite in der Standardsprache angezeigt wird. Diese Nachricht ist über Ihre [UI-Strings](./ui-strings)-Konfiguration anpassbar.

## Sprach-exklusive Seiten

Eine Nicht-Standardsprache kann auch Seiten haben, die in der Standardsprache nicht existieren. Diese werden nur für diese Sprache gerendert — sie erscheinen nicht in anderen Sprachen.

## Navigation übersetzen

Jedes Sprachverzeichnis kann eine eigene `navigation.json` haben. Die Priorität der Auflösung:

1. **Sprachspezifisch** — `docs/hi/navigation.json` (falls vorhanden)
2. **Standardsprache** — `docs/en/navigation.json` (Fallback)
3. **Versionsspezifisch** — `docs-v1/navigation.json` (für alte Versionen ohne Sprachordner)
4. **Stammkonfiguration** — das `navigation`-Array aus der `docmd.config.js`

Die `navigation.json` einer Sprache verwendet dasselbe Format:

```json
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

::: callout tip "Teilweise Navigation"
Sie müssen nur dann eine `navigation.json` für eine Sprache erstellen, wenn Sie übersetzte Labels wünschen. Wenn sie fehlt, wird die Navigation der Standardsprache verwendet — die Seiten werden gerendert, nur mit nicht übersetzten Labels.
:::

## Versionierung und i18n zusammen

Wenn sowohl Versionierung als auch i18n konfiguriert sind, sieht die Quellstruktur wie folgt aus:

```
docs/                    ← Aktuelle Version (Container)
  en/                    ← Aktuelle Version, Standardsprache
  hi/                    ← Aktuelle Version, übersetzte Sprache
docs-v1/                 ← Alte Version
  index.md               ← Inhalt der alten Version (keine Sprachstruktur)
  navigation.json
```

Alte Versionen, die i18n zeitlich vorausgehen, funktionieren automatisch — docmd liest sie direkt aus, wenn keine Sprach-Unterverzeichnisse vorhanden sind. Nur die Standardsprache rendert die alte Version. Um Übersetzungen zu einer alten Version hinzuzufügen, erstellen Sie darin ein Sprach-Unterverzeichnis:

```
docs-v1/
  hi/                    ← Hindi-Übersetzung für v1
    index.md
    navigation.json
```

Die Ausgabe-URLs verschachteln zuerst die Sprache, dann die Version:

```
/                        ← Standardsprache, aktuelle Version
/hi/                     ← Übersetzte Sprache, aktuelle Version
/v1/                     ← Standardsprache, alte Version
/hi/v1/                  ← Übersetzte Sprache, alte Version
```
