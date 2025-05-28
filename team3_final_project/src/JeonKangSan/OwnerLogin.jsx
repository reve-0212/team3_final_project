import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginSignText from "../simJiHyun/LoginSignText.jsx";
import Swal from "sweetalert2";
import api from "../api/axios.js"

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

        api.post("/pre/login", userData,{
            headers : {
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                const { success, message } = res.data;  // 서버에서 토큰을 반환받음
                if (success) {
                    alert(message);

                    // JWT 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('ACCESS_TOKEN', res.data.data.accessToken);
                    sessionStorage.setItem('REFRESH_TOKEN', res.data.data.refreshToken);

                    const token = res.data.data.accessToken;
                    api.get(`/pre/resIdxByUser`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((res) => {
                        const resIdx = res.data;
                        if(resIdx){
                            nv(`/pre/PreMain/${resIdx}`);
                        }
                    }).catch((err) => {
                        if (err.response && err.response.status === 404) {
                            Swal.fire({
                                icon: 'warning',
                                title: '알림',
                                html: `<strong style="color:crimson;">등록된 <b>가게</b> · <b>레스토랑</b></strong>이 없습니다.<br/>
                                        <span>가게 · 레스토랑 정보를 등록해 주세요.</span>`,
                                confirmButtonText: '확인'
                            })
                            nv(`/pre/PreReSet`);
                        } else {
                            console.error("등록된 가게 · 레스토랑 조회 실패:", err);
                            alert("가게 · 레스토랑 정보를 가져오는 데 실패했습니다.");
                        }
                    })

                } else {
                    alert("로그인 실패");
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

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
                         style={{ height: '10vh', backgroundColor: '#FFD700' }}>
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <div style={{ textAlign: 'center' }} className="text-white fs-1">Logo</div>
                        </div>
                    </nav>
                </div>

                <form className={"container"} onSubmit={hSubmit}>
                    <div className={"row"} style={{ paddingRight: '1rem' }}>
                        <LoginSignText text={"사장님 로그인"} />
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
                            style={{ width: '400px' }}
                        />
                    </div>

                    <div className={"mt-4 d-flex ms-4 me-4 justify-content-center"}>
                        <button
                            type={"submit"}
                            className={"btn py-3 fw-bold text-light fs-5 flex-fill"}
                            style={{ backgroundColor: "#FFB74D", maxWidth: "400px" }}
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
