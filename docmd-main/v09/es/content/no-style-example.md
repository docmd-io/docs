---
title: "docmd : Demostración de página noStyle a medida"
description: "Una demostración funcional de la característica arquitectónica noStyle."
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
    <h1>Arquitectura de página a medida</h1>
    <p>Demostración del control absoluto de diseño habilitado mediante <code>noStyle: true</code>.</p>
  </div>
  
  <div class="demo-card">
    <h2>Base lógica</h2>
    <p>
      Esta demostración utiliza la directiva de frontmatter <code>noStyle: true</code> para omitir el diseño global de la documentación (Barra lateral, Encabezado y TOC). Esto proporciona un lienzo "sin fricción" para crear páginas de inicio de marketing o paneles de control de productos personalizados.
    </p>
    
    <h3>Componentes del sistema habilitados</h3>
    <p>Cuando está en modo No-Style, usted elige explícitamente las características principales del motor de documentación:</p>
    
    <ul>
      <li><strong>Motor de metadatos SEO</strong>: Se conservan las etiquetas estructuradas y los datos del grafo social.</li>
      <li><strong>Marca del proyecto</strong>: La inyección global del favicon permanece activa.</li>
      <li><strong>Tipografía fundamental</strong>: El archivo procesado <code>docmd-main.css</code> proporciona el estilo base.</li>
      <li><strong>Sincronización de temas</strong>: El estado del modo claro/oscuro se preserva por completo.</li>
      <li><strong>Capacidades interactivas</strong>: El enrutador SPA y la lógica de componentes permanecen disponibles.</li>
    </ul>
    
    <h3>Implementación técnica</h3>
    <p>
      El diseño de esta página está escrito utilizando contenedores HTML estándar y CSS de ámbito definido en el campo de frontmatter <code>customHead</code>. Esto garantiza que no haya filtración de CSS al resto del sitio de documentación.
    </p>
    
    <a href="./no-style-pages.md" class="demo-button">Analizar la guía de implementación →</a>
  </div>
</div>