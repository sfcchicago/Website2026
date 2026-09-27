import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { client, urlFor } from "../sanity/client";
import initialSettings from "../content/settings.json";
import initialPastor from "../content/pastor.json";
import initialServices from "../content/services.json";
import initialLeadership from "../content/leadership.json";
import initialBeliefs from "../content/beliefs.json";
import initialMission from "../content/mission.json";
import initialPastorHistory from "../content/pastorHistory.json";

const SANITY_QUERY = `{
  "churchInfo": *[_type == "churchInfo" && !(_id in path("drafts.**"))][0],
  "quickLinks": *[_type == "quickLinks" && !(_id in path("drafts.**"))][0],
  "homeContent": *[_type == "homeContent" && !(_id in path("drafts.**"))][0],
  "pastorInfo": *[_type == "pastorInfo" && !(_id in path("drafts.**"))][0],
  "leadership": *[_type == "leadership" && !(_id in path("drafts.**"))][0],
  "servicesList": *[_type == "servicesList" && !(_id in path("drafts.**"))][0],
  "beliefsList": *[_type == "beliefsList" && !(_id in path("drafts.**"))][0],
  "missionVision": *[_type == "missionVision" && !(_id in path("drafts.**"))][0],
  "sundaySchoolList": *[_type == "sundaySchoolList" && !(_id in path("drafts.**"))][0]
}`;

function buildUnifiedSettings(churchInfo, quickLinks, fallback) {
  return {
    ...fallback,
    name: churchInfo?.name || "Sharon Fellowship Church",
    tagline: churchInfo?.tagline || fallback.tagline,
    address: churchInfo?.address || fallback.address,
    phone: churchInfo?.phone || fallback.phone,
    email: churchInfo?.email || fallback.email,
    mapsUrl: churchInfo?.mapsUrl || fallback.mapsUrl || "https://maps.google.com/?q=5404+67th+Street,+Kenosha,+WI+53142",
    verseText: churchInfo?.verseText || fallback.verseText,
    verseRef: churchInfo?.verseRef || fallback.verseRef,
    verseMl: churchInfo?.verseMl || "എന്റെ അടുക്കൽ വരുവിൻ, അദ്ധ്വാനിക്കുന്നവരും ഭാരം ചുമക്കുന്നവരുമായുള്ളോരേ, ഞാൻ നിങ്ങളെ വിശ്രമിപ്പിക്കും.",
    verseMlRef: churchInfo?.verseMlRef || "മത്തായി 11:28",
    liveUrl: quickLinks?.live || churchInfo?.liveUrl || fallback.liveUrl,
    giveUrl: quickLinks?.give || churchInfo?.giveUrl || fallback.giveUrl,
    eventsUrl: quickLinks?.events || churchInfo?.eventsUrl || fallback.eventsUrl,
    zoomPrayer: quickLinks?.zoomPrayer || "https://us02web.zoom.us/j/2885362741",
    facebookUrl: quickLinks?.facebook || fallback.facebookUrl,
    youtubeUrl: quickLinks?.youtube || fallback.youtubeUrl,
    instagramUrl: quickLinks?.instagram || fallback.instagramUrl,
  };
}

const defaultHomeContent = {
  heroBadge: "Kenosha, WI · Since 1999",
  cycleWords: ["Belong", "Matter", "Are Seen", "Are Home", "Are Loved"],
  heroSubtitle: "Malayalam and English worship every Sunday. Come as you are. There is a place at the table.",
  heroTrust: "Every Sunday · Malayalam 9:30 AM · English 11 AM · All welcome",
  stats: [
    { label: "First gathering", number: "1999" },
    { label: "Members & growing", number: "100+" },
    { label: "Years in Kenosha", number: "22+" },
    { label: "Languages each Sunday", number: "2" },
  ],
  faqs: [
    { q: "What should I wear?", a: "Whatever makes you comfortable. You'll see everything from jeans and sneakers to dress shirts. There is no dress code — just come as you are." },
    { q: "Is there childcare or Sunday School?", a: "Yes! We have age-based Sunday School classes every Sunday from 10:00–10:55 AM, running concurrently between the two services. Classes cover toddlers through senior high." },
    { q: "What language are the services in?", a: "We worship in both Malayalam and English. The Malayalam service runs 9:30–11:00 AM and the English service runs 11:00 AM–12:30 PM. Both are open to everyone." },
    { q: "Where do I park?", a: "We have a parking lot right next to our building at 5404 67th Street, Kenosha. There is plenty of space and someone will be happy to point you toward the entrance." },
    { q: "Can I watch online?", a: "Absolutely. We stream every service live on YouTube. Click 'Watch Live' in the navigation or visit our YouTube channel any Sunday morning." },
    { q: "How can I get connected mid-week?", a: "We have a prayer line every Tuesday, Thursday, and Saturday at 7:30 PM via Zoom, and young adults (RISE) meet the 4th Saturday at 7:00 PM. Check the Contact page for links." },
  ],
};

