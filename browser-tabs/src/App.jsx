import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabs from "./components/Tabs/Tabs";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Blog from "./pages/Blog";
import Contacts from "./pages/Contacts";
import Docs from "./pages/Docs";
import Messages from "./pages/Messages";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Tabs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
