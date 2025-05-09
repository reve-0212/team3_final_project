import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../App.jsx";
import Header from "./layout/Header.jsx";
import BottomNav from "./layout/BottomNav.jsx";

import "./css/mobile.css"
import MainContent from "./layout/MainContent.jsx";
import MyPageContent from "./layout/MyPageContent.jsx";
import Bookmark from "./layout/Bookmark.jsx";
import MapLocation from "./layout/MapLocation.jsx";

function main() {
    return (
        <div className={'mobile-wrapper'}>
            <BrowserRouter basename="/">
                <Header/>
                <Routes>
                    <Route path="/" element={<MainContent/>} />
                    <Route path={"/user"} element={<MyPageContent/>} />
                    <Route path={'/bookmark'} element={<Bookmark/>} />
                    <Route path={'/map'} element={<MapLocation/>} />
                </Routes>
                <BottomNav/>
            </BrowserRouter>
        </div>
    );
}

export default main