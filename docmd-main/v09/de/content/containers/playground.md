---
title: "Playground-Container"
description: "Binden Sie ausführbare JavaScript-Umgebungen, Live-HTML-Vorschauen, tabellarische Live/Code-Umschalter und aktive Repository-Skripte mit dem ::: playground-Container ein."
---

Der `::: playground`-Container verwandelt statische Codebeispiele in interaktive, in sich geschlossene Sandboxen. Leser können Code direkt im Browser bearbeiten, mit einem Klick oder Tastenkürzel ausführen, strukturierte Konsolenausgaben analysieren, zwischen Live-Ausgabe und Quellcode wechseln und interaktive HTML/CSS-Komponenten in Echtzeit testen.

::: callout info "Zero-Config-Architektur" icon:zap
Die Playground-Laufzeitumgebung basiert auf reinem Standard-JavaScript und CSS ohne ressourcenintensive Frameworks. Seiten ohne Playgrounds laden **0 KB zusätzliche Daten**.
:::

## Container-Syntax

```markdown
# Block-Container (Eingebetteter Code & Ausgabe)
::: playground [title:"Titel"] [icon:NAME] [live] [view:"code"] [tab:"preview"|"console"] [nocode] [readonly]
```js
// JavaScript- oder HTML/CSS-Code
```
::: /playground

# Selbstschließender Container (Aktives Repository-Skript)
::: playground src="./snippets/counter.js" [title:"Titel"] [icon:NAME] [live] /:::

# Schneller Fenced-Codeblock
```js playground [title:"Titel"] [icon:NAME] [live]
// Code hier
```
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| **Titel** | `string` \| `title:"..."` | Abgeleitet oder `"Playground"` | In der Toolbar angezeigte Überschrift. Unterstützt `title:"Mein Titel"` oder Anführungszeichen. |
| **Quelldatei** | `src:PFAD` \| `file:PFAD` | Keine | Relativer Pfad zu einer lokalen Codedatei im Repository, die in den Editor geladen wird. |
| **Iconografie** | `icon:NAME` | `"play"` | Optional. [Lucide](external:https://lucide.dev/icons)-Icon-Name neben dem Titel (z. B. `icon:code`, `icon:cpu`, `icon:layout`). |
| **Automatische Ausführung** | `live` | `false` | Führt den Code beim Laden der Seite automatisch aus. |
| **Standardansicht** | `view:"code"` \| `view:"live"` | `"live"` | Aktiver Anfangsmodus (`"live"` für Vorschau/Konsole oder `"code"` zum direkten Öffnen des Code-Editors). |
| **Ausgabereiter** | `tab:"preview"` \| `tab:"console"` | `"console"` oder `"preview"` | Standard-Ausgabereiter (`"preview"` oder `"console"`). Unterstützt auch das `preview`-Attribut. |
| **No-Code-Modus** | `nocode` | `false` | Versteckt den „Code“-Reiter und zeigt direkt die Live-Ausgabe in voller Breite (auch `code:false`). |
| **Schreibgeschützt** | `readonly` | `false` | Sperrt den Editor gegen Bearbeitung, erlaubt aber die Ausführung. |
| **Layout** | `layout:"stacked"` \| `"split"` | `"stacked"` | Bestimmt die Darstellung: standardmäßig Einzelbereichsansicht mit Play/Code-Umschalter oder `"split"` für Nebeneinander. |
| **Sprache** | `lang:SPRACHE` | Abgeleitet (`"js"`) | Explizite Sprachangabe (`js`, `html`, `css`). Automatisch aus Dateiendung oder Codefence ermittelt. |
| **Schließende Tags** | `::: /playground`, `/:::`, `:::` | Standardschließung | Unterstützt explizites Schließen `::: /playground`, selbstschließendes `/:::`, oder allgemeines `:::`. |

::: callout warning "Sicherheitshinweis & Skriptausführung" icon:shield-alert
Der gesamte Playground-Code wird vollständig clientseitig im Browser des Lesers ausgeführt. HTML-Vorschauen laufen in einem isolierten Sandbox-Iframe mit opaker Origin (`null`), wodurch der Zugriff auf übergeordnete DOM-Strukturen oder Cookies unterbunden wird. Stellen Sie bei automatischer Ausführung (`live`) sicher, dass Code-Snippets aus vertrauenswürdigen Quellen stammen.
:::


## Anwendungsbeispiele

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

### 2. Umschalten zwischen Play- und Code-Ansicht

Jeder Playground verfügt über einen integrierten Zwei-in-Eins-Umschalter für **Play** und **Code** in der oberen Symbolleiste. Der Hauptbereich wird standardmäßig in voller Breite als einheitlicher Bereich dargestellt:

````markdown
::: playground title="Interaktive Komponente (Play & Code Umschalter)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Sofortige Komponentenvorschau</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Wechseln Sie über die Schaltflächen in der Symbolleiste nahtlos zwischen der <strong>Play</strong>-Live-Ausgabe und der <strong>Code</strong>-Ansicht.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Aktion in Vorschau ausgelöst!')">
    Konsolenprotokoll auslösen
  </button>
</div>
```
:::
````

Hier ist der aktive Live-Container mit Umschaltung:

::: playground title="Interaktive Komponente (Play & Code Umschalter)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Sofortige Komponentenvorschau</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Wechseln Sie über die Schaltflächen in der Symbolleiste nahtlos zwischen der <strong>Play</strong>-Live-Ausgabe und der <strong>Code</strong>-Ansicht.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Aktion in Vorschau ausgelöst!')">
    Konsolenprotokoll auslösen
  </button>
</div>
```
:::

### 3. Container mit anfänglicher Code-Ansicht (`view="code"`)

Mit `view="code"` startet der Container standardmäßig in der Codeansicht und bietet weiterhin einen sofortigen Umschalter zur Play-Ansicht:

````markdown
::: playground view="code" title="Fakultät-Algorithmus (Code zuerst)" icon:code live
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

::: playground view="code" title="Fakultät-Algorithmus (Code zuerst)" icon:code live
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


## Interaktive Funktionen

::: tabs
::: tab "JavaScript-Runner" icon:code
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
::: /tab

::: tab "HTML-Komponenten-Vorschau" icon:layout
Wenn die Sprache auf `html` gesetzt ist (über ```` ```html playground ```` oder `::: playground lang:html`), öffnet der Playground automatisch den **Vorschau**-Reiter und rendert das Markup in einem isolierten Frame:

```html playground title="Live-Schaltfläche" live
<button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="alert('Komponente angeklickt!')">
  Interaktiver Button
</button>
```
::: /tab

::: tab "docmd-runtime-Integration" icon:braces
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
::: /tab
::: /tabs

## Tastaturkürzel

Der Playground-Editor bietet vertraute Tastenkürzel für schnelles Arbeiten:

* <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> (macOS) oder <kbd class="docmd-kbd">Strg</kbd> + <kbd class="docmd-kbd">Enter</kbd> (Windows/Linux): Codeblock sofort ausführen
* <kbd class="docmd-kbd">Tab</kbd>: Fügt 2 Leerzeichen Einrückung ein
* <kbd class="docmd-kbd">Umschalt</kbd> + <kbd class="docmd-kbd">Tab</kbd>: Hebt die Einrückung der aktuellen Zeile oder Auswahl auf

## Verwandte Plugin-Dokumentation

Ausführliche technische Details zu AST-Parsing-Hooks, Skriptauflösung zur Build-Zeit, Fehlertoleranz und globalen Plugin-Optionen finden Sie in der **[Playground-Plugin-Architektur & Referenz](../../plugins/playground.md)**.