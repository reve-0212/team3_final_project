import LoginSignText from "../simJiHyun/LoginSignText.jsx";
import LoginText from "../simJiHyun/login/LoginText.jsx";
import "../simJiHyun/SjhCss.css"
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";


function OwnerLogin() {
    const nv = useNavigate();

    const [ownerId, setOwnerId] = useState("");
    const [ownerPass, setOwnerPass] = useState("");

    const hcOwnerId = (e) => setOwnerId(e.target.value);
    const hcOwnerPass = (e) => setOwnerPass(e.target.value);

    const hSubmit = (e) => {
        e.preventDefault();

        const ownerData = {ownerId, ownerPass};


        axios.post("http://localhost:8080/owner/login", ownerData , { withCredentials: true })
            .then((response) => {
                const { success, message } = response.data;

                if(success) {
                    alert(message)
                    nv("/pre/PreSelect")
                }
                else {
                    alert("로그인 실패")
                }
            })
            .catch( (error) => {
                alert("서버 오류가 발생했습니다" + error)
            })
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
                }}
            >


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
                            value={ownerId}
                            onChange={hcOwnerId}
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
                            value={ownerPass}
                            onChange={hcOwnerPass}
                            required
                            style={{ width: '400px' }}
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
