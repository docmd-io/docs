---
title: "Playground-Container"
description: "Binden Sie ausführbare JavaScript-Umgebungen, Live-HTML-Vorschauen, tabellarische Live/Code-Umschalter und aktive Repository-Skripte mit dem ::: playground-Container ein."
---

Der `::: playground`-Container verwandelt statische Codebeispiele in interaktive, in sich geschlossene Sandboxen. Leser können Code direkt im Browser bearbeiten, mit einem Klick oder Tastenkürzel ausführen, strukturierte Konsolenausgaben analysieren, zwischen Live-Ausgabe und Quellcode wechseln und interaktive HTML/CSS-Komponenten in Echtzeit testen.

::: callout info "Zero-Config-Architektur" icon:zap
Die Playground-Laufzeitumgebung basiert auf reinem Standard-JavaScript und CSS ohne ressourcenintensive Frameworks. Seiten ohne Playgrounds laden **0 KB zusätzliche Daten**.
:::

## Container-Syntax

Der Container unterstützt Block-Container mit umschlossenem Code, selbstschließende Container für externe Skripte aus dem Repository sowie standardmäßige Fenced-Codeblöcke.

### 1. Block-Container mit umschlossenem Code

Umschließen Sie regulären Code mit einem `::: playground`-Block:

````markdown
::: playground title="Reaktiver Variablen-Explorer" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Website-Titel:", siteTitle);
console.log("Build-Jahr:", buildYear);

// Reaktive Client-Variable modifizieren
docmd.var.set("user.plan", "Enterprise");
console.info("Aktualisierter Benutzer-Plan:", docmd.var.get("user.plan"));
return `Aktuelles Jahr: ${buildYear}`;
```
:::
````

Hier ist das funktionierende Live-Beispiel, direkt gerendert von `docmd`:

::: playground title="Reaktiver Variablen-Explorer" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Website-Titel:", siteTitle);
console.log("Build-Jahr:", buildYear);

// Reaktive Client-Variable modifizieren
docmd.var.set("user.plan", "Enterprise");
console.info("Aktualisierter Benutzer-Plan:", docmd.var.get("user.plan"));
return `Aktuelles Jahr: ${buildYear}`;
```
:::

### 2. Umschalten zwischen Live- und Code-Ansicht (`tabs`)

Wenn `tabs` (oder `mode="tabs"`) in den Containereinstellungen aktiviert ist, stellt die Symbolleiste interaktive **Live**- und **Code**-Reiter bereit, sodass Leser nahtlos zwischen der Live-Komponente und dem Quellcode umschalten können:

````markdown
::: playground tabs title="Interaktive Komponente (Live & Code Umschalter)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Tab-Vorschaumodus aktiv</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Wechseln Sie über die Reiter in der oberen Symbolleiste zwischen <strong>Live</strong>-Ausgabe und <strong>Code</strong>-Ansicht.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Aktion in Tab-Vorschau ausgelöst!')">
    Konsolenprotokoll auslösen
  </button>
</div>
```
:::
````

Hier ist der aktive Live-Container mit Tab-Umschaltung:

::: playground tabs title="Interaktive Komponente (Live & Code Umschalter)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Tab-Vorschaumodus aktiv</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Wechseln Sie über die Reiter in der oberen Symbolleiste zwischen <strong>Live</strong>-Ausgabe und <strong>Code</strong>-Ansicht.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Aktion in Tab-Vorschau ausgelöst!')">
    Konsolenprotokoll auslösen
  </button>
</div>
```
:::

### 3. Tab-Container mit Fokus auf Code (`tabs:code`)

Mit `tabs:code` oder `tabs view="code"` startet der Container standardmäßig in der Codeansicht und bietet weiterhin einen sofortigen Umschalter zur Live-Ansicht:

````markdown
::: playground tabs:code title="Tab-Container (Code zuerst)" icon:code live
```js
// Fakultät rekursiv berechnen
function fakultaet(n) {
  if (n <= 1) return 1;
  return n * fakultaet(n - 1);
}

const num = 5;
const ergebnis = fakultaet(num);
console.log(`Fakultät von ${num} ist:`, ergebnis);
return ergebnis;
```
:::
````

Live-Beispiel mit anfänglicher Code-Ansicht:

::: playground tabs:code title="Tab-Container (Code zuerst)" icon:code live
```js
// Fakultät rekursiv berechnen
function fakultaet(n) {
  if (n <= 1) return 1;
  return n * fakultaet(n - 1);
}

const num = 5;
const ergebnis = fakultaet(num);
console.log(`Fakultät von ${num} ist:`, ergebnis);
return ergebnis;
```
:::

### 4. Selbstschließender Container mit aktiver Skriptdatei

Statt Code manuell in die Dokumentation zu kopieren, können Sie Skriptdateien aus Ihrem Repository direkt über das `src`-Attribut referenzieren:

```markdown
::: playground src="./snippets/counter.js" title="Aktives eingebundenes Skript" icon:cpu live /:::
```

