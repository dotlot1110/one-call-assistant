import HistoryScreen from "../components/HistoryScreen";
import HistoryDetailScreen from "../components/HistoryDetailScreen";

function HistoryPage({
  historyView,
  setHistoryView,
  history,
  selectedHistoryItem,
  onOpenHistoryDetail,
  onDeleteHistoryItem
}) {
  if (historyView === "list") {
    return (
      <HistoryScreen
        history={history}
        onOpenDetail={onOpenHistoryDetail}
      />
    );
  }

  if (historyView === "detail" && selectedHistoryItem) {
    return (
      <HistoryDetailScreen
        selectedHistoryItem={selectedHistoryItem}
        onBackToHistory={() => setHistoryView("list")}
        onDeleteHistoryItem={onDeleteHistoryItem}
      />
    );
  }

  return null;
}

export default HistoryPage;