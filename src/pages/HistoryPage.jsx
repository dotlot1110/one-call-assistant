import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryScreen from "../components/HistoryScreen";
import { loadHistory, deleteHistoryRecord } from "../services/storage";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function handleOpenDetail(record) {
    navigate(`/history/${record.id}`);
  }

  function handleDeleteHistory(recordId) {
    deleteHistoryRecord(recordId);
    setHistory(loadHistory());
  }

  return (
    <HistoryScreen
      history={history}
      onOpenDetail={handleOpenDetail}
      onDeleteHistory={handleDeleteHistory}
    />
  );
}

export default HistoryPage;