import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from "../components/Button.jsx";

// VisitorBtn 컴포넌트 (버튼 클릭 시 방문자 수 조절)
function VisitorBtn({gender, count, onChange}) {
    const increase = () => {
        onChange(gender, count + 1); // 부모에게 count + 1 전달
    };

    const decrease = () => {
        onChange(gender, Math.max(0, count - 1)); // 부모에게 count - 1 전달 (0 이하로 안 가게)
    };

    return (
        <div className="d-flex justify-content-between mb-2">
            {gender === 'man' ? '남성' : gender === 'woman' ? '여성' : '유아'}
            <div style={{border: '1px solid #dddddd', padding: '0 10px', borderRadius: '10px'}}>
                <button className="prev-btn" onClick={decrease}>-</button>
                <span style={{margin: '0 10px'}}>{count}</span>
                <button className="next-btn" onClick={increase}>+</button>
            </div>
        </div>
    );
}

// VisitPage 컴포넌트 (방문 인원 선택 및 제출 처리)
function VisitPage() {
    const Nv = useNavigate();

    // 방문 인원 state
    const [visitors, setVisitors] = useState({
        man: 0,
        woman: 0,
        baby: 0,
    });

    // 수 변경 함수 (VisitorBtn에서 호출)
    const handleCountChange = (gender, quantity) => {
        setVisitors((prev) => ({
            ...prev,
            [gender]: quantity, // 선택된 성별의 수량을 업데이트
        }));
    };

    // 제출 함수
    const handleSubmit = () => {
        const total = visitors.man + visitors.woman + visitors.baby;

        const payload = {
            rsvPeople: total,
            rsvMan: visitors.man,
            rsvWoman: visitors.woman,
            rsvBaby: visitors.baby
        };

        axios.post('http://localhost:8080/api/visitors', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        })


    .
        then((res) => {
            const reservationIdx = res.data.reservationIdx;
            Nv(`/book/seat/${reservationIdx}`);// 예약 완료 후 좌석 예약 페이지로 이동
        }).catch((err) => {
            alert('전송 실패');
            console.log(err);
        });
    };

    return (
        <div className="app-container container py-4" style={{textAlign: 'left'}}>
            <h3 className="waiting-title">방문인원을 선택하세요.</h3>

            <ul>
                <li>
                    <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>성인</h3>
                    <VisitorBtn gender="man" count={visitors.man} onChange={handleCountChange}/>
                    <VisitorBtn gender="woman" count={visitors.woman} onChange={handleCountChange}/>
                </li>
            </ul>

            <ul className="pt-5 border-top">
                <li>
                    <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>유아</h3>
                    <VisitorBtn gender="baby" count={visitors.baby} onChange={handleCountChange}/>
                </li>
            </ul>

            <Button btnName="다음" onClick={handleSubmit}/>
        </div>
    );
}

export default VisitPage;


