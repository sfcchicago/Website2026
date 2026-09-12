import { createContext, useContext, useState, useEffect, useCallback } from "react";
import initialSettings from "../content/settings.json";
import initialPastor from "../content/pastor.json";
import initialServices from "../content/services.json";
import initialLeadership from "../content/leadership.json";
import initialBeliefs from "../content/beliefs.json";
import initialMission from "../content/mission.json";

const SiteContext = createContext({
  settings: initialSettings,
  pastor: initialPastor,
  services: initialServices.items,
  leadership: initialLeadership,
  beliefs: initialBeliefs.items,
  about: initialMission,
  setSettings: () => {},
  setPastor: () => {},
  refresh: () => {},
});

const ALL_CONTENT_QUERY = `{
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
  pastor(relativePath: "pastor.json") {
    name
    role
    since
    location
    bio
    photo
    photoPosition
    photoScale
  }
  services(relativePath: "services.json") {
    items {
      name
      day
      time
      note
    }
  }
  leadership(relativePath: "leadership.json") {
    board {
      name
      role
      photo
      photoPosition
      photoScale
    }
    ministerialSupport {
      name
      role
      photo
      photoPosition
      photoScale
    }
    sundaySchool {
      name
      role
      photo
      photoPosition
      photoScale
    }
  }
  beliefs(relativePath: "beliefs.json") {
    items {
      title
      body
    }
  }
  about(relativePath: "mission.json") {
    mission
    vision
    history
  }
}`;

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);
  const [pastor, setPastor] = useState(initialPastor);
  const [services, setServices] = useState(initialServices.items);
  const [leadership, setLeadership] = useState(initialLeadership);
  const [beliefs, setBeliefs] = useState(initialBeliefs.items);
  const [about, setAbout] = useState(initialMission);

  const fetchLiveContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: ALL_CONTENT_QUERY }),
      });
      if (res.ok) {
        const json = await res.json();
        const d = json?.data;
        if (d) {
          if (d.settings) setSettings((prev) => ({ ...prev, ...d.settings }));
          if (d.pastor) setPastor((prev) => ({ ...prev, ...d.pastor }));
          if (d.services?.items) setServices(d.services.items);
          if (d.leadership) setLeadership((prev) => ({ ...prev, ...d.leadership }));
          if (d.beliefs?.items) setBeliefs(d.beliefs.items);
          if (d.about) setAbout((prev) => ({ ...prev, ...d.about }));
        }
      }
    } catch {
      // Gracefully fall back to bundled content
    }
  }, []);

  useEffect(() => {
    fetchLiveContent();

    // Re-fetch immediately when user returns to the tab or after clicking Save
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchLiveContent();
      }
    };
    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", fetchLiveContent);

    // Also poll every 8 seconds so saved CMS changes reflect immediately
    const interval = setInterval(fetchLiveContent, 8000);

    return () => {
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", fetchLiveContent);
      clearInterval(interval);
    };
  }, [fetchLiveContent]);

  return (
    <SiteContext.Provider
      value={{
        settings,
        setSettings,
        pastor,
        setPastor,
        services,
        setServices,
        leadership,
        setLeadership,
        beliefs,
        setBeliefs,
        about,
        setAbout,
        refresh: fetchLiveContent,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteContext);
}

export function useSiteSettings() {
  const { settings, setSettings } = useContext(SiteContext);
  return { settings, setSettings };
}
