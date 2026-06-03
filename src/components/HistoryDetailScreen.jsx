import { ITEM_STATUS } from "../constants/itemStatus";

function HistoryDetailScreen({
  selectedHistoryItem,
  onBackToHistory,
  onDeleteHistoryItem
}) {
  const pendingItems = selectedHistoryItem.items.filter(
    (item) => item.status === ITEM_STATUS.PENDING
  );
  const completeItems = selectedHistoryItem.items.filter(
    (item) => item.status === ITEM_STATUS.COMPLETE
  );

  return (
    <div className="history-detail-screen">
      <h2>{selectedHistoryItem.topic}</h2>
      <p className="subtitle">Saved call record</p>

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

      <div className="result-action-row">
        <button
          className="delete-history-button half-button"
          type="button"
          onClick={() => onDeleteHistoryItem(selectedHistoryItem.id)}
        >
          Delete
        </button>
        <button
          className="secondary-button half-button"
          type="button"
          onClick={onBackToHistory}>
          Back
        </button>
      </div>
    </div>
  );
}

export default HistoryDetailScreen;