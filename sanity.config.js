import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/sanity/schemas";

// User-friendly custom studio structure with clear single-click sections
const customStructure = (S) =>
  S.list()
    .title("Website Content")
    .items([
      S.listItem()
        .title("🏠 Home & Hero Page")
        .child(S.document().schemaType("homeContent").documentId("homeContent")),

      S.listItem()
        .title("⛪ Church Info & Logo")
        .child(S.document().schemaType("churchInfo").documentId("churchInfo")),

      S.listItem()
        .title("🕊️ Pastor & History")
        .child(S.document().schemaType("pastorInfo").documentId("pastorInfo")),

      S.listItem()
        .title("👥 Leadership & Board")
        .child(S.document().schemaType("leadership").documentId("leadership")),

      S.listItem()
        .title("🏫 Sunday School & Teachers")
        .child(S.document().schemaType("sundaySchoolList").documentId("sundaySchoolList")),

      S.listItem()
        .title("📖 Statement of Faith & Beliefs")
        .child(S.document().schemaType("beliefsList").documentId("beliefsList")),

      S.listItem()
        .title("✨ Mission, Vision & Story")
        .child(S.document().schemaType("missionVision").documentId("missionVision")),

      S.listItem()
        .title("🗓️ Weekly Services Schedule")
        .child(S.document().schemaType("servicesList").documentId("servicesList")),

      S.listItem()
        .title("🔗 Quick Links & Live Streams")
        .child(S.document().schemaType("quickLinks").documentId("quickLinks")),

      S.divider(),

      S.listItem()
        .title("🔀 301 / 302 URL Redirects")
        .child(S.documentTypeList("redirectRule").title("Active URL Redirects")),
    ]);

export default defineConfig({
  name: "default",
  title: "Sharon Fellowship Church",
  projectId: "t0ywq15l",
  dataset: "production",
  basePath: "/admin",
  plugins: [
    // Visual Editing Preview: Side-by-side live interactive website preview
    presentationTool({
      title: "Visual Preview",
      previewUrl: {
        origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:5173",
        previewMode: {
          enable: "/admin",
        },
      },
    }),

    // Content Editor with organized friendly single-click sections
    structureTool({
      title: "Content Editor",
      structure: customStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
