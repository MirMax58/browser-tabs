import { NavLink } from "react-router-dom";

export default function Tab({ tab }) {
  return (
    <NavLink
      key={tab.id}
      to={tab.url}
      className={({ isActive }) =>
        isActive ? "tabs__item active" : "tabs__item"
      }
    >
      {tab.title}
    </NavLink>
  );
}
