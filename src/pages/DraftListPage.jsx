import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyListScreen from "../components/MyListScreen";
import { loadDrafts, deleteDraft } from "../services/storage";
import ConfirmDialog from "../components/ConfirmDialog";

function DraftListPage() {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  function handleOpenDraft(record) {
    navigate(`/drafts/${record.id}/edit`);
  }

  function handleRequestDeleteDraft(draftId) {
    setDeleteTargetId(draftId);
  }

  function handleCancelDeleteDraft() {
    setDeleteTargetId(null);
  }

  function handleConfirmDeleteDraft() {
    if (!deleteTargetId) return;

    deleteDraft(deleteTargetId);
    setDrafts(loadDrafts());
    setDeleteTargetId(null);
  }

  return (
    <>
      <MyListScreen
        myLists={drafts}
        onOpenMyList={handleOpenDraft}
        onDeleteMyList={handleRequestDeleteDraft}
      />
      
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete this draft?"
        message="This checklist will be removed from your lists. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDeleteDraft}
        onCancel={handleCancelDeleteDraft}
      />
    </>
  );
}

export default DraftListPage;