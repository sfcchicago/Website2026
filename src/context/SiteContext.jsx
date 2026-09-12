import { createContext, useContext, useState, useEffect } from "react";
import initialSettings from "../content/settings.json";

const SiteContext = createContext({
  settings: initialSettings,
  updateSettings: () => {},
});

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    // Fetch latest live settings from Tina Cloud Content API (via Netlify proxy)
    // This allows instant updates (e.g. YouTube Live link) without waiting for Netlify rebuilds!
    let active = true;
    async function fetchLatest() {
      try {
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              settings(relativePath: "settings.json") {
                liveUrl
                giveUrl
                verseText
                verseRef
                tagline
                address
                phone
                email
                eventsUrl
                facebookUrl
                youtubeUrl
                instagramUrl
              }
            }`,
          }),
        });
        if (res.ok) {
          const json = await res.json();
          if (active && json?.data?.settings) {
            setSettings((prev) => ({ ...prev, ...json.data.settings }));
          }
        }
      } catch {
        // Fallback gracefully to bundled settings
      }
    }

    fetchLatest();
    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteContext.Provider value={{ settings, setSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteContext);
}
