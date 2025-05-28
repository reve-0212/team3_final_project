import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "../JeongSeongYun/layout/Header.jsx";
import BottomNav from "../JeongSeongYun/layout/BottomNav.jsx";
import VisitPage from "./page/VisitPage.jsx";
import SeatPage from "./page/SeatPage.jsx";
import WaitingRegPage from "./page/WaitingRegPage.jsx";
import WaitingInfoPage from "./page/WaitingInfoPage.jsx";
import DateSelectorPage from "./page/DateSelectorPage.jsx";
import MenuSelectorPage from "./page/MenuSelectorPage.jsx";
import BookRegPage from "./page/BookRegPage.jsx";
import BookInfoPage from "./page/BookInfoPage.jsx";

import MainContent from "../JeongSeongYun/layout/MainContent.jsx";
import MyPageContent from "../JeongSeongYun/layout/MyPageContent.jsx";
import Bookmark from "../JeongSeongYun/layout/Bookmark.jsx";
// import MapLocation from "../JeongSeongYun/layout/MapLocation.jsx";
import PreRegPage from "./page/PreRegPage.jsx";
import PreInfoPage from "./page/PreInfoPage.jsx";



function KnhApp() {
    return (

        <BrowserRouter>
            <Header/>
            <Routes>
                {/*<Route path={"/waiting/visit"} element={<VisitPage/>}/>*/}
                <Route path={'/waiting/reg'} element={<WaitingRegPage/>}/>
                <Route path={'/waiting/info'} element={<WaitingInfoPage/>}/>

                <Route path={"/book/visit"} element={<VisitPage/>}/>
                <Route path={'/book/seat'} element={<SeatPage/>}/>
                <Route path={'/book/date'} element={<DateSelectorPage/>}/>
                <Route path={'/book/menu'} element={<MenuSelectorPage/>}/>
                <Route path={'/book/reg'} element={<BookRegPage/>}/>
                <Route path={'/book/info'} element={<BookInfoPage/>}/>

                <Route path={'/pre/reg'} element={<PreRegPage/>}/>
                <Route path={'/pre/info'} element={<PreInfoPage/>}/>
            </Routes>
            <BottomNav/>
        </BrowserRouter>
    );
}

export default KnhApp






