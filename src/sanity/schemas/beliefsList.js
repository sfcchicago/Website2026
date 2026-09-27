export default {
  name: "beliefsList",
  title: "Beliefs & Core Doctrines",
  type: "document",
  fields: [
    { name: "headerEyebrow", title: "Page Header Eyebrow", type: "string", description: "e.g. What We Believe" },
    { name: "headerTitle", title: "Page Header Title", type: "string", description: "e.g. Anchored in the Word." },
    { name: "headerLead", title: "Page Header Lead Paragraph", type: "text", rows: 2 },
    {
      name: "items",
      title: "Core Beliefs List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Belief Title", type: "string" },
            { name: "body", title: "Description / Scripture", type: "text", rows: 4 },
          ],
        },
      ],
    },
    { name: "statementCardEyebrow", title: "Statement Card Eyebrow", type: "string", description: "e.g. Full Statement of Faith" },
    { name: "statementCardTitle", title: "Statement Card Title", type: "string", description: "e.g. A Deeper Look at What We Hold True" },
    { name: "statementCardDescription", title: "Statement Card Description", type: "text", rows: 3 },
    {
      name: "statementTopics",
      title: "Statement Key Doctrinal Topics",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "statementNote", title: "Statement Card Note", type: "string" },
    { name: "statementCtaText", title: "Statement CTA Button Text", type: "string", description: "e.g. Request Full Statement" },
  ],
};
