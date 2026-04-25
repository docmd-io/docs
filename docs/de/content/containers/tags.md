---
title: "Tags"
description: "Verwenden Sie den Tag-Container, um Versionen oder Status zu kennzeichnen oder kurze Textausschnitte nahtlos im Text hervorzuheben."
---

Der `tag`-Container ist eine selbstschließende Komponente, mit der Sie kleine, pillenförmige Badges direkt in Ihren Text einfügen können. Im Gegensatz zu Block-Containern übernehmen Tags nicht die massiven Größen von übergeordneten Elementen wie Überschriften – sie behalten ihre knappen, sauberen Proportionen bei, egal wo sie platziert werden.

## Grundlegende Verwendung

Um ein grundlegendes Tag zu erstellen, geben Sie einfach den Text an, den Sie anzeigen möchten:

::: tabs

== tab "Vorschau"
Diese Funktion wurde in ::: tag "v0.7.4" hinzugefügt und funktioniert einwandfrei.
== tab "Markdown-Quelle"
````markdown
Diese Funktion wurde in ::: tag "v0.7.4" hinzugefügt und funktioniert einwandfrei.
````

:::

## Farben anpassen

Sie können das Standard-Styling von Tags überschreiben, indem Sie einen beliebigen gültigen CSS-Farbstring (z.B. `#ff0000`, `blue` oder `hsl(...)`) über das Attribut `color:` angeben. `docmd` berechnet automatisch einen wunderschön getönten Hintergrund mit perfekt kontrastierendem Text und Rändern!

::: tabs

== tab "Vorschau"
::: tag "Veraltet" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stabil" color:#22c55e
== tab "Markdown-Quelle"
````markdown
::: tag "Veraltet" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stabil" color:#22c55e
````

:::

## Icons hinzufügen

Genau wie bei Schaltflächen und Callouts können Sie über das Attribut `icon:` ganz einfach ein Icon aus der `docmd`-Icon-Bibliothek anfügen.

::: tabs

== tab "Vorschau"
::: tag "Verifiziert" icon:check-circle color:#10b981
== tab "Markdown-Quelle"
````markdown
::: tag "Verifiziert" icon:check-circle color:#10b981
````

:::

## Tags verlinken

Wenn Ihr Tag als Hyperlink fungieren soll (z. B. um ein Versions-Tag direkt mit seinen Versionshinweisen zu verknüpfen), können Sie das Attribut `link:` verwenden. Externe Links werden automatisch erkannt und in einem neuen Tab geöffnet.

::: tabs

== tab "Vorschau"
Sehen Sie sich die neuesten ::: tag "Versionshinweise" icon:external-link link:/release-notes/0-7-4 an
== tab "Markdown-Quelle"
````markdown
Sehen Sie sich die neuesten ::: tag "Versionshinweise" icon:external-link link:/release-notes/0-7-4 an
````

:::

## Verwendung von Tags in Überschriften

Da Tags echte Inline-Elemente sind, sehen sie fantastisch aus, wenn sie zur Kennzeichnung von Hauptüberschriften verwendet werden. Sie richten sich automatisch an der Grundlinie aus, ohne die massive Schriftgröße der Überschrift zu übernehmen.

::: tabs

== tab "Vorschau"
# Suchfilterung ::: tag "Neu" color:#8b5cf6
== tab "Markdown-Quelle"
````markdown
# Suchfilterung ::: tag "Neu" color:#8b5cf6
````

:::
