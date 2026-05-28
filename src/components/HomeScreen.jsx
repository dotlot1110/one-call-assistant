function HomeScreen({ input, setInput, onGenerate, onSelectTopic, onViewHistory }) {
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

      <button className="generate-button" onClick={onGenerate}>
        Generate Checklist
      </button>

      <h2>Popular Topics</h2>
      <div className="topic-grid">
        <button onClick={() => onSelectTopic("Hospital Reservation", "hospital")}>
          Hospital Reservation
        </button>
        <button onClick={() => onSelectTopic("Job Application", "job")}>
          Job Application
        </button>
        <button onClick={() => onSelectTopic("Event Inquiry", "event")}>
          Event Inquiry
        </button>
      </div>

      <button className="secondary-button" onClick={onViewHistory}>
        View History
      </button>
    </>
  );
}

export default HomeScreen;