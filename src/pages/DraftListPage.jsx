import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadDrafts, deleteDraft } from "../services/storage";
import MyListScreen from "../components/MyListScreen";

function DraftListPage() {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  function handleOpenDraft(record) {
    navigate(`/drafts/${record.id}/edit`);
  }

  function handleDeleteDraft(draftId) {
    deleteDraft(draftId);
    setDrafts(loadDrafts());
  }

  return (
    <MyListScreen
      myLists={drafts}
      onOpenMyList={handleOpenDraft}
      onDeleteMyList={handleDeleteDraft}
    />
  );
}

export default DraftListPage;