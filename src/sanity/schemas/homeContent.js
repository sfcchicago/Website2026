export default {
  name: "homeContent",
  title: "Home & Landing Page",
  type: "document",
  fields: [
    {
      name: "heroBadge",
      title: "🏷️ Top badge (location & year)",
      type: "string",
      description: "Small text badge at the top of the homepage",
      placeholder: "Kenosha, WI · Since 1999",
    },
    {
      name: "heroTitlePrefix",
      title: "📝 Headline first word",
      type: "string",
      description: "The word before the rotating words (usually 'You')",
      placeholder: "You",
    },
    {
      name: "cycleWords",
      title: "🔄 Rotating words (animates on homepage)",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that rotate after 'You' on the homepage hero. Add multiple words, one per line.",
      validation: Rule => Rule.min(1).error("Add at least one word")
    },
    {
      name: "heroTitleSuffix",
      title: "📝 Headline last word",
      type: "string",
      description: "The word after the rotating words (usually 'here')",
      placeholder: "here",
    },
    {
      name: "heroSubtitle",
      title: "✍️ Hero subtitle paragraph",
      type: "text",
      rows: 2,
      description: "The description text below the main headline",
    },
    {
      name: "heroCtaPrimaryText",
      title: "🔵 Main button text",
      type: "string",
      description: "Text for the primary (blue) button",
      placeholder: "Plan your visit",
    },
    {
      name: "heroCtaSecondaryText",
      title: "⚪ Secondary button text",
      type: "string",
      description: "Text for the secondary button",
      placeholder: "Watch live",
    },
    {
      name: "heroTrust",
      title: "📅 Service times banner",
      type: "string",
      description: "The banner showing service times and info",
      placeholder: "Every Sunday · Malayalam 9:30 AM · English 11 AM · All welcome",
    },
    {
      name: "heroPhotos",
      title: "📷 Homepage Background Photos (Slideshow)",
      type: "array",
      description: "Upload photos for the rotating background slideshow on the homepage. Click 'Add item' to add photos. Leave empty to use default church photos.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "📝 Photo description",
              type: "string",
              description: "Brief description of what's in the photo (for accessibility)",
              placeholder: "Church building exterior"
            },
            {
              name: "posX",
              title: "🎯 Horizontal position (Advanced)",
              type: "number",
              description: "Where to focus horizontally (0-100, leave blank for center at 50)",
            },
            {
              name: "posY",
              title: "🎯 Vertical position (Advanced)",
              type: "number",
              description: "Where to focus vertically (0-100, leave blank for center at 50)",
            },
            {
              name: "scale",
              title: "🔍 Zoom level (Advanced)",
              type: "number",
              description: "Zoom scale (leave blank for default 1.0, or use 1.05 for slight zoom)",
            },
          ],
        },
      ],
    },
    {
      name: "storyBadge",
      title: "🏷️ Our Story section label",
      type: "string",
      description: "Small badge above the story section",
      placeholder: "Our story",
    },
    {
      name: "storyTitle",
      title: "📖 Our Story heading",
      type: "string",
      description: "Main title for the story section",
      placeholder: "Devoted to God, and to one another.",
    },
    {
      name: "storySubtitle",
      title: "✍️ Our Story description",
      type: "text",
      rows: 3,
      description: "Tell your church's story in a few sentences",
    },
    {
      name: "stats",
      title: "📊 Church Stats (Years, Families, etc.)",
      type: "array",
      description: "Add key numbers about your church. Click 'Add item' to add a stat.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "number",
              title: "🔢 Number",
              type: "string",
              description: "The statistic (e.g., '27+', '150+')",
              placeholder: "27+"
            },
            {
              name: "label",
              title: "📝 Label",
              type: "string",
              description: "What the number represents",
              placeholder: "Years of ministry"
            },
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'label'
            }
          }
        },
      ],
    },
    {
      name: "servicesBadge",
      title: "🏷️ Services section label",
      type: "string",
      description: "Small badge above the weekly services section",
      placeholder: "Your Sunday",
    },
    {
      name: "servicesTitle",
      title: "⛪ Services section heading",
      type: "string",
      description: "Main title for the services section",
      placeholder: "Where we gather every Sunday.",
    },
    {
      name: "servicesSubtitle",
      title: "✍️ Services description",
      type: "text",
      rows: 2,
      description: "Brief description of your Sunday services",
    },
    {
      name: "directoryBadge",
      title: "🏷️ Directory section label",
      type: "string",
      description: "Small badge for the quick links section",
      placeholder: "Start here",
    },
    {
      name: "directoryTitle",
      title: "🗂️ Directory section heading",
      type: "string",
      description: "Main title for the directory/quick links section",
      placeholder: "Find your next step.",
    },
    {
      name: "directorySubtitle",
      title: "✍️ Directory description",
      type: "text",
      rows: 2,
      description: "Brief description for the directory section",
    },
    {
      name: "directory",
      title: "🔗 Quick Link Cards",
      type: "array",
      description: "Navigation cards that link to important pages. Click 'Add item' to add a new card.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "n",
              title: "🔢 Card Number",
              type: "string",
              description: "Display number for the card (e.g., '01', '02')",
              placeholder: "01"
            },
            {
              name: "label",
              title: "📝 Card Title",
              type: "string",
              description: "Main title of the card",
              placeholder: "New here?"
            },
            {
              name: "desc",
              title: "✍️ Card Description",
              type: "string",
              description: "Short description of what visitors will find",
              placeholder: "What to expect on Sunday"
            },
            {
              name: "to",
              title: "🔗 Link Path",
              type: "string",
              description: "Where this card links to (e.g., '/new-here', '/contact')",
              placeholder: "/new-here"
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'desc'
            }
          }
        },
      ],
    },
    {
      name: "faqBadge",
      title: "🏷️ FAQ section label",
      type: "string",
      description: "Small badge for the FAQ section",
      placeholder: "FAQ",
    },
    {
      name: "faqTitle",
      title: "❓ FAQ section heading",
      type: "string",
      description: "Main title for the FAQ section",
      placeholder: "Questions? Here are the answers.",
    },
    {
      name: "faqSubtitle",
      title: "✍️ FAQ description",
      type: "text",
      rows: 2,
      description: "Brief intro for the FAQ section",
    },
    {
      name: "faqs",
      title: "💬 Frequently Asked Questions",
      type: "array",
      description: "Add questions and answers here. Click 'Add item' to add a new FAQ.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "q",
              title: "❓ Question",
              type: "string",
              description: "The question visitors ask",
              placeholder: "What should I wear to church?"
            },
            {
              name: "a",
              title: "💬 Answer",
              type: "text",
              rows: 3,
              description: "Your answer to the question",
              placeholder: "Come as you are! We welcome everyone regardless of what you wear."
            },
          ],
          preview: {
            select: {
              title: 'q',
              subtitle: 'a'
            }
          }
        },
      ],
    },
    {
      name: "faqMoreTitle",
      title: "💡 FAQ footer card title",
      type: "string",
      description: "Title for the card at the bottom of FAQs",
      placeholder: "Got more questions?",
    },
    {
      name: "faqMoreText",
      title: "📝 FAQ footer card text",
      type: "string",
      description: "Text encouraging people to reach out",
      placeholder: "Reach out anytime — we'd love to hear from you.",
    },
    {
      name: "ctaBadge",
      title: "🏷️ Bottom call-to-action label",
      type: "string",
      description: "Small badge for the final CTA section",
      placeholder: "Get started",
    },
    {
      name: "ctaTitle",
      title: "📣 Bottom call-to-action heading",
      type: "string",
      description: "Final invitation headline",
      placeholder: "A seat is saved for you.",
    },
    {
      name: "ctaSubtitle",
      title: "✍️ Bottom call-to-action text",
      type: "string",
      description: "Final invitation message",
      placeholder: "Join us this Sunday at 9:30 and 11 AM. All are welcome.",
    },
    {
      name: "ctaTrust",
      title: "📅 Bottom trust banner",
      type: "string",
      description: "Final service times reminder",
      placeholder: "Every Sunday · Malayalam & English · All are welcome",
    },
  ],
};
