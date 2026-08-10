---
title: "No-Style-Seiten"
description: "Erstellen Sie benutzerdefinierte Landingpages und einzigartige Layouts durch Umgehen des Standard-Dokumentations-Layouts in docmd."
---

`docmd` ermöglicht es Ihnen, das standardmäßige Dokumentations-Layout (Sidebar, Header, Footer) seitenweise zu umgehen. Dies ist ideal zum Erstellen von wirkungsvollen Landingpages oder benutzerdefinierten Dashboards, während Sie den Zugriff auf den Container-Parser der Engine behalten.

## No-Style-Modus aktivieren

Um globale UI-Komponenten zu deaktivieren, setzen Sie `noStyle: true` in Ihrem Seiten-Frontmatter:

```yaml
---
title: "Product Showcase"
noStyle: true
components:
  meta: true      # SEO- und OpenGraph-Metadaten-Tags behalten
  favicon: true   # Site-Favicon behalten
  css: true       # docmd-main.css für Typografie und Raster-Systeme injizieren
---

<!-- Benutzerdefiniertes HTML oder spezialisierte Markdown-Container -->
<div class="hero">
  <h1>Next-Gen Documentation Engine</h1>
  <p>Zero-config. Isomorphic execution. AI-optimised.</p>
</div>

::: callout info title:"Unterstützung für unendliche Verschachtelung" icon:info
Auch mit `noStyle: true` werden alle standardmäßigen docmd-Container (wie `::: card`, `::: tabs` und `::: hero`) vollständig unterstützt und können frei komponiert werden.
::: /callout
```

## Komponenten-Opt-in-Steuerungen

Wenn `noStyle: true` aktiv ist, beginnen Sie mit einer leeren Leinwand. Aktivieren Sie Kern-Systemkomponenten bei Bedarf selektiv wieder:

| Komponente | Technische Beschreibung |
| :--- | :--- |
| `meta` | Injiziert `<title>`, SEO-Meta-Tags und strukturierte OpenGraph-Metadaten. |
| `favicon` | Injiziert den projektweiten Favicon-Link. |
| `css` | Injiziert `docmd-main.css`. Empfohlen für zentrale Raster-Utilities und Typografie-Regeln. |
| `menubar` | Injiziert die obere Navigations-Menubar. |
| `theme` | Injiziert CSS-Variablen und Erscheinungs-Überschreibungen des aktiven Themes. |
| `scripts` | Injiziert interaktive Container-Client-Skripte (erfordert `mainScripts: true`). |
| `spa` | Aktiviert die Single-Page-Application-Router-Navigation (erfordert `scripts: true`). |

## Komponierbare Landingpages

Der Hauptvorteil von `noStyle` besteht darin, `docmd`-Container als Bausteine auf einer leeren Leinwand zu verwenden. Anstatt ausführlichen rohen HTML-Code zu schreiben, können Sie Landingpage-Layouts rein mit Markdown erstellen:

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Site-Navigationsleiste behalten
  scripts: true    # Interaktive Container-Skripte aktivieren
  mainScripts: true
---

::: hero layout:split glow:true
# Build Documentation that Wows.
The zero-config documentation engine for modern engineering teams.

::: button title:"Get Started" url:"../getting-started/quick-start.md" color:blue
::: button title:"GitHub Repository" url:"external:https://github.com/docmd-io/docmd" color:gray

== side
::: embed url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
::: /hero
:::

::: grids
  ::: card title:"Zero Configuration"
  Author content in Markdown without complex frontend build scripts.
  ::: /card
  ::: card title:"AI Optimised"
  Structure-aware parsing for the LLM ecosystem.
  ::: /card
  ::: card title:"Isomorphic Performance"
  Static compilation with fast SPA navigation.
  ::: /card
