function HistoryScreen({ history, onOpenDetail }) {
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
            >
              <div className="history-top">
                <span className="history-topic">{record.topic}</span>
                <span
                  className={
                    record.status === "complete"
                      ? "status-badge complete-badge"
                      : "status-badge pending-badge"
                  }
                >
                  {record.status}
                </span>
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