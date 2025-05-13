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
import OwnerLogin from "../JeonKangSan/OwnerLogin.jsx";
import PreReserve from "../KimSangMin/PreReserve.jsx";
import PreWait from "../KimSangMin/PreWait.jsx";
import OwnerLoginSjh from "../simJiHyun/login/OwnerLoginSjh.jsx";
import PreTime from "../KimSangMin/PreTime.jsx";
import PreTimeSet from "../KimSangMin/PreTimeSet.jsx";
import PreRegPage from "./layout/PreRegPage.jsx";
import PreUpdatePage from "../KimSangMin/PreUpdatePage.jsx";
import PreMain from "../KimSangMin/PreMain.jsx";
import PreCh from "../KimSangMin/PreCh.jsx";
import PreRe from "../KimSangMin/PreRe.jsx";
import PreDayCh from "../KimSangMin/PreDayCh.jsx";
import PreReSet from "../KimSangMin/PreReSet.jsx";
import PreFunction from "../KimSangMin/PreFunction.jsx";
import PastDateReservation from "../JangDaJung/PastDateReservation.jsx";
import TodayReservation from "../JangDaJung/TodayReservation.jsx";
import PreSelect from "../KimSangMin/PreSelect.jsx";
import CeoNewMenu from "../JangDaJung/CeoNewMenu.jsx";
import CeoMenuList from "../JangDaJung/CeoMenuList.jsx";
import CeoMenuListEdit from "../JangDaJung/CeoMenuListEdit.jsx";
import CeoMenuEdit from "../JangDaJung/CeoMenuEdit.jsx";
import PreWaSet from "../KimSangMin/PreWaSet.jsx";
import CeoMain from "../JangDaJung/CeoMain.jsx";
import TodayWaiting from "../JangDaJung/TodayWaiting.jsx";
import PastDateWaiting from "../JangDaJung/PastDateWaiting.jsx";
import ReservationChart from "../JangDaJung/ReservationChart.jsx";
import AdminLogin from "./layout/AdminLogin.jsx";
import PreInfoPage from "./layout/PreInfoPage.jsx";
// import PreReSetTabs from "./Owner/PreReSetTabs.jsx";
// import PreChTabs from "./Owner/PreChTabs.jsx";
import ContentDetail from "../JeonKangSan/ContentDetail.jsx";
import PreReSetTabs from "./Owner/PreChTabs.jsx";
import PreChTabs from "./Owner/PreChTabs.jsx";
import ReservationPage from "../KimSangMin/Seat/ReservationPage.jsx";

