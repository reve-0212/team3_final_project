import Login from "./login/Login.jsx";
import SignUp from "./signUp/SignUp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SjhMain from "./SjhMain.jsx";
import SjhReservation from "./reservation/SjhReservation.jsx";
import '../JeongSeongYun/css/mobile.css'
import CancelPopup from "./popUP/cancelPopup.jsx";
import Header from "../JeongSeongYun/layout/Header.jsx";
import BottomNav from "../JeongSeongYun/layout/BottomNav.jsx";
import SjhReview from "./review/SjhReview.jsx";
import SjhReviewList from "./reviewList/SjhReviewList.jsx";
import SjhLocationTest from "./location/SjhLocationTest.jsx";
import OwnerLoginSjh from "./login/OwnerLoginSjh.jsx";
import PreWait from "../KimSangMin/PreWait.jsx";
import PreReserve from "../KimSangMin/PreReserve.jsx";
import PreTime from "../KimSangMin/PreTime.jsx";
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