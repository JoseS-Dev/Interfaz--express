
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'
import { LoaderProvider } from './context/LoaderContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AuthProvider>
  </React.StrictMode>,
)
