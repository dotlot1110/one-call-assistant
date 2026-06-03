function HistoryScreen({ history, onOpenDetail, onDeleteHistory }) {
  return (
    <div className="history-screen">
      <h2>Call History</h2>
      <p className="subtitle">Review saved records from previous calls.</p>

      {history.length === 0 ? (
        <div className="empty-box">No history yet.</div>
      ) : (
        <div className="history-list">
          {history.map((record) => {
            const isComplete = record.status === "complete";
            const statusLabel = isComplete ? "Completed" : "Unresolved";

            return (
              <div key={record.id} className="history-card">
                <button
                  className="history-card-main"
                  type="button"
                  onClick={() => onOpenDetail(record)}
                >
                  <span className="history-topic">{record.topic}</span>
                  <span className="history-date">{record.createdAt}</span>
                </button>

                <div className="status-actions">
                  <span
                    className={
                      isComplete
                        ? "status-badge complete-badge"
                        : "status-badge pending-badge"
                    }
                  >
                    {statusLabel}
                  </span>

                  <button
                    type="button"
                    className="mini-delete-button"
                    aria-label="Delete history record"
                    onClick={() => onDeleteHistory(record.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryScreen;