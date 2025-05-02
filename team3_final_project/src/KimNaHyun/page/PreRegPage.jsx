import ReBanner from "../../KimSangMin/ReBanner.jsx";
import {Link} from "react-router-dom";

function PreRegPage() {
    return (
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}>

          <div
              style={{
                display: "flex",
                flexDirection:'column',
                gap: "1rem",
                marginTop: "2rem",
              }}
          >
            <div className="fixed-top">
              <nav className="navbar navbar-expand-lg navbar-dark"
                   style={{ height: '10vh', backgroundColor: '#FFD700' }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                      <div style={{textAlign:'center'}} className="text-white fs-1">Logo</div>
                </div>
              </nav>
            </div>

          <button style={{width:"300px",height:"80px", fontWeight:'bold', fontSize:'30px', color:'#5D4037', border:'none',borderRadius:'20px',backgroundColor:'#FFD727'}}>사장님 등록</button>
          </div>
          <h4 style={{marginTop:'30px',color:'#5D4037', textAlign:'center'}}> 사장님 등록 버튼을 눌러 정보를 기입해주세요 :)</h4>
        </div>
    );
}

export default PreRegPage






