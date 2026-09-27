import { execSync } from "node:child_process";

console.log("Building Vite application with Sanity CMS...");
execSync("npx vite build", { stdio: "inherit", env: process.env });
console.log("Build complete!");
