function ReadyCallScreen({ selectedTopic, onBackToEdit, onStartCall }) {
  return (
    <div className="ready-call-screen">
      <h2>Ready to call</h2>

      <p className="subtitle">
        Call about: {selectedTopic}
      </p>

      <div className="ready-instructions">
        <p className="ready-message">
          Open your phone app and place the call. Keep this checklist open while
          talking.
        </p>

        <ol className="ready-step-list">
          <li>Open your phone app.</li>
          <li>Start the call.</li>
          <li>Return here and tap the button below.</li>
        </ol>
      </div>

      <div className="call-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={onBackToEdit}
        >
          Back to Edit
        </button>

        <button
          className="call-button"
          type="button"
          onClick={onStartCall}
        >
          Call started
        </button>
      </div>
    </div>
  );
}

export default ReadyCallScreen;