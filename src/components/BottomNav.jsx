import { NavLink } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
        Home
      </NavLink>

      <NavLink to="/drafts" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
        My List
      </NavLink>

      <NavLink to="/history" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
        History
      </NavLink>
    </nav>
  );
}

export default BottomNav;