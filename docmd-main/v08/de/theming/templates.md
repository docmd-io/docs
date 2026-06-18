---
title: "Templates"
description: "Alternative Site-Layouts als Plugins ausliefern. Templates überschreiben EJS-Partials und liefern ein eigenes CSS/JS-Bundle, mit robuster Auflösungskette und graceful Failsafe auf das Standard-Theme."
---

# Templates

> **Neu in 0.8.7.** Templates erlauben es Ihnen, ein komplett alternatives Layout (HTML-Struktur, Partials, CSS, JS) als eigenständiges Plugin auszuliefern. Sie sind **kein** Ersatz für das bestehende Theme-+-customCss-System — sie liegen darüber.

Ein **Template** ist ein Plugin, das `capabilities: ['template']` deklariert und ein `templates[]`-Array mit `.ejs`-Datei-Overrides mitliefert. Der Template-Resolver in `@docmd/ui` (neuer `resolveTemplate()`) handhabt das pro-Seite-Lookup, beachtet Frontmatter-/Config-Overrides und fällt im Fehlerfall auf das Standard-Template zurück.

## Schnellstart

### 1. Ein Template installieren

```bash
# Das erste offizielle Template wird mit 0.8.7 ausgeliefert — Installation über die docmd add-Pipeline:
npx @docmd/core add summer
```

> **Release-Reihenfolge:** `@docmd/template-summer@0.8.6` wird vor dem Monorepo veröffentlicht, um die OIDC-First-Publish-Anforderung von npm zu erfüllen. Die mit `docmd@0.8.7` synchron veröffentlichte Version ist funktional identisch.

### 2. In der Konfiguration aktivieren

Sie müssen nur **einen Schlüssel** setzen — `theme.name`. docmd erkennt automatisch, ob der Name auf ein reserviertes CSS-Theme (`default`, `sky`, `ruby`, `retro`) oder auf ein Template-Paket (`summer`, …) verweist.

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

Das war's. Jede Seite verwendet nun das `layout.ejs` des `summer`-Templates. Seiten, für die Sie keine Overrides bereitstellen (Sidebar, Footer usw.), verwenden automatisch die `@docmd/ui`-Standardversionen.

> **Mehrdeutigkeit auflösen?** Verwenden Sie den expliziten Schlüssel `theme.template`. Wenn vorhanden, gewinnt er bei der Template-Auswahl immer gegenüber `theme.name`:
>
> ```json
> { "theme": { "name": "sky", "template": "summer" } }
> ```
> ↑ Verwendet das **summer**-Template mit der **sky**-Farbpalette.
>
> **Wie die automatische Promotion tatsächlich funktioniert.** Die `theme.name` → `theme.template`-Promotion passiert innerhalb von `normalizeConfig()`, nicht im Resolver: wenn `theme.name` ein nicht-reservierter Wert ist und `theme.template` nicht gesetzt ist, wird die Config zu `theme.template = theme.name` umgeschrieben und `theme._noCssOverlay = true` gesetzt (damit der Generator den sonst 404-werdenden `docmd-theme-${name}.css`-Lookup überspringt). Bei der Auflösung sieht der Resolver nur `theme.template`.

### 3. Pro Seite überschreiben

```markdown
---
title: "Changelog"
template: "template-changelog"
---

# Changelog
…
```

Ein einziger Frontmatter-Schlüssel wechselt das Template nur für diese Seite.

## Auflösungskette

Beim Rendern einer Seite durchläuft der Resolver diese Kette von oben nach unten und verwendet den ersten Treffer:

| # | Quelle | Beispiel |
|---|---|---|
| 1 | `frontmatter.template` | `template: "template-changelog"` |
| 2 | `config.templates[glob]` (zukünftig) | `"blog/*": "template-blog"` |
| 3 | `config.theme.template` *(explizit)* | `"template": "summer"` |
| 4 | `config.theme.name` *(automatisch zu Template promoviert, falls kein bekanntes CSS-Theme)* | `"name": "summer"` |
| 5 | Eingebauter Standard | Die mit `@docmd/ui` ausgelieferten `.ejs`-Dateien |

