---
title: "Templates entwickeln"
description: "Erstellen Sie ein docmd-Template-Paket — Verzeichnislayout, Deskriptor, EJS-Kontext, Asset-Prioritäten und API-Referenz."
---

# Templates entwickeln

> **Für Template-Autoren.** Wenn Sie ein Template *verwenden* möchten, lesen Sie stattdessen [Templates](/theming/templates).

Ein Template ist ein reguläres npm-Paket, das `capabilities: ['template']` deklariert und ein `templates[]`-Array mit `.ejs`-Datei-Überschreibungen ausliefert. Der Template-Resolver in `@docmd/ui` übernimmt die seitenweise Suche, berücksichtigt Frontmatter- / Config-Überschreibungen und fällt auf den Standard zurück, wenn etwas schiefgeht.

## Paket-Layout

```
@docmd/template-summer/
├── package.json
├── index.js                # Plugin-Einstieg — exportiert templates[] + templateAssets[]
├── templates/
│   ├── layout.ejs
│   ├── partials/
│   │   ├── menubar.ejs     # Nur die Partials, die Sie überschreiben müssen
│   │   └── footer.ejs
└── assets/
    ├── css/
    │   └── summer.css      # Wird über docmd-main.css gelegt; ersetzt es nicht.
    └── js/
        └── summer.js
```

## `package.json`

```json "package.json"
{
  "name": "@docmd/template-summer",
  "version": "0.1.0",
  "type": "module",
  "main": "index.js",
  "peerDependencies": {
    "@docmd/core": ">=0.8.7"
  },
  "docmd": {
    "kind": "template",
    "displayName": "Summer",
    "description": "Ein sommerlich-frisches Layout für das Template-System ab 0.8.7."
  }
}
```

## ESM-Exports – die `default`-Bedingung

Ihre `package.json` **muss** in `exports["."]` zusätzlich zur
`import`-Bedingung eine `"default"`-Bedingung deklarieren:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "default": "./dist/index.js"
  }
}
```

Wenn Sie nur `import` deklarieren, wirft der erste Versuch des
Auto-Installers `ERR_PACKAGE_PATH_NOT_EXPORTED`, weil der
CommonJS-Resolver von Node keine Bedingung finden kann. Der Retry-Pfad
gelingt zwar (er verwendet dynamisches `import()` direkt), aber der
Build gibt bei jedem Lauf eine überflüssige Meldung „Plugin installed"
aus. Plugins (`@docmd/plugin-*`) haben die gleiche Anforderung – siehe
den [Plugin-Entwicklungs-Leitfaden](building-plugins.md#esm-exports--die-default-bedingung)
für den vollständigen Kontext.

## `index.js`

```js "index.js"
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugin: {
    name: 'template-summer',
    version: '0.1.0',
    capabilities: ['template'],
  },

  templates: [
    // Nur die Slots, die Sie tatsächlich überschreiben möchten.
    { type: 'layout',   templatePath: path.join(__dirname, 'templates/layout.ejs') },
    { type: 'menubar',  templatePath: path.join(__dirname, 'templates/partials/menubar.ejs') },
    { type: 'footer',   templatePath: path.join(__dirname, 'templates/partials/footer.ejs') },
  ],

  templateAssets: [
    {
      type: 'css',
      path: path.join(__dirname, 'assets/css/summer.css'),
      priority: 10,           // höher als Theme (5), niedriger als customCss (15)
      position: 'head',
    },
    {
      type: 'js',
      path: path.join(__dirname, 'assets/js/summer.js'),
      priority: 10,
      position: 'body',
    },
  ],
};
```

## `layout.ejs`-Kontext

Templates erhalten denselben EJS-Kontext wie das Standard-Layout. Die häufigsten Locals:

| Local | Beschreibung |
|---|---|
| `config` | Die normalisierte Site-Konfiguration. |
| `frontmatter` | Pro-Seite-Frontmatter. |
| `relativePathToRoot` | Z. B. `./` oder `../` — nutzen Sie dies zum Bauen relativer URLs. |
| `renderIcon(name, opts)` | Rendert ein Lucide-Icon. |
| `t(key, params?)` | Übersetzungs-Funktion. |
| `buildRelativeUrl(url)` | Löst eine URL relativ zur aktuellen Seite auf. |
| `pageTitle`, `siteTitle`, `appearance` | Häufige Strings. |
| `_template` | Metadaten zum aufgelösten Template (neu in 0.8.7). |

Sie können Standard-Partials aus `@docmd/ui` zur Build-Zeit einlesen. Das einfachste Muster ist, eine Kopie der wiederverwendeten Partials zu halten; Templates erben Partial-Pfade nicht automatisch.

## Asset-Prioritätskette

CSS und JS laden in dieser Reihenfolge (niedriger lädt zuerst, höher gewinnt Kaskaden-Konflikte):

| Priorität | Schicht | Hinweise |
|---|---|---|
| 0  | Basis (`docmd-main.css`, `docmd-main.js`) | Immer vorhanden. |
| 5  | Theme-Farb-Overlay (`docmd-theme-sky.css` usw.) | Aus `theme.name`. Übersprungen, wenn der Name zu einem Template befördert wurde (siehe `_noCssOverlay`). |
| 10 | **Template-Struktur** (Standard) | Das CSS Ihres Templates — Standard, wenn Sie `priority` weglassen. |
| 15 | Benutzer-`customCss` / `customJs` | Gewinnt immer — das ist der Vertrag. |
| 20 | Plugin-CSS/JS | lightbox, search, analytics usw. |
| 25+ | Höhere Template-Priorität | **Nur wenn Sie Plugins überschreiben müssen.** Das offizielle Summer-Template deklariert `priority: 25`, sodass es nach Plugin-CSS lädt. Höhere Werte kaskadieren später. |

Templates dürfen eine höhere Priorität als 10 deklarieren — Summer selbst nutzt **25**, um Plugin-Stile zu überschreiben. Der empfohlene Bereich ist **10–20** für "vom Benutzer überschreibbare" Templates und **20+** für "opinionated Layout"-Templates.

::: callout warning "Verwenden Sie kein !important"
Templates sollten CSS schreiben, das von `customCss` mit Priorität 15 überschrieben werden kann. `!important` bricht diesen Vertrag und zwingt Benutzer, Ihr Template zu forken, um es anzupassen. (Sommers CSS-Datei-Header erzwingt dies — `!important` wird beim 0.8.7-Cleanup entfernt, damit Benutzer Summer endlich ohne eigenen `!important` überschreiben können.)
:::

## Auto-Promotion von `theme.name`

Die Beförderung `theme.name` → `theme.template` findet innerhalb von `normalizeConfig()` statt, nicht im Resolver:

- Wenn `theme.name` ein nicht reservierter Wert ist und `theme.template` nicht gesetzt ist, wird die Config zu `theme.template = theme.name` umgeschrieben und `theme._noCssOverlay = true` gesetzt (sodass der Generator den Lookup `docmd-theme-${name}.css` überspringt, der sonst 404en würde).
- Zur Resolve-Zeit sieht der Resolver ausschließlich `theme.template`.

Deshalb lädt ein nicht reservierter `theme.name` automatisch Ihr Template — Sie müssen es nicht zusätzlich in `config.plugins` auflisten.

## Template-Lokalisierung

Die `i18n`-Konfiguration gilt weiterhin — die aktive Locale wird Ihrem Template als normaler Local übergeben. Übersetzungen werden wie in den Standard-Templates über den `t(key)`-Helper nachgeschlagen.

## API-Referenz

### `resolveTemplate(ctx)` aus `@docmd/ui`

```ts
import { resolveTemplate } from '@docmd/ui';

