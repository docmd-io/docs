---
title: "docmd : Maßgeschneiderte No-Style-Seiten-Demo"
description: "Eine funktionale Demonstration der noStyle-Architekturfunktion."
noStyle: true
components:
  meta: true
  favicon: true
  css: true
  theme: true
  scripts: true
  mainScripts: true
copyCode: true
customHead: |
  <style>
    body {
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    .demo-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 80px 20px;
    }
    .demo-hero {
      text-align: centre;
      margin-bottom: 60px;
    }
    .demo-hero h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
      color: var(--brand-primary, #4a6cf7);
    }
    .demo-hero p {
      font-size: 1.25rem;
      color: var(--text-secondary);
    }
    .demo-card {
      background: var(--bg-secondary, #f8f9fa);
      padding: 40px;
      border-radius: 16px;
      border: 1px solid var(--border-colour);
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    .demo-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: var(--brand-primary, #4a6cf7);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 30px;
      transition: filter 0.2s ease;
    }
    .demo-button:hover {
      filter: brightness(1.1);
    }
  </style>
---

<div class="demo-container">
  <div class="demo-hero">
    <h1>Maßgeschneiderte Seitenarchitektur</h1>
    <p>Demonstration der absoluten Layoutkontrolle durch <code>noStyle: true</code>.</p>
  </div>

  <div class="demo-card">
    <h2>Logische Grundlage</h2>
    <p>
      Diese Demonstration nutzt die <code>noStyle: true</code>-Frontmatter-Direktive, um das globale Dokumentationslayout (Sidebar, Header und TOC) zu umgehen. Dies bietet eine "reibungslose" Leinwand zur Erstellung von Marketing-Landingpages oder benutzerdefinierten Produkt-Dashboards.
    </p>

    <h3>Aktivierte Systemkomponenten</h3>
    <p>Im No-Style-Modus entscheiden Sie sich explizit für die Kernfunktionen der Dokumentations-Engine:</p>

    <ul>
      <li><strong>SEO-Meta-Engine</strong>: Strukturierte Tags und Social-Graph-Daten bleiben erhalten.</li>
      <li><strong>Projekt-Branding</strong>: Globale Favicon-Injection bleibt aktiv.</li>
      <li><strong>Grundlegende Typografie</strong>: Das verarbeitete <code>docmd-main.css</code> liefert Basisstyling.</li>
      <li><strong>Theme-Synchronisation</strong>: Hell/Dunkel-Modus-Zustand bleibt vollständig erhalten.</li>
      <li><strong>Interaktive Fähigkeiten</strong>: SPA-Router und Komponentenlogik bleiben verfügbar.</li>
    </ul>

    <h3>Technische Umsetzung</h3>
    <p>
      Das Layout dieser Seite wird mit Standard-HTML-Wrappern und scoped CSS verfasst, das im <code>customHead</code>-Frontmatter-Feld definiert ist. Dies stellt null CSS-Leakage zum Rest der Dokumentations-Site sicher.
    </p>

    <a href="/content/no-style-pages/" class="demo-button">Implementierungs-Leitfaden analysieren →</a>
  </div>
</div>