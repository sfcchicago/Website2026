import { useEffect } from "react";
import Landing from "../components/Landing";
import { useTina } from "tinacms/dist/react";
import { SettingsDocument } from "../../tina/__generated__/types";
import initialSettings from "../content/settings.json";
import { useSiteSettings } from "../context/SiteContext";

const settingsInitial = {
  ...initialSettings,
  _sys: {
    filename: "settings",
    basename: "settings.json",
    breadcrumbs: ["settings"],
    path: "src/content/settings.json",
    relativePath: "settings.json",
    extension: "json",
  },
  id: "src/content/settings.json",
};

export default function Home() {
  const { settings: liveSettings, setSettings } = useSiteSettings();
  const initialData = liveSettings ? { ...settingsInitial, ...liveSettings } : settingsInitial;
  const { data } = useTina({
    query: SettingsDocument,
    variables: { relativePath: "settings.json" },
    data: { settings: initialData },
  });

  const activeSettings = data?.settings || liveSettings || initialSettings;

  useEffect(() => {
    if (data?.settings) {
      setSettings((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data?.settings, setSettings]);

  return <Landing previewSettings={activeSettings} />;
}
