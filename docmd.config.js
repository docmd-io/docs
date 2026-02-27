// docmd.config.js (Modern Format)
// Source file from the docmd project — https://github.com/docmd-io/docs

module.exports = {
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
    defaultMode: 'light',
    codeHighlight: true,    
    customCss: [],          
  },

  // --- Layout & UI Architecture (NEW in v0.4.8) ---
  layout: {
    spa: true,
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
            { text: 'CLI Commands', url: '/cli-commands' }
          ]
        },
        {
          title: 'Ecosystem',
          links: [
            { text: 'Plugins', url: '/plugins/usage' },
            { text: 'Themes', url: '/theming/available-themes' },
            { text: 'Live Editor', url: '/content/live-preview' }
          ]
        },
        {
          title: 'Community',
          links: [
            { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', external: true },
            { text: 'Discussions', url: 'https://github.com/orgs/docmd-io/discussions', external: true }
          ]
        }
      ]
    }
  },

  // --- Plugins ---
  plugins: {
    search: {},
    seo: {
      defaultDescription: 'The minimalist, zero-config documentation generator for Node.js developers.',
      openGraph: { defaultImage: 'assets/images/preview.png' },
      twitter: { cardType: 'summary_large_image' }
    },
    analytics: { googleV4: { measurementId: 'G-YGLJ5HPMM3' } },
    sitemap: { defaultChangefreq: 'weekly', defaultPriority: 0.8 },
    mermaid: {},
    llms: {}
  },

  // --- Navigation (Remains Unchanged) ---
  navigation: [
    { title: 'Overview', path: '/', icon: 'home' },
    {
      title: 'Getting Started',
      icon: 'rocket',
      collapsible: false,
      children: [
        { title: 'Installation', path: '/getting-started/installation', icon: 'download' },
        { title: 'Basic Usage', path: '/getting-started/basic-usage', icon: 'play' },
      ],
    },
    {
      title: 'Configuration',
      icon: 'settings',
      collapsible: false,
      children: [
        { title: 'General Settings', path: '/configuration/general', icon: 'sliders-horizontal' },
        { title: 'Navigation', path: '/configuration/navigation', icon: 'navigation' }
      ],
    },
    { title: 'Live Preview', path: '/content/live-preview', icon: 'monitor-play' },
    {
      title: 'Content',
      icon: 'layout-template',
      collapsible: true,
      children:[
        { title: 'Frontmatter', path: '/content/frontmatter', icon: 'file-text' },
        {
          title: 'Syntax',
          path: '/content/syntax/',
          icon: 'code-xml',
          collapsible: true,
          children:[
            { title: 'Code', path: '/content/syntax/code', icon: 'code' },
            { title: 'Images', path: '/content/syntax/images', icon: 'image' },
            { title: 'Linking', path: '/content/syntax/linking', icon: 'link' },
            { title: 'Advanced', path: '/content/syntax/advanced', icon: 'settings-2' },
          ]
        },
        {
          title: 'Containers',
          path: '/content/containers/',
          icon: 'box',
          collapsible: true,
          children:[
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
        { title: 'No-Style Pages', path: '/content/no-style-pages', icon: 'layout' },
      ],
    },
    {
      title: 'Theming',
      icon: 'palette',
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
      collapsible: true,
      children: [
        { title: 'Usage', path: '/plugins/usage', icon: 'code' },
        { title: 'Building Plugins', path: '/plugins/building-plugins', icon: 'hammer' },
        { title: 'Search', path: '/plugins/search', icon: 'search' },
        { title: 'SEO & Meta', path: '/plugins/seo', icon: 'text-search' },
        { title: 'Analytics', path: '/plugins/analytics', icon: 'bar-chart' },
        { title: 'Sitemap', path: '/plugins/sitemap', icon: 'map' },
        { title: 'Mermaid Diagrams', path: '/plugins/mermaid', icon: 'network' },
        { title: 'LLMs', path: '/plugins/llms', icon: 'brain-circuit' }
      ],
    },
    {
      title: 'Recipes',
      icon: 'chef-hat',
      collapsible: true,
      children: [
        { title: 'Landing Page', path: '/recipes/landing-page', icon: 'layout-template' },
        { title: 'Custom Fonts', path: '/recipes/custom-fonts', icon: 'type' },
        { title: 'Favicon', path: '/recipes/favicon', icon: 'image-plus' },
      ],
    },
    {
      title: 'Advanced & API',
      icon: 'server-cog',
      collapsible: true,
      children:[
        { title: 'Client Side Events', path: '/advanced/client-side-events', icon: 'square-mouse-pointer' },
        { title: 'Browser API', path: '/advanced/browser-api', icon: 'globe' },
        { title: 'Node API', path: '/advanced/node-api', icon: 'braces' },
      ]
    },

    { title: 'CLI Commands', path: '/cli-commands', icon: 'terminal' },
    { title: 'Deployment', path: '/deployment', icon: 'upload-cloud' },
    { title: 'Contributing', path: '/contributing', icon: 'git-pull-request' },
    { title: 'Comparison', path: '/comparison', icon: 'scale' },
    { title: 'GitHub', path: 'https://github.com/docmd-io/docmd', icon: 'github', external: true },
    { title: 'Discussions', path: 'https://github.com/orgs/docmd-io/discussions', icon: 'message-circle', external: true },
  ],
};