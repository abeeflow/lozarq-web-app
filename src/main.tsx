import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <footer className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <p className="text-xs text-text-light/50 dark:text-text-dark/50">
          © 2025 Lozarq Estudio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </StrictMode>,
)
