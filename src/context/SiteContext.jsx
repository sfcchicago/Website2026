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
  saveLiveCollection: async () => {},
});

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);
  const [pastor, setPastor] = useState(initialPastor);
  const [services, setServices] = useState(initialServices.items);
  const [leadership, setLeadership] = useState(initialLeadership);
  const [beliefs, setBeliefs] = useState(initialBeliefs.items);
  const [about, setAbout] = useState(initialMission);

  useEffect(() => {
    let active = true;
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
        if (data.pastor) setPastor((prev) => ({ ...prev, ...data.pastor }));
        if (data.services) setServices(data.services.items || data.services);
        if (data.leadership) setLeadership((prev) => ({ ...prev, ...data.leadership }));
        if (data.beliefs) setBeliefs(data.beliefs.items || data.beliefs);
        if (data.about) setAbout((prev) => ({ ...prev, ...data.about }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const saveLiveCollection = useCallback(async (collection, data, adminKey) => {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ collection, data }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to save");
    }

    if (collection === "settings") setSettings(data);
    if (collection === "pastor") setPastor(data);
    if (collection === "services") setServices(data.items || data);
    if (collection === "leadership") setLeadership(data);
    if (collection === "beliefs") setBeliefs(data.items || data);
    if (collection === "about") setAbout(data);
    return true;
  }, []);

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
        saveLiveCollection,
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
