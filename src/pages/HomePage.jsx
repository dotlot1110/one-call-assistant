import { useNavigate } from "react-router-dom";

function HomePage({
  input,
  setInput,
  onGenerate,
  onSelectTopic
}) {
  const navigate = useNavigate();

  function handleGenerateClick() {
    onGenerate();
    navigate("/drafts");
  }

  function handleTopicClick(topicName, templateKey) {
    onSelectTopic(topicName, templateKey);
    navigate("/drafts");
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

      <button className="generate-button" onClick={handleGenerateClick}>
        Generate Checklist
      </button>

      <h2>Popular Topics</h2>
      <div className="topic-grid">
        <button onClick={() => handleTopicClick("Hospital Reservation", "hospital")}>
          Hospital Reservation
        </button>
        <button onClick={() => handleTopicClick("Job Application", "job")}>
          Job Application
        </button>
        <button onClick={() => handleTopicClick("Event Inquiry", "event")}>
          Event Inquiry
        </button>
      </div>
    </>
  );
}

export default HomePage;