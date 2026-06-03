import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { classifyInput } from "../services/templateService";
import { generateChecklistWithAI } from "../services/aiChecklistService";
import { createDraftFromChecklist, createDraftFromTemplate } from "../services/draftService";

function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  function handleTopicSelect(topic, templateKey) {
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
      <section className="home-hero">
        <h2 className="home-title">Make difficult calls easier.</h2>

        <p className="home-description">
          Describe your call situation and CallPilot will build a checklist
          before you call.
        </p>
      </section>

      <section className="home-form">
        <label className="input-label" htmlFor="call-situation">
          What do you need to call about?
        </label>

        <input
          id="call-situation"
          type="text"
          placeholder="e.g. I want to schedule a dental appointment."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="situation-input"
        />

        <button
          className="generate-button"
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Building checklist..." : "Generate checklist"}
        </button>
      </section>

      {isGenerating && (
        <div className="ai-loading-overlay" role="dialog" aria-modal="true">
          <div className="ai-loading-modal" aria-live="polite">
            <div className="ai-loading-icon">
              <Sparkles size={22} />
            </div>

            <h2 className="ai-loading-title">
              Building your one-call checklist...
            </h2>

            <p className="ai-loading-subtitle">
              CallPilot is finding what to ask, confirm, and prepare.
            </p>

            <ul className="ai-loading-steps">
              <li>Understanding your situation</li>
              <li>Finding key questions</li>
              <li>Creating your checklist</li>
            </ul>
          </div>
        </div>
      )}

      <h2 className="home-section-title">Common topics</h2>

      <div className="topic-grid">
        <button
          className="topic-button"
          type="button"
          onClick={() =>
            handleTopicSelect("Hospital Reservation", "hospital")
          }
        >
          <span className="topic-icon">🏥</span>
          <span>
            <span className="topic-title">Hospital reservation</span>
            <span className="topic-description">
              Appointments, preparation, documents
            </span>
          </span>
        </button>

        <button
          className="topic-button"
          type="button"
          onClick={() => handleTopicSelect("Job Application", "job")}
        >
          <span className="topic-icon">💼</span>
          <span>
            <span className="topic-title">Job application</span>
            <span className="topic-description">
              Interviews, locations, required materials
            </span>
          </span>
        </button>

        <button
          className="topic-button"
          type="button"
          onClick={() => handleTopicSelect("Event Inquiry", "event")}
        >
          <span className="topic-icon">📅</span>
          <span>
            <span className="topic-title">Event inquiry</span>
            <span className="topic-description">
              Time, location, what to bring
            </span>
          </span>
        </button>
      </div>
    </>
  );
}

export default HomePage;