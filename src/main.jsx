import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/caveat";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/cormorant";
import "@fontsource-variable/cormorant/wght-italic.css";
import "./styles.css";
import App from "./App.jsx";
import { preloadAllSiteImages } from "./utils/preload";

// Eagerly preload and decode all photos so they are always ready across pages
preloadAllSiteImages();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
