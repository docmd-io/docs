// Source file from the docmd project — https://github.com/docmd-io/docs

module.exports = {
  // --- Core Metadata ---
  siteTitle: 'docmd',
  siteUrl: 'https://docs.docmd.io', // No trailing slash

  // --- Branding ---
  logo: {
    light: 'assets/images/docmd-logo-dark.png',
    dark: 'assets/images/docmd-logo-light.png',
    alt: 'docmd Logo',
    href: 'https://docmd.io',
  },
  favicon: 'assets/favicon.ico',

  // --- Structure ---
  srcDir: 'docs',       // Source markdown files directory
  outputDir: 'site',    // Output directory for generated site

  // --- Features & UX ---
  search: true,           // Built-in offline search
  minify: true,           // Production build optimization
  autoTitleFromH1: true,  // Auto-generate title from first H1 if frontmatter title is missing
  copyCode: true,         // Enable "copy to clipboard" on code blocks
  pageNavigation: true,   // Next/Prev links

  // --- Sidebar & Theme ---
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
  theme: {
    name: 'default',        // 'default', 'sky', 'ruby', 'retro'
    defaultMode: 'light',   // 'light' or 'dark'
    enableModeToggle: true, // Show theme mode toggle button 
    positionMode: 'top',    // 'top' or 'bottom' of header
    codeHighlight: true,    // Enable code syntax highlighting
    customCss: [],          // Add paths relative to outputDir here
  },
  customJs: ['/assets/js/theme-switcher.js'], // Add paths relative to outputDir here

  // --- Plugins ---
  plugins: {
    search: {},
    seo: {
      defaultDescription: 'The minimalist, zero-config documentation generator for Node.js developers.',
      openGraph: {
        defaultImage: 'assets/images/preview.png',
      },
      twitter: {
        cardType: 'summary_large_image',
      }
    },
    analytics: {
      googleV4: {
        measurementId: 'G-YGLJ5HPMM3'
      }
    },
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8
    },
    mermaid: {},
    llms: {}
  },

  // --- Doc Source Link ---
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/docmd-io/docs/edit/main/docs',
    text: 'Edit this page on GitHub'
  },

  // --- Navigation ---
  navigation: [
    { title: 'Overview', path: '/', icon: 'home' },
    {
      title: 'Getting Started',
      icon: 'rocket',
      path: '/getting-started/',
      children: [
        { title: 'Installation', path: '/getting-started/installation', icon: 'download' },
        { title: 'Basic Usage', path: '/getting-started/basic-usage', icon: 'play' },
      ],
    },
    {
      title: 'Configuration',
      icon: 'settings',
      path: '/configuration/',
      children: [
        { title: 'Navigation', path: '/configuration/navigation', icon: 'navigation-menu' },
      ],
    },
    {
      title: 'Content',
      icon: 'layout-template',
      path: '/content/',
      collapsible: true,
      children: [
        {
          title: 'Syntax',
          path: '/content/syntax/',
          icon: 'code-xml',
          collapsible: true,
          children: [
            { title: 'Code', path: '/content/syntax/code', icon: 'code' },
            { title: 'Images', path: '/content/syntax/images', icon: 'image' },
            { title: 'Linking', path: '/content/syntax/linking', icon: 'link' },
            { title: 'Advanced', path: '/content/syntax/advanced', icon: 'settings-2' },
          ]
        },
        { title: 'Frontmatter', path: '/content/frontmatter', icon: 'file-text' },
        { title: 'Search', path: '/content/search', icon: 'search' },
        {
          title: 'Containers',
          path: '/content/containers/',
          icon: 'box',
          collapsible: true,
          children: [
            { title: 'Callouts', path: '/content/containers/callouts', icon: 'megaphone' },
            { title: 'Cards', path: '/content/containers/cards', icon: 'panel-top' },
            { title: 'Steps', path: '/content/containers/steps', icon: 'list-ordered' },
            { title: 'Tabs', path: '/content/containers/tabs', icon: 'columns-3' },
            { title: 'Collapsible', path: '/content/containers/collapsible', icon: 'chevrons-down' },
            { title: 'Changelogs', path: '/content/containers/changelogs', icon: 'history' },
            { title: 'Buttons', path: '/content/containers/buttons', icon: 'mouse-pointer-click' },
            { title: 'Nested Containers', path: '/content/containers/nested-containers', icon: 'folder-tree' },
          ]
        },
        {
          title: 'Advanced',
          path: '',
          icon: 'server-cog',
          collapsible: true,
          children: [
            { title: 'Client Side Events', path: '/content/advanced/client-side-events', icon: 'square-mouse-pointer' },
          ]
        },
        { title: 'API', path: '/content/api', icon: 'braces' },
        { title: 'No-Style Pages', path: '/content/no-style-pages', icon: 'layout' },
        { title: 'Live Preview', path: '/content/live-preview', icon: 'monitor-play' },
      ],
    },

    {
      title: 'Theming',
      icon: 'palette',
      path: '/theming/',
      collapsible: true,
      children: [
        { title: 'Available Themes', path: '/theming/available-themes', icon: 'layout-grid' },
        { title: 'Light & Dark Mode', path: '/theming/light-dark-mode', icon: 'sun-moon' },
        { title: 'Custom CSS & JS', path: '/theming/custom-css-js', icon: 'file-code' },
        { title: 'Icons', path: '/theming/icons', icon: 'pencil-ruler' },
      ],
    },

    {
      title: 'Plugins',
      icon: 'puzzle',
      path: '/plugins/',
      collapsible: true,
      children: [
        { title: 'Building Plugins', path: '/plugins/building-plugins', icon: 'hammer' },
        { title: 'SEO & Meta', path: '/plugins/seo', icon: 'search' },
        { title: 'Analytics', path: '/plugins/analytics', icon: 'bar-chart' },
        { title: 'Sitemap', path: '/plugins/sitemap', icon: 'map' },
        { title: 'Mermaid Diagrams', path: '/plugins/mermaid', icon: 'network' },
        { title: 'LLMs', path: '/plugins/llms', icon: 'brain-circuit' }
      ],
    },

    {
      title: 'Recipes',
      icon: 'chef-hat',
      path: '/recipes/',
      collapsible: true,
      children: [
        { title: 'Landing Page', path: '/recipes/landing-page', icon: 'layout-template' },
        { title: 'Custom Fonts', path: '/recipes/custom-fonts', icon: 'type' },
        { title: 'Favicon', path: '/recipes/favicon', icon: 'image-plus' },
      ],
    },

    { title: 'CLI Commands', path: '/cli-commands', icon: 'terminal' },
    { title: 'Deployment', path: '/deployment', icon: 'upload-cloud' },
    { title: 'Comparison', path: '/comparison', icon: 'scale' },
    { title: 'Contributing', path: '/contributing', icon: 'git-pull-request' },

    { title: 'GitHub', path: 'https://github.com/docmd-io/docmd', icon: 'github', external: true },
    { title: 'Discussions', path: 'https://github.com/orgs/docmd-io/discussions', icon: 'message-circle', external: true },
  ],

  // --- Footer & Sponsor ---
  footer: '© ' + new Date().getFullYear() + ' Project docmd.',
  sponsor: {
    enabled: true,
    title: 'Sponsor',
    link: 'https://github.com/sponsors/mgks',
  },
};