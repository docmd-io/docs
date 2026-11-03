---
title: "Playground"
description: "Binden Sie ausführbare JavaScript-Umgebungen, Live-HTML-Vorschauen, tabellarische Live/Code-Umschalter und aktive Repository-Skripte mit dem ::: playground-Container ein."
---

Der `::: playground`-Container verwandelt statische Codebeispiele in interaktive, in sich geschlossene Sandboxen. Leser können Code direkt im Browser bearbeiten, mit einem Klick oder Tastenkürzel ausführen, strukturierte Konsolenausgaben analysieren, zwischen Live-Ausgabe und Quellcode wechseln und interaktive HTML/CSS-Komponenten in Echtzeit testen.

::: callout info "Zero-Config-Architektur" icon:zap
Die Playground-Laufzeitumgebung basiert auf reinem Standard-JavaScript und CSS ohne ressourcenintensive Frameworks. Seiten ohne Playgrounds laden **0 KB zusätzliche Daten**.
:::

## Container-Syntax

````markdown
# Standard Block-Container
::: playground [title:"Toolbar-Titel"] [icon:icon_name] [live] [view:"code"|"live"] [tab:"preview"|"console"]
// JavaScript- oder HTML/CSS-Code
::: /playground # Expliziter Container-Abschluss

# Selbstschließender Container mit externem Skript
::: playground src="./pfad/zum/skript.js" [title:"Toolbar-Titel"] [icon:icon_name] [live] /:::

