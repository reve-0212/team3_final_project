import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import App from "../App.jsx";
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
import MenuSelector from "../KimNaHyun/components/MenuSelector.jsx";
import MenuSelectorPage from "../KimNaHyun/page/MenuSelectorPage.jsx";
import WaitingInfoPage from "../KimNaHyun/page/WaitingInfoPage.jsx";
import BookRegPage from "../KimNaHyun/page/BookRegPage.jsx";
import BookInfoPage from "../KimNaHyun/page/BookInfoPage.jsx";
import SjhReview from "../simJiHyun/review/SjhReview.jsx";
import SjhReviewList from "../simJiHyun/reviewList/SjhReviewList.jsx";

function main() {
    return (
        <div className={'mobile-wrapper'}>
            <HashRouter>
                <Header/>
                <main className={'content'}>
                    <Routes>
                        <Route path="/" element={<MainContent/>}/>

                        <Route path={"/user"} element={<MyPageContent/>}/>
                        <Route path={"/user/login"} element={<Login/>}/>
                        <Route path={"/user/setting"} element={<UserSetting/>}/>
                        <Route path={"/user/signUp"} element={<SignUp/>}/>

                        <Route path={'/latestDetails'} element={<SjhReservation/>}/>
                        <Route path={'/bookmark'} element={<Bookmark/>}/>

                        <Route path={"/contentList/:category"} element={<ContentList/>}/>
                        <Route path={"/contentDetail"} element={<ContentDetail/>}/>

                        <Route path={"/waiting/visit"} element={<VisitPage/>}/>
                        <Route path={"/book/visit"} element={<VisitPage/>}/>

                        <Route path={"/waiting/seat"} element={<SeatPage/>}/>
                        <Route path={"/book/date"} element={<DateSelectorPage/>}/>

                        <Route path={"/waiting/reg"} element={<WaitingRegPage/>}/>
                        <Route path={"/book/menu"} element={<MenuSelectorPage/>}/>

                        <Route path={"/waiting/info"} element={<BookInfoPage/>}/>
                        <Route path={"/book/reg"} element={<BookRegPage/>}/>

                        <Route path={"/book/info"} element={<BookInfoPage/>}/>

                        <Route path={"/review"} element={<SjhReview/>}/>
                        <Route path={"/reviewList"} element={<SjhReviewList/>}/>
                    </Routes>
                </main>
                <BottomNav/>
            </HashRouter>
        </div>
    );
}

export default main