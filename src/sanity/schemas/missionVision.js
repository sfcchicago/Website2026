export default {
  name: "missionVision",
  title: "Mission, Vision & History",
  type: "document",
  fields: [
    { name: "mission", title: "Mission Statement", type: "text", rows: 3 },
    {
      name: "vision",
      title: "Vision Core Pillars",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "history", title: "Church History Overview", type: "text", rows: 4 },
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
  ],
};
