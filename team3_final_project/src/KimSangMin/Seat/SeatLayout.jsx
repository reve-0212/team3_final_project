import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // useParams를 사용하여 URL 파라미터를 받습니다.
import axios from "axios";
// import './SeatLayout.css'; // 좌석 스타일링

const SeatLayout = () => {
    const { resIdx } = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        if (resIdx) {
            axios.get(`http://localhost:8080/pre/loadSeat/${resIdx}`)
                .then((response) => {
                    console.log("API Response:", response.data);
                    const { success, message, data } = response.data;
                    if (success && Array.isArray(data)) {
                        setSeats(data);
                    } else {
                        console.error(message);
                    }
                })
                .catch((error) => {
                    console.error("좌석 정보를 불러오는 중 오류 발생:", error);
                });
        } else {
            console.error("resIdx 값이 없습니다.");
        }
    }, [resIdx]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "8rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
            }}
        >
            {Array.isArray(seats) && seats.length > 0 ? (
                <div
                    className="seat-layout"
                    style={{
                        position: "relative",
                        width: "71%",         // 전체 화면의 80% 너비로 설정
                        maxWidth: "800px",    // 최대 너비 제한
                        height: "350px",
                        border: "1px solid #ddd",
                    }}
                >
                    {seats.map((seat) => (
                        <div
                            key={seat.seatId}
                            className="seat"
                            style={{
                                position: "absolute",
                                left: `${seat.x}px`,
                                top: `${seat.y}px`,
                                width:
                                    seat.type === "단체석" || seat.type === "단체룸"
                                        ? "100px"
                                        : "60px",
                                height:
                                    seat.type === "단체석" || seat.type === "단체룸"
                                        ? "100px"
                                        : "60px",
                                borderRadius: seat.shape === "square" ? "50%" : "0%",
                                backgroundColor: "#ccc",
                                backgroundImage: `url(${seat.image})`,
                                backgroundSize: "cover",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                fontSize: "12px",
                                border: "1px solid #999",
                                color: "white",
                                cursor: "default",
                            }}
                        >
                            {seat.name}
                        </div>
                    ))}
                </div>
            ) : (
                <p>좌석 정보가 없습니다.</p>
            )}
        </div>

    );
};

export default SeatLayout;
