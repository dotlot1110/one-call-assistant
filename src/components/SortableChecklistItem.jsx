import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";

function SortableChecklistItem({ item, index, onDeleteItem }) {
  const {
    ref,
    handleRef,
    isDragging,
    isDropTarget,
  } = useSortable({
    id: item.id,
    index,
    transition: {
      duration: 180,
      easing: "ease",
      idle: true,
    },
  });

  return (
    <li
      ref={ref}
      className={`sortable-item ${isDragging ? "dragging" : ""} ${
        isDropTarget ? "drop-target" : ""
      }`}
    >
      <button
        ref={handleRef}
        className="drag-handle"
        type="button"
        aria-label="Drag item"
      >
        <GripVertical size={18} />
      </button>

      <span className="checklist-text">{item.text}</span>

      <button
        className="mini-delete-button"
        type="button"
        aria-label="Delete item"
        onClick={() => onDeleteItem(item.id)}
      >
        ×
      </button>
    </li>
  );
}

export default SortableChecklistItem;