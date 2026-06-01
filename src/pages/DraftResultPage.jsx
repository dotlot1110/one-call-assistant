import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResultScreen from "../components/ResultScreen";
import { getDraftById } from "../services/storage";
import { completeDraftAsHistory } from "../services/callCompletionService";
import { ITEM_STATUS } from "../constants/itemStatus";

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

  const completeItems = draft.items.filter((item) => item.status === ITEM_STATUS.COMPLETE);
  const pendingItems = draft.items.filter((item) => item.status === ITEM_STATUS.PENDING);

  function handleSaveToHistory() {
    completeDraftAsHistory(draft);
    navigate("/history");
  }

  return (
    <ResultScreen
      completeItems={completeItems}
      pendingItems={pendingItems}
      onSaveToHistory={handleSaveToHistory}
    />
  );
}

export default DraftResultPage;