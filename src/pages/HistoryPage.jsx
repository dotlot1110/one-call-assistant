import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryScreen from "../components/HistoryScreen";
import { loadHistory, deleteHistoryRecord } from "../services/storage";
import ConfirmDialog from "../components/ConfirmDialog";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function handleOpenDetail(record) {
    navigate(`/history/${record.id}`);
  }

  function handleRequestDeleteHistory(recordId) {
    setDeleteTargetId(recordId);
  }

  function handleCancelDeleteHistory() {
    setDeleteTargetId(null);
  }

  function handleConfirmDeleteHistory() {
    if (!deleteTargetId) return;

    deleteHistoryRecord(deleteTargetId);
    setHistory(loadHistory());
    setDeleteTargetId(null);
  }

  return (
    <>
      <HistoryScreen
        history={history}
        onOpenDetail={handleOpenDetail}
        onDeleteHistory={handleRequestDeleteHistory}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete this call record?"
        message="This saved call record will be removed from history. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDeleteHistory}
        onCancel={handleCancelDeleteHistory}
      />      
    </>
  );
}

export default HistoryPage;