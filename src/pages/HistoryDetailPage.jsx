import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HistoryDetailScreen from "../components/HistoryDetailScreen";
import { getHistoryRecordById, deleteHistoryRecord } from "../services/storage";
import ConfirmDialog from "../components/ConfirmDialog";

function HistoryDetailPage() {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const foundRecord = getHistoryRecordById(recordId);
    setRecord(foundRecord || null);
  }, [recordId]);

  if (!record) {
    return <p className="subtitle">Record not found.</p>;
  }

  function handleRequestDelete() {
    setIsDeleteDialogOpen(true);
  }

  function handleCancelDelete() {
    setIsDeleteDialogOpen(false);
  }

  function handleConfirmDelete() {
    deleteHistoryRecord(record.id);
    setIsDeleteDialogOpen(false);
    navigate("/history");
  }

  return (
    <>
      <HistoryDetailScreen
        selectedHistoryItem={record}
        onBackToHistory={() => navigate("/history")}
        onDeleteHistoryItem={handleRequestDelete}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete this call record?"
        message="This saved call record will be removed from history. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default HistoryDetailPage;