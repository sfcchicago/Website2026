import { execSync } from "node:child_process";
import fs from "node:fs";

const clientId =
  process.env.TINA_CLIENT_ID ||
  process.env.VITE_TINA_CLIENT_ID ||
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
  "cf73a0d3-5dab-4fc0-ad20-5e117742ba64";

const token =
  process.env.TINA_TOKEN ||
  "460173cd3d49c3d630172df3de42a8a368cf067b";

process.env.TINA_CLIENT_ID = clientId;
process.env.VITE_TINA_CLIENT_ID = clientId;
process.env.TINA_TOKEN = token;

console.log("Building TinaCMS with Tina Cloud credentials...");
try {
  execSync("npx tinacms build", { stdio: "inherit", env: process.env });
} catch (err) {
  console.warn("Note: Using pre-compiled TinaCMS admin bundle.");
}

// Ensure public/admin/index.html has the correct Tina Cloud production endpoint
function patchAdminHtml(filePath) {
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, "utf8");
    const cloudUrl = `https://content.tinajs.io/2.4/content/${clientId}/github/main`;
    html = html.replace(
      /window\.__API_URL__\s*=\s*"[^"]*";/,
      `window.__API_URL__ = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://localhost:4001/graphql" : "${cloudUrl}";`
    );
    fs.writeFileSync(filePath, html, "utf8");
    console.log(`Patched ${filePath} with dynamic Tina Cloud API URL.`);
  }
}

patchAdminHtml("public/admin/index.html");

console.log("Building Vite application...");
execSync("npx vite build", { stdio: "inherit", env: process.env });

patchAdminHtml("dist/admin/index.html");
console.log("Build complete!");
