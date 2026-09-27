export default {
  name: "churchInfo",
  title: "Church Info & Settings",
  type: "document",
  fields: [
    { name: "name", title: "Church Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "address", title: "Street Address", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email Address", type: "string" },
    { name: "mapsUrl", title: "Google Maps URL", type: "url" },
    { name: "verseText", title: "Featured Bible Verse (English)", type: "text", rows: 3 },
    { name: "verseRef", title: "Verse Reference (English)", type: "string" },
    { name: "verseMl", title: "Featured Bible Verse (Malayalam)", type: "text", rows: 3 },
    { name: "verseMlRef", title: "Verse Reference (Malayalam)", type: "string" },
  ],
};
