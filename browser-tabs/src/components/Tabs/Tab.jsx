import { NavLink } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Tab({ tab, onPin }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="tab-wraper">
      <span className="drag-handle" {...attributes} {...listeners}>
        ⋮⋮
      </span>
      <NavLink
        to={tab.url}
        className={({ isActive }) =>
          isActive ? "tabs__item active" : "tabs__item"
        }
      >
        {tab.title}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation;
            onPin(tab.id);
          }}
        >
          {tab.pinned ? "📌" : "📍"}
        </button>
      </NavLink>
    </div>
  );
}
