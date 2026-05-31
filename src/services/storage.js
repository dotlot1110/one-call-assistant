const DRAFTS_KEY = "one-call-drafts";
const HISTORY_KEY = "one-call-history";

export function loadDrafts() {
  const raw = localStorage.getItem(DRAFTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveDrafts(drafts) {
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveHistory(records) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
}

export function getDraftById(draftId) {
  return loadDrafts().find((draft) => draft.id === draftId);
}

export function updateDraft(updatedDraft) {
  const drafts = loadDrafts();
  const nextDrafts = drafts.map((draft) =>
    draft.id === updatedDraft.id ? updatedDraft : draft
  );
  saveDrafts(nextDrafts);
}

export function addDraft(newDraft) {
  const drafts = loadDrafts();
  saveDrafts([newDraft, ...drafts]);
}

export function deleteDraft(draftId) {
  const drafts = loadDrafts().filter((draft) => draft.id !== draftId);
  saveDrafts(drafts);
}

export function getHistoryRecordById(recordId) {
  return loadHistory().find((record) => record.id === recordId);
}

export function addHistoryRecord(newRecord) {
  const records = loadHistory();
  saveHistory([newRecord, ...records]);
}

export function deleteHistoryRecord(recordId) {
  const records = loadHistory().filter((record) => record.id !== recordId);
  saveHistory(records);
}