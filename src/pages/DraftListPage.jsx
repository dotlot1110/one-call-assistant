import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyListScreen from "../components/MyListScreen";
import { loadDrafts, deleteDraft } from "../services/storage";

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