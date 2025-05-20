import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";

import Header from "../JeongSeongYun/layout/Header.jsx";
import PreWait from "../KimSangMin/PreWait.jsx";
import PreReserve from "../KimSangMin/PreReserve.jsx";
import BottomNav from "../JeongSeongYun/layout/BottomNav.jsx";

function DajungApp() {
    return (
        <div className={'mobile-wrapper'}>
            <BrowserRouter>
                {/*<HashRouter>*/}
                <Header/>

                <main className={'content'}>
                    <Routes>
                        {/*모바일 전용 사장 로그인*/}
                        {/*<Route path={"/pre/login"} element={<OwnerLoginSjh/>}/>*/}
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

export default DajungApp