::: /grids
```

::: callout tip "KI-generierte Layouts" icon:sparkles
Da `noStyle`-Seiten HTML neben `docmd`-Containern akzeptieren, eignen sie sich ideal für das **KI-gestützte UI-Prototyping**. Prompten Sie einen KI-Agenten: *"Entwerfen Sie einen modernen Landing-Bereich mit Utility-Klassen und docmd-Button-Containern."*
:::

## String-Ersetzung (i18n für noStyle-Seiten)

Wenn Ihre Website über [konfiguriertes i18n](../configuration/localisation/index.md) verfügt, erhalten Standard-Dokumentationsseiten automatisch serverseitige Übersetzungen. `noStyle`-Seiten verwenden jedoch häufig benutzerdefinierte HTML-Elemente. `docmd` bietet **String-Ersetzung**, um HTML über `data-i18n`-Attribute und JSON-Übersetzungskarten zu übersetzen.

::: callout info "Umfang der String-Ersetzung" icon:info
Die String-Ersetzung vergleicht Elemente mit `data-i18n`-Attributen und tauscht deren Textinhalt aus. Standard-Markdown-Inhalte werden zu reinen `<p>`-, `<h2>`-, `<li>`-Tags ohne diese Attribute kompiliert. Für Standard-Markdown-Inhalte verwenden Sie den [Verzeichnismodus](../configuration/localisation/translated-content.md).
:::

### Betriebsmodi

Die String-Ersetzung unterstützt zwei Ausführungsmodelle:

- **Serverseitig (empfohlen)**: Mit `stringMode: true` in Ihrer i18n-Konfiguration löst `docmd` `data-i18n`-Attribute **zur Build-Zeit** auf. Es generiert vollständig übersetztes statisches HTML in `/{locale}/`-Verzeichnissen für Suchmaschinen.
- **Clientseitig**: Das Skript `docmd-i18n-strings.js` lädt Übersetzungskarten zur Laufzeit über XHR. Dies ermöglicht einen sofortigen In-Place-Sprachwechsel ohne vollständiges Neuladen der Seite.

Beide Modi teilen sich eine identische `data-i18n`-Attributnotation und JSON-Übersetzungsschemas.

1. Speichern Sie JSON-Übersetzungskarten in `assets/i18n/` (eine Datei pro Locale):

```text
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Formatieren Sie jede JSON-Datei als flache Schlüssel-Wert-Zuordnung:

```json "assets/i18n/en.json"
{
  "hero.title": "Markdown → Production Docs",
  "hero.subtitle": "The zero-config documentation engine.",
  "nav.docs": "Documentation",
  "nav.editor": "Live Editor",
  "cta.getStarted": "Get Started",
  "cta.install": "npm i @docmd/core"
}
```

3. Füge `data-i18n`-Attribute an Ihre HTML-Elemente an:

```html
<h1 data-i18n="hero.title">Markdown → Production Docs</h1>
<p data-i18n="hero.subtitle">The zero-config documentation engine.</p>
<a data-i18n="nav.docs" href="/docs">Documentation</a>
```

### Attribut-Übersetzung

Um Attribute wie `placeholder`, `title` oder `aria-label` zu übersetzen, verwenden Sie die Notation `data-i18n-{attr}`:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Search...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Open menu">☰</button>
<a data-i18n-title="nav.tooltip" title="Go to docs">Docs</a>
```

### Roh-HTML-Inhaltsübersetzung

Für Schlüssel, die HTML-Markup enthalten, verwenden Sie `data-i18n-html` anstelle von `data-i18n`:

```html
<p data-i18n-html="hero.desc">Static HTML for SEO. <br>SPA router for speed.</p>
```

### Globale i18n-API

Das Modul für i18n-Strings stellt eine globale API unter `window.DOCMD_I18N_STRINGS` bereit:

```javascript
// Aktive Locale wechseln
DOCMD_I18N_STRINGS.switchLocale("de");

// Auf aktive Locale-Zeichenfolge zugreifen
console.log(DOCMD_I18N_STRINGS.locale); 

// Unterstütztes Locale-Array abrufen
console.log(DOCMD_I18N_STRINGS.locales);
```

Bauen Sie einen benutzerdefinierten Sprachauswähler mit dieser API:

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="de">Deutsch</option>
  <option value="zh">中文</option>
</select>
```

### Ereignis-Lebenszyklus

Hören Sie auf das Ereignis `docmd:i18n-applied`, um benutzerdefinierte Logik auszuführen, nachdem die Ersetzung von Zeichenfolgen abgeschlossen ist:

```javascript
document.addEventListener("docmd:i18n-applied", function(e) {
  console.log("Locale:", e.detail.locale);
  console.log("Strings:", e.detail.strings);
});
```

::: callout info title:"Automatische Spracherkennung" icon:info
Das Client-Skript erkennt aktive Locales anhand des URL-Pfadpräfixes. Für die Standard-Locale prüft es `localStorage` auf gespeicherte Einstellungen. Die Funktion `switchLocale()` verarbeitet die URL-Navigation automatisch.
::: /callout

### Konfiguration des In-Place-Modus

Für Single-Page-Anwendungen oder Landing-Portale setzen Sie `inPlace: true` in Ihrer i18n-Konfiguration, um String-Werte ohne URL-Navigation auszutauschen:

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "de", "label": "Deutsch" },
      { "id": "zh", "label": "中文" }
    ],
    "inPlace": true
  }
}
```

Mit `inPlace: true` lädt der Aufruf von `switchLocale()` die Übersetzungskarte für die angeforderte Locale ab und ersetzt alle `data-i18n`-Werte an Ort und Stelle, ohne ein Neuladen der Seite auszulösen.