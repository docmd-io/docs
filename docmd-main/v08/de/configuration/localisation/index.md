---
title: "Lokalisierung"
description: "Liefern Sie Dokumentation in mehreren Sprachen mit Locale-first-Routing, übersetzter Navigation und automatischem Fallback."
---

Fügen Sie Ihrer Dokumentations-Site Mehrsprachenunterstützung hinzu. docmd liefert jede Locale unter ihrem eigenen URL-Präfix aus, übersetzt System-UI-Strings und fällt elegant zurück, wenn eine Übersetzung fehlt.

## Sprachen zur Konfiguration hinzufügen

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "hi", "label": "हिन्दी" },
      { "id": "zh", "label": "中文" }
    ]
  }
}
```

Die `default`-Locale wird im Stammverzeichnis der Site (`/`) gerendert. Alle anderen Locales werden unter `/{id}/` gerendert. Sie wählen die IDs, Labels und welche Locale die Standard-Locale ist — es gibt keine hartcodierten Annahmen. Wenn Sie Hindi als Standard wünschen, setzen Sie `default: 'hi'`; Hindi wird unter `/` gerendert, während Englisch unter `/en/` gerendert wird.

| Schlüssel | Typ | Beschreibung |
|:----|:-----|:------------|
| `default` | `string` | Locale-ID, die unter `/` gerendert wird. Standardmäßig die erste Locale, wenn weggelassen. |
| `locales` | `array` | Liste der Locale-Objekte. Jedes muss eine `id` haben. |
| `position` | `string` | Wo der Sprachumschalter erscheint. `options-menu` (Standard), `sidebar-top` oder `sidebar-bottom`. |
| `stringMode` | `boolean` | Bei `true` werden Locale-Seiten aus einer einzelnen Quelle mittels `data-i18n`-Attribut-Ersetzung generiert. Standard `false`. |
| `inPlace` | `boolean` | Bei `true` (mit clientseitigem Skript) werden Strings ohne URL-Navigation ausgetauscht. Nur für SPAs/Dashboards. Standard `false`. |

Jedes Locale-Objekt akzeptiert:

| Schlüssel | Typ | Standard | Beschreibung |
|:----|:-----|:--------|:------------|
| `id` | `string` | - | Eine von Ihnen gewählte Kennung (z. B. `en`, `hi`, `fr-ca`). Wird als Ordnername und URL-Präfix verwendet. Erforderlich. |
| `label` | `string` | Gleich wie `id` | Anzeigename im Sprachumschalter. |
| `dir` | `string` | `ltr` | Textrichtung. Für Arabisch, Hebräisch usw. auf `rtl` setzen. |
| `translations` | `object` | `{}` | Eigene UI-String-Überschreibungen (siehe [Eigene UI-Strings](ui-strings.md)). |

## URL-Struktur

Die Standard-Locale hat kein URL-Präfix. Nicht-Standard-Locales sind unter `/{id}/` verschachtelt. In Kombination mit [Versionierung](../versioning.md) ist die URL `/{locale}/{version}/page`.

```
/                       ← Standard-Locale, aktuelle Version
/getting-started        ← Standard-Locale-Seite
/05/                    ← Standard-Locale, alte Version
/hi/                    ← Nicht-Standard-Locale, aktuelle Version
/hi/getting-started     ← Nicht-Standard-Locale-Seite
/hi/05/                 ← Nicht-Standard-Locale, alte Version
```

Der Sprachumschalter erhält Ihre aktuelle Seite und Version beim Wechsel der Locale. Der Versionsumschalter erhält Ihre aktuelle Locale.

## Fehlende Locale-Verzeichnisse

Wenn eine Locale in `locales` deklariert ist, ihr Quellverzeichnis jedoch nicht existiert (z. B. kein `docs/hi/`-Ordner), deaktiviert docmd diese Locale im Sprachumschalter **automatisch**. Die Locale erscheint weiterhin im Dropdown — mit einem „N/A"-Badge und ausgegrautem Styling — aber ein Klick darauf hat keine Wirkung.

Dies verhindert 404-Fehler, wenn Sie geplante Sprachen auflisten, bevor deren Inhalte bereit sind.

## Sprachumschalter positionieren

<img width="500" class="with-border" src="/assets/previews/menu-i18n.webp">

Steuern Sie mit der `position`-Option, wo der Sprachumschalter erscheint:

```json "docmd.config.json"
{
  "i18n": {
    "position": "sidebar-top"
  }
}
```

| Position | Verhalten |
|:---------|:----------|
| `options-menu` | Kompaktes Globus-Symbol neben Theme-Toggle und Suche. Standard. |
| `sidebar-top` | Vollständiges Dropdown mit Beschriftung am oberen Rand der Sidebar. |
| `sidebar-bottom` | Vollständiges Dropdown mit Beschriftung am unteren Rand der Sidebar. |

## String-Modus (nur für noStyle-Seiten)

Standard-i18n verwendet separate Verzeichnisse pro Locale (`docs/en/`, `docs/hi/`), jedes mit eigenen Markdown-Dateien. Der **String-Modus** ist eine einfachere Alternative, die speziell für [noStyle-Seiten](../../content/no-style-pages.md) entwickelt wurde — Seiten, die rohes HTML statt Markdown verwenden.

```json "docmd.config.json"
  "i18n": {
    "default": "en",
    "stringMode": true,
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "zh", "label": "中文" }
    ]
  }
