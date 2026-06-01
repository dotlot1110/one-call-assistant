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

/*
High demand 발생 시 lite 모델 사용하도록 변경:
gemini-2.5-flash-lite 요청
→ 실패하면 1회 재시도
→ 또 실패하면 gemini-2.5-flash 시도
→ 또 또 실패하면 fallback template
*/
const MODEL_CANDIDATES = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableGeminiError(error) {
  const message = JSON.stringify(error);

  return (
    message.includes('"code":503') ||
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand") ||
    message.includes("overloaded")
  );
}

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

async function requestChecklistFromGemini(ai, model, prompt) {
  return ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseFormat: {
        text: {
          mimeType: "application/json",
          schema: CHECKLIST_SCHEMA,
        },
      },
    },
  });
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
  let lastError;
  const prompt = buildPrompt(trimmedSituation);

  for (const model of MODEL_CANDIDATES) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        console.log(`[AI] Sending request to Gemini: ${model}, attempt ${attempt}`);
        response = await requestChecklistFromGemini(ai, model, prompt);
        console.log(`[AI] Success with model: ${model}`);
        break;
      } catch (error) {
        lastError = error;
        console.error(`[AI_REQUEST] Failed with ${model}, attempt ${attempt}:`, error);

        if (!isRetryableGeminiError(error)) {
          throw error;
        }

        await wait(800 * attempt);
      }
    }

    if (response) break;
  }

  if (!response) {
    throw lastError || new Error("[AI_REQUEST] Gemini request failed.");
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