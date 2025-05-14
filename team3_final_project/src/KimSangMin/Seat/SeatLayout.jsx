import React, { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router-dom";  // useParams를 사용하여 URL 파라미터를 받습니다.
import axios from "axios";
// import './SeatLayout.css'; // 좌석 스타일링

const SeatLayout = () => {
  const {resIdx} = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
  const [seats, setSeats] = useState([]);
  const location = useLocation();
    const totalPeople = location.state?.totalPeople || 0;
    const [seatSelect, setSeatSelect] = useState([]);

  // 좌석선택기능
  const hSeat = (seatId) => {
    setSeatSelect((prevSeatSelect) => {
      if (prevSeatSelect.includes(seatId)) {
        return prevSeatSelect.filter((id) => id !== seatId);
      } else {
        return [...prevSeatSelect, seatId];
      }
    });
  };

    useEffect(() => {
        if (resIdx) {
            axios.get(`http://localhost:8080/pre/owner/loadSeat/${resIdx}`)
                .then((response) => {
                    console.log(response.data);
                    const { success, data } = response.data;
                    if (success && Array.isArray(data)) {
                        // 🎯 좌석 필터링 조건 적용
                        let filteredSeats = data;

                        if (totalPeople <= 2) {
                            filteredSeats = data.filter(seat => seat.type === '2인석');
                        } else if (totalPeople <= 4) {
                            filteredSeats = data.filter(seat => seat.type === '4인석');
                        } else if (totalPeople <= 6) {
                            filteredSeats = data.filter(seat => seat.type === '6인석');
                        } // 7명 이상은 전체 표시

                        setSeats(filteredSeats);
          }
        })
        .catch((error) => {
          console.error("좌석 정보 불러오기 실패:", error);
                });
        }
    }, [resIdx, totalPeople]);

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
            width: "71%",
            maxWidth: "800px",
            height: "350px",
            border: "1px solid #ddd",
              backgroundColor: "lightgray",
          }}
        >
          {seats.map((seat, index) => {
            const isUnavailable = seat.type === "창문" || seat.type === "입구";
            const isSelected = seatSelect.includes(seat.seatId);
            console.log(`좌석 ID: ${seat.seatId}, 선택 여부: ${isSelected}`);

            const seatWidth = seat.type === "4인석" ? "80px" : seat.type === "6인석" ? "100px" : "50px";
            const seatHeight = seat.type === "6인석" ? "100px" : seat.type === "4인석" ? "80px" : "50px";

            return (
              <div
                key={`${seat.seatId}-${index}`}  // seatId와 index를 결합하여 유니크한 key 생성
                className="seat"
                style={{
                  position: "absolute",
                  left: `${seat.x}px`,
                  top: `${seat.y}px`,
                  width: seatWidth,
                  height: seatHeight,
                  borderRadius: seat.shape === "square" ? "50%" : "0%",
                  backgroundColor: isSelected ? "#32d139" : "transparent",
                  backgroundImage: `url(${seat.image})`,
                  backgroundSize: "contain",  // 이미지 크기를 부모 영역에 맞게 설정
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: "12px",
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
          <div
              className="seat-layout"
              style={{
                  position: "relative",
                  width: "71%",
                  maxWidth: "800px",
                  height: "350px",
                  border: "1px solid #ddd",
              }}
          >
              <p>좌석 정보가 없습니다.</p>
          </div>
      )}
    </div>
  );
};

export default SeatLayout;