import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function AppLayout() {
  return (
    <div className="app">
      <div className="phone-frame">
        <h1>One-Call Completion Assistant</h1>
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
}

export default AppLayout;