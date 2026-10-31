export default {
  name: "servicesList",
  title: "Weekly Services Schedule",
  type: "document",
  icon: () => "🗓️",
  fields: [
    {
      name: "items",
      title: "Weekly Services",
      type: "array",
      description: "➕ Click 'Add item' to add a new service. Drag items to reorder. Each service is displayed as a card on the website.",
      of: [
        {
          type: "object",
          title: "Service",
          fields: [
            {
              name: "name",
              title: "Service Name",
              type: "string",
              description: "e.g., 'Malayalam Service', 'English Service'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "day",
              title: "Day of Week",
              type: "string",
              description: "e.g., 'Sunday', 'Wednesday'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "time",
              title: "Service Time",
              type: "string",
              description: "e.g., '9:30 AM', '11:00 AM – 12:30 PM'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "note",
              title: "Additional Details",
              type: "text",
              rows: 2,
              description: "Extra information about this service (optional)",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "time",
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle || "No time set",
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Weekly Services Schedule",
      };
    },
  },
};
