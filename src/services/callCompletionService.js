import { ITEM_STATUS } from "../constants/itemStatus";
import { addHistoryRecord, deleteDraft } from "./storage";

export function completeDraftAsHistory(draft) {
  const pendingItems = draft.items.filter(
    (item) => item.status === ITEM_STATUS.PENDING
  );

  const newRecord = {
    id: crypto.randomUUID(),
    topic: draft.topic,
    createdAt: new Date().toLocaleString(),
    status: pendingItems.length > 0 ? "pending" : "complete",
    items: draft.items,
  };

  addHistoryRecord(newRecord);
  deleteDraft(draft.id);

  return newRecord;
}