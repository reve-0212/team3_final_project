import './App.css'
// import axios from "axios";
import Banner from "./KimSangMin/Banner.jsx";
import CeoMain from "./JangDaJung/CeoMain.jsx";
import LastWaiting from "./simJiHyun/LastWaiting.jsx";
import TodayWaiting from "./simJiHyun/TodayWaiting.jsx";
import PastDateWaiting from "./JangDaJung/PastDateWaiting.jsx";

function App() {
  return (
    <div>
      {/*<h1>team3 final project</h1>*/}
      {/*  <Banner/>*/}
      {/*<button type={"button"} onClick={() => axiosTest()}>테스트</button>*/}
      {/*<CeoMain />*/}
        <PastDateWaiting />
    </div>
  )
}

export default App
