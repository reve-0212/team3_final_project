
import WaitingInfoPage from "./page/WaitingInfoPage.jsx";
import DateSelectorPage from "./page/DateSelectorPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SjhMain from "../simJiHyun/SjhMain.jsx";
import Login from "../simJiHyun/login/Login.jsx";
import SignUp from "../simJiHyun/signUp/SignUp.jsx";
import SjhReservation from "../simJiHyun/reservation/SjhReservation.jsx";
import WaitingRegPage from "./page/WaitingRegPage.jsx";
import MenuSelector from "./components/MenuSelector.jsx";
import MenuSelectorPage from "./page/MenuSelectorPage.jsx";
import BookRegPage from "./page/BookRegPage.jsx";
import BookInfo from "./components/BookInfo.jsx";
import BookInfoPage from "./page/BookInfoPage.jsx";
import Header from "../JeongSeongYun/layout/Header.jsx";
import MainContent from "../JeongSeongYun/layout/MainContent.jsx";
import MyPageContent from "../JeongSeongYun/layout/MyPageContent.jsx";
import Bookmark from "../JeongSeongYun/layout/Bookmark.jsx";
// import MapLocation from "../JeongSeongYun/layout/MapLocation.jsx";
import BottomNav from "../JeongSeongYun/layout/BottomNav.jsx";


function KnhApp() {
    return (
        <div>
            {/*<MenuSelectorPage />*/}
            {/*<DateSelectorPage />*/}
            {/*<WaitingRegPage />*/}
            {/*<BookRegPage />*/}
            {/*<BookInfoPage />*/}
        </div>

    // <BrowserRouter basename="/">
    //     <Header/>
    //     <Routes>
    //         <Route path="/" element={<MainContent/>} />
    //         <Route path={"/user"} element={<MyPageContent/>} />
    //         <Route path={'/bookmark'} element={<Bookmark/>} />
    //         <Route path={'/map'} element={<MapLocation/>} />
    //     </Routes>
    //     <BottomNav/>
    // </BrowserRouter>
    );
}

export default KnhApp






