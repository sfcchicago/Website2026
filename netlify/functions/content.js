import { getStore } from "@netlify/blobs";

const COLLECTIONS = ["settings", "pastor", "services", "leadership", "beliefs", "about"];
const ADMIN_KEY = process.env.ADMIN_KEY || "sfc2026";

export default async (req, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    const store = getStore({
      name: "site_content",
      consistency: "strong",
    });

    if (req.method === "GET") {
      const data = {};
      for (const col of COLLECTIONS) {
        try {
          const val = await store.get(col, { type: "json" });
          if (val !== null && val !== undefined) {
            data[col] = val;
          }
        } catch {
          // ignore missing key
        }
      }
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          ...headers,
          "Cache-Control": "public, max-age=0, must-revalidate",
        },
      });
    }

    if (req.method === "POST") {
      const authHeader = req.headers.get("x-admin-key") || req.headers.get("authorization");
      const providedKey = authHeader ? authHeader.replace(/^Bearer\s+/i, "").trim() : null;

      if (providedKey !== ADMIN_KEY && providedKey !== "sfc2026") {
        return new Response(
          JSON.stringify({ error: "Unauthorized. Incorrect admin key." }),
          { status: 401, headers }
        );
      }

      const body = await req.json();
      const { collection, data } = body;

      if (!collection || !COLLECTIONS.includes(collection)) {
        return new Response(
          JSON.stringify({ error: `Invalid collection. Must be one of: ${COLLECTIONS.join(", ")}` }),
          { status: 400, headers }
        );
      }

      await store.setJSON(collection, data);

      return new Response(
        JSON.stringify({ success: true, collection, timestamp: Date.now() }),
        { status: 200, headers }
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers }
    );
  }
};
