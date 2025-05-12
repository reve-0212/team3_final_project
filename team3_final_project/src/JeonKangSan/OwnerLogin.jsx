import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import LoginSignText from "../simJiHyun/LoginSignText.jsx";

function OwnerLogin() {
  const nv = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");

  const hcUserId = (e) => setUserId(e.target.value);
  const hcUserPass = (e) => setUserPass(e.target.value);

    const hSubmit = (e) => {
        e.preventDefault();

        const userData = { userId, userPass };
        console.log(userData);

        axios.post("http://localhost:8080/pre/login", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const { success, message, token } = response.data;

                if (success) {
                    alert(message);
                    localStorage.setItem('ACCESS_TOKEN', token);
                    console.log('Stored token:', localStorage.getItem('ACCESS_TOKEN'));  // 디버깅

                    nv("/pre/PreSelect");
                } else {
                    alert("로그인 실패");
                }

                // 로그인 후, 서버에 다시 요청할 때 ACCESS_TOKEN을 사용
                const accessToken = localStorage.getItem('ACCESS_TOKEN');
                console.log('Using token:', accessToken);  // 디버깅: 헤더에 전달되는 토큰 확인

                axios.get(`http://localhost:8080/jsy/owner/login`, {
                    params: {
                        ownerId: userId,
                        ownerPw: userPass,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
                        sessionStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
                        nv("/pre/PreMain");
                    })
                    .catch((error) => {
                        console.error("Request failed:", error.response || error.message);
                        alert("서버 오류가 발생했습니다: " + (error.response?.data?.message || error.message));
                    });
            })
            .catch((err) => {
                console.error('Login error:', err);
                alert("로그인 중 오류가 발생했습니다.");
            });
    }


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
          flexDirection: 'column',
          gap: "1rem",
          marginTop: "2rem",
        }}>
        <div className="fixed-top">
          <nav className="navbar navbar-expand-lg navbar-dark"
               style={{height: '10vh', backgroundColor: '#FFD700'}}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <div style={{textAlign: 'center'}} className="text-white fs-1">Logo</div>
            </div>
          </nav>
        </div>

        <form className={"container"} onSubmit={hSubmit}>
          <div className={"row"} style={{paddingRight: '1rem'}}>
            <LoginSignText text={"사장님 로그인"}/>
          </div>

          <div className="mt-4">
            <label htmlFor="preId" className="form-label">
              아이디
            </label>
            <input
              type="text"
              className="form-control"
              id="preId"
              placeholder="아이디를 입력해주세요"
              value={userId}
              onChange={hcUserId}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="prePw" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              className="form-control"
              id="prePw"
              placeholder="비밀번호를 입력해주세요"
              value={userPass}
              onChange={hcUserPass}
              required
              style={{width: '400px'}}
            />
          </div>

          <div className={"mt-4 d-flex ms-4 me-4 justify-content-center"}>
            <button
              type={"submit"}
              className={"btn py-3 fw-bold text-light fs-5 flex-fill"}
              style={{backgroundColor: "#FFB74D", maxWidth: "400px"}}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OwnerLogin;
