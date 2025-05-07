import Button from "../components/Button.jsx";
import VisitorBtn from "../components/VisitorBtn.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function VisitPage() {
    const Nv = useNavigate()

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


    const handleSubmit = () => {
        const total = visitors.man + visitors.woman + visitors.baby;

        const payload = {
            reservationPeople: total,
            rsvMan : visitors.man,
            rsvWoman : visitors.woman,
            rsvBaby: visitors.baby
        };

        axios.post('http://localhost:8080/api/visitors', payload)
            .then(() => {
                console.log(payload);
                Nv('/waiting/seat')
            }).catch(() => {
                alert('전송 실패');
        })
    };

    return (
        <div className="app-container container py-4" style={{ textAlign: 'left' }}>
            <h3 className="waiting-title">방문인원을 선택하세요.</h3>

            <ul>
                <li>
                    <h3 style={{ fontWeight: 'bold', fontSize: '20px' }}>성인</h3>
                    <VisitorBtn gender="man" count={visitors.man} onChange={handleCountChange} />
                    <VisitorBtn gender="woman" count={visitors.woman} onChange={handleCountChange} />
                </li>
            </ul>

            <ul className="pt-5 border-top">
                <li>
                    <h3 style={{ fontWeight: 'bold', fontSize: '20px' }}>유아</h3>
                    <VisitorBtn gender="baby" count={visitors.baby} onChange={handleCountChange} />
                </li>
            </ul>

            <Button btnName="다음" onClick={handleSubmit} />
        </div>

    );
}


export default VisitPage






