---
title: "Produktionsserver (docmd serve)"
description: "docmd als Produktionsserver ausführen: Einmal kompilieren, auf festem Port bereitstellen, mit optionalen Plugin-Aktionen und MCP über HTTP."
---

`docmd serve` kompiliert Ihre Website einmalig und stellt sie über einen Node.js-Prozess bereit. Es ist das Produktionsgegenstück zu `docmd dev`, ähnlich wie `preview` in Vite oder `start` in Next.js. Verwenden Sie es hinter einem Reverse-Proxy, in einem Container oder überall dort, wo reines statisches Hosting nicht ausreicht – beispielsweise wenn ein Plugin Schreibzugriffe auf die Website ausführen muss.

Für eine rein statische Website bleiben `docmd build` und jeder statische Host (NGINX, Caddy, Vercel, ...) die unkomplizierteste Option.

```bash
npx @docmd/core serve [--host <address>] [--port <number>] [--config <path>]
```

## Unterschiede zu `dev`

| | `docmd dev` | `docmd serve` |
| :--- | :--- | :--- |
| Build | Entwicklungs-Build, bei jeder Änderung neu erstellt | Produktions-Build, einmalig beim Start |
| Datei-Watcher, Live-Reload | Ja | Nein |
| Öffnet den Browser | Ja | Nein |
| Port bereits belegt | Weicht auf den nächsten Port aus | Beendet mit Exit-Code 1 |
| Standard-Bind-Adresse | `127.0.0.1` | `127.0.0.1` |
| Plugin-Aktionen | Aktiviert für vom dev-Server ausgelieferte Seiten | Deaktiviert, sofern nicht durch `serve.actions` aktiviert |
| Health-Endpunkt | Nein | `GET /healthz` |

Beim Start bindet `serve` zuerst den Port, leert dann das Ausgabeverzeichnis und kompiliert hinein. Bis dieser Build abgeschlossen ist, antwortet jede Anfrage mit `503 Service Unavailable` und `Retry-After: 1`. Der Start wird verweigert, falls das Ausgabeverzeichnis die Projektwurzel oder das Quellverzeichnis enthält, da diese gelöscht werden müssten. Workspaces werden derzeit noch nicht unterstützt.

`SIGTERM` und `SIGINT` beenden den Server sauber: Offene Anfragen erhalten bis zu 4 Sekunden Zeit zum Abschließen, danach beendet sich der Prozess mit Code 0. `docmd stop` beendet auch `serve`-Prozesse.

## Host und Port

Die Adresse wird in folgender Reihenfolge aufgelöst (der erste Treffer gewinnt):

1. `--host` und `--port` auf der Befehlszeile;
2. Die Umgebungsvariablen `DOCMD_HOST` und `PORT`;
3. `serve.host` und `serve.port` in Ihrer Konfiguration;
4. Die Standardwerte `127.0.0.1` und `3000`.

Um Verbindungen von anderen Rechnern oder außerhalb eines Containers zu akzeptieren, binden Sie an `0.0.0.0`:

```bash
npx @docmd/core serve --host 0.0.0.0 --port 8080
```

## Konfiguration

Der gesamte `serve`-Block ist optional. Dies sind die Standardeinstellungen:

```json "docmd.config.json"
{
  "serve": {
    "host": "127.0.0.1",
    "port": 3000,
    "actions": { "enabled": false, "origins": [], "identityHeader": null },
    "mcp": { "enabled": false, "origins": [] }
  }
}
```

