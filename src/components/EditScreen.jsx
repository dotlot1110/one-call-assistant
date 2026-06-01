import SortableChecklist from "./SortableChecklist";

function EditScreen({
  selectedTopic,
  checklist,
  newItem,
  setNewItem,
  onDeleteItem,
  onAddItem,
  onReorderByIndex,
  onCallNow,
  onSaveToMyList,
}) {
  return (
    <div className="checklist-section">
      <h2>{selectedTopic}</h2>
      <p className="subtitle">Customize the checklist before the call.</p>

      <SortableChecklist
        items={checklist}
        onDeleteItem={onDeleteItem}
        onReorderByIndex={onReorderByIndex}
      />

      <div className="add-item-row">
        <input
          type="text"
          placeholder="Add new checklist item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="new-item-input inline-input"
        />
        <button
          className="add-button inline-add-button"
          type="button"
          onClick={onAddItem}
        >
          Add
        </button>
      </div>

      <div className="edit-action-row">
        <button
          className="secondary-button half-button"
          type="button"
          onClick={onSaveToMyList}
        >
          Save
        </button>

        <button
          className="call-button half-button"
          type="button"
          onClick={onCallNow}
        >
          Call now
        </button>
      </div>
    </div>
  );
}

export default EditScreen;