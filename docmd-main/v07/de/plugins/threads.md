---
title: "Threads-Plugin"
description: "Fügen Sie Ihrer Dokumentation Inline-Diskussionsstränge hinzu — direkt in Ihren Markdown-Dateien gespeichert."
---

Das **Threads-Plugin** bringt kollaborative Inline-Kommentare in Ihre Dokumentation. Wählen Sie einen beliebigen Text auf der Seite aus, hinterlassen Sie einen Kommentar, starten Sie eine Diskussion — alles wird direkt in Ihren Markdown-Quelldateien gespeichert, ganz ohne Datenbank.

Originalautor: [@svallory](external:https://github.com/svallory)

::: callout info "Alpha-Release"
Dieses Plugin befindet sich in der Alpha-Phase. Die API und das Speicherformat sind stabil, aber die Benutzeroberfläche wird aktiv weiterentwickelt.
:::

## Einrichtung

```bash
docmd add threads
```

```javascript
plugins: {
  threads: {}
}
```

### Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | Wenn `true`, bleiben Threads am Ende der Seite gruppiert. Wenn `false` (Standard), werden Threads inline neben dem markierten Text positioniert. |

```javascript
// Threads am Ende der Seite behalten statt inline
plugins: {
  threads: {
    sidebar: true
  }
}
```

## Funktionsweise

1. **Text markieren** auf einer beliebigen Dokumentationsseite während `docmd dev`.
2. Ein **Kommentar-Popover** erscheint — schreiben Sie Ihren Kommentar und senden Sie ihn ab.
3. Der ausgewählte Text wird mit einem Thread-Marker **hervorgehoben**.
4. Threads werden als `::: threads`-Blöcke am Ende der Markdown-Datei gespeichert.
5. **Keine Datenbank** — Ihre Markdown-Dateien sind die "Source of Truth".

## Vorschau

So sehen Threads auf einer Live-Seite aus. Text mit Diskussionen wird <span class="threads-preview-highlight">so hervorgehoben</span> und Thread-Karten erscheinen darunter.

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 2 T.</div>
    <div class="threads-preview-body">Dieser Abschnitt könnte ein Diagramm vertragen, um die Architektur zu erklären. Was denkst du?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;vor 1 T.</div>
    <div class="threads-preview-body">Gute Idee — ich füge ein Mermaid-Flowchart hinzu. Funktioniert <code>sequenceDiagram</code> hier?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 12 Std.</div>
    <div class="threads-preview-body">Perfekt. Ein einfaches Flowchart wäre ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Und hier ist eine <span class="threads-preview-highlight-blue">zweite Hervorhebung mit einer anderen Farbe</span> — Threads durchlaufen automatisch eine Farbpalette.

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;vor 3 T.</div>
    <div class="threads-preview-body">Sollten wir hier die Abwärtskompatibilität erwähnen?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Erledigte Threads erscheinen ausgegraut:

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 5 T.&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Erledigt</span></div>
    <div class="threads-preview-body">Tippfehler im Konfigurationsbeispiel behoben.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Ein schwebender **Diskussions-Button** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> erscheint in der unteren rechten Ecke und zeigt die Anzahl der offenen Threads an. Klicken Sie darauf, um zum ersten Thread auf der Seite zu springen.

## Speicherformat

Threads werden unter Verwendung der Container-Syntax von docmd in Ihr Markdown eingebettet:

```markdown
# Meine Dokumentationsseite

Inhalt mit ==markiertem Text=={t-a1b2c3d4}, der einen Thread hat.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      Dieser Text muss klargestellt werden.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Habe es aktualisiert — passt das so?

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

Die Syntax `==Text=={threadId}` verknüpft markierten Text im Dokumentenkörper mit einem spezifischen Thread.

## Features

| Feature | Beschreibung |
| :--- | :--- |
| **Textauswahl** | Markieren Sie beliebigen Text, um einen neuen Thread zu starten |
| **Antworten** | Verschachtelte Antwortketten innerhalb jedes Threads |
| **Reaktionen** | Emoji-Reaktionen auf einzelne Kommentare |
| **Bearbeiten / Löschen** | Ändern oder entfernen Sie Ihre Kommentare |
| **Erledigen** | Markieren Sie Threads als erledigt mit Autor + Zeitstempel |
| **Autorenprofile** | Git-basierte Autorenerkennung mit Gravatar-Unterstützung |
| **Highlight-Marker** | Visuelle Indikatoren auf der Seite, die zeigen, wo Threads verankert sind |
| **Schwebender Button** | Schnellzugriff-FAB mit Anzahl der offenen Threads |
| **Scroll-Erhaltung** | Die Seite bleibt nach dem Hinzufügen von Kommentaren an derselben Position |

## Actions API

Das Threads-Plugin macht die folgenden Aktionen über das WebSocket-RPC-System verfügbar. Diese können von Browser-Plugins über `docmd.call()` aufgerufen werden:

| Aktion | Beschreibung |
| :--- | :--- |
| `threads:get-threads` | Parst und gibt alle Threads aus einer Datei zurück |
| `threads:add-thread` | Erstellt einen neuen Thread mit seinem ersten Kommentar |
| `threads:add-comment` | Fügt einen Kommentar zu einem bestehenden Thread hinzu |
| `threads:edit-comment` | Bearbeitet den Inhalt eines bestehenden Kommentars |
| `threads:delete-comment` | Entfernt einen Kommentar aus einem Thread |
| `threads:delete-thread` | Entfernt einen kompletten Thread und bereinigt die Highlights |
| `threads:resolve-thread` | Schaltet den Status zwischen erledigt/offen um |
| `threads:toggle-reaction` | Schaltet eine Emoji-Reaktion auf einen Kommentar um |
| `threads:get-authors` | Liest die Autorenprofil-Map aus |
| `threads:upsert-author` | Erstellt oder aktualisiert ein Autorenprofil |

## Autorenprofile

Autoreninformationen werden in `<docsRoot>/.threads/authors.json` gespeichert:

```json
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

Während der Entwicklung erkennt das Plugin automatisch Ihren Git-Benutzernamen und Ihre E-Mail zur Autorenidentifikation.

::: callout tip "Versionskontrollfreundlich"
Da Threads in Ihren Markdown-Dateien gespeichert werden, unterliegen sie automatisch der Versionskontrolle mit Git. Überprüfen Sie Kommentare in PRs, verfolgen Sie die Diskussionshistorie und arbeiten Sie über Ihren bestehenden Workflow zusammen.
:::