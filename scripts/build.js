import { execSync } from "node:child_process";

const hasTinaCloud = Boolean(
  process.env.TINA_CLIENT_ID ||
  process.env.VITE_TINA_CLIENT_ID ||
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID
);

if (hasTinaCloud) {
  console.log("Building TinaCMS with Tina Cloud credentials...");
  execSync("npx tinacms build", { stdio: "inherit" });
} else {
  console.log("Note: Tina Cloud credentials not detected in environment. Skipping cloud build step.");
}

console.log("Building Vite application...");
execSync("npx vite build", { stdio: "inherit" });
