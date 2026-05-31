import { useEffect, useState } from "react";
import "./App.css";

import HomeScreen from "./components/HomeScreen";
import EditScreen from "./components/EditScreen";
import CallScreen from "./components/CallScreen";
import ResultScreen from "./components/ResultScreen";
import HistoryScreen from "./components/HistoryScreen";
import HistoryDetailScreen from "./components/HistoryDetailScreen";

import BottomNav from "./components/BottomNav";
import MyListScreen from "./components/MyListScreen";


const templates = {
  hospital: [
    "Ask for possible dates",
    "Is insurance card required?",
    "Is fasting required?",
    "Ask about other precautions"
  ],
  job: [
    "Ask for interview date and time",
    "Ask for the exact location",
    "Ask what documents are required",
    "Ask if there is anything else to prepare"
  ],
  event: [
    "Confirm the time",
    "Confirm the location",
    "Ask what to bring",
    "Ask about other instructions"
  ],
  generic: [
    "Explain the purpose of the call",
    "Confirm the schedule or availability",
    "Ask what to prepare",
    "Ask if there is anything else to know in advance"
  ]
};

const HISTORY_KEY = "one-call-history";
const MY_LIST_KEY = "one-call-my-lists";

function createChecklistItems(items) {
  return items.map((item) => ({
    id: crypto.randomUUID(),
    text: item,
    status: "todo"
  }));
}

