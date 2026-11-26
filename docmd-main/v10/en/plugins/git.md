---
title: "Git Integration Plugin"
description: "Inject Git repository intelligence, last-updated timestamps, commit history tooltips, and automated source edit links."
---

The `@docmd/plugin-git` plugin adds repository intelligence to your documentation site. It queries local Git history during compilation to display page modification timestamps, author contributions, and automated "Edit this page" links.

## Configuration Options

Configure repository parameters in `docmd.config.json`:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | Public repository URL (e.g. `https://github.com/org/repo`). Required for edit links. |
| `branch` | `string` | `'main'` | Target branch for source edit links. |
| `editLink` | `boolean` | `true` | Display "Edit this page" button in page footers. |
| `lastUpdated` | `boolean` | `true` | Display last updated timestamp in page footers. |
| `commitHistory` | `boolean` | `true` | Display commit history hover tooltip on timestamp hover. |
| `maxCommits` | `number` | `5` | Maximum number of commits shown in the hover tooltip. |
| `dateFormat` | `string` | `'relative'` | Date format mode: `relative` (default), `iso`, or `locale-aware`. |

### Example Configuration

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/docmd-io/docmd",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## Key Capabilities

* **Last-Updated Timestamps**: Automatically calculated per file and displayed in page footers.
* **Commit History Tooltips**: Hovering over timestamps renders recent commit hashes, commit messages, and author avatars.
* **Automated Edit Links**: Generates direct edit URLs pointing to GitHub, GitLab, or Bitbucket.
* **Build-Time Caching**: Git queries execute during compilation and cache results locally, ensuring zero runtime impact.

## Page-Level Controls

Disable Git features for specific documents using [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Internal Notes"
plugins:
  git: false
---
```

## CI/CD Pipeline Integration

The Git plugin executes local `git` CLI commands during site compilation. Many CI/CD runners (such as GitHub Actions or GitLab CI) perform shallow clones (`fetch-depth: 1`), which truncates commit history and causes all pages to show identical timestamp dates.

Ensure your build workflow fetches full Git history:

::: tabs

== tab "GitHub Actions"

Add `fetch-depth: 0` to your checkout step:

```yaml ".github/workflows/docs.yml"
- name: Checkout Repository
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

Set the `GIT_DEPTH` environment variable to `0`:

```yaml ".gitlab-ci.yml"
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify fetches full history by default. If using custom build scripts, ensure the `.git` directory is preserved in the build workspace.

:::

::: callout warning "Git CLI Availability" icon:alert-triangle
The `.git` directory and the `git` binary must be accessible within your compilation container or build environment.
:::

## Programmatic Git API

The `@docmd/plugin-git` package exposes a standalone programmatic API layer available at `@docmd/plugin-git/api` (or directly from `@docmd/plugin-git`), usable by core plugins, review tools (such as Threads v2), or external automation scripts.

```ts
import { 
  createGitClient, 
  parseRemoteUrl, 
  resolveGitAuth, 
  buildRemoteUrls, 
  createCredentialHelper 
} from '@docmd/plugin-git/api';
```

### Remote Provider & URL Parsing

`parseRemoteUrl(rawUrl)` extracts structured metadata and detects GitHub, GitLab (including self-hosted / enterprise instances), Bitbucket, and generic hosts across HTTPS, SSH, and SCP formats:

```ts
const remote = parseRemoteUrl('https://github.com/docmd-io/docmd.git');
// {
//   provider: 'github',
//   hostname: 'github.com',
//   owner: 'docmd-io',
//   repo: 'docmd',
//   fullPath: 'docmd-io/docmd',
//   isHttps: true,
//   isSsh: false
// }
```

### Remote Links & URL Generators

Generate canonical edit, blob view, history timeline, and commit links automatically:

```ts
const urls = buildRemoteUrls(remote, 'docs/guide.md', { branch: 'main' });
console.log(urls.editUrl);    // https://github.com/docmd-io/docmd/edit/main/docs/guide.md
console.log(urls.blobUrl);    // https://github.com/docmd-io/docmd/blob/main/docs/guide.md
console.log(urls.historyUrl); // https://github.com/docmd-io/docmd/commits/main/docs/guide.md
console.log(urls.commitUrl('a1b2c3d')); // https://github.com/docmd-io/docmd/commit/a1b2c3d
```

### Authentication & Credential Helpers

`resolveGitAuth(options)` automatically resolves Personal Access Tokens (PATs) across explicit options and environment variables in precedence order (`DOCMD_GIT_TOKEN`, `DOCMD_THREADS_GIT_TOKEN`, `GITHUB_TOKEN`, `GITLAB_TOKEN`, `GIT_TOKEN`):

```ts
const auth = resolveGitAuth({ provider: 'github' });
// Uses subshell credential helpers to prevent leaking tokens on the command line:
const helper = createCredentialHelper('DOCMD_GIT_TOKEN', 'x-access-token');
```

### Programmatic GitClient

`createGitClient(options)` instantiates a complete, asynchronous client for local and remote operations:

```ts
const git = createGitClient({ cwd: process.cwd() });

// Repository Inspection
const isRepo = await git.isRepository();
const branch = await git.getCurrentBranch();
const status = await git.getStatus(); // { clean, modified, staged, untracked, ahead, behind }

// Staging & Commits
await git.stage(['docs/example.md']);
await git.commit('docs: update guide', {
  author: { name: 'Alice Author', email: 'alice@example.com' },
  committer: { name: 'Docmd Bot', email: 'bot@docmd.invalid' }
});

// Remote Sync
await git.fetch('origin', 'main');
await git.push('origin', 'main', { maxRetries: 3 });
```

## Localisation Support

The Git plugin supports multi-locale translation maps for footer strings and timestamp formats. Custom strings can be provided through the [UI Localisation](../configuration/localisation/ui-strings.md) configuration.