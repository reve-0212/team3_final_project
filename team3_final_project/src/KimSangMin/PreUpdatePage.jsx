import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReBanner from "./ReBanner.jsx";

import "./css/PreInfoPage.css";


function PreInfoPage() {
    const nv = useNavigate();

    // 사장님 정보 초기 설정
    const [userData, setUserData] = useState({
        userId: "",
        userPass: "",
        userNick: "",
        userCall: "",
        bsName: "",
        bsNumber: ""
    });

    // 입력값 변경 처리  ( 각 input에 onChange에 handleChange 적용 )
    const handleChange = (e) => {
        // input에 값을 입력할 때, 그 값을 ownerData 상태에 반영한다.
        // e.target은 이벤트가 발생한 input 태그 / name : input 태그에 설정된 name / value : 사용자가 입력한 실제 값
        const { name, value } = e.target;
        // prevData : 이전값
        setUserData((prevData) => {
            console.log("Updating:", name, value); // 변경 전값 로그 확인
            return {
            // ...prevData : 기존의 상태 값을 복사
                ...prevData,
                [name]: value,
            };
        });
    };

    // 처음화면에 나타날때 로그인된 사장님 정보를 가져와 상태에 저장한다.
    useEffect(() => {
        // 로컬 스토리지나 쿠키에서 토큰을 가져옵니다.
        const token = localStorage.getItem('token'); // 예시로 로컬 스토리지에 저장된 토큰 사용

        // 토큰이 존재하는 경우, 헤더에 Authorization을 추가해서 요청
        axios.get('http://localhost:8080/pre/getInfo', {
            headers: {
                Authorization: `Bearer ${token}`  // Bearer 방식으로 토큰을 전송
            }
        })
            .then(response => {
                console.log(response.data);
                const userData = response.data.data;
                setUserData({
                    userId: userData.userId,
                    userPass: userData.userPass,
                    userNick: userData.userNick,
                    userCall: userData.userCall,
                    bsName: userData.bsName,
                    bsNumber: userData.bsNumber,
                });
            })
            .catch(error => {
                console.error("정보 조회 오류:", error.response.data);
            });
    }, []);

    // 폼 제출 시 정보 수정 요청
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8080/owner/update', userData)
            .then(response => {
                const { success, message, data } = response.data;  // 서버 응답에서 data 추가
                if (success) {
                    alert("정보 수정 성공: " + message);

                    // 수정된 데이터를 상태에 반영
                    setUserData({
                        userId: data.userId,
                        userPass: data.userPass,
                        userNick: data.userNick,
                        userCall: data.userCall,
                        bsName: data.bsName,
                        bsNumber: data.bsNumber
                    });
                    console.log("Updated user data:", data);  // 수정된 데이터 확인

                    // 수정 후 페이지 이동
                    nv("/pre/PreMain");
                } else {
                    alert("정보 수정 실패: " + message);
                }
            })
            .catch(error => {
                alert("서버 오류가 발생했습니다: " + error);
            });
    };

    return (
        <div style={{
            marginLeft: "250px",
            paddingTop: "8rem",
            paddingLeft: "1rem",
            width: "calc(100% - 200px)",
        }} className={'container'}>
                <ReBanner/>
                {/*<form className="container mt-5 p-4 rounded shadow bg-light" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>*/}
                {/*    <h3 className="fw-bold text-center mb-4">사장님 정보</h3>*/}

                {/*    /!* 아이디 - 읽기 전용 강조 박스 *!/*/}
                {/*    <div className="mb-3">*/}
                {/*        <label className="form-label fw-bold">아이디</label>*/}
                {/*        <div className="border rounded p-2 bg-secondary text-white d-flex align-items-center">*/}
                {/*            <FaIdBadge className="me-2" />*/}
                {/*            {userData.userId || "불러오는 중..."}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* 비밀번호 *!/*/}
                {/*    <div className="mb-3">*/}
                {/*        <label className="form-label fw-bold">비밀번호</label>*/}
                {/*        <div className="border rounded p-2 bg-white d-flex align-items-center">*/}
                {/*            <FaKey className="me-2 text-muted" />*/}
                {/*            {userData.userPass || "설정되지 않음"}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* 대표자 명 *!/*/}
                {/*    <div className="mb-3">*/}
                {/*        <label className="form-label fw-bold">대표자 명</label>*/}
                {/*        <div className="border rounded p-2 bg-white d-flex align-items-center">*/}
                {/*            <FaUser className="me-2 text-muted" />*/}
                {/*            {userData.userNick || "미입력"}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* 대표자 번호 *!/*/}
                {/*    <div className="mb-3">*/}
                {/*        <label className="form-label fw-bold">대표자 번호</label>*/}
                {/*        <div className="border rounded p-2 bg-white d-flex align-items-center">*/}
                {/*            <FaPhone className="me-2 text-muted" />*/}
                {/*            {userData.userCall || "미입력"}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* 사업장 이름 *!/*/}
                {/*    <div className="mb-3">*/}
                {/*        <label className="form-label fw-bold">사업장 이름</label>*/}
                {/*        <div className="border rounded p-2 bg-white d-flex align-items-center">*/}
                {/*            <FaStore className="me-2 text-muted" />*/}
                {/*            {userData.bsName || "미입력"}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* 사업자 번호 *!/*/}
                {/*    <div className="mb-3">*/}
                {/*        <label className="form-label fw-bold">사업자 번호</label>*/}
                {/*        <div className="border rounded p-2 bg-white d-flex align-items-center">*/}
                {/*            <FaIdBadge className="me-2 text-muted" />*/}
                {/*            {userData.bsNumber || "미입력"}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="text-center mt-4">*/}
                {/*        <button type="submit" className="btn btn-warning px-4 fw-bold">*/}
                {/*            수정하기*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</form>*/}


                <div className="profile-container">
                    {/* 프로필 카드 */}
                    <div className="profile-card">
                        <div className="title-container">
                            <h1 className="profile-title">아웃백 스테이크</h1>
                            <p className="profile-subtitle">111-01-12312</p>
                        </div>

                        <img src="/images/profile.jpg" alt="프로필" className="profile-image" />
                        <div className="profile-info">
                            <h2>홍길동</h2>
                            <p>gildong@example.com</p>
                            <span>가입일: 2024-01-15</span>
                        </div>
                        <button className="edit-button">정보 수정</button>
                    </div>

                    {/* 비밀번호 변경 */}
                    <div className="password-section">
                        <h3>비밀번호 변경</h3>
                        <input type="password" placeholder="현재 비밀번호" />
                        <input type="password" placeholder="새 비밀번호" />
                        <input type="password" placeholder="새 비밀번호 확인" />
                        <button className="change-password-button">비밀번호 변경</button>
                    </div>
                </div>
        </div>
    );
}

export default PreInfoPage;
