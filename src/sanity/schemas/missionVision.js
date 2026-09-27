export default {
  name: "missionVision",
  title: "Mission, Vision & History",
  type: "document",
  fields: [
    { name: "heroEyebrow", title: "New Here Hero Eyebrow", type: "string", description: "e.g. I'm New Here" },
    { name: "heroTitle", title: "New Here Hero Title", type: "string", description: "e.g. Welcome home. We saved you a seat." },
    { name: "heroLead", title: "New Here Hero Lead", type: "text", rows: 2 },
    { name: "storyEyebrow", title: "Story Section Eyebrow", type: "string", description: "e.g. Our story" },
    { name: "storyTitle", title: "Story Section Title", type: "string", description: "e.g. From a living room to a family of believers." },
    { name: "mission", title: "Mission Statement", type: "text", rows: 3 },
    { name: "history", title: "Church History Overview", type: "text", rows: 4 },
    { name: "journeyEyebrow", title: "Journey Section Eyebrow", type: "string", description: "e.g. History" },
    { name: "journeyTitle", title: "Journey Section Title", type: "string", description: "e.g. Our Journey" },
    { name: "journeySubtitle", title: "Journey Section Subtitle", type: "text", rows: 2 },
    {
      name: "journey",
      title: "Journey Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Year / Era", type: "string" },
            { name: "title", title: "Milestone Title", type: "string" },
            { name: "text", title: "Milestone Details", type: "text", rows: 2 },
          ],
        },
      ],
    },
    { name: "visionEyebrow", title: "Vision Section Eyebrow", type: "string", description: "e.g. Our Vision" },
    { name: "visionTitle", title: "Vision Section Title", type: "string", description: "e.g. To provide a hope and a future." },
    { name: "visionLead", title: "Vision Section Lead", type: "text", rows: 2 },
    {
      name: "vision",
      title: "Vision Core Pillars",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
