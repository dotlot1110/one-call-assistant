import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResultScreen from "../components/ResultScreen";
import { addHistoryRecord, getDraftById } from "../services/storage";

function DraftResultPage() {
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

  const completeItems = draft.items.filter((item) => item.status === "complete");
  const pendingItems = draft.items.filter((item) => item.status === "pending");

  function handleSaveToHistory() {
    const newRecord = {
      id: crypto.randomUUID(),
      topic: draft.topic,
      createdAt: new Date().toLocaleString(),
      status: pendingItems.length > 0 ? "pending" : "complete",
      items: draft.items
    };

    addHistoryRecord(newRecord);
    navigate("/history");
  }

  function handleStartOver() {
    navigate("/");
  }

  return (
    <ResultScreen
      completeItems={completeItems}
      pendingItems={pendingItems}
      onBackToCall={() => navigate(`/drafts/${draft.id}/call`)}
      onSaveToHistory={handleSaveToHistory}
      onStartOver={handleStartOver}
    />
  );
}

export default DraftResultPage;