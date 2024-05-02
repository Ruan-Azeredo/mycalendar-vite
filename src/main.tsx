import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ManagerProvider } from './contexts/manager.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ManagerProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ManagerProvider>
)
