import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Main from "./JeongSeongYun/main.jsx";

import "../src/JeongSeongYun/css/mobile.css"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Main/>
  </StrictMode>,
)
