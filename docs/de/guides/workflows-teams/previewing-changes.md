---
title: "Änderungen an der Dokumentation in der Vorschau anzeigen lassen"
description: "Änderungen vorschauen."
---

## Problem
Mit raten eingestellte Layouts sehen im Backend oft schäbig in der Live-Version aus (z.B. defekte Listen).

## Warum es wichtig ist
Gebrochenes Layout zeugt von mangelnder Qualität der Softwaredokumentation insgesamt.

## Ansatz
Implementieren Sie Preview-Builds auf Netlify, Cloudflare oder Vercel pro Pull Request.

## Implementierung
Durch `npx @docmd/core build` werden keine Sonderumgebungen benötigt; der Provider gibt den Ordner `site/` als statisch geparstes Frontend frei (Instant Preview URL).

## Kompromisse
1000-Seiten Repos zwingen Vercel zu massiven Minutenverbräuchen, wenn das Caching fehlschlägt.
