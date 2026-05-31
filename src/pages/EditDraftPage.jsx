import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditScreen from "../components/EditScreen";
import { getDraftById, updateDraft } from "../services/storage";

function EditDraftPage() {
  const { draftId } = useParams();
  const navigate = useNavigate();

  const [draft, setDraft] = useState(null);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const foundDraft = getDraftById(draftId);
    setDraft(foundDraft || null);
  }, [draftId]);

  if (!draft) {
    return <p className="subtitle">Draft not found.</p>;
  }

  function saveUpdatedItems(nextItems) {
    const updatedDraft = { ...draft, items: nextItems };
    setDraft(updatedDraft);
    updateDraft(updatedDraft);
  }

  function handleDeleteItem(idToDelete) {
    const nextItems = draft.items.filter((item) => item.id !== idToDelete);
    saveUpdatedItems(nextItems);
  }

  function handleAddItem() {
    if (newItem.trim() === "") return;

    const nextItems = [
      ...draft.items,
      {
        id: crypto.randomUUID(),
        text: newItem.trim(),
        status: "todo"
      }
    ];

    saveUpdatedItems(nextItems);
    setNewItem("");
  }

  function handleMoveItemUp(id) {
    const currentIndex = draft.items.findIndex((item) => item.id === id);
    if (currentIndex <= 0) return;

    const nextItems = [...draft.items];
    [nextItems[currentIndex - 1], nextItems[currentIndex]] = [
      nextItems[currentIndex],
      nextItems[currentIndex - 1]
    ];

    saveUpdatedItems(nextItems);
  }

  function handleMoveItemDown(id) {
    const currentIndex = draft.items.findIndex((item) => item.id === id);
    if (currentIndex === -1 || currentIndex >= draft.items.length - 1) return;

    const nextItems = [...draft.items];
    [nextItems[currentIndex], nextItems[currentIndex + 1]] = [
      nextItems[currentIndex + 1],
      nextItems[currentIndex]
    ];

    saveUpdatedItems(nextItems);
  }

  function handleSaveToMyList() {
    navigate("/drafts");
  }

  function handleCallNow() {
    navigate(`/drafts/${draft.id}/call`);
  }

  return (
    <EditScreen
      selectedTopic={draft.topic}
      checklist={draft.items}
      newItem={newItem}
      setNewItem={setNewItem}
      onDeleteItem={handleDeleteItem}
      onAddItem={handleAddItem}
      onMoveItemUp={handleMoveItemUp}
      onMoveItemDown={handleMoveItemDown}
      onCallNow={handleCallNow}
      onSaveToMyList={handleSaveToMyList}
    />
  );
}

export default EditDraftPage;