| Schlüssel | Standard | Beschreibung |
| :--- | :--- | :--- |
| `host` | `127.0.0.1` | Netzwerk-Interface zur Bindung. |
| `port` | `3000` | Port, auf dem gelauscht wird. |
| `actions.enabled` | `false` | [Plugin-Aktionen](#plugin-aktionen) über WebSocket auf demselben Port akzeptieren. Nur `true` aktiviert sie. |
| `actions.origins` | `[]` | Vollständige Origins, die den Action-Socket öffnen dürfen, z. B. `https://docs.example.com`. Erforderlich, wenn Aktionen aktiv sind. |
| `actions.identityHeader` | `null` | Request-Header Ihres authentifizierenden Reverse-Proxys. Ohne diesen Header wird jeder Schreibvorgang verweigert. |
| `mcp.enabled` | `false` | Die [MCP-Tools über HTTP](#mcp-uber-http) unter `POST /mcp` bereitstellen. Nur `true` aktiviert dies. |
| `mcp.origins` | `[]` | Vollständige Origins, die `/mcp` aus einem Browser aufrufen dürfen. |

`build` und `dev` ignorieren den `serve`-Block. `serve` validiert ihn beim Start und bricht mit Code 1 ab, wenn eine Origin keine vollständige `http(s)`-Origin ist (`*` ist nicht zulässig), wenn Aktionen ohne Origins aktiviert sind oder wenn `identityHeader` kein gültiger Header-Name ist (oder `cookie` lautet).

Das Start-Banner zeigt die aktiven Module:

```text
Local Access    http://127.0.0.1:3000
Serving from    ./site
Actions         on (origins: https://docs.example.com; writes need x-auth-request-email)
MCP             on at POST /mcp (read-only; no browser origins)
```

## Endpunkte

| Pfad | Beschreibung |
| :--- | :--- |
| `GET`/`HEAD /healthz` | `200` mit `{"status":"ok","version":"<docmd version>"}` sobald die Website kompiliert ist; zuvor `503`. Nutzen Sie dies für Container- und Load-Balancer-Health-Checks. |
| `POST /mcp` | MCP über HTTP, wenn `serve.mcp.enabled` auf `true` steht. Andernfalls ein regulärer Pfad der Website. |
| WebSocket-Upgrade | Plugin-Aktionen, wenn `serve.actions.enabled` auf `true` steht. Andernfalls `404`. |
| Alle übrigen Pfade | Ihre erstellte Website aus dem Ausgabeverzeichnis. |

## Plugin-Aktionen

Plugins, die `requiresLiveServer` deklarieren und `actions` registrieren (beispielsweise [Threads](../plugins/threads)), funktionieren nur, wenn sie von einem Server gehostet werden. Unter `dev` ist dies stets der Fall. Unter `serve` aktivieren Sie es gezielt:

```json "docmd.config.json"
{
  "serve": {
    "actions": {
      "enabled": true,
      "origins": ["https://docs.example.com"],
      "identityHeader": "x-auth-request-email"
    }
  }
}
```

Wenn Aktionen aktiviert sind:

* Die Website wird mit den Client-Assets von Live-Server-Plugins und der `docmd-api.js`-Brücke erstellt, die sich bei HTTPS über `wss://` verbindet.
* Ein WebSocket-Upgrade muss einen in `origins` aufgeführten `Origin`-Header tragen. Jeder andere oder fehlende Origin erhält `403`. Geben Sie die öffentliche Domain Ihrer Leser an, nicht die interne Adresse.
* Leseoperationen, Worker-Aufgaben und Rebuild-Anfragen stehen jeder akzeptierten Verbindung offen.
* Schreibvorgänge via `ctx.writeFile` und `ctx.source` erfordern eine vertrauenswürdige Identität: Sie werden abgewiesen, es sei denn, `identityHeader` ist gesetzt **und** die WebSocket-Upgrade-Anfrage enthielt diesen Header mit einem nicht-leeren Wert. Der Wert wird dem Plugin als `ctx.caller.identity` übergeben.
* Von einer Aktion geschriebene Dateien werden neu erstellt und allen Clients mit einem `system:rebuilt`-Event gemeldet. `serve` lädt Seiten nie automatisch neu.

Schlägt ein Plugin im `onServerReady`-Hook fehl, bricht `serve` mit Exit-Code 1 ab.

### Identität hinter einem Reverse-Proxy

docmd verfügt über kein eigenes Anmeldesystem. `identityHeader` benennt einen Header, den ein authentifizierender Reverse-Proxy jeder Anfrage hinzufügt, z. B. `X-Auth-Request-Email` von oauth2-proxy oder `Cf-Access-Authenticated-User-Email` von Cloudflare Access.

::: callout warning "Nur Headern vertrauen, die Ihr Proxy kontrolliert" icon:shield-alert
docmd kann nicht prüfen, wer den Header gesetzt hat. Er ist nur vertrauenswürdig, wenn:

* der Proxy ihn bei jeder weitergeleiteten Anfrage setzt und Client-Kopien entfernt;
* Clients den `serve`-Port nicht ohne den Proxy erreichen können (an `127.0.0.1` binden oder in einem privaten Netzwerk betreiben).

Andernfalls könnte jeder beliebige Schreibzugriffe ausführen. Lassen Sie `identityHeader` ungesetzt, bleiben Schreibvorgänge abgewiesen.
:::

## MCP über HTTP

`serve.mcp.enabled: true` stellt die Tools des [MCP-Servers](../reference/mcp-server) unter `POST /mcp` bereit, sodass KI-Agenten die bereitgestellte Dokumentation durchsuchen und lesen können, ohne das Repository lokal auschecken zu müssen.

```json "docmd.config.json"
{
  "serve": {
    "mcp": { "enabled": true }
  }
}
```

* **Nur-Lese-Zugriff.** Die Tools entsprechen `docmd mcp`, jedoch schreibt nichts über HTTP auf die Festplatte: `get_llms_context` gibt die vorhandene `llms-full.txt` zurück.
* **Gleiche Konfiguration wie der Server.** Die Tools lesen dieselbe Konfigurationsdatei wie `serve`, und `read_doc` liefert ausschließlich Markdown-Dateien innerhalb des Quellverzeichnisses.
* **Origin-Prüfung.** Anfragen mit einem `Origin`-Header müssen `mcp.origins` entsprechen, andernfalls wird `403` zurückgegeben. Anfragen ohne `Origin` von Nicht-Browser-Clients werden akzeptiert.
* **Transport.** Zustandsloses MCP über HTTP: Eine JSON-Antwort pro `POST`, Batch-Anfragen zulässig, keine Sessions. Das Payload-Limit beträgt 1 MiB.

Der Endpunkt verfügt über keine eigene Authentifizierung. Schützen Sie `/mcp` bei privaten Dokumentationen über Ihren Reverse-Proxy.

Verbindung eines Clients, z. B. Claude Code:

```bash
claude mcp add --transport http docmd https://docs.example.com/mcp
```

## Docker

Das offizielle [Docker-Image](./docker) führt standardmäßig `docmd serve --host 0.0.0.0` aus, und sein Health-Check ruft `/healthz` ab.
