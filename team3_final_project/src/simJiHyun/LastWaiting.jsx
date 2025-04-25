import SjhNav from "./SjhNav.jsx";
import SjhLSideBar from "./SjhLSideBar.jsx";

function LastWaiting() {
  return (
    <div>
      <SjhNav/>

      <div className={"row"}>
        <SjhLSideBar/>

        <div className={"col mt-5 ms-5"}>
          <p className={"fs-3"}>웨이팅 내역</p>
          <hr className={"me-5"}/>
        </div>
      </div>
    </div>
  )
    ;
}

export default LastWaiting