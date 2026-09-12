import { execSync } from "node:child_process";

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

console.log("Building Vite application...");
execSync("npx vite build", { stdio: "inherit", env: process.env });
