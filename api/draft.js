// Fonction serverless Vercel — génère un brouillon de réponse SAV OZO à partir du catalogue.
// La clé API est lue depuis les variables d'environnement Vercel (jamais dans le code/repo public).

const { CATALOG } = require("./catalog");

const SYSTEM_PROMPT = `Tu es l'assistant SAV technique d'OZO Electric, fabricant français de kits vélo électriques, batteries lithium, moteurs et solutions de motorisation.

Ton rôle : rédiger un BROUILLON de réponse à un email client, à partir UNIQUEMENT des informations du catalogue OZO fourni ci-dessous.

Règles strictes :
- Réponds en français, ton professionnel, chaleureux et précis. Pas de bla-bla commercial excessif.
- Recommande des produits concrets du catalogue (nom, puissance, couple, tension, prix) adaptés au besoin.
- Explique brièvement POURQUOI (couple pour la côte/charge, tension compatible, etc.).
- Si l'info n'est pas dans le catalogue, dis-le honnêtement et propose de faire suivre au bureau d'études (technique@ozo-electric.com) — n'invente jamais une référence ou un prix.
- Termine par une formule de politesse signée "L'équipe technique OZO Electric".
- À la toute fin, ajoute une ligne "SOURCES :" listant les lignes du catalogue que tu as réellement utilisées (produits/règles cités), séparées par " · ".

CATALOGUE OZO (référence) :
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

  try {
    const upstream = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
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
    res.end();
  } catch (e) {
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur serveur", detail: String(e).slice(0, 300) });
    } else {
      res.end();
    }
  }
};
