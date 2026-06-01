import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITEM_STATUS } from "../constants/itemStatus";
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
    const updatedDraft = {
      ...draft,
      items: nextItems,
    };

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
        status: ITEM_STATUS.TODO,
      },
    ];

    saveUpdatedItems(nextItems);
    setNewItem("");
  }

  function handleReorderByIndex(oldIndex, newIndex) {
    if (!draft) return;
    if (oldIndex === newIndex) return;

    const nextItems = [...draft.items];
    const [movedItem] = nextItems.splice(oldIndex, 1);
    nextItems.splice(newIndex, 0, movedItem);

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
      onReorderByIndex={handleReorderByIndex}
      onCallNow={handleCallNow}
      onSaveToMyList={handleSaveToMyList}
    />
  );
}

export default EditDraftPage;