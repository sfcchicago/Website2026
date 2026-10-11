import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

console.log("Building Vite application with Sanity CMS...");

// Step 1: Run Vite build
execSync("npx vite build", { stdio: "inherit", env: process.env });

// Step 2: Fetch active 301/302 redirects from Sanity and generate _redirects
// Note: Wrangler Cloudflare Workers Assets already handles SPA routing via:
// "not_found_handling": "single-page-application" in wrangler.json.
// Cloudflare explicitly disallows "/* /index.html 200" in _redirects because it causes an infinite loop error (code: 100324).
try {
  console.log("Fetching dynamic redirects from Sanity...");
  const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || "t0ywq15l",
    dataset: process.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const redirects = await client.fetch(
    `*[_type == "redirectRule" && !(_id in path("drafts.**")) && active != false]{ source, destination, statusCode }`
  );

  const lines = [];

  if (Array.isArray(redirects) && redirects.length > 0) {
    for (const r of redirects) {
      if (r.source && r.destination) {
        const src = r.source.trim();
        const dest = r.destination.trim();
        const code = r.statusCode === 302 ? 302 : 301;
        lines.push(`${src} ${dest} ${code}`);
      }
    }
  }

  const distDir = path.resolve("dist");
  const publicDir = path.resolve("public");

  if (lines.length > 0) {
    const content = lines.join("\n") + "\n";
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, "_redirects"), content, "utf8");
      console.log(`Generated dist/_redirects with ${lines.length} custom redirects.`);
    }
    if (fs.existsSync(publicDir)) {
      fs.writeFileSync(path.join(publicDir, "_redirects"), content, "utf8");
    }
  } else {
    // If no custom redirects, remove any existing _redirects to avoid Cloudflare validation errors
    if (fs.existsSync(path.join(distDir, "_redirects"))) {
      fs.unlinkSync(path.join(distDir, "_redirects"));
    }
    if (fs.existsSync(path.join(publicDir, "_redirects"))) {
      fs.unlinkSync(path.join(publicDir, "_redirects"));
    }
  }
} catch (err) {
  console.warn("Notice: Could not sync remote redirects during build:", err.message);
}

console.log("Build complete!");
