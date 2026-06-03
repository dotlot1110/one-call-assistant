import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import DraftListPage from "./pages/DraftListPage";
import EditDraftPage from "./pages/EditDraftPage";
import ReadyCallPage from "./pages/ReadyCallPage";
import CallDraftPage from "./pages/CallDraftPage";
import DraftResultPage from "./pages/DraftResultPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/drafts" element={<DraftListPage />} />
        <Route path="/drafts/:draftId/edit" element={<EditDraftPage />} />
        <Route path="/drafts/:draftId/ready" element={<ReadyCallPage />} />
        <Route path="/drafts/:draftId/call" element={<CallDraftPage />} />
        <Route path="/drafts/:draftId/result" element={<DraftResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:recordId" element={<HistoryDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;