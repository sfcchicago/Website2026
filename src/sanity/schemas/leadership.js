export default {
  name: "leadership",
  title: "Church Leadership & Coordinators",
  type: "document",
  fields: [
    { name: "headerEyebrow", title: "Page Header Eyebrow", type: "string", description: "e.g. Leadership" },
    { name: "headerTitle", title: "Page Header Title", type: "string", description: "e.g. Servant leadership." },
    { name: "headerLead", title: "Page Header Lead Paragraph", type: "text", rows: 2 },
    { name: "boardSectionEyebrow", title: "Board Section Eyebrow", type: "string", description: "e.g. Board of Directors" },
    { name: "boardSectionTitle", title: "Board Section Title", type: "string", description: "e.g. Guiding the vision" },
    { name: "boardSectionSubtitle", title: "Board Section Subtitle", type: "text", rows: 2 },
    {
      name: "board",
      title: "Board of Trustees / Governing Board",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "photo", title: "Photo Path or URL", type: "string" },
            { name: "photoPosition", title: "Photo Position (optional)", type: "string" },
          ],
        },
      ],
    },
    { name: "ministerialSectionEyebrow", title: "Ministerial Support Eyebrow", type: "string", description: "e.g. Ministerial Support" },
    { name: "ministerialSectionTitle", title: "Ministerial Support Title", type: "string", description: "e.g. The hands and feet" },
    { name: "ministerialSectionSubtitle", title: "Ministerial Support Subtitle", type: "text", rows: 2 },
    {
      name: "ministerialSupport",
      title: "Ministerial Support & Ministry Coordinators",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "photo", title: "Photo Path or URL", type: "string" },
          ],
        },
      ],
    },
  ],
};
