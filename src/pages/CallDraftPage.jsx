import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CallScreen from "../components/CallScreen";
import { getDraftById, updateDraft } from "../services/storage";
import { ITEM_STATUS } from "../constants/itemStatus";

function CallDraftPage() {
  const { draftId } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const foundDraft = getDraftById(draftId);
    setDraft(foundDraft || null);
  }, [draftId]);

  if (!draft) {
    return <p className="subtitle">Draft not found.</p>;
  }

  const todoItems = draft.items.filter((item) => item.status === ITEM_STATUS.TODO);
  const completeItems = draft.items.filter((item) => item.status === ITEM_STATUS.COMPLETE);

  function saveUpdatedItems(nextItems) {
    const updatedDraft = { ...draft, items: nextItems };
    setDraft(updatedDraft);
    updateDraft(updatedDraft);
  }

  function handleToggleItemStatus(id) {
    const nextItems = draft.items.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === ITEM_STATUS.COMPLETE ? ITEM_STATUS.TODO : ITEM_STATUS.COMPLETE,
          }
        : item
    );

    saveUpdatedItems(nextItems);
  }

  function handleEndCall() {
    const nextItems = draft.items.map((item) =>
      item.status === ITEM_STATUS.TODO ? { ...item, status: ITEM_STATUS.PENDING } : item
    );

    saveUpdatedItems(nextItems);
    navigate(`/drafts/${draft.id}/result`);
  }

  return (
    <CallScreen
      selectedTopic={draft.topic}
      todoItems={todoItems}
      completeItems={completeItems}
      onToggleItemStatus={handleToggleItemStatus}
      onBackToEdit={() => navigate(`/drafts/${draft.id}/edit`)}
      onEndCall={handleEndCall}
    />
  );
}

export default CallDraftPage;