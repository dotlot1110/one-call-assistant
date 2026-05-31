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
            <div key={record.id} className="history-card-wrapper">
              <button
                className="history-card"
                onClick={() => onOpenMyList(record)}
              >
                <div className="history-top">
                  <span className="history-topic">{record.topic}</span>
                  <span className="status-badge pending-badge">draft</span>
                </div>
                <div className="history-date">{record.createdAt}</div>
              </button>

              <button
                className="delete-history-button"
                onClick={() => onDeleteMyList(record.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListScreen;