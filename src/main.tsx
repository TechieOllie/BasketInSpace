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
import ShopPage from "./bootstrap/ShopPage";
import ScrollManager from "./ScrollManager";

// Les liens de la Navbar sont de simples <a href> : chaque navigation
// recharge la page, on choisit donc la page selon le chemin courant.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const storedUser = localStorage.getItem('basketinspace.user')
const user = storedUser ? JSON.parse(storedUser) : null
const onLogout = () => {
  localStorage.removeItem('basketinspace.user')
  window.location.href = '/connexion'
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage user={user} onLogout={onLogout} />} />
        <Route path="/calendrier" element={<CalendarPage user={user} onLogout={onLogout} />} />
        <Route path="/boutique" element={<ShopPage user={user} onLogout={onLogout} />} />
        <Route path="/connexion" element={<AuthPage initialMode="login" />} />
        <Route path="/inscription" element={<AuthPage initialMode="register" />} />
        <Route path="*" element={<HomePage user={user} onLogout={onLogout} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
