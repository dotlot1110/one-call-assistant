function ResultScreen({
  completeItems,
  pendingItems,
  onSaveToHistory,
}) {
  return (
    <div className="result-screen">
      <h2>
        {pendingItems.length === 0
          ? "You've completed all the questions!"
          : "Review items left unresolved"}
      </h2>

      <p className="subtitle">
        {pendingItems.length === 0
          ? "All checklist items were completed during the call."
          : "Some items were not resolved during the call."}
      </p>

      <div className="result-section">
        <h3>Completed</h3>
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
        <h3>Unresolved</h3>
        {pendingItems.length === 0 ? (
          <div className="empty-box">No unresolved items.</div>
        ) : (
          pendingItems.map((item) => (
            <div key={item.id} className="pending-item">
              {item.text}
            </div>
          ))
        )}
      </div>

      <div className="result-actions">
        <button
          className="save-button"
          onClick={onSaveToHistory}
          type="button"
        >
          Save to history
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;