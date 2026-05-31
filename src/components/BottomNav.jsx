import { NavLink } from "react-router-dom";
import { House, ListChecks, History } from "lucide-react";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
        aria-label="Home"
      >
        <House size={22} strokeWidth={2.2} />
      </NavLink>

      <NavLink
        to="/drafts"
        className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
        aria-label="My List"
      >
        <ListChecks size={22} strokeWidth={2.2} />
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
        aria-label="History"
      >
        <History size={22} strokeWidth={2.2} />
      </NavLink>
    </nav>
  );
}

export default BottomNav;