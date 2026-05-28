function CallScreen({
  selectedTopic,
  todoItems,
  completeItems,
  onToggleItemStatus,
  onBackToEdit,
  onEndCall
}) {
  return (
    <div className="call-screen">
      <h2>Call | {selectedTopic}</h2>
      <p className="subtitle">
        Tap items to move them between Todo and Complete.
      </p>

      <div className="call-columns">
        <div className="call-column">
          <h3>Todo</h3>
          {todoItems.length === 0 ? (
            <div className="empty-box">No remaining items.</div>
          ) : (
            todoItems.map((item) => (
              <button
                key={item.id}
                className="todo-item"
                onClick={() => onToggleItemStatus(item.id)}
              >
                {item.text}
              </button>
            ))
          )}
        </div>

        <div className="call-column">
          <h3>Complete</h3>
          {completeItems.length === 0 ? (
            <div className="empty-box">No completed items yet.</div>
          ) : (
            completeItems.map((item) => (
              <button
                key={item.id}
                className="complete-item"
                onClick={() => onToggleItemStatus(item.id)}
              >
                {item.text}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="call-actions">
        <button className="secondary-button" onClick={onBackToEdit}>
          Back to Edit
        </button>
        <button className="end-call-button" onClick={onEndCall}>
          End Call
        </button>
      </div>
    </div>
  );
}

export default CallScreen;