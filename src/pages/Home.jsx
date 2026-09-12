import { useEffect } from "react";
import Landing from "../components/Landing";
import { useTina } from "tinacms/dist/react";
import { SettingsDocument } from "../../tina/__generated__/types";
import initialSettings from "../content/settings.json";
import { useSiteSettings } from "../context/SiteContext";

export default function Home() {
  const { setSettings } = useSiteSettings();
  const { data } = useTina({
    query: SettingsDocument,
    variables: { relativePath: "settings.json" },
    data: { settings: initialSettings },
  });

  useEffect(() => {
    if (data?.settings) {
      setSettings((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data?.settings, setSettings]);

  return <Landing />;
}
