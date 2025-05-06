import PreReSet from "./PreReSet.jsx";
import PreWaSet from "./PreWaSet.jsx";
import PreSelect from "./PreSelect.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import PreCh from "./PreCh.jsx";
import PreDayCh from "./PreDayCh.jsx";
import PreRe from "./PreRe.jsx";
import PreTime from "./PreTime.jsx";
import PreTimeSet from "./PreTimeSet.jsx";
import PreMain from "./PreMain.jsx";
import ReservationChart from "../JangDaJung/ReservationChart.jsx";
import CeoMain from "../JangDaJung/CeoMain.jsx";
import TodayWaiting from "../JangDaJung/TodayWaiting.jsx";
import PastDateReservation from "../JangDaJung/PastDateReservation.jsx";
import PastDateWaiting from "../JangDaJung/PastDateWaiting.jsx";
import TodayReservation from "../JangDaJung/TodayReservation.jsx";
import PreRegPage from "../KimNaHyun/page/PreRegPage.jsx";
import PreInfoPage from "../KimNaHyun/page/PreInfoPage.jsx";
import AdminLogin from "../JeonKangSan/AdminLogin.jsx";
import OwnerLogin from "../JeonKangSan/OwnerLogin.jsx";
import CeoNewMenu from "../JangDaJung/CeoNewMenu.jsx";
import CeoMenuList from "../JangDaJung/CeoMenuList.jsx";
import PreUpdatePage from "./PreUpdatePage.jsx";
import CeoMenuListEdit from "../JangDaJung/CeoMenuListEdit.jsx";
import CeoMenuEdit from "../JangDaJung/CeoMenuEdit.jsx";

function SangMinApp() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/pre/PreWait" element={<PreWait />} />  /!* 웨이팅 웹앱  *!/*/}
                    {/*<Route path="/pre/PreReserve" element={<PreReserve />} />   예약 웹앱*/}

                    {/* 시간 지정하기*/}
                    <Route path="/pre/PreTime" element={<PreTime/>}/>
                    <Route path="/pre/PreTimeSet" element={<PreTimeSet/>}/>

                    {/* 관리자 -> 사장님 */}
                    <Route path="/pre/admin" element={<AdminLogin/>}/> {/*  관리자 로그인 */}
                    <Route path="/pre/reg" element={<PreRegPage/>}/> {/* 사장님 정보 입력 버튼 */}
                    <Route path="/pre/info" element={<PreInfoPage/>}/> {/*  사장님 정보 입력 페이지 */}
                    <Route path="/pre/login" element={<OwnerLogin/>}/> {/*  사장 로그인 */}
                    <Route path="/pre/update" element={<PreUpdatePage/>}/> {/*  사장 정보 수정 */}

                    <Route path="/" element={<OwnerLogin/>}/>
                    <Route path="/pre/PreMain" element={<PreMain/>}/> {/* 예약가게 메인*/}
                    <Route path="/pre/PreCh" element={<PreCh/>}/> {/* 예약가게 매출 통계 */}
                    <Route path="/pre/PreRe" element={<PreRe/>}/> {/* 예약가게 리뷰 보기*/}
                    <Route path="/pre/PreDayCh" element={<PreDayCh/>}/> {/* 예약 날짜 차트 */}
                    <Route path="/pre/PreReSet" element={<PreReSet/>}/> {/* 예약가게 셋팅 */}
                    <Route path="/pre/PrePast" element={<PastDateReservation/>}/> {/* 과거 예약 */}
                    <Route path="/pre/PreToday" element={<TodayReservation/>}/> {/* 오늘 예약  */}
                    <Route path="/pre/PreSelect" element={<PreSelect/>}/> {/* 오늘 예약  */}

                    <Route path="/pre/NewMenu" element={<CeoNewMenu/>}/> {/* 메뉴 등록 */}
                    <Route path="/pre/MenuList" element={<CeoMenuList/>}/> {/* 메뉴 리스트 */}
                    <Route path="/pre/MenuListEdit" element={<CeoMenuListEdit />} /> {/* 메뉴판 수정 */}
                    <Route path="/pre/MenuEdit/:menuId" element={<CeoMenuEdit />} /> {/* 메뉴 슈정 */}

                    <Route path="/pre/PreWaSet" element={<PreWaSet/>}/> {/* 웨이팅 가게 셋팅 */}
                    <Route path="/pre/WaMain" element={<CeoMain/>}/> {/*웨이팅 메인 */}
                    <Route path="/pre/WaToday" element={<TodayWaiting/>}/> {/* 현재 웨이팅 */}
                    <Route path="/pre/WaPast" element={<PastDateWaiting/>}/> {/* 과거 웨이팅 */}
                    <Route path="/pre/WaChart" element={<ReservationChart/>}/> {/* 웨이팅 차트 */}


                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default SangMinApp

