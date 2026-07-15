import { Router } from "express";
import OpenAI from "openai";

const router: Router = Router();
const openai = new OpenAI();

router.post("/moderate", async (req, res) => {
  const { image } = req.body as { image?: string };

  if (!image || !image.startsWith("data:image/")) {
    res.status(400).json({ error: "Invalid or missing image data URL" });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'You are a content moderator for a student academic platform. Examine this image and reply with ONLY one of:\n"SAFE" — if the image is appropriate for a school/university environment.\n"UNSAFE: <reason>" — if it contains nudity, sexual content, graphic violence, hate symbols, drugs, alcohol, or other content inappropriate for students.\nKeep reasons brief (5 words max). Do not add any other text.',
            },
            {
              type: "image_url",
              image_url: { url: image, detail: "low" },
            },
          ],
        },
      ],
      max_tokens: 30,
    });

    const text = (completion.choices[0]?.message?.content ?? "SAFE").trim();
    const safe = text.toUpperCase().startsWith("SAFE");
    const reason = safe
      ? undefined
      : text.replace(/^UNSAFE:\s*/i, "").trim() || "Inappropriate content";

    res.json({ safe, reason });
  } catch (err) {
    // Network / quota issues → default to safe so users aren't blocked
    console.error("Moderation error:", err);
    res.json({ safe: true });
  }
});

export default router;
