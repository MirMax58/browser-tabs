import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

import Tab from "./Tab";
import "./Tabs.css";
import { useState, useEffect, useRef } from "react";

export const initialtabs = [
  {
    id: 1,
    title: "Home",
    url: "/",
    pinned: false,
  },
  {
    id: 2,
    title: "Dashboard",
    url: "/dashboard",
    pinned: false,
  },
  {
    id: 3,
    title: "Products",
    url: "/products",
    pinned: false,
  },
  {
    id: 4,
    title: "Orders",
    url: "/orders",
    pinned: false,
  },
  {
    id: 5,
    title: "Users",
    url: "/users",
    pinned: false,
  },
  {
    id: 6,
    title: "Profile",
    url: "/profile",
    pinned: false,
  },
  {
    id: 7,
    title: "Settings",
    url: "/settings",
    pinned: false,
  },
  {
    id: 8,
    title: "Messages",
    url: "/messages",
    pinned: false,
  },
  {
    id: 9,
    title: "Analytics",
    url: "/analytics",
    pinned: false,
  },
  {
    id: 10,
    title: "Blog",
    url: "/blog",
    pinned: false,
  },
  {
    id: 11,
    title: "Docs",
    url: "/docs",
    pinned: false,
  },
  {
    id: 12,
    title: "Support",
    url: "/support",
    pinned: false,
  },
  {
    id: 13,
    title: "Contacts",
    url: "/contacts",
    pinned: false,
  },
  {
    id: 14,
    title: "About",
    url: "/about",
    pinned: false,
  },
];

export default function Tabs() {
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem("tabs");
    return savedTabs ? JSON.parse(savedTabs) : initialtabs;
  });

  const [visibleTabs, setVisibleTabs] = useState(initialtabs);
  const [hideTabs, setHideTabs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setTabs((items) => {
        const prevIndex = items.findIndex((item) => item.id === active.id);

        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, prevIndex, newIndex);
      });
    }
  }

  function handlePin(id) {
    setTabs((items) =>
      items.map((tab) =>
        tab.id === id ? { ...tab, pinned: !tab.pinned } : tab,
      ),
    );
  }

  const sortedTabs = [
    ...tabs.filter((tab) => tab.pinned),
    ...tabs.filter((tab) => !tab.pinned),
  ];

  function calculateTabs() {
    const container = containerRef.current;
    const measureContainer = document.querySelector(".measure-tabs");

    if (!container || !measureContainer) return;

    const containerWidth = container.offsetWidth;

    const tabElements = measureContainer.querySelectorAll(".tabs__item");

    let totalWidth = 0;

    const visible = [];
    const hidden = [];

    tabElements.forEach((element, index) => {
      const width = element.offsetWidth + 10;

      if (totalWidth + width < containerWidth - 90) {
        visible.push(sortedTabs[index]);
        totalWidth += width;
      } else {
        hidden.push(sortedTabs[index]);
      }
    });

    setVisibleTabs(visible);
    setHideTabs(hidden);
  }

  useEffect(() => {
    calculateTabs();

    window.addEventListener("resize", calculateTabs);

    return () => {
      window.removeEventListener("resize", calculateTabs);
    };
  }, [tabs]);

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedTabs.map((tab) => tab.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="tabs-container">
          <div className="measure-tabs">
            {sortedTabs.map((tab) => (
              <Tab key={tab.id} tab={tab} onPin={handlePin} />
            ))}
          </div>

          <div className="tabs" ref={containerRef}>
            {visibleTabs.map((tab) => (
              <Tab key={tab.id} tab={tab} onPin={handlePin} />
            ))}
          </div>
          {hideTabs.length > 0 && (
            <button className="hide-button" onClick={() => setIsOpen(!isOpen)}>
              More ▼
            </button>
          )}
          {isOpen && hideTabs.length > 0 && (
            <div className="dropdown">
              {hideTabs.map((tab) => (
                <div key={tab.id} className="dropdown-item">
                  {tab.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
