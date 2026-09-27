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
      name: "heroTitlePrefix",
      title: "Hero Headline Prefix",
      type: "string",
      description: "e.g. You",
    },
    {
      name: "cycleWords",
      title: "Rotating Headline Words (You ...)",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that rotate after 'You' on the home hero (e.g. Belong, Matter, Are Seen, Are Home, Are Loved)",
    },
    {
      name: "heroTitleSuffix",
      title: "Hero Headline Suffix",
      type: "string",
      description: "e.g. here",
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
    },
    {
      name: "heroCtaPrimaryText",
      title: "Primary Button Text",
      type: "string",
      description: "e.g. Plan your visit",
    },
    {
      name: "heroCtaSecondaryText",
      title: "Secondary Button Text",
      type: "string",
      description: "e.g. Watch live",
    },
    {
      name: "heroTrust",
      title: "Hero Trust Banner Line",
      type: "string",
      description: "e.g. Every Sunday · Malayalam 9:30 AM · English 11 AM · All welcome",
    },
    {
      name: "storyBadge",
      title: "Story Section Badge",
      type: "string",
      description: "e.g. Our story",
    },
    {
      name: "storyTitle",
      title: "Story Section Title",
      type: "string",
      description: "e.g. Devoted to God, and to one another.",
    },
    {
      name: "storySubtitle",
      title: "Story Section Subtitle",
      type: "text",
      rows: 3,
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
      name: "servicesBadge",
      title: "Weekly Services Badge",
      type: "string",
      description: "e.g. Your Sunday",
    },
    {
      name: "servicesTitle",
      title: "Weekly Services Title",
      type: "string",
      description: "e.g. Where we gather every Sunday.",
    },
    {
      name: "servicesSubtitle",
      title: "Weekly Services Subtitle",
      type: "text",
      rows: 2,
    },
    {
      name: "directoryBadge",
      title: "Directory Badge",
      type: "string",
      description: "e.g. Start here",
    },
    {
      name: "directoryTitle",
      title: "Directory Title",
      type: "string",
      description: "e.g. Find your next step.",
    },
    {
      name: "directorySubtitle",
      title: "Directory Subtitle",
      type: "text",
      rows: 2,
    },
    {
      name: "directory",
      title: "Directory Navigation Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "n", title: "Number", type: "string" },
            { name: "label", title: "Card Title", type: "string" },
            { name: "desc", title: "Description", type: "string" },
            { name: "to", title: "Link Path", type: "string" },
          ],
        },
      ],
    },
    {
      name: "faqBadge",
      title: "FAQ Badge",
      type: "string",
      description: "e.g. FAQ",
    },
    {
      name: "faqTitle",
      title: "FAQ Title",
      type: "string",
      description: "e.g. Questions? Here are the answers.",
    },
    {
      name: "faqSubtitle",
      title: "FAQ Subtitle",
      type: "text",
      rows: 2,
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
    {
      name: "faqMoreTitle",
      title: "FAQ Footer Card Title",
      type: "string",
      description: "e.g. Got more questions?",
    },
    {
      name: "faqMoreText",
      title: "FAQ Footer Card Text",
      type: "string",
      description: "e.g. Reach out anytime — we'd love to hear from you.",
    },
    {
      name: "ctaBadge",
      title: "Bottom CTA Badge",
      type: "string",
      description: "e.g. Get started",
    },
    {
      name: "ctaTitle",
      title: "Bottom CTA Title",
      type: "string",
      description: "e.g. A seat is saved for you.",
    },
    {
      name: "ctaSubtitle",
      title: "Bottom CTA Subtitle",
      type: "string",
      description: "e.g. Join us this Sunday at 9:30 and 11 AM. All are welcome.",
    },
    {
      name: "ctaTrust",
      title: "Bottom CTA Trust Line",
      type: "string",
      description: "e.g. Every Sunday · Malayalam & English · All are welcome",
    },
  ],
};
