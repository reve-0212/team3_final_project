import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axios.js";

function PreInfoPage() {
    const nv = useNavigate();

    const [userId, setUserId] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userNick, setUserNick] = useState("");
    const [userCall, setUserCall] = useState("");
    const [bsName, setBsName] = useState("");
    const [bsNumber, setBsNumber] = useState("");

    const handleChangeUserId = (e) => setUserId(e.target.value);
    const handleChangeUserPass = (e) => setUserPass(e.target.value);
    const handleChangeUserNick = (e) => setUserNick(e.target.value);
    const handleChangeUserCall = (e) => setUserCall(e.target.value);
    const handleChangeBsName = (e) => setBsName(e.target.value);
    const handleChangeBsNumber = (e) => setBsNumber(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 서버로 보낼 데이터 객체 (DB 컬럼 이름에 맞게 수정)
        const userData = {
            userId, userPass, userNick, userCall, bsName, bsNumber
        }

        // 회원가입 요청
        api.post('/pre/signup', userData)
            .then((response) => {
                const { success, message } = response.data;

                if (success) {
                    alert("가입 성공: " + message);
                    nv("/pre/reg");
                } else {
                    alert("가입 실패: " + message);
                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data || "서버 오류가 발생했습니다.";
                alert(errorMessage);
            });
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "2rem",
            }}>
                <div className="fixed-top">
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: "10vh", backgroundColor: "#FFD700" }}>
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <div style={{ textAlign: "center" }} className="text-white fs-1">
                                Logo
                            </div>
                        </div>
                    </nav>
                </div>

                <form className="info-form" onSubmit={handleSubmit}>
                    <h3 style={{ fontWeight: "bold" }} className="pt-5 text-center">
                        사장님 정보등록
                    </h3>
                    <div className="mt-4 d-flex justify-content-center flex-column align-items-center">
                        <div className="mt-4">
                            <label htmlFor="userId" className="form-label">아이디</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userId"
                                placeholder="아이디를 입력해주세요"
                                value={userId}
                                onChange={handleChangeUserId}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="userPass" className="form-label">비밀번호</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userPass"
                                placeholder="비밀번호를 입력해주세요"
                                value={userPass}
                                onChange={handleChangeUserPass}
                                required
                                style={{ width: '400px' }}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="userNick" className="form-label">대표자 명</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userNick"
                                placeholder="대표자명을 입력해주세요"
                                value={userNick}
                                onChange={handleChangeUserNick}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="userCall" className="form-label">대표자 번호</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userCall"
                                placeholder="대표자 번호를 입력해주세요"
                                value={userCall}
                                onChange={handleChangeUserCall}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bsName" className="form-label">사업장 이름</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bsName"
                                placeholder="사업장 이름을 입력해주세요"
                                value={bsName}
                                onChange={handleChangeBsName}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bsNumber" className="form-label">사업자 번호</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bsNumber"
                                placeholder="사업자 번호를 입력해주세요"
                                value={bsNumber}
                                onChange={handleChangeBsNumber}
                            />
                        </div>
                    </div>

                    <div className="mt-5 mb-5 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: "#FFD727", padding: "10px 20px" }}
                        >
                            등록 하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PreInfoPage;
