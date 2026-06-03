import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classifyInput } from "../services/templateService";
import { generateChecklistWithAI } from "../services/aiChecklistService";
import { createDraftFromChecklist, createDraftFromTemplate } from "../services/draftService";

function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  // template 기반
  function createDraft(topic, templateKey) {
    const newDraft = createDraftFromTemplate(topic, templateKey);
    navigate(`/drafts/${newDraft.id}/edit`);
  }

  async function handleGenerate() {
    if (isGenerating) return;

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setIsGenerating(true);

    try {
      const aiResult = await generateChecklistWithAI(trimmedInput);
      const newDraft = createDraftFromChecklist(aiResult.topic, aiResult.items);
      navigate(`/drafts/${newDraft.id}/edit`);
    } catch (error) {
      console.warn("AI generation failed. Using fallback template.", error);

      const { topic, templateKey } = classifyInput(trimmedInput);
      const newDraft = createDraftFromTemplate(topic, templateKey);
      navigate(`/drafts/${newDraft.id}/edit`);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <p className="subtitle">
        Describe your situation or choose a common topic.
      </p>

      <input
        type="text"
        placeholder="e.g. Schedule a dental appointment"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="situation-input"
      />

      <button
        className="generate-button"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate checklist"}
      </button>

      <h2>Common Topics</h2>
      <div className="topic-grid">
        <button onClick={() => createDraft("Hospital Reservation", "hospital")}>
          🏥 Hospital Reservation
        </button>
        <button onClick={() => createDraft("Job Application", "job")}>
          💼 Job Application
        </button>
        <button onClick={() => createDraft("Event Inquiry", "event")}>
          📅 Event Inquiry
        </button>
      </div>
    </>
  );
}

export default HomePage;