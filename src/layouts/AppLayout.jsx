import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import callPilotLogo from "../assets/callpilot-logo.png";

function AppLayout() {
  return (
    <div className="app">
      <div className="phone-frame">
        <header className="app-header">
          <img
            src={callPilotLogo}
            alt=""
            aria-hidden="true"
            className="app-logo"
          />

          <div className="app-title-row">
            <h1>CallPilot</h1>
            <span className="app-title-divider">-</span>
            <span className="app-subtitle">AI call checklist</span>
          </div>
        </header>

        <Outlet />

        <BottomNav />
      </div>
    </div>
  );
}

export default AppLayout;