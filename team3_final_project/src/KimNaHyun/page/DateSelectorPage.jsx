
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Button from "../components/Button.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";

function DateTimeSelectorPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const resIdx = useRestaurantStore((state) => state.restaurantIdx);
    console.log(resIdx);

    const Nv = useNavigate();

    // 9시부터 19시까지 1시간 단위 시간 슬롯 생성
    const timeSlots = [];
    for (let hour = 9; hour <= 19; hour++) {
        let hourStr = hour < 10 ? `0${hour}:00` : `${hour}:00`;
        timeSlots.push(hourStr);
    }

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = () => {
        if (!selectedDate || !selectedTime) {
            alert("날짜와 시간을 모두 선택해주세요.");
            return;
        }
        const rsvDate = selectedDate
        const rsvTime = selectedTime

        console.log("rsvDate", rsvDate);
        console.log("rsvTime", rsvTime);


        // 날짜 포맷 (KST 기준)
        const formattedDate = selectedDate.toLocaleDateString('sv-SE'); // yyyy-MM-dd


        const userIdx = 1; // 임의 사용자 ID
        const resIdx = 1; // 임의 예약 ID

        axios.post(`http://localhost:8080/api/date/${userIdx}/${resIdx}`, {
            rsvDate: formattedDate,
            rsvTime: `${formattedDate} ${selectedTime}:00`,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
            }
        })
            .then((res) => {
                const newReservationIdx = res.data.reservationIdx || resIdx;
                Nv(`/book/seat/${userIdx}/${newReservationIdx}`);
            })
            .catch((err) => {
                alert('전송 실패');
                console.error(err);
            });
    };


    return (
        <div className="app-container container py-4">
            <h3 className="waiting-title">방문 일시를 선택하세요</h3>

            {/* 날짜 선택 */}
            <section className="mb-4">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                    inline
                />
                {selectedDate && (
                    <p className={'basic-font fw-bold'} style={{ marginTop: "10px" }}>
                        선택한 날짜: {selectedDate.toLocaleDateString()}
                    </p>
                )}
            </section>

            {/* 시간 선택 */}
            <section className="mb-4">
                <h5>시간 선택</h5>
                <div>
                    {timeSlots.map((time, index) => (
                        <button
                            key={index}
                            onClick={() => handleTimeSelect(time)}
                            style={{
                                margin: "5px",
                                padding: "7px 20px",
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                border: "1px solid #ccc",
                                borderRadius: "15px",
                                backgroundColor: selectedTime === time ? "#5D4037" : "#fff",
                                color: selectedTime === time ? "#fff" : "#000",
                            }}
                        >
                            {time}
                        </button>
                    ))}
                </div>
                {selectedTime && (
                    <p className={'basic-font fw-bold'} style={{ marginTop: "10px" }}>선택한 시간: {selectedTime}</p>
                )}
            </section>

            {/* 다음 버튼 */}
            <Button btnName="다음" onClick={handleSubmit} />
        </div>
    );
}

export default DateTimeSelectorPage;






