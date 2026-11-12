// Active plugin source script demonstration
// Loaded directly from ./snippets/demo.js at build time

console.log("Playground Plugin: Sourced script active!");
// Dynamically retrieve compiler version & built-in variables without hardcoded fallbacks
const compilerVersion = window.docmd?.var?.get("docmd.version");
const buildYear = window.docmd?.var?.get("docmd.buildYear");
const siteTitle = window.docmd?.var?.get("site.title");

console.info("Target docmd compiler version:", compilerVersion);
console.info("Target docmd build year:", buildYear);

function computePluginStatus() {
  return {
    plugin: "@docmd/plugin-playground",
    version: compilerVersion,
    buildYear: buildYear,
    siteTitle: siteTitle,
    sandbox: "isolated async function",
    consoleProxy: "active",
    status: "operational"
  };
}

const status = computePluginStatus();
console.table(status);
return `Playground runtime ready (v${compilerVersion})`;