---
title: "Sicherheit & HTML-Richtlinie"
description: "Konfigurieren Sie HTML-Sicherheitsrichtlinien, bereinigen Sie Roh-HTML, steuern Sie Iframe-Einbettungen und setzen Sie Sicherheits-Best-Practices in docmd um."
---

`docmd` bietet ein robustes, mehrschichtiges Sicherheitsmodell zum Schutz statischer Websites vor Cross-Site Scripting (XSS), bösartigen Drittanbieter-Einbettungen und unbeabsichtigter Roh-HTML-Injektion.

## Sicherheitsschema-Konfiguration

Sicherheitsregeln können im `docmd.config.json`-Manifest konfiguriert werden:

```json "docmd.config.json"
{
  "security": {
    "htmlPolicy": "escape",
    "strictLinkSanitizing": true,
    "allowedIframeHosts": [
      "youtube.com",
      "vimeo.com",
      "codesandbox.io",
      "stackblitz.com"
    ]
  }
}
```

## HTML-Verarbeitungsrichtlinien (`htmlPolicy`)

Die Einstellung `htmlPolicy` steuert, wie `docmd` rohe HTML-Elemente verarbeitet, die in Markdown-Dateien deklariert sind:

| Modus | Verhalten | Bester Anwendungsfall |
| :--- | :--- | :--- |
| `"escape"` *(Standard)* | Konvertiert alle rohen HTML-Tags in sichere HTML-Entities (`&lt;div&gt;`). Verhindert versehentliche Skriptinjektionen. | Öffentliche Dokumentationsseiten und Open-Source-Repositories, die Pull-Requests von nicht vertrauenswürdigen Mitwirkenden akzeptieren. |
| `"strip"` | Entfernt rohe HTML-Tags vollständig aus der kompilierten Ausgabe. | Strikte Unternehmensseiten, die reine Markdown-Reinheit ohne rohe Tags erfordern. |
| `"allow"` | Rendert rohe HTML-Elemente als ausführbare DOM-Knoten. | Autoritative technische Dokumente mit benutzerdefinierten Web-Komponenten oder ungestyltem Roh-HTML (`noStyle: true`). |

::: callout warning title:"XSS-Warnung bei htmlPolicy: 'allow'" icon:alert-triangle
Das Setzen von `htmlPolicy` auf `"allow"` ermöglicht die Ausführung beliebiger Skripte, wenn Markdown-Dateien `<script>`-Tags enthalten. Verwenden Sie `"allow"` nur, wenn die Markdown-Inhalte aus vertrauenswürdigen Quellcode-Repositories stammen.
::: /callout

## Mehrzeilige HTML-Blockverarbeitung

In `docmd` werden rohe HTML-Blöcke verarbeitet, ohne zu brechen, wenn sich Leerzeilen innerhalb von Elementen befinden:

```html
<div class="custom-widget">
    <h3>Widget-Titel</h3>

    <p>Absatz mit umgebenden Leerzeilen.</p>
</div>
```

Wenn `htmlPolicy` auf `"allow"` gesetzt ist, bewahrt `docmd` die äußere Blockhierarchie und verhindert, dass `markdown-it` innere Tags in eingerückte Codeblöcke oder Fließtextabsätze beschädigt.

## Isoliertes externes Verlinken

Alle externen Hyperlinks, die von `docmd`-Containern (`::: tag`, `::: button`, `::: card`) und Markdown-Links (`[Text](https://...)`) generiert werden, werden automatisch bereinigt:

```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">Externer Link</a>
```

- `target="_blank"` stellt sicher, dass externe Links in einem separaten Browser-Tab geöffnet werden.
- `rel="noopener noreferrer"` verhindert, dass die Zielseite die Kontrolle über `window.opener` übernimmt oder auf den Session-Speicher zugreift.

## Einbettungs- & Iframe-Sandboxing

Der `::: embed`-Container basiert auf `embed-lite`, um Video- und Widget-URLs in isolierte `<iframe>`-Wrapper zu verwandeln:

```markdown
::: embed https://www.youtube.com/watch?v=dQw4w9WgXcQ # vertrauenswürdige Video-Einbettung
```

Isolierte Iframes beschränken standardmäßig die Navigation auf oberster Ebene, Formularübermittlungen und direkte Manipulationen des übergeordneten DOMs, während die Medienwiedergabe erhalten bleibt.