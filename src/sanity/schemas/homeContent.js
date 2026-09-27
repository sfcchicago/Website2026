export default {
  name: "homeContent",
  title: "Home & Landing Page",
  type: "document",
  fields: [
    {
      name: "heroBadge",
      title: "Hero Badge",
      type: "string",
      description: "e.g. Kenosha, WI · Since 1999",
    },
    {
      name: "cycleWords",
      title: "Rotating Headline Words (You ...)",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that rotate after 'You' on the home hero (e.g. Belong, Matter, Are Seen, Are Home, Are Loved)",
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
    },
    {
      name: "heroTrust",
      title: "Hero Trust Banner Line",
      type: "string",
      description: "e.g. Every Sunday · Malayalam 9:30 AM · English 11 AM · All welcome",
    },
    {
      name: "stats",
      title: "Key Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Number / Stat", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    },
    {
      name: "faqs",
      title: "Frequently Asked Questions (FAQ)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text", rows: 3 },
          ],
        },
      ],
    },
  ],
};
