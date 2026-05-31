import MyListScreen from "../components/MyListScreen";
import EditScreen from "../components/EditScreen";
import CallScreen from "../components/CallScreen";
import ResultScreen from "../components/ResultScreen";

function DraftsPage({
  draftView,
  setDraftView,
  myLists,
  selectedTopic,
  checklist,
  newItem,
  setNewItem,
  onDeleteItem,
  onAddItem,
  onMoveItemUp,
  onMoveItemDown,
  onCallNow,
  onSaveToMyList,
  onToggleItemStatus,
  onEndCall,
  onBackToCall,
  onSaveResultToHistory,
  onStartOver,
  onOpenMyList,
  onDeleteMyList,
  todoItems,
  completeItems,
  pendingItems
}) {
  if (draftView === "list") {
    return (
      <MyListScreen
        myLists={myLists}
        onOpenMyList={onOpenMyList}
        onDeleteMyList={onDeleteMyList}
      />
    );
  }

  if (draftView === "edit") {
    return (
      <EditScreen
        selectedTopic={selectedTopic}
        checklist={checklist}
        newItem={newItem}
        setNewItem={setNewItem}
        onDeleteItem={onDeleteItem}
        onAddItem={onAddItem}
        onMoveItemUp={onMoveItemUp}
        onMoveItemDown={onMoveItemDown}
        onCallNow={onCallNow}
        onSaveToMyList={onSaveToMyList}
      />
    );
  }

  if (draftView === "call") {
    return (
      <CallScreen
        selectedTopic={selectedTopic}
        todoItems={todoItems}
        completeItems={completeItems}
        onToggleItemStatus={onToggleItemStatus}
        onBackToEdit={() => setDraftView("edit")}
        onEndCall={onEndCall}
      />
    );
  }

  if (draftView === "result") {
    return (
      <ResultScreen
        completeItems={completeItems}
        pendingItems={pendingItems}
        onBackToCall={onBackToCall}
        onSaveToHistory={onSaveResultToHistory}
        onStartOver={onStartOver}
      />
    );
  }

  return null;
}

export default DraftsPage;