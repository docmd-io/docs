// docmd.config.js
// Source file from the docmd project — https://github.com/docmd-io/docs

module.exports = defineConfig({
  title: 'docmd search',
  url: 'https://docs.docmd.io/search',

  // --- Branding ---
  logo: {
    light: 'assets/images/docmd-logo-dark.png',
    dark: 'assets/images/docmd-logo-light.png',
    alt: 'docmd search',
    href: 'https://docmd.io/search',
  },
  favicon: 'assets/favicon.ico',

  // --- Features ---
  minify: true,
  autoTitleFromH1: true,
  copyCode: true,
  pageNavigation: true,

  // --- Theme ---
  theme: {
    name: 'default',
    appearance: 'light',
    codeHighlight: true,
  },

  // --- Layout ---
  layout: {
    spa: true,
    breadcrumbs: true,
    header: { enabled: true },
    sidebar: {
      collapsible: true,
      defaultCollapsed: false,
    },
    optionsMenu: {
      position: 'header',
      components: {
        search: true,
        themeSwitch: true,
      }
    },
    footer: {
      style: 'minimal',
      copyright: `© ${new Date().getFullYear()} docmd.io`,
    }
  },
});