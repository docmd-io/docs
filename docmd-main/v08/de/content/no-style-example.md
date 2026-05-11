---
title: "docmd : Individuelle No-Style Page Demo"
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
      text-align: center;
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
      border: 1px solid var(--border-color);
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
    <h1>Individuelle Seitenarchitektur</h1>
    <p>Demonstration der absoluten Layout-Kontrolle durch <code>noStyle: true</code>.</p>
  </div>
  
  <div class="demo-card">
    <h2>Logisches Fundament</h2>
    <p>
      Diese Demonstration nutzt die Frontmatter-Direktive <code>noStyle: true</code>, um das globale Dokumentationslayout (Seitenleiste, Header und TOC) zu umgehen. Dies bietet eine "Zero-Friction"-Leinwand für die Erstellung von Marketing-Landingpages oder benutzerdefinierten Produkt-Dashboards.
    </p>
    
    <h3>Aktivierte Systemkomponenten</h3>
    <p>Im No-Style-Modus entscheiden Sie sich explizit für die Kernfunktionen der Dokumentations-Engine:</p>
    
    <ul>
      <li><strong>SEO-Meta-Engine</strong>: Strukturierte Tags und Social-Graph-Daten bleiben erhalten.</li>
      <li><strong>Projekt-Branding</strong>: Die globale Favicon-Injektion bleibt aktiv.</li>
      <li><strong>Grundlegende Typografie</strong>: Das verarbeitete <code>docmd-main.css</code> liefert das Basis-Styling.</li>
      <li><strong>Theme-Synchronisation</strong>: Der Status des Hell-/Dunkelmodus bleibt vollständig erhalten.</li>
      <li><strong>Interaktive Funktionen</strong>: Der SPA-Router und die Komponentenlogik bleiben verfügbar.</li>
    </ul>
    
    <h3>Technische Umsetzung</h3>
    <p>
      Das Layout für diese Seite wurde mit Standard-HTML-Wrappern und gescoptem CSS erstellt, das im Frontmatter-Feld <code>customHead</code> definiert ist. Dies stellt sicher, dass kein CSS auf den Rest der Dokumentationsseite abfärbt.
    </p>
    
    <a href="../content/no-style-pages.md" class="demo-button">Analyse des Implementierungs-Leitfadens →</a>
  </div>
</div>
