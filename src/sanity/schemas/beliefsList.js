export default {
  name: "beliefsList",
  title: "Beliefs & Core Doctrines",
  type: "document",
  icon: () => "📖",
  fields: [
    {
      name: "headerEyebrow",
      title: "Page Header Badge",
      type: "string",
      description: "Small label above the title (e.g., 'What We Believe')",
      initialValue: "What We Believe",
    },
    {
      name: "headerTitle",
      title: "Page Header Title",
      type: "string",
      description: "Main page heading (e.g., 'Anchored in the Word.')",
      initialValue: "Anchored in the Word.",
    },
    {
      name: "headerLead",
      title: "Page Header Description",
      type: "text",
      rows: 2,
      description: "Brief introduction paragraph",
    },
    {
      name: "items",
      title: "Core Beliefs",
      type: "array",
      description: "➕ Click 'Add item' to add a new belief. Each belief is displayed as a card. Drag to reorder.",
      of: [
        {
          type: "object",
          title: "Belief",
          fields: [
            {
              name: "title",
              title: "Belief Title",
              type: "string",
              description: "e.g., 'The Bible', 'The Trinity', 'Salvation'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "body",
              title: "Description / Scripture",
              type: "text",
              rows: 4,
              description: "Explain this belief with supporting scripture",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "body",
            },
          },
        },
      ],
    },
    {
      name: "statementCardEyebrow",
      title: "Full Statement Section Badge",
      type: "string",
      description: "Small label for the statement card (e.g., 'Full Statement of Faith')",
      initialValue: "Full Statement of Faith",
    },
    {
      name: "statementCardTitle",
      title: "Full Statement Card Title",
      type: "string",
      description: "Title for the statement of faith card (e.g., 'A Deeper Look at What We Hold True')",
      initialValue: "A Deeper Look at What We Hold True",
    },
    {
      name: "statementCardDescription",
      title: "Full Statement Description",
      type: "text",
      rows: 3,
      description: "Brief description of your full statement of faith",
    },
    {
      name: "statementTopics",
      title: "Statement Key Topics",
      type: "array",
      of: [{ type: "string" }],
      description: "➕ Add key doctrinal topics covered in the full statement (e.g., 'Baptism', 'Church Governance')",
    },
    {
      name: "statementNote",
      title: "Statement Card Note",
      type: "string",
      description: "Optional note displayed on the card",
    },
    {
      name: "statementCtaText",
      title: "Statement CTA Button Text",
      type: "string",
      description: "Button text (e.g., 'Request Full Statement')",
      initialValue: "Request Full Statement",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Beliefs & Doctrines",
      };
    },
  },
};
