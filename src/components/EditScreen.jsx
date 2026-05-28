function EditScreen({
  selectedTopic,
  checklist,
  newItem,
  setNewItem,
  onDeleteItem,
  onAddItem,
  onBackHome,
  onCallNow
}) {
  return (
    <div className="checklist-section">
      <h2>{selectedTopic}</h2>
      <p className="subtitle">Customize the checklist before the call.</p>

      <ul className="checklist-list">
        {checklist.map((item) => (
          <li key={item.id} className="checklist-item">
            <span>{item.text}</span>
            <button
              className="delete-button"
              onClick={() => onDeleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="add-item-section">
        <input
          type="text"
          placeholder="Add new checklist item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="new-item-input"
        />
        <button className="add-button" onClick={onAddItem}>
          Add
        </button>
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBackHome}>
          Back Home
        </button>
        <button className="call-button" onClick={onCallNow}>
          Call now
        </button>
      </div>
    </div>
  );
}

export default EditScreen;