export default {
  name: "pastorInfo",
  title: "Pastor & Pastoral History",
  type: "document",
  fields: [
    { name: "name", title: "Pastor Name", type: "string" },
    { name: "role", title: "Role / Title", type: "string" },
    { name: "since", title: "Serving Since Line", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "photo", title: "Pastor Photo Path or URL", type: "string" },
    {
      name: "bio",
      title: "Biography Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    },
    {
      name: "pastorsHistory",
      title: "Former Pastors History",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Pastor Name", type: "string" },
            { name: "years", title: "Years Served", type: "string" },
            { name: "photo", title: "Photo Path or URL", type: "string" },
          ],
        },
      ],
    },
  ],
};