const resolved = resolveTemplate({
  type: 'layout',                       // jeder TemplateSlot
  pagePath: '/guide/intro.html',
  frontmatter: page.frontmatter,        // kann `template: "..."` enthalten
  config,                                 // normalisierte Site-Config
  localeId: 'en',                         // optional
  versionId: '0.8',                       // optional
});

// resolved.templatePath → absoluter Pfad zur .ejs-Datei
// resolved.source       → 'default' | 'frontmatter' | 'config' | 'plugin'
// resolved.pluginName   → Plugin-Name (wenn source === 'plugin')
// resolved.type         → der aufgelöste Slot
```

### Typen aus `@docmd/api`

```ts
import type {
  TemplateSlot,         // Vereinigung der 12 Slot-Namen
  TemplateHook,         // { type, templatePath, priority?, pages?, exclude? }
  TemplateAssetHook,    // { type: 'css'|'js', path, priority?, position? }
  ResolvedTemplate,
  TemplateResolutionContext,
  Capability,           // enthält nun auch 'template'
} from '@docmd/api';
```

## Fehlerbehebung

### "Template deklariert Slot X, aber Datei nicht gefunden"

Die `index.js` des Templates verweist auf einen `templatePath`, der auf der Festplatte nicht existiert. Der Resolver ist auf den Standard zurückgefallen. Prüfen Sie, ob der Pfad absolut ist (verwenden Sie `fileURLToPath(import.meta.url)`) und ob die Datei im `files`-Feld des veröffentlichten Pakets enthalten ist.

### Das CSS meines Templates wird von etwas anderem überschrieben

CSS-Priorität ist endgültig. Benutzer-`customCss` (Priorität 15) gewinnt immer. Wenn Sie Benutzern erlauben möchten, einzelne Selektoren zu überschreiben, ohne das gesamte Template zu ersetzen, dokumentieren Sie die öffentlichen CSS-Klassennamen und lassen Sie Benutzer diese mit `customCss` anvisieren.

### Pro-Seiten-Template-Override funktioniert nicht

Stellen Sie sicher, dass der `template`-Wert im Frontmatter mit einem registrierten Plugin übereinstimmt. Der Resolver vergleicht mit dem `descriptor.name` des Plugins und entfernt die Präfixe `@docmd/` und `template-`. Daher sind alle diese Varianten gleichwertig:

- `template: "summer"`
- `template: "template-summer"`
- `template: "@docmd/template-summer"`

Wenn keine davon passt, fällt der Resolver auf `config.theme.template` und anschließend auf den Standard zurück.