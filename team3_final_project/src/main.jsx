import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Main from "./JeongSeongYun/main.jsx";

import "../src/JeongSeongYun/css/mobile.css"

import App from './App.jsx'
import WaitingInfoPage from "./KimNaHyun/page/WaitingInfoPage.jsx";
import KnhApp from "./KimNaHyun/KnhApp.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/*<Main/>*/}
      <KnhApp />
  </StrictMode>,
)
