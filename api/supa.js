export default async function handler(req, res) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // service_role

    const path = req.query.path || "tickets"; // ex: tickets, messages, dm_messages
    const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);

    // repassa querystring inteira (?select=...&order=... etc)
    Object.entries(req.query).forEach(([k, v]) => {
      if (k !== "path") url.searchParams.set(k, v);
    });

    const r = await fetch(url.toString(), {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const body = await r.text();
    res.status(r.status).send(body);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
