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
            <button
              key={record.id}
              className="history-card"
              onClick={() => onOpenMyList(record)}
              type="button"
            >
              <div className="history-top">
                <span className="history-topic">{record.topic}</span>

                <div className="status-actions">
                  <span className="status-badge draft-badge">Draft</span>

                  <button
                    type="button"
                    className="mini-delete-button"
                    aria-label="Delete draft"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteMyList(record.id);
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

export default MyListScreen;