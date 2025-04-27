import SjhNav from "./SjhNav.jsx";
import SjhLSideBar from "./SjhLSideBar.jsx";

function TodayWaiting() {
  return (
    <div>
      <SjhNav/>

      <div className={"row"}>
        <SjhLSideBar/>

        <div className={"col mt-5 ms-5 d-flex"}>
          <p className={"fs-3 me-3"} style={{color:'#989898'}}>현재 웨이팅</p>
          <p className={"fs-3"}>지난 웨이팅</p>
        </div>
      </div>
    </div>
  );
}

export default TodayWaiting