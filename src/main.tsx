import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './shared/tokens.css'
import './shared/base.css'
import './bootstrap/bridge.css'
import HomePage from './bootstrap/HomePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage user={null} onLogout={() => {}} />
  </StrictMode>,
)
