export default {
  name: "redirectRule",
  title: "URL 301 / 302 Redirect",
  type: "document",
  fields: [
    {
      name: "source",
      title: "Incoming Path (Source)",
      type: "string",
      description: "Path to redirect from, e.g. /old-page, /events, /give, /live",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "destination",
      title: "Target URL / Path (Destination)",
      type: "string",
      description: "Where to send the user, e.g. /contact, /about, or an external URL like https://youtube.com/live/...",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "statusCode",
      title: "Redirect Type",
      type: "number",
      description: "301 for permanent redirect (recommended for SEO), 302 for temporary redirect",
      initialValue: 301,
      options: {
        list: [
          { title: "301 - Permanent Redirect (Recommended)", value: 301 },
          { title: "302 - Temporary Redirect", value: 302 },
        ],
        layout: "radio",
      },
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Toggle this redirect on or off",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      source: "source",
      destination: "destination",
      statusCode: "statusCode",
      active: "active",
    },
    prepare({ source, destination, statusCode = 301, active = true }) {
      return {
        title: `${source || "/"} → ${destination || "/"}`,
        subtitle: `${statusCode} ${active === false ? "(Inactive)" : "(Active)"}`,
      };
    },
  },
};
