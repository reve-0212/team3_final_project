import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "../src/JeongSeongYun/css/mobile.css"
import App from "./App.jsx";

import App from './App.jsx'
import DajungApp from "./JangDaJung/DajungApp.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DajungApp/>
  </StrictMode>,
)
