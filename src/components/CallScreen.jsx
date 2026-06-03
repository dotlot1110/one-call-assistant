function CallScreen({
  selectedTopic,
  todoItems,
  completeItems,
  onToggleItemStatus,
  onEndCall,
}) {
  const totalItems = todoItems.length + completeItems.length;
  const completedCount = completeItems.length;
  const completionPercent = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);
  return (
    <div className="call-screen call-mode-screen">
      <div className="call-mode-header">
        <div className="call-mode-top">
          <div className="call-mode-title-block">
            <span className="call-mode-badge">Live call mode</span>
            <h2 className="call-mode-title">Call checklist</h2>
          </div>

          <div className="call-progress-number" aria-label="Completion progress">
            <strong>{completedCount}</strong>
            <span>/{totalItems}</span>
          </div>
        </div>

        <p className="subtitle call-mode-subtitle">
          Tap the completed items during the call.
        </p>

        <div className="call-topic-chip">{selectedTopic}</div>

        <div className="call-progress-card">
          <div className="call-progress-meta">
            <span>Completion</span>
            <span>{completionPercent}%</span>
          </div>

          <div
            className="call-progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={completionPercent}
          >
            <div
              className="call-progress-fill"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="call-columns">
        <div className="call-column call-column-primary">
          <h3>To do</h3>

          {todoItems.length === 0 ? (
            <div className="empty-box">No remaining items.</div>
          ) : (
            todoItems.map((item) => (
              <button
                key={item.id}
                className="todo-item"
                type="button"
                onClick={() => onToggleItemStatus(item.id)}
              >
                {item.text}
              </button>
            ))
          )}
        </div>

        <div className="call-column call-column-secondary">
          <h3>Completed</h3>

          {completeItems.length === 0 ? (
            <div className="empty-box">No completed items yet.</div>
          ) : (
            completeItems.map((item) => (
              <button
                key={item.id}
                className="complete-item"
                type="button"
                onClick={() => onToggleItemStatus(item.id)}
              >
                {item.text}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="call-actions">
        <button className="end-call-button" type="button" onClick={onEndCall}>
          End call
        </button>
      </div>
    </div>
  );
}

export default CallScreen;