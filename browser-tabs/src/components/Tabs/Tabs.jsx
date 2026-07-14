import { Link } from "react-router-dom";
import { tabs } from "../../data/tabs";

import "./Tabs.css";

export default function Tabs() {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <Link key={tab.id} to={tab.url} className="tabs__item">
          {tab.title}
        </Link>
      ))}
    </div>
  );
}
