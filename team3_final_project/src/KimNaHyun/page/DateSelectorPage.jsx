
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Button from "../components/Button.jsx";

function DateTimeSelectorPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
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

        // 날짜 포맷 (KST 기준)
        const formattedDate = selectedDate.toLocaleDateString('sv-SE'); // yyyy-MM-dd

        const payload = {
            rsvDate: formattedDate,
            rsvTime: `${formattedDate} ${selectedTime}:00`, // DATETIME용
        };

        axios
            .post("http://localhost:8080/api/visitors/date/menus", payload)
            .then(() => {
                console.log(payload);
                alert("예약 정보가 저장되었습니다.");
                Nv("/book/menu");
            })
            .catch(() => {
                console.log(formattedDate,selectedTime);
                console.log(payload);
                alert("예약 저장에 실패했습니다.");
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
                    <p style={{ marginTop: "10px" }}>
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
                    <p style={{ marginTop: "10px" }}>선택한 시간: {selectedTime}</p>
                )}
            </section>

            {/* 다음 버튼 */}
            <Button btnName="다음" onClick={handleSubmit} />
        </div>
    );
}

export default DateTimeSelectorPage;






