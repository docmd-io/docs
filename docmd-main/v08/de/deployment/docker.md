---
title: "Docker"
description: "Führen Sie docmd in einem Docker-Container aus — verwenden Sie das offizielle, vorgefertigte Image oder erzeugen Sie ein eigenes Dockerfile aus Ihrer Projektkonfiguration."
---

docmd erzeugt statisches HTML und eignet sich daher hervorragend für schlanke, reproduzierbare Docker-Container. Je nach Anwendungsfall gibt es zwei unterschiedliche Vorgehensweisen.

## Offizielles Docker-Image

Das offizielle Image ermöglicht es Ihnen, Ihre Dokumentation zu bauen und auszuliefern, ohne lokal etwas zu installieren. Es unterstützt mehrere Architekturen (`linux/amd64` und `linux/arm64`).

### Schnellstart

```bash
# Eine bestimmte Version ziehen (empfohlen — die gewünschte Version einsetzen)
docker pull ghcr.io/docmd-io/docmd:0.8.7

# Dokumentation bauen (mountet lokale Docs und schreibt nach ./site)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.8.7 build

# Eingebaute Demo-Site ausführen
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:0.8.7
```

::: callout tip "Version pinnen"
Für reproduzierbare Builds empfehlen wir, eine bestimmte Version zu pinnen (z. B. `0.8.7`). Der `:latest`-Tag wird ab 0.8.7 zwar automatisch veröffentlicht, in Produktions-Pipelines sollten Sie jedoch immer eine bestimmte Version fixieren.
:::

### Docker Compose

Verwenden Sie Docker Compose, um Build und Serve in einem einzigen Workflow abzuwickeln:

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.8.7
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
| Benutzer | Nicht-Root-Benutzer `docmd` (UID 1001) |
| Arbeitsverzeichnis | `/docs` (beliebig mountbar; mit `-w` überschreibbar) |
| Health Checks | Eingebaute Container-Health-Überwachung |
| SBOM | Software Bill of Materials-Attest enthalten |
| Architekturen | `linux/amd64`, `linux/arm64` |

### Eigenes Arbeitsverzeichnis und Dateieigentum

Das Image ist mit `WORKDIR /docs` konfiguriert, aber Sie können jeden Pfad im Container einhängen und von dort aus arbeiten. Übergeben Sie `-w`, um das Arbeitsverzeichnis zu überschreiben, sodass es zu Ihrem Projektlayout passt:

```bash
# Aus einem eigenen Arbeitsverzeichnis im Container ausführen
docker run -v $(pwd):/workspace -w /workspace ghcr.io/docmd-io/docmd:0.8.7 init
```

Da das Image als Nicht-Root-Benutzer `docmd` (UID 1001) läuft, gehören alle in ein eingebundenes Volume geschriebenen Dateien auf dem Host der UID 1001. Falls Ihre Host-UID abweicht (üblicherweise 1000 für den ersten Benutzer), übergeben Sie `-u`, damit die erzeugten Dateien Ihnen gehören:

```bash
# Host-Eigentum an den erzeugten Dateien erhalten
docker run -u $(id -u):$(id -g) \
  -v $(pwd):/workspace -w /workspace \
  ghcr.io/docmd-io/docmd:0.8.7 init
```

::: callout warning "Read-only Mounts"
Wenn Sie eine Konfigurationsdatei als `:ro` read-only einbinden, stellen Sie sicher, dass das Arbeitsverzeichnis und andere Mount-Punkte schreibbar bleiben, sonst schlägt `docmd` mit einem Berechtigungsfehler fehl.
:::

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