import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import worker from './mocks/index.js';
import './index.css'
import App from './App.jsx'

worker.start({ onUnhandledRequest: "bypass" })
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    )
}).catch((err) => console.log(err));