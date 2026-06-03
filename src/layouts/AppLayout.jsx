import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import callPilotLogo from "../assets/callpilot-logo.png";

function AppLayout() {
  const location = useLocation();

  const shouldHideBottomNav =
    location.pathname.startsWith("/drafts/") &&
    (location.pathname.endsWith("/call") || location.pathname.endsWith("/result"));

  return (
    <div className="app">
      <div
        className={
          shouldHideBottomNav
            ? "phone-frame phone-frame-no-bottom-nav"
            : "phone-frame"
        }
      >
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

        {!shouldHideBottomNav && <BottomNav />}
      </div>
    </div>
  );
}

export default AppLayout;