import { GoogleGenAI } from "@google/genai";

const CHECKLIST_SCHEMA = {
  type: "object",
  properties: {
    topic: {
      type: "string",
      description: "Short title for the call situation",
    },
    items: {
      type: "array",
      description: "Phone call checklist items",
      minItems: 4,
      maxItems: 7,
      items: {
        type: "string",
      },
    },
  },
  required: ["topic", "items"],
};

function buildPrompt(callSituation) {
  return `
You are generating a checklist for a phone-call support app.

The user feels anxious about unfamiliar phone calls.
The goal is to help the user complete as many necessary things as possible in one call.

Return ONLY a valid JSON object.
Do not use markdown.
Do not wrap the JSON in \`\`\`json.
Do not include explanations.

The JSON object must have exactly this shape:
{
  "topic": "Short call topic",
  "items": [
    "Short actionable checklist item",
    "Short actionable checklist item"
  ]
}

Rules for items:
- Generate 4 to 7 items.
- Use simple English.
- Each item must be short and actionable.
- Each item should be useful during the actual call.
- Do not write a full call script.
- Do not include greetings like "thank them" unless necessary.
- Focus on information the user should ask, confirm, or prepare.

Call situation:
${callSituation}
`;
}

function extractJsonText(rawText) {
  const trimmed = rawText.trim();

  if (trimmed.startsWith("```")) {
    return trimmed
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/i, "")
      .trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function normalizeChecklistResult(rawText, fallbackTopic = "Custom Inquiry") {
  const jsonText = extractJsonText(rawText);
  const parsed = JSON.parse(jsonText);

  const topic =
    typeof parsed.topic === "string" && parsed.topic.trim()
      ? parsed.topic.trim()
      : typeof parsed.title === "string" && parsed.title.trim()
      ? parsed.title.trim()
      : fallbackTopic;

  const rawItems = Array.isArray(parsed.items)
    ? parsed.items
    : Array.isArray(parsed.checklist)
    ? parsed.checklist
    : Array.isArray(parsed.checklistItems)
    ? parsed.checklistItems
    : [];

  const items = rawItems
    .map((item) => String(item).trim())
    .filter(Boolean)
    .slice(0, 7);

  if (items.length < 3) {
    throw new Error("Invalid AI response: not enough checklist items.");
  }

  return {
    topic,
    items,
  };
}

export async function generateChecklistWithAI(callSituation) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  console.log("[AI] API key exists:", Boolean(apiKey));

  if (!apiKey) {
    throw new Error("[AI_ENV] Missing VITE_GEMINI_API_KEY.");
  }

  const trimmedSituation = callSituation.trim();

  if (!trimmedSituation) {
    throw new Error("[AI_INPUT] Call situation is required.");
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log("[AI] Sending request to Gemini...");

  let response;

  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: buildPrompt(trimmedSituation),
      config: {
        responseFormat: {
          text: {
            mimeType: "application/json",
            schema: CHECKLIST_SCHEMA,
          },
        },
      },
    });
  } catch (error) {
    console.error("[AI_REQUEST] Gemini request failed:", error);
    throw error;
  }

  console.log("[AI] Raw response:", response.text);

  try {
    const normalized = normalizeChecklistResult(response.text, trimmedSituation);
    console.log("[AI] Normalized result:", normalized);
    return normalized;
  } catch (error) {
    console.error("[AI_PARSE] Failed to parse Gemini response:", error);
    throw error;
  }
}