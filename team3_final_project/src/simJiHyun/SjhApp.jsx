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

function SjhApp() {
  return (
    <div className={"mobile-wrapper"}>
      <BrowserRouter>
        <Header/>

        <Routes>
          {/*모바일 전용 사장 로그인*/}
          <Route path={"/"} element={<OwnerLoginSjh/>}/>
          {/*웨이팅 웹앱*/}
          {/*<Route path="/pre/PreWait" element={<PreWait/>}/>*/}
          {/*예약 웹앱*/}
          <Route path="/pre/reserve" element={<PreReserve/>}/>
        </Routes>

        <BottomNav/>
      </BrowserRouter>
    </div>
  );
}

export default SjhApp