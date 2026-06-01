import { ITEM_STATUS } from "../constants/itemStatus";
import { addDraft } from "./storage";
import { getTemplateItems } from "./templateService";

export function createChecklistItems(items) {
  return items.map((item) => ({
    id: crypto.randomUUID(),
    text: item,
    status: ITEM_STATUS.TODO,
  }));
}

export function createDraftFromTemplate(topic, templateKey) {
  const newDraft = {
    id: crypto.randomUUID(),
    topic,
    createdAt: new Date().toLocaleString(),
    items: createChecklistItems(getTemplateItems(templateKey)),
  };

  addDraft(newDraft);

  return newDraft;
}

export function createDraftFromChecklist(topic, checklistTexts) {
  const newDraft = {
    id: crypto.randomUUID(),
    topic,
    createdAt: new Date().toLocaleString(),
    items: createChecklistItems(checklistTexts),
  };

  addDraft(newDraft);

  return newDraft;
}