// Fonction serverless Vercel — génère un brouillon de réponse SAV OZO à partir du catalogue.
// La clé API est lue depuis les variables d'environnement Vercel (jamais dans le code/repo public).

const { CATALOG } = require("./catalog");

const SYSTEM_PROMPT = `Tu es l'assistant SAV technique d'OZO Electric. À partir du catalogue ci-dessous, rédige directement un brouillon de réponse au client, en français, ton professionnel et chaleureux.

Dans ta réponse : recommande 1 à 2 produits adaptés (nom, couple/tension, prix), explique en une phrase pourquoi, signe « L'équipe technique OZO Electric ». N'invente aucun produit absent du catalogue ; si l'info manque, propose de faire suivre à technique@ozo-electric.com. Termine par une ligne « SOURCES : » avec les lignes du catalogue utilisées.

CATALOGUE OZO :
${CATALOG}`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Clé API non configurée (LLM_API_KEY)." });
    return;
  }

  const baseUrl = process.env.LLM_BASE_URL || "https://api.deepseek.com";
  const model = process.env.LLM_MODEL || "deepseek-chat";

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const question = (body && body.question ? String(body.question) : "").trim();
  if (!question) {
    res.status(400).json({ error: "Question manquante." });
    return;
  }

  const controller = new AbortController();
  const killTimer = setTimeout(() => controller.abort(), 55000);

  try {
    const upstream = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 8000,
        reasoning_effort: "low",
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Email reçu d'un client :\n\n"${question}"\n\nRédige le brouillon de réponse.` },
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const txt = upstream.body ? await upstream.text() : "";
      res.status(502).json({ error: `Erreur du modèle (${upstream.status})`, detail: txt.slice(0, 500) });
      return;
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Accel-Buffering", "no");

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const payload = t.slice(5).trim();
        if (payload === "[DONE]") continue;
        try {
          const j = JSON.parse(payload);
          const token = j?.choices?.[0]?.delta?.content;
          if (token) res.write(token);
        } catch (_) { /* ligne SSE partielle, ignorée */ }
      }
    }
    clearTimeout(killTimer);
    res.end();
  } catch (e) {
    clearTimeout(killTimer);
    const aborted = e && e.name === "AbortError";
    if (!res.headersSent) {
      res.status(aborted ? 504 : 500).json({
        error: aborted ? "Le modèle a mis trop de temps à répondre. Réessayez." : "Erreur serveur",
        detail: String(e).slice(0, 300),
      });
    } else {
      res.end();
    }
  }
};
