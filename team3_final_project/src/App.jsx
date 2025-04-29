import KnhApp from "./KimNaHyun/KnhApp.jsx";
import PreSetting from "./KimSangMin/PreSetting.jsx";
import PreTime from "./KimSangMin/PreTime.jsx";
import PreTimeSet from "./KimSangMin/PreTimeSet.jsx";
import SjhApp from "./simJiHyun/SjhApp.jsx";
import Main from "./JeongSeongYun/main.jsx";
import MainContent from "./JeongSeongYun/layout/MainContent.jsx";
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
