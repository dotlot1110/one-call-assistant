function MyListScreen({ myLists, onOpenMyList, onDeleteMyList }) {
  return (
    <div className="history-screen">
      <h2>My Lists</h2>
      <p className="subtitle">Manage generated checklists before calls.</p>

      {myLists.length === 0 ? (
        <div className="empty-box">No saved checklists yet.</div>
      ) : (
        <div className="history-list">
          {myLists.map((record) => (
            <div key={record.id} className="history-card">
              <button
                className="history-card-main"
                type="button"
                onClick={() => onOpenMyList(record)}
              >
                <span className="history-topic">{record.topic}</span>
                <span className="history-date">{record.createdAt}</span>
              </button>

              <div className="status-actions">
                <span className="status-badge draft-badge">Draft</span>

                <button
                  type="button"
                  className="mini-delete-button"
                  aria-label="Delete draft"
                  onClick={() => onDeleteMyList(record.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListScreen;