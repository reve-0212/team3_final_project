import {Link, useNavigate} from "react-router-dom";
import useUserStore from "../stores/useUserStore.jsx";

import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ReBanner() {
  const logout = () => {
    localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.setItem("REFRESH_TOKEN", null);
    sessionStorage.removeItem("REFRESH_TOKEN");
  }

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
          return {status: "valid", display: `${minutes}분 ${seconds}초`};
        } else {
          localStorage.removeItem("ACCESS_TOKEN");
          clearUser();
          return {status: "expired", display: "만료됨"};
        }
      } catch (e) {
        console.error("토큰 디코딩 실패:", e);
        localStorage.removeItem("ACCESS_TOKEN");
        clearUser();
        return {status: "invalid", display: "잘못된 토큰"};
      }
    }

    return {status: "none", display: "토큰 없음"};
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
  const handleNaviClick = (type) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    axios.get(`http://localhost:8080/pre/resIdxByUser`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      const resIdx = res.data;
      if (resIdx) {
        let path = "";
        switch (type) {
          case "PreToday":
            path = `/pre/PreToday/${resIdx}`;
            break;
          case "PrePast":
            path = `/pre/PrePast/${resIdx}`;
            break;
          case "PreMenuList":
            path = `/pre/PreMenuList/${resIdx}`;
            break;
          case "PreRe":
            path = `/pre/PreRe/${resIdx}`;
            break;
          case "PreCh":
            path = `/pre/PreCh/${resIdx}`;
            break;
          case "PreMain":
            path = `/pre/PreMain/${resIdx}`;
            break;
          // 다른 타입도 필요하면 추가 가능
          default:
            path = `/pre/PreMain/${resIdx}`;
        }
        nv(path);
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
    });
  };


  return (
    <div>
      <div className="fixed-top">
        <nav className="navbar navbar-expand-lg navbar-dark"
             style={{height: '10vh', backgroundColor: '#FFD700'}}>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <a onClick={() => handleNaviClick("PreMain")} className="navbar-brand text-white fs-1 text-align-center"
               style={{cursor: "pointer"}}>
              LOGO
            </a>
            <span className="text-white" style={{marginRight: '10px'}}>
                            남은 시간: {remainingTime}
                        </span>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm px-3 py-2 rounded-pill"
              style={{
                fontWeight: "bold",
                borderWidth: "2px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease-in-out"
              }}
            >
              로그아웃
            </button>
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
            <a onClick={() => handleNaviClick("PreMain")} className="nav-link text-black" style={{cursor: "pointer"}}>
              홈
            </a>
          </li>
          <br/>

          <li className="nav-item">
            <a className="nav-link text-black" href="/pre/update">개인정보</a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-black" href="/pre/PreReSet">가게정보</a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleNaviClick("PreCh")} className="nav-link text-black" style={{cursor: "pointer"}}>
              가게 통계
            </a>
          </li>
          <br/>

          <li className="nav-item">
            <a onClick={() => handleNaviClick("PreToday")} className="nav-link text-black" style={{cursor: "pointer"}}>
              오늘 예약
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleNaviClick("PrePast")} className="nav-link text-black" style={{cursor: "pointer"}}>
              예약 내역
            </a>
          </li>
          <br/>
          <li className="nav-item">
            <a onClick={() => handleNaviClick("PreMenuList")} className="nav-link text-black"
               style={{cursor: "pointer"}}>
              가게 메뉴
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => handleNaviClick("PreRe")} className="nav-link text-black" style={{cursor: "pointer"}}>
              리뷰 관리
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReBanner

