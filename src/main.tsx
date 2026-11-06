import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './shared/tokens.css'
import './shared/base.css'
import './bootstrap/bridge.css'
import HomePage from './bootstrap/HomePage'
import CalendarPage from './bootstrap/CalendarPage'
import { currentRoute } from './shared/url'

// Les liens de la Navbar sont de simples <a href> : chaque navigation
// recharge la page, on choisit donc la page selon le chemin courant.
const path = currentRoute()
const user = null
const onLogout = () => {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/calendrier' ? (
      <CalendarPage user={user} onLogout={onLogout} />
    ) : (
      <HomePage user={user} onLogout={onLogout} />
    )}
  </StrictMode>,
)
