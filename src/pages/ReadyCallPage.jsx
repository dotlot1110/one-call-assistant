import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadyCallScreen from "../components/ReadyCallScreen";
import { getDraftById } from "../services/storage";

function ReadyCallPage() {
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

  return (
    <ReadyCallScreen
      selectedTopic={draft.topic}
      onBackToEdit={() => navigate(`/drafts/${draft.id}/edit`)}
      onStartCall={() => navigate(`/drafts/${draft.id}/call`)}
    />
  );
}

export default ReadyCallPage;