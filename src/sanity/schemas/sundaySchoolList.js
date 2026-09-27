export default {
  name: "sundaySchoolList",
  title: "Sunday School & Teachers",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Teaching Staff",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Teacher Name", type: "string" },
            { name: "role", title: "Class / Role", type: "string" },
            { name: "photo", title: "Photo Path or URL", type: "string" },
          ],
        },
      ],
    },
  ],
};
