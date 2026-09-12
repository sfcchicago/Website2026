import siteSettings from "./content/settings.json";
import servicesData from "./content/services.json";
import pastorData from "./content/pastor.json";
import missionData from "./content/mission.json";
import beliefsData from "./content/beliefs.json";
import leadershipData from "./content/leadership.json";
import pastorHistoryData from "./content/pastorHistory.json";

const UP = "/people";
export const REMOTE_UP = "https://sfcchicago.com/uploads/2/6/3/5/26350378";

export const church = {
  name: "Sharon Fellowship Church",
  city: "Chicago",
  tagline: siteSettings.tagline || "A family of believers in Kenosha, Wisconsin",
  address: siteSettings.address || "5404 67th Street, Kenosha, WI 53142",
  phone: siteSettings.phone || "262-748-1547",
  phoneHref: `tel:+1${(siteSettings.phone || "262-748-1547").replace(/[^0-9]/g, "")}`,
  email: siteSettings.email || "sfckenosha@gmail.com",
  founded: 1999,
  logo: "/logo.png",
  maps: "https://maps.google.com/?q=5404+67th+Street,+Kenosha,+WI+53142",
  socials: {
    facebook: siteSettings.facebookUrl || "https://www.facebook.com/SFC.CHICAGO",
    youtube: siteSettings.youtubeUrl || "https://www.youtube.com/channel/UCceRiiIG0gckcM6_W26D2hw",
    instagram: siteSettings.instagramUrl || "https://instagram.com/sfc.chicago",
  },
  links: {
    give: siteSettings.giveUrl || "https://venmo.com/SFCKenosha",
    events: siteSettings.eventsUrl || "https://sfcchicago.churchcenter.com/pages/announcements",
    live: siteSettings.liveUrl || "https://youtube.com/live/mYKKtloRgWA?feature=share",
    zoomPrayer: "https://us02web.zoom.us/j/2885362741",
  },
  verse: {
    text: siteSettings.verseText || "Come to me, all who labor and are heavy laden, and I will give you rest.",
    ref: siteSettings.verseRef || "Matthew 11:28",
    ml: "എന്റെ അടുക്കൽ വരുവിൻ, അദ്ധ്വാനിക്കുന്നവരും ഭാരം ചുമക്കുന്നവരുമായുള്ളോരേ, ഞാൻ നിങ്ങളെ വിശ്രമിപ്പിക്കും.",
    mlRef: "മത്തായി 11:28",
  },
};

export const services = servicesData.items;

export const mission = missionData;

export const beliefs = beliefsData.items;

export const pastor = pastorData;

export const pastorHistory = pastorHistoryData.items;

export const board = leadershipData.board;
export const ministerialSupport = leadershipData.ministerialSupport;
export const sundaySchool = leadershipData.sundaySchool;

export const nav = [
  { label: "I'm New", href: "/new-here" },
  { label: "Our Pastor", href: "/pastor" },
  { label: "Leadership", href: "/leadership" },
  { label: "Sunday School", href: "/sunday-school" },
  { label: "Beliefs", href: "/beliefs" },
  { label: "Contact", href: "/contact" },
];
