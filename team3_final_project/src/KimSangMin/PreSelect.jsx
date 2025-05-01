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
          <h2>가게 설정</h2>

          <div
              style={{
                display: "flex",
                flexDirection:'column',
                gap: "1rem",
                marginTop: "2rem",
              }}
          >

         <Link to="/PreWaSet"><button style={{width:"300px",height:"80px", fontSize:'30px',border:'none',borderRadius:'20px',backgroundColor:'#FFD727'}}>웨이팅 전용</button></Link>
            <Link to="/PreReSet"><button style={{width:"300px",height:"80px", fontSize:'30px',border:'none',borderRadius:'20px',backgroundColor:'#FFD727'}}>예약 전용 </button></Link>

          </div>

          <h4 style={{marginTop:'30px',color:'#5D4037',fontWeight:'bold'}}>가게 설정은 최초 선택시에만 설정이 가능합니다. <br/>
            수정이 불가하오니 첫 선택 시 신중하게 선택하시길 바랍니다.</h4>
        </div>
    );
}

export default PreSelect