Die CSS-Themes `default`, `sky`, `ruby` und `retro` sind reserviert — wenn `theme.name` auf einen davon passt, bleibt es ein CSS-Theme. Jeder andere Wert wird als Template-Name behandelt und das entsprechende `@docmd/template-*`-Paket wird automatisch geladen (kein zusätzlicher Eintrag in `config.plugins` nötig).

Wenn die aufgelöste Datei auf der Festplatte fehlt, gibt der Resolver eine einzige TUI-Warnung aus und fällt auf den Standard zurück. **Der Build schlägt niemals wegen eines Template-Problems fehl.**

## Unterstützte Template-Slots

Ein Template kann jeden dieser 12 Slots überschreiben. Alle nicht überschriebenen Slots fallen auf den Standard zurück:

| Slot | Standarddatei | Zweck |
|---|---|---|
| `layout` | `templates/layout.ejs` | Die vollständige HTML-Seite |
| `404` | `templates/404.ejs` | Nicht-gefunden-Seite |
| `toc` | `templates/toc.ejs` | Inhaltsverzeichnis-Sidebar |
| `navigation` | `templates/navigation.ejs` | Sidebar-Navigationsbaum |
| `footer` | `templates/partials/footer.ejs` | Seitenfuß |
| `menubar` | `templates/partials/menubar.ejs` | Obere Navigationsleiste |
| `options-menu` | `templates/partials/options-menu.ejs` | Such-/Theme-/Profil-Menü |
| `project-switcher` | `templates/partials/project-switcher.ejs` | Multi-Projekt-Switcher |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | Versionsauswahl |
| `language-switcher` | `templates/partials/language-switcher.ejs` | Sprachauswahl |
| `banner` | `templates/partials/banner.ejs` | Seitenweite Ankündigung (neu) |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie-Dialog (neu) |

> `no-style`-Seiten haben keinen Template-spezifischen Inhalt. Sie verwenden immer das Standard-`templates/no-style.ejs`, unabhängig vom aktiven Template.

## Ein Template erstellen

Ein Template ist ein gewöhnliches npm-Paket:

```
@docmd/template-summer/
├── package.json
├── index.js                # Plugin-Einstieg — exportiert templates[] + templateAssets[]
├── templates/
│   ├── layout.ejs
│   ├── partials/
│   │   ├── menubar.ejs     # Nur die Partials, die Sie überschreiben möchten
│   │   └── footer.ejs
└── assets/
    ├── css/
    │   └── summer.css      # Ersetzt docmd-main.css? Nein — liegt darüber.
    └── js/
        └── summer.js
```

### package.json

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
    "description": "Ein helles, sommerliches Layout für das 0.8.7+-Template-System."
  }
}
```

### index.js

```js
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

### layout.ejs

Templates erhalten denselben EJS-Kontext wie das Standardlayout. Die häufigsten Locals:

| Local | Beschreibung |
|---|---|
| `config` | Die normalisierte Site-Konfiguration. |
| `frontmatter` | Pro-Seite-Frontmatter. |
| `relativePathToRoot` | Z. B. `./` oder `../` — verwenden Sie dies zum Erzeugen relativer URLs. |
| `renderIcon(name, opts)` | Rendert ein Lucide-Icon. |
| `t(key, params?)` | Übersetzungsfunktion. |
| `buildRelativeUrl(url)` | Löst eine URL relativ zur aktuellen Seite auf. |
| `pageTitle`, `siteTitle`, `appearance` | Häufige Strings. |
| `_template` | Metadaten zum aufgelösten Template (neu in 0.8.7). |

Sie können Standard-Partials aus `@docmd/ui` einbinden, indem Sie sie zur Build-Zeit einlesen. Das einfachste Muster ist, eine Kopie der wiederverwendeten Partials zu pflegen; Templates erben Partial-Pfade nicht automatisch.

## Asset-Prioritätskette

CSS und JS werden in dieser Reihenfolge geladen (niedriger zuerst, höher gewinnt Kaskaden-Konflikte):