```

Mit `stringMode: true`:

1. Quell-Dateien bleiben im Root-Verzeichnis `docs/` (keine Locale-Unterverzeichnisse)
2. Die Standard-Locale wird wie gewohnt unter `/` gebaut
3. Für jede Nicht-Standard-Locale klont docmd das gerenderte HTML und wendet **serverseitige String-Ersetzung** mittels JSON-Dateien aus `assets/i18n/{locale}.json` an
4. Die Ausgabe erfolgt unter `/{locale}/` — z. B. `/zh/index.html` — mit vollständigem SEO (hreflang-Tags, korrektes `lang`-Attribut)
5. Fehlt eine Übersetzungsdatei, wird die Seite mit dem Standard-Sprachentext gerendert

Vollständige Details zur `data-i18n`-Attributsyntax und zum JSON-Dateiformat finden Sie unter [noStyle-String-Ersetzung](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle).

::: callout warning "String-Modus übersetzt keine Markdown-Inhalte" icon:info
Die String-Ersetzung funktioniert, indem sie `data-i18n`-Attribute im gerenderten HTML sucht. Standard-Markdown-Inhalte (`## Heading`, Absätze, Listen) werden zu reinen HTML-Tags ohne diese Attribute gerendert — daher gibt es für die Ersetzung nichts zu finden.

- **Dokumentations-Sites** → Verzeichnismodus verwenden (Standard). Jede Locale hat eigene Markdown-Dateien mit vollständig übersetzter Prosa.
- **Landingpages, Marketing-Sites, Dashboards** → String-Modus verwenden. Dies sind noStyle-Seiten mit eigenem HTML, bei denen Sie jedes Tag kontrollieren und `data-i18n`-Attribute hinzufügen können.

Wenn Ihre Site beides enthält — z. B. eine noStyle-Landingpage plus Dokumentation — verwenden Sie den Verzeichnismodus für die Dokumentation und fügen Sie `data-i18n`-Attribute zu Ihrer noStyle-Seite hinzu. Der String-Modus übersetzt das noStyle-HTML, während der Verzeichnismodus die Dokumentationsinhalte übernimmt.
:::

## Nächste Schritte

- [Übersetzte Inhalte](translated-content.md) — Verzeichnisstruktur, Übersetzungen verfassen, Navigation
- [UI-Strings & SEO](ui-strings.md) — Systemtexte anpassen, hreflang-Tags
- [noStyle-String-Ersetzung](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle) — `data-i18n`-Attributsyntax und JSON-Format für noStyle-Seiten