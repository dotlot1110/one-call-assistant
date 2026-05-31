function EditScreen({
  selectedTopic,
  checklist,
  newItem,
  setNewItem,
  onDeleteItem,
  onAddItem,
  onMoveItemUp,
  onMoveItemDown,
  onBackHome,
  onCallNow,
  onSaveToMyList
}) {
  return (
    <div className="checklist-section">
      <h2>{selectedTopic}</h2>
      <p className="subtitle">Customize the checklist before the call.</p>

      <ul className="checklist-list">
        {checklist.map((item, index) => (
          <li key={item.id} className="checklist-item">
            <span className="checklist-text">{item.text}</span>

            <div className="checklist-actions-inline">
              <button
                className="small-button"
                onClick={() => onMoveItemUp(item.id)}
                disabled={index === 0}
              >
                ↑
              </button>
              <button
                className="small-button"
                onClick={() => onMoveItemDown(item.id)}
                disabled={index === checklist.length - 1}
              >
                ↓
              </button>
              <button
                className="delete-button"
                onClick={() => onDeleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-item-row">
        <input
          type="text"
          placeholder="Add new checklist item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="new-item-input inline-input"
        />
        <button className="add-button inline-add-button" onClick={onAddItem}>
          Add
        </button>
      </div>

      <div className="edit-action-row">
        <button className="secondary-button half-button" onClick={onSaveToMyList}>
          Save
        </button>
        <button className="call-button half-button" onClick={onCallNow}>
          Call now
        </button>
      </div>
    </div>
  );
}

export default EditScreen;