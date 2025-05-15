import React, {useEffect, useState} from "react";
import axios from "axios";
import useSeatIdStore from "../stores/useSeatIdStore.jsx";
import useRestaurantStore from "../stores/useRestaurantStore.jsx";
// import './SeatLayout.css'; // 좌석 스타일링

const SeatLayout = () => {
  // const {resIdx} = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
  const [seats, setSeats] = useState([]);
  const [seatSelect, setSeatSelect] = useState([]);
  const setSeatId = useSeatIdStore((state) => state.setSeatId)
  const seatId = useSeatIdStore((state) => state.seatId)
  const useResIdx = useRestaurantStore((state) => state.restaurantIdx)

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

  // 좌석 정보 불러오기
  useEffect(() => {
    if (useResIdx) {
      axios.get(`http://localhost:8080/userLoadSeat/${useResIdx}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      })
        .then((response) => {
          console.log("API Response:", response.data);
          const {success, message, data} = response.data;

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
      console.error("useResIdx 값이 없습니다.");
    }
  }, [useResIdx]);

  useEffect(() => {
    setSeatId(seatSelect)
    console.log(seatId)
  }, [seatSelect]);

  return (
    <div style={{display: "flex", justifyContent: "center",}}>
      {Array.isArray(seats) && seats.length > 0 ? (
        <div
          className="seat-layout"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            height: "350px",
            border: "1px solid #ddd"
          }}
        >
          {seats.map((seat, index) => {
            const isUnavailable = seat.type === "창문" || seat.type === "입구";
            const isSelected = seatSelect.includes(seat.seatId);

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
        <p>좌석 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default SeatLayout;