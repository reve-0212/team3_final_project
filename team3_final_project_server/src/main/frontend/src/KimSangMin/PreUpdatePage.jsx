import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReBanner from "./ReBanner.jsx";

import "./css/PreInfoPage.css";


function PreInfoPage() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const [OwnerList, setOwnerList] = useState([]);



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
                             src={OwnerList[0]?.resImage1 && OwnerList[0].resImage1.trim() !== "" ? OwnerList[0].resImage1 : "/images/user.jpg"}
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
