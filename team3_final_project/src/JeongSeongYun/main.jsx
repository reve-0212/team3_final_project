import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/Header.jsx";
import BottomNav from "./layout/BottomNav.jsx";
import "./css/mobile.css"
import MainContent from "./layout/MainContent.jsx";
import MyPageContent from "./layout/MyPageContent.jsx";
import Bookmark from "./layout/Bookmark.jsx";
import SjhReservation from "../simJiHyun/reservation/SjhReservation.jsx";
import Login from "../simJiHyun/login/Login.jsx";
import UserSetting from "./layout/UserSetting.jsx";
import SignUp from "../simJiHyun/signUp/SignUp.jsx";
import ContentList from "../JeonKangSan/ContentList.jsx";
import ContentDetail from "../JeonKangSan/ContentDetail.jsx";
import VisitPage from "../KimNaHyun/page/VisitPage.jsx";
import SeatPage from "../KimNaHyun/page/SeatPage.jsx";
import DateSelectorPage from "../KimNaHyun/page/DateSelectorPage.jsx";
import WaitingRegPage from "../KimNaHyun/page/WaitingRegPage.jsx";
import MenuSelectorPage from "../KimNaHyun/page/MenuSelectorPage.jsx";
import BookRegPage from "../KimNaHyun/page/BookRegPage.jsx";
import BookInfoPage from "../KimNaHyun/page/BookInfoPage.jsx";
import SjhReview from "../simJiHyun/review/SjhReview.jsx";
import SjhReviewList from "../simJiHyun/reviewList/SjhReviewList.jsx";
import WaitingInfoPage from "../KimNaHyun/page/WaitingInfoPage.jsx";
import AdminLogin from "../JeonKangSan/AdminLogin.jsx";
import OwnerLogin from "../JeonKangSan/OwnerLogin.jsx";
import PreReserve from "../KimSangMin/PreReserve.jsx";
import PreWait from "../KimSangMin/PreWait.jsx";
import OwnerLoginSjh from "../simJiHyun/login/OwnerLoginSjh.jsx";

function main() {
    return (
        <div className={'mobile-wrapper'}>
            <BrowserRouter>
                {/*<HashRouter>*/}
                <Header/>

                <main className={'content'}>
                    <Routes>
                        {/*유저*/}
                        <Route path="/" element={<MainContent/>}/>

                        <Route path={"/user"} element={<MyPageContent/>}/>
                        <Route path={"/user/login"} element={<Login/>}/>
                        <Route path={"/user/setting"} element={<UserSetting/>}/>
                        <Route path={"/user/signUp"} element={<SignUp/>}/>
                        <Route path={"/user/reviewList"} element={<SjhReviewList/>}/>

                        <Route path={'/latestDetails'} element={<SjhReservation/>}/>
                        <Route path={'/bookmark'} element={<Bookmark/>}/>

                        <Route path={"/contentList/:category"} element={<ContentList/>}/>
                        <Route path={"/contentDetail"} element={<ContentDetail/>}/>

                        <Route path={"/waiting/visit"} element={<VisitPage/>}/>
                        <Route path={"/book/seat"} element={<SeatPage/>}/>
                        <Route path={"/waiting/reg"} element={<WaitingRegPage/>}/>
                        <Route path={"/waiting/info"} element={<WaitingInfoPage/>}/>

                        <Route path={"/book/visit"} element={<VisitPage/>}/>
                        <Route path={"/book/date"} element={<DateSelectorPage/>}/>
                        <Route path={"/book/menu"} element={<MenuSelectorPage/>}/>
                        <Route path={"/book/reg"} element={<BookRegPage/>}/>
                        <Route path={"/book/info"} element={<BookInfoPage/>}/>

                        <Route path={"/review"} element={<SjhReview/>}/>

                        {/*모바일 전용 사장 로그인*/}
                        <Route path={"/pre/login"} element={<OwnerLoginSjh/>}/>
                        {/*웨이팅 웹앱*/}
                        <Route path="/pre/PreWait" element={<PreWait/>}/>
                        {/*예약 웹앱*/}
                        <Route path="/pre/PreReserve" element={<PreReserve/>}/>
                    </Routes>
                </main>
                <BottomNav/>
            </BrowserRouter>
            {/*</HashRouter>*/}
        </div>
    );
}

export default main