export default {
  name: "sundaySchoolList",
  title: "Sunday School & Teachers",
  type: "document",
  fields: [
    { name: "headerEyebrow", title: "Page Header Eyebrow", type: "string", description: "e.g. Sunday School" },
    { name: "headerTitle", title: "Page Header Title", type: "string", description: "e.g. Raising the next generation." },
    { name: "headerLead", title: "Page Header Lead Paragraph", type: "text", rows: 2 },
    { name: "bannerBadge", title: "Schedule Banner Badge", type: "string", description: "e.g. Sunday School" },
    { name: "bannerTime", title: "Schedule Banner Time", type: "string", description: "e.g. 10:00 – 10:55 AM" },
    { name: "bannerSub", title: "Schedule Banner Subtitle", type: "string", description: "e.g. Every Sunday, all ages" },
    { name: "bannerTag", title: "Schedule Banner Tag", type: "string", description: "e.g. Age-based classes" },
    { name: "teachersSectionEyebrow", title: "Teachers Section Eyebrow", type: "string", description: "e.g. Teaching Staff" },
    { name: "teachersSectionTitle", title: "Teachers Section Title", type: "string", description: "e.g. Meet the teachers" },
    {
      name: "items",
      title: "Teaching Staff Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Teacher Name", type: "string" },
            { name: "role", title: "Class / Role", type: "string" },
            {
              name: "photo",
              title: "Teacher Portrait Photo",
              type: "image",
              options: { hotspot: true },
              description: "Upload portrait photograph.",
            },
            { name: "photoPosition", title: "Photo Position (optional)", type: "string", description: "e.g. center 20%" },
          ],
        },
      ],
    },
  ],
};
