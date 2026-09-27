export default {
  name: "leadership",
  title: "Church Leadership & Coordinators",
  type: "document",
  fields: [
    {
      name: "board",
      title: "Board of Trustees / Governing Board",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "photo", title: "Photo Path or URL", type: "string" },
            { name: "photoPosition", title: "Photo Position (optional)", type: "string" },
          ],
        },
      ],
    },
    {
      name: "ministerialSupport",
      title: "Ministerial Support & Ministry Coordinators",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "photo", title: "Photo Path or URL", type: "string" },
          ],
        },
      ],
    },
  ],
};
