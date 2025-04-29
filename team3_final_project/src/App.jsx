import './App.css'
import axios from "axios";

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
     <KnhApp />
    </div>
  )
}

export default App
