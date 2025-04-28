import Test from "./simJiHyun/Test.jsx";
import LastWaiting from "./simJiHyun/LastWaiting.jsx";
import TodayWaiting from "./simJiHyun/TodayWaiting.jsx";

// import axios from "axios";
import Banner from "./KimSangMin/Banner.jsx";
import PreSetting from "./KimSangMin/PreSetting.jsx";
import PreTime from "./KimSangMin/PreTime.jsx";
import AdminSeatEditor from "./KimSangMin/AdminSeatEditor.jsx";
import UserSeatReservation from "./KimSangMin/UserSeatReservation.jsx";
import PreTimeSet from "./KimSangMin/PreTimeSet.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>

        <Router>
            <Routes>
                <Route path="/" element={<PreTimeSet />} /> {/* '/' 경로에 PreTime 컴포넌트 렌더링 */}
                <Route path="/pre-time-set" element={<PreTimeSet />} />
                <Route path="/pre-time" element={<PreTime />} />
                <Route path="/preSetting" element={<PreSetting />}/>
            </Routes>
        </Router>

      {/*<h1>team3 final project</h1>*/}
      {/*  <PreSetting/>*/}
      {/*  <PreTimeSet/>*/}
      {/*  <PreTime/>*/}
      {/*  <AdminSeatEditor/>*/}
      {/*  <UserSeatReservation/>*/}
      {/*<button type={"button"} onClick={() => axiosTest()}>테스트</button>*/}
    </div>
  )
}

export default App
