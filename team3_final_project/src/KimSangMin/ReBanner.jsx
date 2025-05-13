import {Link, useNavigate} from "react-router-dom";
import {logout} from "../simJiHyun/service/ApiService.js";
import useUserStore from "../stores/useUserStore.jsx";

import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

function ReBanner() {

    const nv = useNavigate();
    const {clearUser} = useUserStore();
    const [remainingTime, setRemainingTime] = useState("Loading...");

    const getRemainingTime = () => {
        const token = localStorage.getItem("ACCESS_TOKEN");  // JWT 토큰이 저장된 위치 (localStorage, 쿠키 등)
        if (token) {
            const decodedToken = jwtDecode(token);  // JWT 디코드
            const expiryTime = decodedToken.exp * 1000;  // exp는 초 단위로 제공되므로 밀리초로 변환
            const currentTime = Date.now();
            const remainingTime = expiryTime - currentTime;

            if (remainingTime > 0) {
                const minutes = Math.floor(remainingTime / 60000);
                const seconds = Math.floor((remainingTime % 60000) / 1000);
                return `${minutes}분 ${seconds}초`;
            }
        }
        return "만료됨";
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime);
        })
    },1000)

    const handleLogout = () => {
        const confirmed = window.confirm("로그아웃 하시겠습니까?");
        if (confirmed) {
            logout()
            clearUser();
            nv("/pre");
        }
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
                        <a className="nav-link text-black" href="/pre/PreToday/1">오늘 예약</a>
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

