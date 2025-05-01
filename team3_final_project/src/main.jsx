import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./index.css"
import "../src/JeongSeongYun/css/mobile.css"

import DajungApp from "./JangDaJung/DajungApp.jsx";
import SjhApp from "./simJiHyun/SjhApp.jsx";
import JksApp from "./JeonKangSan/JksApp.jsx";
import KnhApp from "./KimNaHyun/KnhApp.jsx";
import Main from "./JeongSeongYun/main.jsx";
import SangMinApp from "./KimSangMin/SangMinApp.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/*<DajungApp/>*/}
      {/*<SjhApp/>*/}
      {/*<JksApp/>*/}
      {/*<KnhApp/>*/}
      <SangMinApp/>
  </StrictMode>
)
