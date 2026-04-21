---
title: "Lokalisierung"
description: "Bieten Sie Ihre Dokumentation in mehreren Sprachen an — mit sprachspezifischem Routing, übersetzter Navigation und automatischem Fallback."
---

Fügen Sie Ihrer Dokumentationsseite Mehrsprachigkeitsunterstützung hinzu. docmd stellt jede Sprache unter einem eigenen URL-Präfix bereit, übersetzt die System-UI-Strings und nutzt einen eleganten Fallback, falls eine Übersetzung fehlt.

## Sprachen zur Konfiguration hinzufügen

```js
// docmd.config.js
export default {
  i18n: {
    default: 'en',
    locales: [
      { id: 'en', label: 'English' },
      { id: 'hi', label: 'हिन्दी' },
      { id: 'zh', label: '中文' }
    ]
  }
}
```

Die Standardsprache (`default`) wird im Stammverzeichnis der Website (`/`) gerendert. Alle anderen Sprachen werden unter `/{id}/` gerendert. Sie wählen die IDs, Labels und welche Sprache die Standardsprache ist — es gibt keine fest programmierten Annahmen. Wenn Sie Hindi als Standardsprache möchten, setzen Sie `default: 'hi'`, und Hindi wird unter `/` gerendert, während Englisch unter `/en/` erscheint.

| Schlüssel | Typ | Beschreibung |
|:----|:-----|:------------|
| `default` | `string` | Sprach-ID, die unter `/` gerendert wird. Standardmäßig die erste Sprache, wenn weggelassen. |
| `locales` | `array` | Liste von Sprachobjekten. Jedes muss eine `id` haben. |
| `position` | `string` | Position des Sprachumschalters. `options-menu` (Standard), `sidebar-top` oder `sidebar-bottom`. |
| `stringMode` | `boolean` | Wenn `true`, werden Sprachseiten aus einer einzigen Quelle mittels `data-i18n`-Attribut-Ersetzung generiert. Standard: `false`. |
| `inPlace` | `boolean` | Wenn `true` (mit clientseitigem Skript), werden Strings ohne URL-Navigation getauscht. Nur für SPAs/Dashboards. Standard: `false`. |

Jedes Sprachobjekt akzeptiert:

| Schlüssel | Typ | Standard | Beschreibung |
|:----|:-----|:--------|:------------|
| `id` | `string` | — | Ein beliebiger Identifikator Ihrer Wahl (z. B. `en`, `hi`, `fr-ca`). Wird als Ordnername und URL-Präfix verwendet. Erforderlich. |
| `label` | `string` | Gleich wie `id` | Im Sprachumschalter angezeigter Name. |
| `dir` | `string` | `ltr` | Textrichtung. Setzen Sie `rtl` für Arabisch, Hebräisch usw. |
| `translations` | `object` | `{}` | Benutzerdefinierte Überschreibungen für UI-Strings (siehe [Benutzerdefinierte UI-Strings](./ui-strings)). |

## URL-Struktur

Die Standardsprache hat kein URL-Präfix. Andere Sprachen werden unter `/{id}/` verschachtelt. In Kombination mit [Versionierung](../versioning) lautet die URL `/{locale}/{version}/seite`.

```
/                       ← Standardsprache, aktuelle Version
/getting-started        ← Seite der Standardsprache
/05/                    ← Standardsprache, alte Version
/hi/                    ← Andere Sprache, aktuelle Version
/hi/getting-started     ← Seite der anderen Sprache
/hi/05/                 ← Andere Sprache, alte Version
```

Der Sprachumschalter behält die aktuelle Seite und Version beim Sprachwechsel bei. Der Versionsumschalter behält die aktuelle Sprache bei.

## Positionierung des Sprachumschalters

<!-- SCREENSHOT: Drei Varianten des Sprachumschalters — options-menu (Erdkugel-Icon im Header), sidebar-top (Dropdown oben in der Seitenleiste), sidebar-bottom (Dropdown unten). Zeige alle drei nebeneinander. -->

