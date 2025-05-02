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


function KnhApp() {
    return (

        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/waiting/visit"} element={<VisitPage/>}/>
                <Route path={'/waiting/seat'} element={<SeatPage/>}/>
                <Route path={'/waiting/reg'} element={<WaitingRegPage/>}/>
                <Route path={'/waiting/info'} element={<WaitingInfoPage/>}/>

                <Route path={"/book/visit"} element={<VisitPage/>}/>
                <Route path={'/book/date'} element={<DateSelectorPage/>}/>
                <Route path={'/book/menu'} element={<MenuSelectorPage/>}/>
                <Route path={'/book/reg'} element={<BookRegPage/>}/>
                <Route path={'/book/info'} element={<BookInfoPage/>}/>
            </Routes>
            <BottomNav/>
        </BrowserRouter>
    );
}

export default KnhApp






