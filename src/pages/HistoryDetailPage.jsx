import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HistoryDetailScreen from "../components/HistoryDetailScreen";
import { getHistoryRecordById, deleteHistoryRecord } from "../services/storage";

function HistoryDetailPage() {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const foundRecord = getHistoryRecordById(recordId);
    setRecord(foundRecord || null);
  }, [recordId]);

  if (!record) {
    return <p className="subtitle">Record not found.</p>;
  }

  function handleDelete() {
    deleteHistoryRecord(record.id);
    navigate("/history");
  }

  return (
    <HistoryDetailScreen
      selectedHistoryItem={record}
      onBackToHistory={() => navigate("/history")}
      onDeleteHistoryItem={handleDelete}
    />
  );
}

export default HistoryDetailPage;