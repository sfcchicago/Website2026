import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

console.log("Building Vite application with Sanity CMS...");

// Step 1: Run Vite build
execSync("npx vite build", { stdio: "inherit", env: process.env });

// Step 2: Fetch active 301/302 redirects from Sanity and generate _redirects for Cloudflare Pages & Netlify
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

  // Cloudflare Pages / Netlify standard rules
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

  // SPA fallback rule: redirect non-file routes to /index.html 200
  lines.push("/* /index.html 200");

  const distDir = path.resolve("dist");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "_redirects"), lines.join("\n") + "\n", "utf8");
    console.log(`Generated dist/_redirects with ${redirects?.length || 0} custom redirects.`);
  }

  // Also sync to public/_redirects for development or static serving
  const publicDir = path.resolve("public");
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, "_redirects"), lines.join("\n") + "\n", "utf8");
  }
} catch (err) {
  console.warn("Notice: Could not sync remote redirects during build (using fallback SPA rule):", err.message);
  const distDir = path.resolve("dist");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "_redirects"), "/* /index.html 200\n", "utf8");
  }
}

console.log("Build complete!");