# Schneller Fenced-Codeblock
```js playground [title:"Toolbar-Titel"] [icon:icon_name] [live]
// JavaScript-Code
```
````

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| **Titel** | `"String"` \| `title:"..."` | Abgeleitet oder `"Playground"` | In der Toolbar angezeigte Überschrift (1. Positionsargument oder `title:"..."`). |
| **Quelldatei** | `src:PFAD` \| `file:PFAD` | Keine | Relativer Pfad zu einer lokalen Skriptdatei, die in den Editor geladen wird. |
| **Iconografie** | `icon:NAME` | `"play"` | Optional. [Lucide](external:https://lucide.dev/icons)-Icon-Name neben dem Titel (z. B. `icon:code`, `icon:cpu`, `icon:layout`). |
| **Sprache** | `lang:SPRACHE` | Abgeleitet (`"js"`) | Explizite Sprachangabe (`js`, `html`, `css`). Automatisch aus Dateiendung oder Codefence ermittelt. |
| **Automatische Ausführung** | `live` | `false` | Führt den Code beim Laden der Seite automatisch aus. |
| **Standardansicht** | `view:"code"` \| `view:"live"` | `"live"` | Aktiver Anfangsmodus (`"live"` für Vorschau/Konsole oder `"code"` zum direkten Öffnen des Code-Editors). |
| **Ausgabereiter** | `tab:"preview"` \| `tab:"console"` | `"console"` oder `"preview"` | Standard-Ausgabereiter (`"preview"` oder `"console"`). Unterstützt auch das `preview`-Attribut. |
| **No-Code-Modus** | `nocode` | `false` | Versteckt den „Code“-Reiter und zeigt direkt die Live-Ausgabe (auch `code:false`). |
| **Schreibgeschützt** | `readonly` | `false` | Sperrt den Editor gegen Bearbeitung, erlaubt aber die Ausführung. |
| **Layout** | `layout:"stacked"` \| `"split"` | `"stacked"` | Bestimmt die Darstellung: standardmäßig Einzelbereichsansicht mit Play/Code-Umschalter oder `"split"` für Nebeneinander. |
| **Schließende Tags** | `::: /playground`, `/:::`, `:::` | Standardschließung | Unterstützt explizites Schließen `::: /playground`, selbstschließendes `/:::`, oder allgemeines `:::`. |

::: callout warning "Sicherheitshinweis & Skriptausführung" icon:shield-alert
Der gesamte Playground-Code wird vollständig clientseitig im Browser des Lesers ausgeführt. HTML-Vorschauen laufen in einem isolierten Sandbox-Iframe mit opaker Origin (`null`), wodurch der Zugriff auf übergeordnete DOM-Strukturen oder Cookies unterbunden wird. Stellen Sie bei automatischer Ausführung (`live`) sicher, dass Code-Snippets aus vertrauenswürdigen Quellen stammen.
:::

## Anwendungsbeispiele

### Interaktive JavaScript-Ausführung

Standard-Block-Playground mit Demonstration von `console.log`, `console.info`, `console.warn` und Rückgabewerten:

````markdown
::: playground title="JavaScript Konsole & Rückgabe-Demo" icon:code live
```js
console.log("Hallo von docmd!");
console.info("Status-Payload:", { status: "active", version: "0.9.9" });
console.warn("Hinweis: Demo-Warnung");
return "Ausführung erfolgreich abgeschlossen";
```
::: /playground
````

::: playground title="JavaScript Konsole & Rückgabe-Demo" icon:code live
```js
console.log("Hallo von docmd!");
console.info("Status-Payload:", { status: "active", version: "0.9.9" });
console.warn("Hinweis: Demo-Warnung");
return "Ausführung erfolgreich abgeschlossen";
```
::: /playground

### Live-HTML-Komponentenvorschau

Wenn die Sprache auf `html` gesetzt ist (oder `lang:html`), wählt der Playground automatisch das **Vorschau**-Panel aus und rendert HTML/CSS in einem Sandbox-Frame:

````markdown
::: playground title="Interaktive Komponentenvorschau" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Sofortige Komponentenvorschau</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Wechseln Sie zwischen der <strong>Play</strong>-Live-Darstellung und der <strong>Code</strong>-Ansicht über den Toolbar-Umschalter.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Aktion über Komponentenvorschau ausgelöst!')">
    Konsolenausgabe auslösen
  </button>
</div>
```
::: /playground
````

::: playground title="Interaktive Komponentenvorschau" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Sofortige Komponentenvorschau</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Wechseln Sie zwischen der <strong>Play</strong>-Live-Darstellung und der <strong>Code</strong>-Ansicht über den Toolbar-Umschalter.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Aktion über Komponentenvorschau ausgelöst!')">
    Konsolenausgabe auslösen
  </button>
</div>
```
::: /playground

### Reaktive Variablen & docmd-Laufzeitumgebung

Playgrounds haben Zugriff auf das globale `window.docmd`-Laufzeitobjekt und reaktive Variablen:

````markdown
::: playground title="Reaktiver Variablen-Explorer" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Website-Titel:", siteTitle);
console.log("Build-Jahr:", buildYear);

// Clientseitige reaktive Variable modifizieren
docmd.var.set("user.plan", "Enterprise");
console.info("Aktualisierter Plan:", docmd.var.get("user.plan"));
return `Aktuelles Jahr: ${buildYear}`;
```
::: /playground
````

::: playground title="Reaktiver Variablen-Explorer" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Website-Titel:", siteTitle);
console.log("Build-Jahr:", buildYear);

// Clientseitige reaktive Variable modifizieren
docmd.var.set("user.plan", "Enterprise");
console.info("Aktualisierter Plan:", docmd.var.get("user.plan"));
return `Aktuelles Jahr: ${buildYear}`;
```
::: /playground

### Code-First-Anfangsansicht (`view:"code"`)

Konfigurieren Sie den Playground so, dass er beim Laden der Seite direkt den Code-Editor anzeigt, während der Play-Umschalter erreichbar bleibt:

````markdown
::: playground view:"code" title="Fakultäts-Algorithmus (Code First)" icon:code live
```js
// Fakultät rekursiv berechnen
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`Fakultät von ${num} ist:`, result);
return result;
```
::: /playground
````

::: playground view:"code" title="Fakultäts-Algorithmus (Code First)" icon:code live
```js
// Fakultät rekursiv berechnen
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`Fakultät von ${num} ist:`, result);
return result;
```
::: /playground

### Aktives Repository-Skript (`src`)

Verlinken Sie direkt auf eine Skriptdatei im Repository mittels `src`-Attribut:

````markdown
::: playground src="./snippets/counter.js" title="Aktives Repository-Skript" icon:cpu live /:::
````

::: playground src="./snippets/counter.js" title="Aktives Repository-Skript" icon:cpu live /:::

::: callout tip "Kontinuierliche Codesynchronisation" icon:refresh-cw
Bei Verwendung von `src="./pfad/zur/datei"` löst `docmd` die Datei zur Build-Zeit relativ zur Dokumentationsseite oder dem Workspace-Root auf. Änderungen in der Codebasis fließen beim nächsten Build automatisch ein. Bei fehlenden Dateien wird eine sanfte Warnung angezeigt, ohne den Build abzubrechen.
:::

### Schneller Fenced-Codeblock

Für schnelle Codebeispiele ohne Block-Verschachtelung hängen Sie `playground` einfach an einen Markdown-Codefence an:

````markdown
```js playground title="Schneller Fibonacci-Runner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

```js playground title="Schneller Fibonacci-Runner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## Tastaturkürzel

Der Playground-Editor bietet vertraute Tastaturkürzel:

| Tastenkombination | Beschreibung |
| :--- | :--- |
| <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> / <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> | Aktiven Codeblock ausführen. |
| <kbd class="docmd-kbd">Tab</kbd> | Fügt 2 Leerzeichen Einrückung ein, anstatt den Browser-Fokus zu wechseln. |
| <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd> | Nimmt Einrückung für die Zeile oder Auswahl zurück. |

## Zugehörige Dokumentation

Für weiterführende technische Details zu AST-Parsing-Hooks, Skriptauflösung zur Build-Zeit und globale Plugin-Optionen siehe die **[Playground-Plugin-Architektur & Technische Referenz](../../plugins/playground.md)**.