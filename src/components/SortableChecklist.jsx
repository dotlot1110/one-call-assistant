import { useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import SortableChecklistItem from "./SortableChecklistItem";

function SortableChecklist({ items, onDeleteItem, onReorder }) {
  const [activeItemId, setActiveItemId] = useState(null);

  const activeItem = items.find((item) => item.id === activeItemId);

  return (
    <DragDropProvider
      onDragStart={({ source }) => {
        setActiveItemId(source?.id ?? null);
      }}
      onDragEnd={({ source, target, canceled }) => {
        setActiveItemId(null);

        if (canceled) return;
        if (!target) return;
        if (source.id === target.id) return;

        onReorder(source.id, target.id);
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
          <div className="drag-overlay-card">
            {activeItem.text}
          </div>
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}

export default SortableChecklist;