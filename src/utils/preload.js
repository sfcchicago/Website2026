import img1 from "../assets/DSC04618.JPG";
import img2 from "../assets/DSC07464.JPG";
import img3 from "../assets/DSC08784.JPG";
import img4 from "../assets/4X8A7536.JPG";
import img5 from "../assets/4X8A7947.JPG";
import img6 from "../assets/DSC05319.JPG";
import img7 from "../assets/DSC07507.JPG";
import img8 from "../assets/IMG_9938_Original.JPG";
import { pastor, pastorHistory, board, ministerialSupport, sundaySchool, church } from "../data";

// Registry of all hero images
export const HERO_SOURCES = [img1, img2, img3, img4, img5, img6, img7, img8];

// Memory cache of preloaded and decoded images
const loadedCache = new Set();
const inFlightPromises = new Map();
const imageElements = new Map();

/**
 * Preload and off-thread decode a single image URL.
 * Keeps the Image instance in memory so the browser retains the decoded bitmap.
 */
export function preloadImage(src) {
  if (!src) return Promise.resolve(null);
  if (loadedCache.has(src)) return Promise.resolve(src);
  if (inFlightPromises.has(src)) return inFlightPromises.get(src);

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";

    const onDone = () => {
      loadedCache.add(src);
      imageElements.set(src, img);
      if (typeof img.decode === "function") {
        img
          .decode()
          .catch(() => {})
          .finally(() => resolve(src));
      } else {
        resolve(src);
      }
    };

    img.onload = onDone;
    img.onerror = () => {
      // If local failed, attempt remote fallback if applicable
      if (src.startsWith("/people")) {
        const fallback = src.replace("/people", "https://sfcchicago.com/uploads/2/6/3/5/26350378");
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          loadedCache.add(src);
          loadedCache.add(fallback);
          resolve(fallback);
        };
        fallbackImg.onerror = () => resolve(src);
        fallbackImg.src = fallback;
      } else {
        resolve(src);
      }
    };

    img.src = src;

    // In case browser already has it cached and completed synchronously
    if (img.complete && img.naturalWidth !== 0) {
      onDone();
    }
  });

  inFlightPromises.set(src, promise);
  return promise;
}

/**
 * Check if image is already loaded and ready in memory.
 */
export function isImageReady(src) {
  if (!src) return false;
  if (loadedCache.has(src)) return true;
  const el = imageElements.get(src);
  if (el && el.complete && el.naturalWidth !== 0) {
    loadedCache.add(src);
    return true;
  }
  return false;
}

/**
 * Preload an array of image URLs concurrently.
 */
export function preloadImages(srcList) {
  if (!Array.isArray(srcList)) return Promise.resolve([]);
  return Promise.all(srcList.filter(Boolean).map(preloadImage));
}

// Map of route path to photos needed by that route
export const ROUTE_IMAGES = {
  "/": HERO_SOURCES,
  "/pastor": [
    pastor.photo,
    ...pastorHistory.map((p) => p.photo).filter(Boolean),
  ],
  "/leadership": [
    ...board.map((p) => p.photo).filter(Boolean),
    ...ministerialSupport.map((p) => p.photo).filter(Boolean),
  ],
  "/sunday-school": sundaySchool.map((p) => p.photo).filter(Boolean),
  "/new-here": [church.logo],
  "/beliefs": [church.logo],
  "/contact": [church.logo],
};

/**
 * Preload photos specifically for a route (e.g. on link hover/focus).
 */
export function preloadRoute(route) {
  const normalized = route.replace(/\/$/, "") || "/";
  const images = ROUTE_IMAGES[normalized] || [];
  return preloadImages(images);
}

/**
 * Preload all photos across the entire site in order of priority.
 */
export function preloadAllSiteImages() {
  if (typeof window === "undefined") return;

  // Immediate priority: church logo and current route images
  preloadImage(church.logo);

  const curPath = window.location.pathname.replace(/\/$/, "") || "/";
  const curImages = ROUTE_IMAGES[curPath] || HERO_SOURCES;
  preloadImages(curImages);

  // Background priority: preload all other pages photos right away
  const backgroundBatch = [
    // Hero images
    ...HERO_SOURCES,
    // Pastor
    pastor.photo,
    // Board & coordinators
    ...board.map((p) => p.photo).filter(Boolean),
    ...ministerialSupport.map((p) => p.photo).filter(Boolean),
    // Sunday school
    ...sundaySchool.map((p) => p.photo).filter(Boolean),
    // Pastor history
    ...pastorHistory.map((p) => p.photo).filter(Boolean),
  ];

  const schedulePreload = () => {
    backgroundBatch.forEach((src) => {
      preloadImage(src);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(schedulePreload, { timeout: 1000 });
  } else {
    setTimeout(schedulePreload, 100);
  }
}