const SiteContext = createContext({
  settings: initialSettings,
  churchInfo: null,
  quickLinks: null,
  homeContent: defaultHomeContent,
  pastor: initialPastor,
  pastorHistory: initialPastorHistory.items,
  services: initialServices.items,
  leadership: initialLeadership,
  beliefs: initialBeliefs.items,
  about: initialMission,
  sundaySchool: initialLeadership.sundaySchool,
  urlFor,
  loading: false,
});

export function SiteProvider({ children }) {
  const [churchInfo, setChurchInfo] = useState(null);
  const [quickLinks, setQuickLinks] = useState(null);
  const [settings, setSettings] = useState(() => buildUnifiedSettings(null, null, initialSettings));
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [pastor, setPastor] = useState(initialPastor);
  const [pastorHistory, setPastorHistory] = useState(initialPastorHistory.items);
  const [services, setServices] = useState(initialServices.items);
  const [leadership, setLeadership] = useState(initialLeadership);
  const [beliefs, setBeliefs] = useState(initialBeliefs.items);
  const [about, setAbout] = useState(initialMission);
  const [sundaySchool, setSundaySchool] = useState(initialLeadership.sundaySchool);
  const [loading, setLoading] = useState(true);

  const fetchSanityData = useCallback(async () => {
    try {
      const data = await client.fetch(SANITY_QUERY);
      if (!data) return;

      if (data.churchInfo) setChurchInfo(data.churchInfo);
      if (data.quickLinks) setQuickLinks(data.quickLinks);

      setSettings(buildUnifiedSettings(data.churchInfo, data.quickLinks, initialSettings));

      if (data.homeContent) {
        setHomeContent((prev) => ({
          ...prev,
          ...data.homeContent,
          cycleWords: data.homeContent.cycleWords?.length ? data.homeContent.cycleWords : prev.cycleWords,
          stats: data.homeContent.stats?.length ? data.homeContent.stats : prev.stats,
          faqs: data.homeContent.faqs?.length ? data.homeContent.faqs : prev.faqs,
        }));
      }

      if (data.pastorInfo) {
        setPastor((prev) => ({
          ...prev,
          ...data.pastorInfo,
          photo: data.pastorInfo.photo || prev.photo,
          bio: data.pastorInfo.bio || prev.bio,
        }));
        if (data.pastorInfo.pastorsHistory?.length) {
          setPastorHistory(data.pastorInfo.pastorsHistory);
        }
      }

      if (data.servicesList?.items?.length) {
        setServices(data.servicesList.items);
      }

      if (data.leadership) {
        setLeadership((prev) => ({
          ...prev,
          board: data.leadership.board?.length ? data.leadership.board : prev.board,
          ministerialSupport: data.leadership.ministerialSupport?.length
            ? data.leadership.ministerialSupport
            : prev.ministerialSupport,
          sundaySchool: data.sundaySchoolList?.items?.length
            ? data.sundaySchoolList.items
            : prev.sundaySchool,
        }));
      }

      if (data.sundaySchoolList?.items?.length) {
        setSundaySchool(data.sundaySchoolList.items);
      }

      if (data.beliefsList?.items?.length) {
        setBeliefs(data.beliefsList.items);
      }

      if (data.missionVision) {
        setAbout((prev) => ({
          ...prev,
          mission: data.missionVision.mission || prev.mission,
          vision: data.missionVision.vision || prev.vision,
          history: data.missionVision.history || prev.history,
          journey: data.missionVision.journey || prev.journey,
        }));
      }
    } catch (err) {
      console.warn("Sanity fetch note:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSanityData();

    // Live subscription to real-time Sanity CMS updates!
    let subscription = null;
    try {
      subscription = client.listen(
        `*[_type in ["churchInfo", "quickLinks", "homeContent", "pastorInfo", "leadership", "servicesList", "beliefsList", "missionVision", "sundaySchoolList"]]`
      ).subscribe(() => {
        fetchSanityData();
      });
    } catch (err) {
      console.warn("Sanity live subscription note:", err.message);
    }

    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, [fetchSanityData]);

  return (
    <SiteContext.Provider
      value={{
        settings,
        churchInfo,
        quickLinks,
        homeContent,
        pastor,
        pastorHistory,
        services,
        leadership,
        beliefs,
        about,
        sundaySchool,
        urlFor,
        loading,
        refresh: fetchSanityData,
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
  const { settings } = useContext(SiteContext);
  return { settings };
}
