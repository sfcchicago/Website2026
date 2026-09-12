import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",
  clientId:
    process.env.VITE_TINA_CLIENT_ID ||
    process.env.TINA_CLIENT_ID ||
    "cf73a0d3-5dab-4fc0-ad20-5e117742ba64",
  token:
    process.env.TINA_TOKEN ||
    "460173cd3d49c3d630172df3de42a8a368cf067b",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "people",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Site Settings & Links",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        match: {
          include: "settings",
        },
        fields: [
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "string", name: "address", label: "Address" },
          { type: "string", name: "phone", label: "Phone" },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "liveUrl", label: "Watch Live URL" },
          { type: "string", name: "giveUrl", label: "Online Giving URL (Venmo)" },
          { type: "string", name: "eventsUrl", label: "Events URL" },
          { type: "string", name: "verseText", label: "Bible Verse", ui: { component: "textarea" } },
          { type: "string", name: "verseRef", label: "Bible Reference" },
          { type: "string", name: "facebookUrl", label: "Facebook Link" },
          { type: "string", name: "youtubeUrl", label: "YouTube Link" },
          { type: "string", name: "instagramUrl", label: "Instagram Link" },
        ],
      },
      {
        name: "services",
        label: "Weekly Services",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "services",
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Services List",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Service" }),
            },
            fields: [
              { type: "string", name: "name", label: "Service Name", required: true },
              { type: "string", name: "day", label: "Day of Week" },
              { type: "string", name: "time", label: "Service Time" },
              { type: "string", name: "note", label: "Description", ui: { component: "textarea" } },
            ],
          },
        ],
      },
      {
        name: "pastor",
        label: "Pastor Info",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "pastor",
        },
        fields: [
          { type: "string", name: "name", label: "Pastor Name", required: true },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "since", label: "Tenure / Years" },
          { type: "string", name: "location", label: "Location" },
          { type: "string", name: "bio", label: "Biography Paragraphs", list: true, ui: { component: "textarea" } },
          { type: "image", name: "photo", label: "Photo" },
          {
            type: "string",
            name: "photoPosition",
            label: "Photo Framing / Focus",
            options: [
              { label: "Face / Upper Center (Default)", value: "center 20%" },
              { label: "Top (Head / Hair)", value: "center top" },
              { label: "Dead Center", value: "center center" },
              { label: "Lower / Body", value: "center bottom" },
            ],
          },
          {
            type: "string",
            name: "photoScale",
            label: "Photo Zoom / Scale",
            options: [
              { label: "100% (Normal)", value: "1.0" },
              { label: "110% (Slight Zoom)", value: "1.1" },
              { label: "120% (Medium Zoom)", value: "1.2" },
              { label: "135% (Close Up)", value: "1.35" },
              { label: "90% (Fit Wider)", value: "0.9" },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About & History",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "mission",
        },
        fields: [
          { type: "string", name: "mission", label: "Mission Statement", ui: { component: "textarea" } },
          { type: "string", name: "vision", label: "Vision Points", list: true },
          { type: "string", name: "history", label: "Church History", ui: { component: "textarea" } },
        ],
      },
      {
        name: "beliefs",
        label: "Core Beliefs",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "beliefs",
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Beliefs List",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Belief" }),
            },
            fields: [
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "body", label: "Description", ui: { component: "textarea" } },
            ],
          },
        ],
      },
      {
        name: "leadership",
        label: "Leadership & Teams",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "leadership",
        },
        fields: [
          {
            type: "object",
            name: "board",
            label: "Board Members",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ? `${item.name} (${item.role || "Board"})` : "Board Member" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "role", label: "Role" },
              { type: "image", name: "photo", label: "Photo" },
              {
                type: "string",
                name: "photoPosition",
                label: "Photo Framing / Focus",
                options: [
                  { label: "Face / Upper Center (Default)", value: "center 20%" },
                  { label: "Top (Head / Hair)", value: "center top" },
                  { label: "Dead Center", value: "center center" },
                  { label: "Lower / Body", value: "center bottom" },
                ],
              },
              {
                type: "string",
                name: "photoScale",
                label: "Photo Zoom / Scale",
                options: [
                  { label: "100% (Normal)", value: "1.0" },
                  { label: "110% (Slight Zoom)", value: "1.1" },
                  { label: "120% (Medium Zoom)", value: "1.2" },
                  { label: "135% (Close Up)", value: "1.35" },
                  { label: "90% (Fit Wider)", value: "0.9" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ministerialSupport",
            label: "Ministerial Support Staff",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ? `${item.name} (${item.role || "Coordinator"})` : "Staff Member" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "role", label: "Role" },
              { type: "image", name: "photo", label: "Photo" },
              {
                type: "string",
                name: "photoPosition",
                label: "Photo Framing / Focus",
                options: [
                  { label: "Face / Upper Center (Default)", value: "center 20%" },
                  { label: "Top (Head / Hair)", value: "center top" },
                  { label: "Dead Center", value: "center center" },
                  { label: "Lower / Body", value: "center bottom" },
                ],
              },
              {
                type: "string",
                name: "photoScale",
                label: "Photo Zoom / Scale",
                options: [
                  { label: "100% (Normal)", value: "1.0" },
                  { label: "110% (Slight Zoom)", value: "1.1" },
                  { label: "120% (Medium Zoom)", value: "1.2" },
                  { label: "135% (Close Up)", value: "1.35" },
                  { label: "90% (Fit Wider)", value: "0.9" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "sundaySchool",
            label: "Sunday School Staff",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ? `${item.name} (${item.role || "Teacher"})` : "Staff Member" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "role", label: "Role" },
              { type: "image", name: "photo", label: "Photo" },
              {
                type: "string",
                name: "photoPosition",
                label: "Photo Framing / Focus",
                options: [
                  { label: "Face / Upper Center (Default)", value: "center 20%" },
                  { label: "Top (Head / Hair)", value: "center top" },
                  { label: "Dead Center", value: "center center" },
                  { label: "Lower / Body", value: "center bottom" },
                ],
              },
              {
                type: "string",
                name: "photoScale",
                label: "Photo Zoom / Scale",
                options: [
                  { label: "100% (Normal)", value: "1.0" },
                  { label: "110% (Slight Zoom)", value: "1.1" },
                  { label: "120% (Medium Zoom)", value: "1.2" },
                  { label: "135% (Close Up)", value: "1.35" },
                  { label: "90% (Fit Wider)", value: "0.9" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "pastorHistory",
        label: "Former Pastors",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "pastorHistory",
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Pastors List",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ? `${item.name} (${item.years || ""})` : "Pastor" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "years", label: "Years Served" },
              { type: "image", name: "photo", label: "Photo" },
              {
                type: "string",
                name: "photoPosition",
                label: "Photo Framing / Focus",
                options: [
                  { label: "Face / Upper Center (Default)", value: "center 20%" },
                  { label: "Top (Head / Hair)", value: "center top" },
                  { label: "Dead Center", value: "center center" },
                  { label: "Lower / Body", value: "center bottom" },
                ],
              },
              {
                type: "string",
                name: "photoScale",
                label: "Photo Zoom / Scale",
                options: [
                  { label: "100% (Normal)", value: "1.0" },
                  { label: "110% (Slight Zoom)", value: "1.1" },
                  { label: "120% (Medium Zoom)", value: "1.2" },
                  { label: "135% (Close Up)", value: "1.35" },
                  { label: "90% (Fit Wider)", value: "0.9" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
