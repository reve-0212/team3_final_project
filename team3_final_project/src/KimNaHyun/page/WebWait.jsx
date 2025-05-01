import React from "react";
import Button from "../components/Button.jsx";
function WebWait() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
            style={{ background: '#FFD727', color:'#5D4037', width: '100vw', height: '100vh' }}
        >
            <h1 style={{ fontSize: '100px', fontWeight: 'bold' }}>Waitable</h1>
            <button className={'web-main-btn mt-5'}>웨이팅 시작하기</button>
        </div>

    );
}

export default WebWait






