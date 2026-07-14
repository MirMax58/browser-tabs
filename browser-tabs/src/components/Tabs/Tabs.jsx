import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

import Tab from "./Tab";
import "./Tabs.css";
import { useState, useEffect } from "react";

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

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={tabs.map((tab) => tab.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="tabs">
          {tabs.map((tab) => (
            <Tab key={tab.id} tab={tab} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
