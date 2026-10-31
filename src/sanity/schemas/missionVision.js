export default {
  name: "missionVision",
  title: "Mission, Vision & History",
  type: "document",
  icon: () => "✨",
  fields: [
    {
      name: "heroEyebrow",
      title: "Hero Badge (New Visitors)",
      type: "string",
      description: "Small label above hero title (e.g., 'I'm New Here')",
      initialValue: "I'm New Here",
    },
    {
      name: "heroTitle",
      title: "Hero Title (New Visitors)",
      type: "string",
      description: "Main hero heading (e.g., 'Welcome home. We saved you a seat.')",
      initialValue: "Welcome home. We saved you a seat.",
    },
    {
      name: "heroLead",
      title: "Hero Description (New Visitors)",
      type: "text",
      rows: 2,
      description: "Welcoming message for new visitors",
    },
    {
      name: "storyEyebrow",
      title: "Story Section Badge",
      type: "string",
      description: "Small label for story section (e.g., 'Our story')",
      initialValue: "Our story",
    },
    {
      name: "storyTitle",
      title: "Story Section Title",
      type: "string",
      description: "Story section heading (e.g., 'From a living room to a family of believers.')",
      initialValue: "From a living room to a family of believers.",
    },
    {
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 3,
      description: "Your church's mission statement - why you exist",
    },
    {
      name: "history",
      title: "Church History",
      type: "text",
      rows: 4,
      description: "Overview of your church's history and founding story",
    },
    {
      name: "journeyEyebrow",
      title: "Journey/Timeline Badge",
      type: "string",
      description: "Small label for timeline section (e.g., 'History')",
      initialValue: "History",
    },
    {
      name: "journeyTitle",
      title: "Journey Section Title",
      type: "string",
      description: "Timeline section heading (e.g., 'Our Journey')",
      initialValue: "Our Journey",
    },
    {
      name: "journeySubtitle",
      title: "Journey Section Description",
      type: "text",
      rows: 2,
      description: "Brief introduction to the timeline",
    },
    {
      name: "journey",
      title: "Journey Milestones",
      type: "array",
      description: "➕ Add key milestones in your church's history. Each milestone creates a timeline entry. Drag to reorder chronologically.",
      of: [
        {
          type: "object",
          title: "Milestone",
          fields: [
            {
              name: "year",
              title: "Year / Era",
              type: "string",
              description: "e.g., '1999', '2005-2010', 'Early Years'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Milestone Title",
              type: "string",
              description: "e.g., 'Church Founded', 'New Building Dedicated'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "text",
              title: "Milestone Details",
              type: "text",
              rows: 2,
              description: "Describe what happened during this milestone",
            },
          ],
          preview: {
            select: {
              title: "year",
              subtitle: "title",
            },
          },
        },
      ],
    },
    {
      name: "visionEyebrow",
      title: "Vision Section Badge",
      type: "string",
      description: "Small label for vision section (e.g., 'Our Vision')",
      initialValue: "Our Vision",
    },
    {
      name: "visionTitle",
      title: "Vision Section Title",
      type: "string",
      description: "Vision section heading (e.g., 'To provide a hope and a future.')",
      initialValue: "To provide a hope and a future.",
    },
    {
      name: "visionLead",
      title: "Vision Section Description",
      type: "text",
      rows: 2,
      description: "Brief introduction to your vision",
    },
    {
      name: "vision",
      title: "Vision Core Pillars",
      type: "array",
      of: [{ type: "string" }],
      description: "➕ Add key pillars of your church's vision (e.g., 'Worship', 'Discipleship', 'Community', 'Service')",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Mission, Vision & Story",
      };
    },
  },
};
