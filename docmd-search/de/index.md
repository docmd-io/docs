---
title: "docmd-search"
description: "Offline-Semantik-Suchmaschine für Dokumentationswebsites."
---

Offline-Semantik-Suchmaschine für Dokumentationswebsites. Vektoren werden lokal zur Erstellungszeit mittels ONNX Runtime berechnet. Der Browser-Client führt Begriffsmatching und Vektor-Kosinus-Ähnlichkeit aus.

::: callout tip "Zero-Config CLI"
Führen Sie `npx docmd-search ./docs` in einem beliebigen Ordner aus. Funktioniert ohne Setup oder API-Schlüssel.
:::

## Hauptmerkmale

::: grid

::: card "Lokal ausführen" icon:wifi-off
Alle Vektoren werden lokal mit ONNX Runtime erstellt. Keine Daten verlassen Ihren Computer.
:::

::: card "Schnelles Laden" icon:zap
Die Suche ist sofort einsatzbereit, sobald der erste Batch geladen ist.
:::

::: card "Winzige Runtime" icon:package
Die Browser-Runtime ist unter **3KB gzipped**. Sie benötigt keine neuronalen Netzwerkgewichte.
:::

:::
