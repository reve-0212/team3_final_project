import {Link, useNavigate} from "react-router-dom";
import {logout} from "../simJiHyun/service/ApiService.js";
import useUserStore from "../stores/useUserStore.jsx";

import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";

function ReBanner() {

    const nv = useNavigate();
    const {clearUser} = useUserStore();
    const [remainingTime, setRemainingTime] = useState("Loading...");

    const getRemainingTime = () => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const expiryTime = decodedToken.exp * 1000;
                const currentTime = Date.now();
                const remainingTime = expiryTime - currentTime;

                if (remainingTime > 0) {
                    const minutes = Math.floor(remainingTime / 60000);
                    const seconds = Math.floor((remainingTime % 60000) / 1000);
                    return { status: "valid", display: `${minutes}분 ${seconds}초` };
                } else {
                    localStorage.removeItem("ACCESS_TOKEN");
                    clearUser();
                    return { status: "expired", display: "만료됨" };
                }
            } catch (e) {
                console.error("토큰 디코딩 실패:", e);
                localStorage.removeItem("ACCESS_TOKEN");
                clearUser();
                return { status: "invalid", display: "잘못된 토큰" };
            }
        }

        return { status: "none", display: "토큰 없음" };
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const result = getRemainingTime();
            setRemainingTime(result.display);

            if (result.status === "expired" || result.status === "invalid") {
                logout();
                clearUser();
                nv("/pre");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        const confirmed = window.confirm("로그아웃 하시겠습니까?");
        if (confirmed) {
            logout()
            clearUser();
            nv("/pre");
        }
    };


    // 토큰 보내서 userIdx 찾고 찾은걸로 resIdx res.data로 뽑아내기
    const handleClick = () => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        // 토큰으로 userIdx를 서버에서 파악
        axios.get(`http://localhost:8080/pre/resIdxByUser`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            const resIdx = res.data;
            if (resIdx) {
                nv(`/pre/PreToday/${resIdx}`);
            } else {
                alert("등록된 레스토랑이 없습니다.");
            }
        }).catch((err) => {
            console.error("등록된 레스토랑 조회 실패:", err);
            alert("레스토랑 정보를 가져오는 데 실패했습니다.");
        })
    };

    return (
        <div>
            <div className="fixed-top">
                <nav className="navbar navbar-expand-lg navbar-dark"
                     style={{height: '10vh', backgroundColor: '#FFD700'}}>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <Link className="navbar-brand text-white fs-1 text-align-center" to="/pre/PreMain">
                            Logo
                        </Link>
                        <span className="text-white" style={{ marginRight: '10px' }}>
                            남은 시간: {remainingTime}
                        </span>
                        <button type={"button"} onClick={handleLogout} className={"flex-end"}>로그아웃</button>
                    </div>
                </nav>
            </div>

            {/* 옆 사이드바 */}
            <div style={{
                position: 'fixed',
                top: '10vh',
                left: 0,
                width: '200px',
                height: '90vh',
                backgroundColor: '#FAFAFA',
                color: 'white',
                padding: '1rem'
            }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreMain">홈</a>
                    </li>
                    <br/>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/update">개인정보 수정</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreReSet">가게정보</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreCh">가게통계</a>
                    </li>
                    <br/>

                    <li className="nav-item">
                        <a onClick={handleClick} className="nav-link text-black" style={{ cursor: "pointer" }}>
                            오늘 예약
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PrePast">지난날짜 예약</a>
                    </li>
                    <br/>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/MenuList">가게메뉴</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-black" href="/pre/PreRe">리뷰관리</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ReBanner

