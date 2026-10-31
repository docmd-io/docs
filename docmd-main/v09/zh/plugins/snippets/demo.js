// Active plugin source script demonstration
// Loaded directly from ./snippets/demo.js at build time

console.log("Playground Plugin: Sourced script active!");
const compilerVersion = window.docmd?.var?.get("docmd.version") || "0.9.9";
console.info("Target docmd compiler version:", compilerVersion);

function computePluginStatus() {
  return {
    plugin: "@docmd/plugin-playground",
    version: compilerVersion,
    sandbox: "isolated async function",
    consoleProxy: "active",
    status: "operational"
  };
}

const status = computePluginStatus();
console.table(status);
return `Playground runtime ready (v${compilerVersion})`;
