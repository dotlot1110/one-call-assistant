function ResultScreen({
  completeItems,
  pendingItems,
  onBackToCall,
  onSaveToHistory,
  onStartOver
}) {
  return (
    <div className="result-screen">
      <h2>
        {pendingItems.length === 0
          ? "You've completed all the questions!"
          : "Review unresolved items"}
      </h2>

      <p className="subtitle">
        {pendingItems.length === 0
          ? "All checklist items were completed during the call."
          : "Some items were not resolved during the call."}
      </p>

      <div className="result-section">
        <h3>Complete</h3>
        {completeItems.length === 0 ? (
          <div className="empty-box">No completed items.</div>
        ) : (
          completeItems.map((item) => (
            <div key={item.id} className="complete-item static-item">
              {item.text}
            </div>
          ))
        )}
      </div>

      <div className="result-section">
        <h3>Pending</h3>
        {pendingItems.length === 0 ? (
          <div className="empty-box">No pending items.</div>
        ) : (
          pendingItems.map((item) => (
            <div key={item.id} className="pending-item">
              {item.text}
            </div>
          ))
        )}
      </div>

      <div className="result-actions">
        <button className="secondary-button" onClick={onBackToCall}>
          Back to Call
        </button>
        <button className="save-button" onClick={onSaveToHistory}>
          Save to History
        </button>
        <button className="restart-button" onClick={onStartOver}>
          Start Over
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;