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

function SjhApp() {
  return (
    <div className={"mobile-wrapper"}>
      <BrowserRouter>
        <Header/>

        <Routes>
          <Route index element={<SjhLocationTest/>}/>
          <Route path={"/logIn"} element={<Login/>}/>
          <Route path={"/signUp"} element={<SignUp/>}/>
          <Route path={"/reservation"} element={<SjhReservation/>}/>
          <Route path={"/popUp"} element={<CancelPopup/>}/>
          <Route path={"/review"} element={<SjhReview/>}/>
          <Route path={"/reviewList"} element={<SjhReviewList/>}/>
          <Route path={"/locationTest"} element={<SjhLocationTest/>}/>
        </Routes>

        <BottomNav/>
      </BrowserRouter>
    </div>
  );
}

export default SjhApp