| Priorität | Schicht | Hinweise |
|---|---|---|
| 0  | Basis (`docmd-main.css`, `docmd-main.js`) | Immer vorhanden. |
| 5  | Theme-Farb-Overlay (`docmd-theme-sky.css` usw.) | Aus `theme.name`. Wird übersprungen, wenn der Name zu einem Template promoviert wurde (siehe `_noCssOverlay`). |
| 10 | **Template-Struktur** (Standard) | Ihr Template-CSS — dies ist der Standard, wenn Sie `priority` weglassen. |
| 15 | Benutzerdefiniertes `customCss` / `customJs` | Gewinnt immer — das ist der Vertrag. |
| 20 | Plugin-CSS/JS | Lightbox, Search, Analytics usw. |
| 25+ | Höhere Template-Priorität | **Nur verwenden, wenn Plugins überschrieben werden müssen.** Das offizielle Summer-Template deklariert `priority: 25`, sodass es nach Plugin-CSS lädt. Höhere Werte kaskadieren später. |

Templates dürfen eine höhere Priorität als 10 deklarieren — Summer selbst verwendet **25**, um Plugin-Stile zu überschreiben. Empfohlener Bereich: **10–20** für "vom Nutzer überschreibbare" Templates, **20+** für "opinionated Layout"-Templates.

::: callout warning "Verwenden Sie kein !important"
Templates sollten CSS schreiben, das von `customCss` mit Priorität 15 überschrieben werden kann. Die Verwendung von `!important` bricht diesen Vertrag und zwingt Nutzer, das Template zu forken, um es neu zu stylen. (Summers CSS-Datei-Header erzwingt dies — `!important` wurde beim 0.8.7-Cleanup entfernt, sodass Nutzer Summer nun ohne `!important` überschreiben können.)
:::

## Template-Lokalisierung

Die `i18n`-Konfiguration gilt weiterhin — die aktive Locale wird als normaler Local an Ihr Template übergeben. Übersetzungen werden wie in den Standardtemplates über den `t(key)`-Helper nachgeschlagen.

## API-Referenz

### `resolveTemplate(ctx)` aus `@docmd/ui`

```ts
import { resolveTemplate } from '@docmd/ui';

const resolved = resolveTemplate({
  type: 'layout',                       // jeder TemplateSlot
  pagePath: '/guide/intro.html',
  frontmatter: page.frontmatter,        // kann `template: "..."` tragen
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
  TemplateSlot,         // Vereinigung der 14 Slot-Namen
  TemplateHook,         // { type, templatePath, priority?, pages?, exclude? }
  TemplateAssetHook,    // { type: 'css'|'js', path, priority?, position? }
  ResolvedTemplate,
  TemplateResolutionContext,
  Capability,           // enthält nun 'template'
} from '@docmd/api';
```

## Fehlerbehebung

### "Template deklariert Slot X, aber Datei nicht gefunden"

Der `templatePath` aus `index.js` des Templates existiert nicht auf der Festplatte. Der Resolver ist auf den Standard zurückgefallen. Prüfen Sie, ob der Pfad absolut ist (verwenden Sie `fileURLToPath(import.meta.url)`), und ob die Datei im `files`-Feld des veröffentlichten Pakets enthalten ist.

### Mein Template-CSS wird von etwas anderem überschrieben

CSS-Priorität ist endgültig. Benutzerdefiniertes `customCss` (Priorität 15) gewinnt immer. Wenn Sie möchten, dass Nutzer bestimmte Selektoren überschreiben können, ohne das gesamte Template zu ersetzen, dokumentieren Sie die öffentlichen CSS-Klassennamen und lassen Sie Nutzer sie mit `customCss` adressieren.

### Pro-Seite-Template-Override funktioniert nicht

Stellen Sie sicher, dass der `template`-Wert im Frontmatter zu einem registrierten Plugin passt. Der Resolver gleicht gegen den `descriptor.name` des Plugins ab und entfernt die Präfixe `@docmd/` und `template-`. Daher sind alle diese Schreibweisen äquivalent:

- `template: "summer"`
- `template: "template-summer"`
- `template: "@docmd/template-summer"`

Wenn keine davon passt, fällt der Resolver auf `config.theme.template` und dann auf den Standard zurück.