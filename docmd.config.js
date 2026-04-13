// docmd.config.js (Modern Format)
// Source file from the docmd project — https://github.com/docmd-io/docs

module.exports = defineConfig({
  // --- Core Metadata ---
  siteTitle: 'docmd',
  siteUrl: 'https://docs.docmd.io',

  // --- Branding ---
  logo: {
    light: 'assets/images/docmd-logo-dark.png',
    dark: 'assets/images/docmd-logo-light.png',
    alt: 'docmd Logo',
    href: 'https://docmd.io',
  },
  favicon: 'assets/favicon.ico',

  // --- Structure ---
  srcDir: 'docs',
  outputDir: 'site',

  // --- Features & UX ---
  minify: true,
  autoTitleFromH1: true,
  copyCode: true,
  pageNavigation: true,
  customJs: ['/assets/js/theme-switcher.js'],

  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/docmd-io/docs/edit/main/docs',
    text: 'Edit this page on GitHub'
  },

  // --- Theme ---
  theme: {
    name: 'default',
    appearance: 'light',
    codeHighlight: true,
    customCss: ['/assets/css/threads-preview.css'],
  },

  // --- Layout & UI Architecture ---
  layout: {
    spa: true,
    breadcrumbs: true,
    menubar: {
      enabled: false,
      position: 'top', // 'top' or 'header'
    },
    header: {
      enabled: true
    },
    sidebar: {
      collapsible: true,
      defaultCollapsed: false,
    },
    optionsMenu: {
      position: 'header', // 'header', 'sidebar-top', 'sidebar-bottom'
      components: {
        search: true,
        themeSwitch: true,
        sponsor: 'https://github.com/sponsors/mgks',
      }
    },
    footer: {
      style: 'complete', // 'minimal' or 'complete'
      description: 'The minimalist, zero-config documentation generator for Node.js developers.',
      copyright: `© ${new Date().getFullYear()} Project docmd.`,
      columns: [
        {
          title: 'Resources',
          links: [
            { text: 'Installation', url: '/getting-started/installation' },
            { text: 'Configuration', url: '/configuration/general' },
            { text: 'CLI Commands', url: '/api/cli-commands' }
          ]
        },
        {
          title: 'Ecosystem',
          links: [
            { text: 'Versioning', url: '/configuration/versioning' },
            { text: 'Plugins', url: '/plugins/usage' },
            { text: 'Themes', url: '/theming/customization' },
            { text: 'Live Editor', url: '/content/live-preview' }
          ]
        },
        {
          title: 'Community',
          links: [
            { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', external: true },
            { text: 'Discussions', url: 'https://github.com/orgs/docmd-io/discussions', external: true },
            { text: 'Contributing', url: '/contributing' },
            { text: 'Reports & Issues', url: 'https://github.com/docmd-io/docmd/issues', external: true }
          ]
        }
      ]
    }
  },

  // --- Plugins ---
  plugins: {
    search: {},
    // pwa: {},
    seo: {
      defaultDescription: 'The minimalist, zero-config documentation generator for Node.js developers.',
      openGraph: { defaultImage: 'assets/images/preview.png' },
      twitter: { cardType: 'summary_large_image' }
    },
    analytics: { googleV4: { measurementId: 'G-YGLJ5HPMM3' } },
    sitemap: { defaultChangefreq: 'weekly', defaultPriority: 0.8 },
    mermaid: {},
    llms: {},
    math: {}
  },

  versions: {
    current: '07',
    position: 'sidebar-top',
    all: [
      { id: '07', dir: 'docs', label: 'v0.7.0 (Latest)' },
      { id: '06', dir: 'docs-06', label: 'v0.6.0' },
      { id: '05', dir: 'docs-05', label: 'v0.5.0' },
      { id: '04', dir: 'docs-04', label: 'v0.4.0' }
    ]
  },
});