Steuern Sie die Position des Sprachumschalters mit der Option `position`:

```js
i18n: {
  position: 'options-menu',  // Standard
  // ...
}
```

| Position | Verhalten |
|:---------|:----------|
| `options-menu` | Kompaktes Erdkugel-Icon neben Theme-Umschalter und Suche. Standard. |
| `sidebar-top` | Vollständiges Dropdown mit Label oben in der Seitenleiste. |
| `sidebar-bottom` | Vollständiges Dropdown mit Label unten in der Seitenleiste. |

## String-Modus (nur für noStyle-Seiten)

Standard-i18n verwendet separate Verzeichnisse pro Sprache (`docs/en/`, `docs/hi/`), jedes mit eigenen Markdown-Dateien. **String Mode** ist eine einfachere Alternative, die speziell für [noStyle-Seiten](/content/no-style-pages/) entwickelt wurde — Seiten, die reines HTML anstelle von Markdown verwenden.

```js
// docmd.config.js
export default {
  i18n: {
    default: 'en',
    stringMode: true,
    locales: [
      { id: 'en', label: 'English' },
      { id: 'zh', label: '中文' }
    ]
  }
}
```

Mit `stringMode: true`:

1. Quelldateien bleiben im Stammverzeichnis `docs/` (keine Sprach-Unterverzeichnisse)
2. Die Standardsprache wird wie gewohnt unter `/` erstellt
3. Für jede andere Sprache klont docmd das gerenderte HTML und führt eine **serverseitige String-Ersetzung** mittels JSON-Dateien aus `assets/i18n/{locale}.json` durch
4. Die Ausgabe erfolgt unter `/{locale}/` — z. B. `/zh/index.html` — mit vollem SEO (hreflang-Tags, korrektes `lang`-Attribut)
5. Falls eine Übersetzungsdatei fehlt, wird die Seite im Text der Standardsprache gerendert

Weitere Details zur Syntax des `data-i18n`-Attributs und zum JSON-Dateiformat finden Sie unter [noStyle String-Ersetzung](/content/no-style-pages#string-replacement-i18n-for-nostyle).

::: callout warning "String Mode übersetzt keine Markdown-Inhalte"
Die String-Ersetzung funktioniert durch das Finden von `data-i18n`-Attributen im gerenderten HTML. Standard-Markdown-Inhalte (`## Überschrift`, Absätze, Listen) werden in einfache HTML-Tags ohne diese Attribute umgewandelt — daher kann der Ersetzer dort nichts finden.

- **Dokumentationsseiten** → verwenden Sie den Verzeichnismodus (Standard). Jede Sprache hat eigene Markdown-Dateien mit vollständig übersetztem Text.
- **Landingpages, Marketing-Websites, Dashboards** → verwenden Sie den String-Modus. Dies sind noStyle-Seiten mit benutzerdefiniertem HTML, bei dem Sie jeden Tag kontrollieren und `data-i18n`-Attribute hinzufügen können.

Wenn Ihre Website beides hat — zum Beispiel eine noStyle-Landingpage plus Dokumentation — verwenden Sie den Verzeichnismodus für die Dokumentation und fügen Sie Ihrer noStyle-Seite `data-i18n`-Attribute hinzu. Der String-Modus übersetzt das noStyle-HTML, während der Verzeichnismodus die Dokumentationsinhalte verarbeitet.
:::

## Nächste Schritte

- [Übersetzte Inhalte](./translated-content) — Verzeichnisstruktur, Schreiben von Übersetzungen, Navigation
- [UI-Strings & SEO](./ui-strings) — Anpassen von Systemtexten, hreflang-Tags
- [noStyle String-Ersetzung](/content/no-style-pages#string-replacement-i18n-for-nostyle) — Syntax des `data-i18n`-Attributs und JSON-Format für noStyle-Seiten