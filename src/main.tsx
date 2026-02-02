import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import Providers from './components/common/providers.tsx'
import ModalsContainer from './components/common/Modal/modalsContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <ModalsContainer />
      <App />
    </Providers>
  </StrictMode>,
)
