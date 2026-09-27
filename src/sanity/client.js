import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityConfig = {
  projectId: import.meta.env?.VITE_SANITY_PROJECT_ID || "t0ywq15l",
  dataset: import.meta.env?.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // ensures instant real-time updates
};

export const client = createClient(sanityConfig);

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return "";
  if (typeof source === "string") return source;
  try {
    return builder.image(source).url() || "";
  } catch (_err) {
    return "";
  }
}
