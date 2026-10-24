export default {
  name: "sundaySchoolList",
  title: "Sunday School & Teachers",
  type: "document",
  fields: [
    {
      name: "headerEyebrow",
      title: "📌 Small label above heading",
      type: "string",
      description: "Short text above the main title",
      placeholder: "Sunday School"
    },
    {
      name: "headerTitle",
      title: "📝 Main page heading",
      type: "string",
      description: "The big title visitors see first",
      placeholder: "Raising the next generation."
    },
    {
      name: "headerLead",
      title: "✍️ Introduction paragraph",
      type: "text",
      rows: 3,
      description: "A short description of Sunday School"
    },
    {
      name: "bannerBadge",
      title: "🏷️ Schedule banner label",
      type: "string",
      description: "Label for the schedule banner",
      placeholder: "Sunday School"
    },
    {
      name: "bannerTime",
      title: "🕐 Schedule time",
      type: "string",
      description: "When Sunday School meets",
      placeholder: "10:00 – 10:55 AM"
    },
    {
      name: "bannerSub",
      title: "📅 Schedule subtitle",
      type: "string",
      description: "Additional schedule info",
      placeholder: "Every Sunday, all ages"
    },
    {
      name: "bannerTag",
      title: "🎯 Schedule tag",
      type: "string",
      description: "Quick info tag",
      placeholder: "Age-based classes"
    },
    {
      name: "teachersSectionEyebrow",
      title: "🏷️ Teachers section label",
      type: "string",
      description: "Small text above teachers section",
      placeholder: "Teaching Staff"
    },
    {
      name: "teachersSectionTitle",
      title: "👨‍🏫 Teachers section heading",
      type: "string",
      description: "Title for the teachers section",
      placeholder: "Meet the teachers"
    },
    {
      name: "items",
      title: "📚 Sunday School Teachers",
      type: "array",
      description: "Add or edit teachers here. Click 'Add item' to add a new teacher.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "👤 Teacher's Full Name",
              type: "string",
              description: "Teacher's full name",
              validation: Rule => Rule.required().error("Name is required")
            },
            {
              name: "role",
              title: "📖 Class or Position",
              type: "string",
              description: "Which class they teach (e.g., 'Kindergarten Teacher', 'Principal')",
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
