import SortableChecklist from "./SortableChecklist";
import { Plus } from "lucide-react";

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
      <p className="subtitle">Review and customize your checklist before the call.</p>

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
          className="add-button inline-add-button icon-button"
          type="button"
          onClick={onAddItem}
          aria-label="Add checklist item"
          title="Add item"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="edit-action-row">
        <button
          className="secondary-button half-button"
          type="button"
          onClick={onSaveToMyList}
        >
          Save draft
        </button>

        <button
          className="call-button half-button"
          type="button"
          onClick={onCallNow}
        >
          Ready to call
        </button>
      </div>
    </div>
  );
}

export default EditScreen;