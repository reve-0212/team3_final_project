import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

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
<<<<<<< HEAD
      <Main />
      {/*<SangMinApp/>*/}
=======
    <Main />
    {/*<SjhApp/>*/}
    {/*<DajungApp/>*/}
    {/*<KnhApp/>*/}
    {/*<SangMinApp/>*/}
>>>>>>> 01721d95845cc54f8c0e821c05b1775f834dd746
  </StrictMode>
)
