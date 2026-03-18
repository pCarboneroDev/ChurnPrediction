import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Churn from './churn/ui/Churn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Churn></Churn>
  </StrictMode>,
)
