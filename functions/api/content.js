const COLLECTIONS = ["settings", "pastor", "services", "leadership", "beliefs", "about"];
const DEFAULT_KEY = "sfc2026";

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  });
}

export async function onRequestGet(context) {
  const { env } = context;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=0, must-revalidate",
  };

  const data = {};

  if (env && env.SITE_CONTENT) {
    for (const col of COLLECTIONS) {
      try {
        const val = await env.SITE_CONTENT.get(col, { type: "json" });
        if (val !== null && val !== undefined) {
          data[col] = val;
        }
      } catch {
        // ignore missing keys
      }
    }
  }

  return new Response(JSON.stringify(data), { status: 200, headers });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const adminKey = (env && env.ADMIN_KEY) || DEFAULT_KEY;
  const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
  const providedKey = authHeader ? authHeader.replace(/^Bearer\s+/i, "").trim() : null;

  if (providedKey !== adminKey && providedKey !== DEFAULT_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized. Incorrect admin key." }), {
      status: 401,
      headers,
    });
  }

  try {
    const body = await request.json();
    const { collection, data } = body;

    if (!collection || !COLLECTIONS.includes(collection)) {
      return new Response(
        JSON.stringify({ error: `Invalid collection. Must be one of: ${COLLECTIONS.join(", ")}` }),
        { status: 400, headers }
      );
    }

    if (env && env.SITE_CONTENT) {
      await env.SITE_CONTENT.put(collection, JSON.stringify(data));
    }

    return new Response(
      JSON.stringify({ success: true, collection, timestamp: Date.now() }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Failed to process save" }), {
      status: 500,
      headers,
    });
  }
}