function App() {
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [screen, setScreen] = useState("home"); // home | edit | call | result | myList | history | historyDetail
  const [history, setHistory] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [myLists, setMyLists] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedMyLists = localStorage.getItem(MY_LIST_KEY);
    if (savedMyLists) {
      setMyLists(JSON.parse(savedMyLists));
    }
  }, []);

  function saveHistory(nextHistory) {
    setHistory(nextHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  }

  function saveMyLists(nextMyLists) {
    setMyLists(nextMyLists);
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(nextMyLists));
  }

  function handleSaveToMyList() {
    const newRecord = {
      id: crypto.randomUUID(),
      topic: selectedTopic,
      createdAt: new Date().toLocaleString(),
      items: checklist
    };

    const nextMyLists = [newRecord, ...myLists];
    saveMyLists(nextMyLists);
    setScreen("myList");
  }

  function handleOpenMyList(record) {
    setSelectedTopic(record.topic);
    setChecklist(record.items);
    setInput(record.topic);
    setScreen("edit");
  }

  function handleDeleteMyList(idToDelete) {
    const nextMyLists = myLists.filter((record) => record.id !== idToDelete);
    saveMyLists(nextMyLists);
  }

  function handleGenerateFromInput() {
    const text = input.toLowerCase();

    if (
      text.includes("hospital") ||
      text.includes("clinic") ||
      text.includes("appointment") ||
      text.includes("reservation")
    ) {
      setSelectedTopic("Hospital Reservation");
      setChecklist(createChecklistItems(templates.hospital));
    } else if (
      text.includes("job") ||
      text.includes("interview") ||
      text.includes("application") ||
      text.includes("part-time")
    ) {
      setSelectedTopic("Job Application");
      setChecklist(createChecklistItems(templates.job));
    } else if (
      text.includes("event") ||
      text.includes("schedule") ||
      text.includes("location")
    ) {
      setSelectedTopic("Event Inquiry");
      setChecklist(createChecklistItems(templates.event));
    } else {
      setSelectedTopic("Custom Inquiry");
      setChecklist(createChecklistItems(templates.generic));
    }

    setScreen("edit");
  }

  function handleSelectTopic(topicName, templateKey) {
    setSelectedTopic(topicName);
    setChecklist(createChecklistItems(templates[templateKey]));
    setInput(topicName);
    setScreen("edit");
  }

  function handleDeleteItem(idToDelete) {
    const updatedChecklist = checklist.filter((item) => item.id !== idToDelete);
    setChecklist(updatedChecklist);
  }

  function handleAddItem() {
    if (newItem.trim() === "") return;

    const newChecklistItem = {
      id: crypto.randomUUID(),
      text: newItem.trim(),
      status: "todo"
    };

    setChecklist([...checklist, newChecklistItem]);
    setNewItem("");
  }

  function handleMoveItemUp(id) {
    const currentIndex = checklist.findIndex((item) => item.id === id);
    if (currentIndex <= 0) return;

    const updatedChecklist = [...checklist];
    [updatedChecklist[currentIndex - 1], updatedChecklist[currentIndex]] = [
      updatedChecklist[currentIndex],
      updatedChecklist[currentIndex - 1]
    ];

    setChecklist(updatedChecklist);
  }

  function handleMoveItemDown(id) {
    const currentIndex = checklist.findIndex((item) => item.id === id);
    if (currentIndex === -1 || currentIndex >= checklist.length - 1) return;

    const updatedChecklist = [...checklist];
    [updatedChecklist[currentIndex], updatedChecklist[currentIndex + 1]] = [
      updatedChecklist[currentIndex + 1],
      updatedChecklist[currentIndex]
    ];

    setChecklist(updatedChecklist);
  }

  function handleCallNow() {
    setScreen("call");
  }

  function handleToggleItemStatus(id) {
    const updatedChecklist = checklist.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === "complete" ? "todo" : "complete"
          }
        : item
    );

    setChecklist(updatedChecklist);
  }

  function handleEndCall() {
    const updatedChecklist = checklist.map((item) =>
      item.status === "todo" ? { ...item, status: "pending" } : item
    );

    setChecklist(updatedChecklist);
    setScreen("result");
  }

  function handleSaveToHistory() {
    const pendingItems = checklist.filter((item) => item.status === "pending");
    const recordStatus = pendingItems.length > 0 ? "pending" : "complete";

    const newRecord = {
      id: crypto.randomUUID(),
      topic: selectedTopic,
      createdAt: new Date().toLocaleString(),
      status: recordStatus,
      items: checklist
    };

    const nextHistory = [newRecord, ...history];
    saveHistory(nextHistory);
    setScreen("history");
  }

  function handleOpenHistoryDetail(record) {
    setSelectedHistoryItem(record);
    setScreen("historyDetail");
  }

  function handleDeleteHistoryItem(idToDelete) {
    const nextHistory = history.filter((record) => record.id !== idToDelete);
    saveHistory(nextHistory);

    if (selectedHistoryItem && selectedHistoryItem.id === idToDelete) {
      setSelectedHistoryItem(null);
      setScreen("history");
    }
  }

  function handleStartOver() {
    setInput("");
    setSelectedTopic("");
    setChecklist([]);
    setNewItem("");
    setSelectedHistoryItem(null);
    setScreen("home");
  }

  const todoItems = checklist.filter((item) => item.status === "todo");
  const completeItems = checklist.filter((item) => item.status === "complete");
  const pendingItems = checklist.filter((item) => item.status === "pending");

  return (
    <div className="app">
      <div className="phone-frame">
        <h1>One-Call Completion Assistant</h1>

        {screen === "home" && (
          <HomeScreen
            input={input}
            setInput={setInput}
            onGenerate={handleGenerateFromInput}
            onSelectTopic={handleSelectTopic}
          />
        )}

        {screen === "edit" && (
          <EditScreen
            selectedTopic={selectedTopic}
            checklist={checklist}
            newItem={newItem}
            setNewItem={setNewItem}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
            onMoveItemUp={handleMoveItemUp}
            onMoveItemDown={handleMoveItemDown}
            onBackHome={() => setScreen("home")}
            onCallNow={handleCallNow}
            onSaveToMyList={handleSaveToMyList}
          />
        )}

        {screen === "call" && (
          <CallScreen
            selectedTopic={selectedTopic}
            todoItems={todoItems}
            completeItems={completeItems}
            onToggleItemStatus={handleToggleItemStatus}
            onBackToEdit={() => setScreen("edit")}
            onEndCall={handleEndCall}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            completeItems={completeItems}
            pendingItems={pendingItems}
            onBackToCall={() => setScreen("call")}
            onSaveToHistory={handleSaveToHistory}
            onStartOver={handleStartOver}
          />
        )}

        {screen === "myList" && (
          <MyListScreen
            myLists={myLists}
            onOpenMyList={handleOpenMyList}
            onDeleteMyList={handleDeleteMyList}
          />
        )}

        {screen === "history" && (
          <HistoryScreen
            history={history}
            onOpenDetail={handleOpenHistoryDetail}
          />
        )}

        {screen === "historyDetail" && selectedHistoryItem && (
          <HistoryDetailScreen
            selectedHistoryItem={selectedHistoryItem}
            onBackToHistory={() => setScreen("history")}
            onDeleteHistoryItem={handleDeleteHistoryItem}
          />
        )}

        <BottomNav
          activeTab={
            screen === "home"
              ? "home"
              : screen === "history" || screen === "historyDetail"
              ? "history"
              : "myList"
          }
          onGoHome={() => setScreen("home")}
          onGoMyList={() => setScreen("myList")}
          onGoHistory={() => setScreen("history")}
        />
      </div>
    </div>
  );
}

export default App;