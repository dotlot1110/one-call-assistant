import { useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import SortableChecklistItem from "./SortableChecklistItem";

function SortableChecklist({ items, onDeleteItem, onReorderByIndex }) {
  const [activeItemId, setActiveItemId] = useState(null);

  const activeItem = items.find((item) => item.id === activeItemId);

  return (
    <DragDropProvider
      onDragStart={({ operation }) => {
        setActiveItemId(operation.source?.id ?? null);
      }}
      onDragEnd={(event) => {
        setActiveItemId(null);

        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index } = source;

          if (initialIndex !== index) {
            onReorderByIndex(initialIndex, index);
          }
        }
      }}
      onDragCancel={() => {
        setActiveItemId(null);
      }}
    >
      <ul className="checklist-list sortable-list">
        {items.map((item, index) => (
          <SortableChecklistItem
            key={item.id}
            item={item}
            index={index}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>

      <DragOverlay>
        {activeItem ? (
          <div className="drag-overlay-card">{activeItem.text}</div>
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}

export default SortableChecklist;