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

function SjhApp() {
    return (
        <div className={"mobile-wrapper"}>
            <BrowserRouter>
                <Header/>

                <Routes>
                    <Route index element={<SjhMain/>}/>
                    <Route path={"/logIn"} element={<Login/>}/>
                    <Route path={"/signUp"} element={<SignUp/>}/>
                    <Route path={"/reservation"} element={<SjhReservation/>}/>
                    <Route path={"/popUp"} element={<CancelPopup/>}/>
                    <Route path={"/review"} element={<SjhReview/>}/>
                    <Route path={"/reviewList"} element={<SjhReviewList/>}/>
                </Routes>

                <BottomNav/>
            </BrowserRouter>
        </div>
    );
}

export default SjhApp