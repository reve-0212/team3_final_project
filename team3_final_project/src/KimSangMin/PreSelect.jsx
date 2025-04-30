import Banner from "./Banner.jsx";
import {Link} from "react-router-dom";

function PreSelect() {
    return (
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}>

          <Banner />
          <h2>가게 설정 </h2>

          <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
              }}
          >

         <Link to="/PreWaSet"><button style={{width:"300px",height:"300px"}}>웨이팅 전용 <br/>가게설정</button></Link>
            <Link to="/PreReSet"><button style={{width:"300px",height:"300px"}}>예약 전용 <br/>가게설정</button></Link>

          </div>

          <h4 style={{marginTop:'30px',color:'#D9D9D9'}}>가게 설정은 최초 선택시에만 설정이 가능합니다. <br/>
            수정이 불가하오니 첫 선택 시 신중하게 선택하시길 바랍니다.</h4>
        </div>
    );
}

export default PreSelect

