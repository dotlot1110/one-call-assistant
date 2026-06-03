function CallScreen({
  selectedTopic,
  todoItems,
  completeItems,
  onToggleItemStatus,
  onEndCall,
}) {
  const totalItems = todoItems.length + completeItems.length;
  const completedCount = completeItems.length;

  return (
    <div className="call-screen call-mode-screen">
      <div className="call-mode-header">
        <span className="call-mode-badge">Live call mode</span>

        <h2>Call checklist</h2>

        <p className="subtitle">
          Use this checklist during your call. Tap an item when it is completed.
        </p>

        <div className="call-topic-chip">{selectedTopic}</div>

        <div className="call-progress-text">
          {completedCount} of {totalItems} items completed
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