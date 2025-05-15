import {BrowserRouter, Route, Routes} from "react-router-dom";
import '../JeongSeongYun/css/mobile.css'
import Header from "../JeongSeongYun/layout/Header.jsx";
import BottomNav from "../JeongSeongYun/layout/BottomNav.jsx";
import KakaoMapTest from "./location/KakaoMapTest.jsx";

function SjhApp() {
  return (
    <div className={"mobile-wrapper"}>
      <BrowserRouter>
        <Header/>

        <Routes>
          <Route path="/" element={<KakaoMapTest/>}/>

        </Routes>

        <BottomNav/>
      </BrowserRouter>
    </div>
  );
}

export default SjhApp