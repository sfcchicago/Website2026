export default {
  name: "leadership",
  title: "Church Leadership & Coordinators",
  type: "document",
  fields: [
    {
      name: "headerEyebrow",
      title: "📌 Small label above main heading",
      type: "string",
      description: "Short text that appears above the main title (e.g., 'Leadership')",
      placeholder: "Leadership"
    },
    {
      name: "headerTitle",
      title: "📝 Main page heading",
      type: "string",
      description: "The big title visitors see first (e.g., 'Servant leadership.')",
      placeholder: "Servant leadership."
    },
    {
      name: "headerLead",
      title: "✍️ Introduction paragraph",
      type: "text",
      rows: 3,
      description: "A short description explaining what this page is about",
      placeholder: "The people who steward the vision, worship, hospitality, and ministry of our church every week."
    },
    {
      name: "boardSectionEyebrow",
      title: "🏷️ Board section label",
      type: "string",
      description: "Small text above the Board section title",
      placeholder: "Board of Directors"
    },
    {
      name: "boardSectionTitle",
      title: "📋 Board section heading",
      type: "string",
      description: "Title for the Board members section",
      placeholder: "Guiding the vision"
    },
    {
      name: "boardSectionSubtitle",
      title: "📄 Board section description",
      type: "text",
      rows: 2,
      description: "Brief description of what the Board does",
      placeholder: "The Board stewards the vision, finances, and direction of the church."
    },
    {
      name: "board",
      title: "👔 Board Members (President, Secretary, Treasurer, etc.)",
      type: "array",
      description: "Add or edit board members here. Click 'Add item' to add a new person.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "👤 Full Name",
              type: "string",
              description: "Person's full name",
              validation: Rule => Rule.required().error("Name is required")
            },
            {
              name: "role",
              title: "💼 Position/Title",
              type: "string",
              description: "Their role (e.g., President, Secretary, Board Member)",
              validation: Rule => Rule.required().error("Role is required")
            },
            {
              name: "photo",
              title: "📷 Profile Photo",
              type: "image",
              options: { hotspot: true },
              description: "Upload a headshot photo. Click to upload or drag and drop an image here.",
              validation: Rule => Rule.required().error("Photo is required")
            },
            {
              name: "photoPosition",
              title: "🎯 Photo Position (Advanced - Optional)",
              type: "string",
              description: "Leave blank unless photo needs adjustment (e.g., 'center 20%' to shift focus)"
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo'
            }
          }
        },
      ],
    },
    {
      name: "ministerialSectionEyebrow",
      title: "🏷️ Ministry section label",
      type: "string",
      description: "Small text above the Ministry Coordinators section",
      placeholder: "Ministerial Support"
    },
    {
      name: "ministerialSectionTitle",
      title: "🎵 Ministry section heading",
      type: "string",
      description: "Title for the Ministry Coordinators section",
      placeholder: "The hands and feet"
    },
    {
      name: "ministerialSectionSubtitle",
      title: "📄 Ministry section description",
      type: "text",
      rows: 2,
      description: "Brief description of what the coordinators do",
      placeholder: "Coordinators who keep worship, hospitality, media, and ministry moving every week."
    },
    {
      name: "ministerialSupport",
      title: "🙏 Ministry Coordinators (Worship, Youth, Hospitality, etc.)",
      type: "array",
      description: "Add or edit ministry coordinators here. Click 'Add item' to add a new person.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "👤 Full Name",
              type: "string",
              description: "Person's full name",
              validation: Rule => Rule.required().error("Name is required")
            },
            {
              name: "role",
              title: "💼 Ministry Role",
              type: "string",
              description: "Their ministry position (e.g., Worship Coordinator, Youth Coordinator)",
              validation: Rule => Rule.required().error("Role is required")
            },
            {
              name: "photo",
              title: "📷 Profile Photo",
              type: "image",
              options: { hotspot: true },
              description: "Upload a headshot photo. Click to upload or drag and drop an image here.",
              validation: Rule => Rule.required().error("Photo is required")
            },
            {
              name: "photoPosition",
              title: "🎯 Photo Position (Advanced - Optional)",
              type: "string",
              description: "Leave blank unless photo needs adjustment (e.g., 'center 20%' to shift focus)"
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo'
            }
          }
        },
      ],
    },
  ],
};
