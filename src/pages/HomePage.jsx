import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "../services/templates";
import { addDraft } from "../services/storage";

function createChecklistItems(items) {
  return items.map((item) => ({
    id: crypto.randomUUID(),
    text: item,
    status: "todo"
  }));
}

function classifyInput(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("hospital") ||
    lower.includes("clinic") ||
    lower.includes("appointment") ||
    lower.includes("reservation")
  ) {
    return { topic: "Hospital Reservation", templateKey: "hospital" };
  }

  if (
    lower.includes("job") ||
    lower.includes("interview") ||
    lower.includes("application") ||
    lower.includes("part-time")
  ) {
    return { topic: "Job Application", templateKey: "job" };
  }

  if (
    lower.includes("event") ||
    lower.includes("schedule") ||
    lower.includes("location")
  ) {
    return { topic: "Event Inquiry", templateKey: "event" };
  }

  return { topic: "Custom Inquiry", templateKey: "generic" };
}

function HomePage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function createDraft(topic, templateKey) {
    const newDraft = {
      id: crypto.randomUUID(),
      topic,
      createdAt: new Date().toLocaleString(),
      items: createChecklistItems(templates[templateKey])
    };

    addDraft(newDraft);
    navigate(`/drafts/${newDraft.id}/edit`);
  }

  function handleGenerate() {
    const { topic, templateKey } = classifyInput(input);
    createDraft(topic, templateKey);
  }

  return (
    <>
      <p className="subtitle">
        Enter a situation or choose a popular topic.
      </p>

      <input
        type="text"
        placeholder="Enter a call situation"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="situation-input"
      />

      <button className="generate-button" onClick={handleGenerate}>
        Generate Checklist
      </button>

      <h2>Popular Topics</h2>
      <div className="topic-grid">
        <button onClick={() => createDraft("Hospital Reservation", "hospital")}>
          Hospital Reservation
        </button>
        <button onClick={() => createDraft("Job Application", "job")}>
          Job Application
        </button>
        <button onClick={() => createDraft("Event Inquiry", "event")}>
          Event Inquiry
        </button>
      </div>
    </>
  );
}

export default HomePage;