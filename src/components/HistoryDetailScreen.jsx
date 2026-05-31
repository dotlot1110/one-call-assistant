function HistoryDetailScreen({
  selectedHistoryItem,
  onBackToHistory,
  onDeleteHistoryItem
}) {
  const pendingItems = selectedHistoryItem.items.filter(
    (item) => item.status === "pending"
  );
  const completeItems = selectedHistoryItem.items.filter(
    (item) => item.status === "complete"
  );

  return (
    <div className="history-detail-screen">
      <h2>{selectedHistoryItem.topic}</h2>
      <p className="subtitle">Saved call result</p>

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

      <div className="result-actions">
        <button className="secondary-button" onClick={onBackToHistory}>
          Back
        </button>
        <button
          className="delete-history-button"
          onClick={() => onDeleteHistoryItem(selectedHistoryItem.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default HistoryDetailScreen;