function main() {
  // pre 가 있으면 사장님 웹으로
  // 없으면 웹앱형태로
  const pathName = window.location.pathname
  const isPrePath = pathName.includes("/pre")

  return (
    <BrowserRouter>
      {isPrePath ? (
        <Routes>
          {/*<Route path="/pre/PreWait" element={<PreWait />} />  /!* 웨이팅 웹앱  *!/*/}
          {/*<Route path="/pre/PreReserve" element={<PreReserve />} />   예약 웹앱*/}

          {/* 시간 지정하기*/}
          <Route path="/pre/PreTime" element={<PreTime/>}/>
          <Route path="/pre/PreTimeSet" element={<PreTimeSet/>}/>

          {/* 관리자 -> 사장님 */}<Route path="/pre/admin" element={<AdminLogin/>}/> {/*  관리자 로그인 */}
          <Route path="/pre/reg" element={<PreRegPage/>}/> {/* 사장님 정보 입력 버튼 */}
          <Route path="/pre/info" element={<PreInfoPage/>}/> {/*  사장님 정보 입력 페이지 */}
          <Route path="/pre/login" element={<OwnerLogin/>}/> {/*  사장 로그인 */}
          <Route path="/pre/update" element={<PreUpdatePage/>}/> {/*  사장 정보 수정 */}

          <Route path="/pre" element={<OwnerLogin/>}/>
          <Route path="/pre/PreMain" element={<PreMain/>}/> {/* 예약가게 메인*/}
          {/*<Route path="/pre/PreCh" element={<PreCh/>}/> /!* 예약가게 매출 통계 *!/*/}
          <Route path="/pre/PreRe" element={<PreRe/>}/> {/* 예약가게 리뷰 보기*/}
          {/*<Route path="/pre/PreDayCh" element={<PreDayCh/>}/> /!* 예약 날짜 차트 *!/*/}
          <Route path="/pre/PreReSet1" element={<PreReSet/>}/> {/* 예약가게 셋팅 */}
          <Route path="/pre/PreReSet" element={<PreReSetTabs/>}/> {/* 예약가게 셋팅 Tabs */}
          <Route path="/pre/PreCh" element={<PreChTabs/>}/> {/* 예약가게 매출 통계 Tabs */} <Route path="/pre/PreFucn" element={
          <PreFunction/>}/> {/* 예약가게 메인*/}
          <Route path="/pre/PrePast" element={<PastDateReservation/>}/> {/* 과거 예약 */}
          <Route path="/pre/PreToday" element={<TodayReservation/>}/> {/* 오늘 예약  */}
          <Route path="/pre/PreSelect" element={<PreSelect/>}/> {/* 오늘 예약  */}

          <Route path="/pre/NewMenu" element={<CeoNewMenu/>}/> {/* 메뉴 등록 */}
          <Route path="/pre/MenuList" element={<CeoMenuList/>}/> {/* 메뉴 리스트 */}
          <Route path="/pre/MenuListEdit" element={<CeoMenuListEdit/>}/> {/* 메뉴판 수정 */}
          <Route path="/pre/MenuEdit/:menuId" element={<CeoMenuEdit/>}/> {/* 메뉴 슈정 */}

          <Route path="/pre/PreWaSet" element={<PreWaSet/>}/> {/* 웨이팅 가게 셋팅 */}
          <Route path="/pre/WaMain" element={<CeoMain/>}/> {/*웨이팅 메인 */}
          <Route path="/pre/WaToday" element={<TodayWaiting/>}/> {/* 현재 웨이팅 */}
          <Route path="/pre/WaPast" element={<PastDateWaiting/>}/> {/* 과거 웨이팅 */}
          <Route path="/pre/WaChart" element={<ReservationChart/>}/> {/* 웨이팅 차트 */}
        </Routes>
      ) : (
        <div className={'mobile-wrapper'}>

          {/*<HashRouter>*/}
          <Header/>

          <main className={'content'}>
            <Routes>
              {/*유저*/}
              <Route path={"/"} element={<MainContent/>}/>
              <Route path={"/resdetail/:resIdx"} element={<ContentDetail/>}/>

              <Route path={"/user"} element={<MyPageContent/>}/>
              <Route path={"/user/login"} element={<Login/>}/>
              <Route path={"/user/setting"} element={<UserSetting/>}/>
              <Route path={"/user/signUp"} element={<SignUp/>}/>
              <Route path={"/user/reviewList"} element={<SjhReviewList/>}/>

              <Route path={'/latestDetails'} element={<SjhReservation/>}/>
              <Route path={'/bookmark'} element={<Bookmark/>}/>

              <Route path={"/contentList/:category"} element={<ContentList/>}/>
              <Route path={"/contentDetail"} element={<ContentDetail/>}/>

              {/*<Route path={"/waiting/visit"} element={<VisitPage/>}/>*/}
              {/*<Route path={"/book/seat"} element={<SeatPage/>}/>*/}
              {/*<Route path={"/waiting/reg"} element={<WaitingRegPage/>}/>*/}
              {/*<Route path={"/waiting/info"} element={<WaitingInfoPage/>}/>*/}

              <Route path={"/book/seat"} element={<SeatPage/>}/>
              <Route path={"/book/visit/:userIdx/:resIdx"} element={<VisitPage/>}/>
              <Route path={"/book/date/:userIdx/:resIdx"} element={<DateSelectorPage/>}/>
              <Route path={"/book/menu/:userIdx/:resIdx"} element={<MenuSelectorPage/>}/>
              <Route path={"/book/seat/:userIdx/:resIdx"} element={<SeatPage/>}/>
              <Route path={"/book/menu"} element={<MenuSelectorPage/>}/>
              <Route path={"/book/reg"} element={<BookRegPage/>}/>
              <Route path={"/book/info/:resIdx"} element={<BookInfoPage/>}/>


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

          {/*</HashRouter>*/}
        </div>
      )}
    </BrowserRouter>
  );
}

export default main