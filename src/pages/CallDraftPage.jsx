import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CallScreen from "../components/CallScreen";
import ConfirmDialog from "../components/ConfirmDialog";
import { getDraftById, updateDraft } from "../services/storage";
import { ITEM_STATUS } from "../constants/itemStatus";

function CallDraftPage() {
  const { draftId } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [isEndCallDialogOpen, setIsEndCallDialogOpen] = useState(false);

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

  function finishCall() {
    const nextItems = draft.items.map((item) =>
      item.status === ITEM_STATUS.TODO
        ? { ...item, status: ITEM_STATUS.PENDING }
        : item
    );

    saveUpdatedItems(nextItems);
    navigate(`/drafts/${draft.id}/result`);
  }

  function handleEndCall() {
    const hasUnresolvedItems = draft.items.some(
      (item) => item.status === ITEM_STATUS.TODO
    );

    if (hasUnresolvedItems) {
      setIsEndCallDialogOpen(true);
      return;
    }

    finishCall();
  }

  function handleCancelEndCall() {
    setIsEndCallDialogOpen(false);
  }

  function handleConfirmEndCall() {
    setIsEndCallDialogOpen(false);
    finishCall();
  }

  return (
    <>
      <CallScreen
        selectedTopic={draft.topic}
        todoItems={todoItems}
        completeItems={completeItems}
        onToggleItemStatus={handleToggleItemStatus}
        onEndCall={handleEndCall}
      />

      <ConfirmDialog
        isOpen={isEndCallDialogOpen}
        title="End this call?"
        message="Uncompleted items will be marked as unresolved. You can review them after the call."
        confirmLabel="End call"
        cancelLabel="Keep checking"
        onConfirm={handleConfirmEndCall}
        onCancel={handleCancelEndCall}
      />
    </>
  );
}

export default CallDraftPage;