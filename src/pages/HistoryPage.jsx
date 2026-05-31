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

  return (
    <HistoryScreen
      history={history}
      onOpenDetail={handleOpenDetail}
    />
  );
}

export default HistoryPage;