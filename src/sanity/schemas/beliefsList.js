export default {
  name: "beliefsList",
  title: "Beliefs & Core Doctrines",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Belief Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Belief Title", type: "string" },
            { name: "body", title: "Description / Scripture", type: "text", rows: 4 },
          ],
        },
      ],
    },
  ],
};
