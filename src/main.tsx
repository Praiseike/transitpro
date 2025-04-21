import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SmoothScroll from './utils/smoothScroll.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Provider from './contexts/auth/index.tsx'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
    <ToastContainer/>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </SmoothScroll>
  </StrictMode>,
)
