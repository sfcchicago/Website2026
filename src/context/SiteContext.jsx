import { createContext, useContext, useState } from "react";
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
});

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);
  const [pastor, setPastor] = useState(initialPastor);
  const [services, setServices] = useState(initialServices.items);
  const [leadership, setLeadership] = useState(initialLeadership);
  const [beliefs, setBeliefs] = useState(initialBeliefs.items);
  const [about, setAbout] = useState(initialMission);

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
