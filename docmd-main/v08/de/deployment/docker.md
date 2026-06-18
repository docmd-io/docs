---
title: "Docker"
description: "Führen Sie docmd in einem Docker-Container aus — verwenden Sie das offizielle, vorgefertigte Image oder erzeugen Sie ein eigenes Dockerfile aus Ihrer Projektkonfiguration."
---

docmd erzeugt statisches HTML und eignet sich daher hervorragend für schlanke, reproduzierbare Docker-Container. Je nach Anwendungsfall gibt es zwei unterschiedliche Vorgehensweisen.

## Offizielles Docker-Image

Das offizielle Image ermöglicht es Ihnen, Ihre Dokumentation zu bauen und auszuliefern, ohne lokal etwas zu installieren. Es unterstützt mehrere Architekturen (`linux/amd64` und `linux/arm64`).

### Schnellstart

```bash
# Neuestes Image ziehen
docker pull ghcr.io/docmd-io/docmd:0.8.6

# Dokumentation bauen (mountet lokale Docs und schreibt nach ./site)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.8.6 build

# Eingebaute Demo-Site ausführen
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:0.8.6
```

### Docker Compose

Verwenden Sie Docker Compose, um Build und Serve in einem einzigen Workflow abzuwickeln:

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.8.6
    command: build
    volumes:
      - ./docs:/docs
      - ./site:/site
      - ./docmd.config.json:/docmd.config.json:ro

  serve:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - docs
```

### Image-Details

| Eigenschaft | Wert |
|:--|:--|
| Basis | Alpine Linux (minimaler Footprint) |
| Sicherheit | Läuft als Nicht-Root-Benutzer |
| Health Checks | Eingebaute Container-Health-Überwachung |
| SBOM | Software Bill of Materials-Attest enthalten |
| Architekturen | `linux/amd64`, `linux/arm64` |

## Eigenes Dockerfile (über den Deployer)

Für selbstgehostete Produktion erzeugen Sie mit dem [Deployer](./deployer) ein `Dockerfile`, das auf Ihre Projektkonfiguration zugeschnitten ist:

```bash
npx @docmd/core deploy --docker
```

Dies erzeugt ein `Dockerfile` mit Multi-Stage-Build:
1. **Build-Stage** — installiert Ihre exakt festgelegte `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stage** — kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Erzeugen Sie Docker- und Nginx-Konfigurationen gemeinsam für ein vollständiges Self-Hosting-Setup:

```bash
npx @docmd/core deploy --docker --nginx
```

### Bauen und Ausführen

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Ihre Dokumentation ist dann unter `http://localhost:8080` erreichbar.

::: callout tip "Neu erzeugen"
Haben Sie Ihre Konfiguration geändert? Führen Sie `npx @docmd/core deploy --docker` erneut aus, um sie neu zu erzeugen. Verwenden Sie `--force`, um vorhandene Dateien zu überschreiben.
:::
