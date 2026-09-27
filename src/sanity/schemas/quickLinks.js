export default {
  name: "quickLinks",
  title: "Quick Links & Streams",
  type: "document",
  fields: [
    { name: "live", title: "Watch Live Link (YouTube Stream)", type: "url" },
    { name: "give", title: "Online Giving Link (Venmo)", type: "url" },
    { name: "events", title: "Events / Announcements Link", type: "url" },
    { name: "zoomPrayer", title: "Zoom Prayer Line Link", type: "url" },
    { name: "prayerSchedule", title: "Prayer Line Schedule Text", type: "string", description: "e.g. Tue, Thu, Sat at 7:30 PM · Join on Zoom" },
    { name: "facebook", title: "Facebook Page URL", type: "url" },
    { name: "youtube", title: "YouTube Channel URL", type: "url" },
    { name: "instagram", title: "Instagram Profile URL", type: "url" },
  ],
};
