import { House, ListChecks, History } from "lucide-react";

function BottomNav({ activeTab, onGoHome, onGoMyList, onGoHistory }) {
  return (
    <nav className="bottom-nav">
      <button
        className={activeTab === "home" ? "nav-button active" : "nav-button"}
        onClick={onGoHome}
        aria-label="Home"
      >
        <House size={22} />
      </button>

      <button
        className={activeTab === "myList" ? "nav-button active" : "nav-button"}
        onClick={onGoMyList}
        aria-label="My List"
      >
        <ListChecks size={22} />
      </button>

      <button
        className={activeTab === "history" ? "nav-button active" : "nav-button"}
        onClick={onGoHistory}
        aria-label="History"
      >
        <History size={22} />
      </button>
    </nav>
  );
}

export default BottomNav;