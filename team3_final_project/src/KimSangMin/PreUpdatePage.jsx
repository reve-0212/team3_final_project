import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReBanner from "./ReBanner.jsx";

import "./css/PreInfoPage.css";


function PreInfoPage() {
    const nv = useNavigate();
    const token = localStorage.getItem('ACCESS_TOKEN');
    const [OwnerList, setOwnerList] = useState([]);

    // // 처음화면에 나타날때 로그인된 사장님 정보를 가져와 상태에 저장한다.
    // useEffect(() => {
    //     // 로컬 스토리지나 쿠키에서 토큰을 가져옵니다.
    //     const token = localStorage.getItem('token'); // 예시로 로컬 스토리지에 저장된 토큰 사용
    //
    //     // 토큰이 존재하는 경우, 헤더에 Authorization을 추가해서 요청
    //     axios.get('http://localhost:8080/pre/getInfo', {
    //         headers: {
    //             Authorization: `Bearer ${token}`  // Bearer 방식으로 토큰을 전송
    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             const userData = response.data.data;
    //             setUserData({
    //                 userId: userData.userId,
    //                 userPass: userData.userPass,
    //                 userNick: userData.userNick,
    //                 userCall: userData.userCall,
    //                 bsName: userData.bsName,
    //                 bsNumber: userData.bsNumber,
    //             });
    //         })
    //         .catch(error => {
    //             console.error("정보 조회 오류:", error.response.data);
    //         });
    // }, []);


    useEffect(() => {
        axios.get(`http://localhost:8080/pre/owner/Profile`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => {
            console.log(res.data);
            setOwnerList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div style={{
            marginLeft: "250px",
            paddingTop: "8rem",
            paddingLeft: "1rem",
            width: "calc(100% - 200px)",
            maxWidth: "165vh",
            minHeight: "100vh",
        }} className={'container'}>
                <ReBanner/>
                <div className="profile-container">
                    {/* 프로필 카드 */}
                    <div className="profile-card">
                        <div className="title-container">
                            <h1 className="profile-title">{OwnerList[0]?.bsName || "사업장 이름"}</h1>
                            <p className="profile-subtitle">{OwnerList[0]?.bsNumber || "사업자 번호"}</p>
                        </div>

                        <img
                             src={OwnerList[0]?.resImge1 && OwnerList[0].resImge1.trim() !== "" ? OwnerList[0].resImge1 : "/images/user.jpg"}
                             alt="프로필"
                             className="profile-image"
                        />
                        <div className="profile-info mb-4 mt-4">
                            <h2>{OwnerList[0]?.userNick || "닉네임"}</h2>
                            <p>{OwnerList[0]?.userEmail || "이메일"}</p>
                            <span>{OwnerList[0]?.userCall || "전화번호"}</span>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default PreInfoPage;
