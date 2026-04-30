// docmd.config.js (Multi-Project Root)
// Source file from the docmd project — https://github.com/docmd-io/docs

module.exports = defineConfig({
  projects: [
    { prefix: '/', src: 'docmd-main' },
    { prefix: '/search', src: 'docmd-search' }
  ]
});