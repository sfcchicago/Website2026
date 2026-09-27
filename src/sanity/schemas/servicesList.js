export default {
  name: "servicesList",
  title: "Weekly Services Schedule",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Services List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Service Name", type: "string" },
            { name: "day", title: "Day of Week", type: "string" },
            { name: "time", title: "Service Time", type: "string" },
            { name: "note", title: "Description / Details", type: "text", rows: 2 },
          ],
        },
      ],
    },
  ],
};
