function HistoryScreen({ history, onOpenDetail, onDeleteHistory }) {
  return (
    <div className="history-screen">
      <h2>Call History</h2>
      <p className="subtitle">Review saved records from previous calls.</p>

      {history.length === 0 ? (
        <div className="empty-box">No history yet.</div>
      ) : (
        <div className="history-list">
          {history.map((record) => (
            <button
              key={record.id}
              className="history-card"
              onClick={() => onOpenDetail(record)}
              type="button"
            >
              <div className="history-top">
                <span className="history-topic">{record.topic}</span>

                <div className="status-actions">
                  <span
                    className={
                      record.status === "complete"
                        ? "status-badge complete-badge"
                        : "status-badge pending-badge"
                    }
                  >
                    {record.status}
                  </span>

                  <button
                    type="button"
                    className="mini-delete-button"
                    aria-label="Delete history record"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistory(record.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="history-date">{record.createdAt}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryScreen;