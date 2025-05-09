import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // useParams를 사용하여 URL 파라미터를 받습니다.
import axios from "axios";
// import './SeatLayout.css'; // 좌석 스타일링

const SeatLayout = () => {
    const { resIdx } = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
    const [seats, setSeats] = useState([]);
    const [seatSelect, setSeatSelect] = useState([]);

    // 좌석선택기능
    const hSeat = (seatId) => {
        setSeatSelect((prevSeatSelect) =>{
            if (prevSeatSelect.includes(seatId)){
                return prevSeatSelect.filter((id) => id !== seatId);
            }
            else{
                return [...prevSeatSelect,seatId]
            }
        })
    }



    useEffect(() => {
        if (resIdx) {
            axios.get(`http://localhost:8080/pre/loadSeat/${resIdx}`)
                .then((response) => {
                    console.log("API Response:", response.data);
                    const { success, message, data } = response.data;
                    if (success && Array.isArray(data)) {
                        setSeats(data);
                        console.log("좌석 데이터 확인:", data); // 추가
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
                    {seats.map((seat, index) => {
                        const isUnavailable = seat.type === "창문" || seat.type === "카운터" || seat.type === "입구";
                        const isSelected = seatSelect.includes(seat.seatId);
                        console.log(`좌석 ID: ${seat.seatId}, 선택 여부: ${isSelected}`);

                        return (
                            <div
                                key={`${seat.seatId}-${index}`}  // seatId와 index를 결합하여 유니크한 key 생성
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
                                    backgroundColor: isSelected ? "#32d139" : "transparent",
                                    backgroundImage: `url(${seat.image})`,
                                    backgroundSize: "cover",
                                    backgroundBlendMode: "overlay",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    border: "1px solid #999",
                                    color: "white",
                                    cursor: isUnavailable ? "not-allowed" : "pointer",  // 클릭 불가능한 좌석은 커서 변경
                                }}
                                onClick={!isUnavailable ? () => hSeat(seat.seatId) : null}  // 클릭 불가능한 좌석은 클릭 이벤트 비활성화
                            >
                                {seat.name}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>좌석 정보가 없습니다.</p>
            )}

        </div>
    );
};

export default SeatLayout;