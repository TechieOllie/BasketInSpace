import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shared/tokens.css";
import "./shared/base.css";
import "./bootstrap/bridge.css";
import HomePage from "./bootstrap/HomePage";
import CalendarPage from "./bootstrap/CalendarPage";
import AuthPage from "./bootstrap/AuthPage";
import ScrollManager from "./ScrollManager";

const user = null
const onLogout = () => {}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage user={user} onLogout={onLogout} />} />
        <Route path="/calendrier" element={<CalendarPage user={user} onLogout={onLogout} />} />
        <Route path="/connexion" element={<AuthPage initialMode="login" />} />
        <Route path="/inscription" element={<AuthPage initialMode="register" />} />
        <Route path="*" element={<HomePage user={user} onLogout={onLogout} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
