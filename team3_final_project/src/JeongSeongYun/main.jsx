import {BrowserRouter, Route, Routes} from "react-router-dom";
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

function main() {
    return (
        <div className={'mobile-wrapper'}>
            <BrowserRouter basename="/">
                <Header/>
                <main className={'content'}>
                    <Routes>
                        <Route path="/" element={<MainContent/>} />

                        <Route path={"/user"} element={<MyPageContent/>} />
                        <Route path={"/user/login"} element={<Login/>} />
                        <Route path={"/user/setting"} element={<UserSetting/>} />
                        <Route path={"/user/signUp"} element={<SignUp/>} />
                        <Route path={'/bookmark'} element={<Bookmark/>} />
                        <Route path={'/latestDetails'} element={<SjhReservation/>} />

                    </Routes>
                </main>
                <BottomNav/>
            </BrowserRouter>
        </div>
    );
}

export default main