Hier ist das aktive Live-Beispiel mit [./snippets/counter.js](file:///Users/mac/Workspace/GitHub/docmd-io/docs/docmd-main/v09/de/content/containers/snippets/counter.js):

::: playground src="./snippets/counter.js" title="Aktives eingebundenes Skript" icon:cpu live /:::

::: callout tip "Kontinuierliche Codesynchronisation" icon:refresh-cw
Bei Verwendung von `src="./pfad/zur/datei"` löst `docmd` die Datei zur Build-Zeit relativ zur Dokumentationsseite oder zum Workspace-Stammverzeichnis auf. Bei Änderungen im Codebase aktualisieren sich die Beispiele beim nächsten Build automatisch.
:::

### 5. Fehlertoleranz bei fehlendem Skript

Sollte ein Skriptpfad fehlerhaft sein oder verschoben werden, zeigt `docmd` ein unaufdringliches Warnbanner und gibt sauberen Fallback-Code aus, ohne den Build abzubrechen:

```markdown
::: playground src="./snippets/fehlendes-skript.js" title="Warnhinweis bei fehlendem Skript" icon:alert-triangle /:::
```

Live-Demonstration der Fehlertoleranz:

::: playground src="./snippets/fehlendes-skript.js" title="Warnhinweis bei fehlendem Skript" icon:alert-triangle /:::

### 6. Fenced-Codeblock-Syntax

Für schnelle Beispiele ohne Container-Verschachtelung genügt der Zusatz `playground` im Markdown-Codefence:

````markdown
```js playground title="Schneller Fibonacci-Rechner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

Live-Beispiel als Fenced-Codeblock:

```js playground title="Schneller Fibonacci-Rechner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## Container-Attribute

Der `::: playground`-Container unterstützt umfangreiche Metadaten-Attribute:

| Attribut | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Abgeleitet oder `"Playground"` | In der Toolbar angezeigte Überschrift. Unterstützt `title:"Mein Titel"` oder Anführungszeichen. |
| `src` / `file` | `string` | Keine | Relativer Pfad zu einer lokalen Codedatei, die in den Editor geladen wird. |
| `icon` | `string` | `"play"` | Lucide-Icon-Name neben dem Titel (z. B. `icon:code`, `icon:cpu`, `icon:layout`). |
| `live` | `boolean` | `false` | Führt den Code beim Laden der Seite automatisch aus. |
| `tabs` / `mode` | `string` \| `boolean` | `false` | Aktiviert Reiter zum Umschalten zwischen „Live“ und „Code“. Unterstützt `tabs:code` für anfängliche Code-Ansicht. |
| `readonly` | `boolean` | `false` | Sperrt den Editor gegen Bearbeitung, erlaubt aber die Ausführung. |
| `layout` | `string` | `"split"` | Bestimmt die Anordnung: `"split"` (nebeneinander) oder `"stacked"` (untereinander). |
| `lang` | `string` | Abgeleitet (`"js"`) | Explizite Sprachangabe (`js`, `html`, `css`). Automatisch aus Dateiendung oder Codefence ermittelt. |

## Interaktive Funktionen

::: tabs
::: tab title="JavaScript-Runner" icon:code
Playgrounds führen JavaScript in einem isolierten Ausführungskontext aus. Die Konsole erfasst:

* `console.log(...)` — Standardausgaben mit Syntaxhervorhebung
* `console.info(...)` — Informationsmeldungen mit blauem Indikator
* `console.warn(...)` — Warnhinweise mit bernsteinfarbenem Indikator
* `console.error(...)` — Fehlerprotokolle mit rotem Indikator und Stacktrace
* Rückgabewerte — Ausdrücke am Skriptende werden direkt dargestellt: `=> 30`

```js playground title="Konsolen-Demonstration"
console.log("Hallo von docmd!");
console.info("Statusbericht:", { status: "aktiv", version: "0.9.9" });
console.warn("Hinweis: Test-Warnung");
return "Ausführung erfolgreich beendet";
```
:::

::: tab title="HTML-Komponenten-Vorschau" icon:layout
Wenn die Sprache auf `html` gesetzt ist (über ```` ```html playground ```` oder `::: playground lang:html`), öffnet der Playground automatisch den **Vorschau**-Reiter und rendert das Markup in einem isolierten Frame:

```html playground title="Live-Schaltfläche" live
<button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="alert('Komponente angeklickt!')">
  Interaktiver Button
</button>
```
:::

::: tab title="docmd-runtime-Integration" icon:braces
Playgrounds haben vollen Zugriff auf das globale `window.docmd`-Laufzeitobjekt und reaktive Variablen:

* `docmd.var.get('docmd.version')` — Build- oder clientseitige Variablen auslesen
* `docmd.var.set('key', 'value')` — Variablen aktualisieren und DOM-Neurendern auslösen
* `docmd.theme.get()` / `docmd.theme.toggle()` — Aktives Farbschema prüfen oder umschalten

```js playground title="Theme & Variablen API" live
console.log("Aktuelles Theme:", window.docmd?.theme?.get() || "light");
console.log("Docmd-Engine-Version:", window.docmd?.var?.get("docmd.version") || "0.9.9");
console.log("Git-Branch:", window.docmd?.var?.get("docmd.gitBranch") || "main");
return "SDK erreichbar";
```
:::
:::

## Tastaturkürzel

Der Playground-Editor bietet vertraute Tastenkürzel für schnelles Arbeiten:

* <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> (macOS) oder <kbd class="docmd-kbd">Strg</kbd> + <kbd class="docmd-kbd">Enter</kbd> (Windows/Linux): Codeblock sofort ausführen
* <kbd class="docmd-kbd">Tab</kbd>: Fügt 2 Leerzeichen Einrückung ein
* <kbd class="docmd-kbd">Umschalt</kbd> + <kbd class="docmd-kbd">Tab</kbd>: Hebt die Einrückung der aktuellen Zeile oder Auswahl auf