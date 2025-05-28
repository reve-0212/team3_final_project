import React, {useEffect, useState} from "react";
import axios from "axios";
import useSeatIdStore from "../stores/useSeatIdStore.jsx";
import useRestaurantStore from "../stores/useRestaurantStore.jsx";
import useRsvDateStore from "../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../stores/useRsvTimeStore.jsx";
import usePeopleStore from "../stores/usePeopleStore.jsx";
// import './SeatLayout.css'; // 좌석 스타일링

const SeatLayout = () => {
  // const {resIdx} = useParams();  // URL 파라미터에서 resIdx 값을 가져옵니다.
  const [seats, setSeats] = useState([]);
  // 내가 지금 선택하는 좌석
  const [seatSelect, setSeatSelect] = useState([]);
  // 이미 예약된 좌석 가져오기
  const [reservedSeat, setReservedSeat] = useState([])
  const setSeatId = useSeatIdStore((state) => state.setSeatId)
  const seatId = useSeatIdStore((state) => state.seatId)
  const useResIdx = useRestaurantStore((state) => state.restaurantIdx)
  const rsvDate = useRsvDateStore((state) => state.rsvDate)
  const rsvTime = useRsvTimeStore((state) => state.rsvTime)
  const people = usePeopleStore((state) => state.people)
  const allPeople = people.man + people.woman + people.baby

  console.log("rsvDate : " + rsvDate)
  console.log("rsvTime : " + rsvTime)
  console.log("allPeople : " + allPeople)

  // 좌석선택기능
  const hSeat = (seatId, seatType) => {
    setSeatSelect((prevSeatSelect) => {

      // 여러 좌석 선택 가능한 경우
      if (allPeople > 6) {
        if (prevSeatSelect.includes(seatId)) {
          return prevSeatSelect.filter((id) => id !== seatId);
        } else {
          return [...prevSeatSelect, seatId];
        }
      }

      //   단일 좌석만 선택 가능한 경우
      const allowedTypes =
        allPeople <= 2 ? ["2인석"] :
          allPeople > 2 && allPeople <= 4 ? ["4인석"] :
            allPeople > 4 && allPeople <= 6 ? ["6인석"] : []

      //   현재 좌석 type 이 허용되지 않았다면 클릭 무시
      if (!allowedTypes.includes(seatType)) {
        alert("현재 인원에 맞는 좌석만 선택할 수 있습니다")
        return prevSeatSelect;
      }

      //   기존 선택이 있다면 교체
      if (prevSeatSelect.includes(seatId)) {
        return []
      } else {
        return [seatId]
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

      axios.get("http://localhost:8080/isSeatReserved", {
        params: {rsvDate: rsvDate, rsvTime: rsvTime},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      }).then((res) => {
        console.log("res")
        console.log(res.data)
        setReservedSeat(res.data)
      }).catch((err) => {
        console.log(err)
      })
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
            const isUnavailable = seat.type === "창문" || seat.type === "입구" || reservedSeat.includes(seat.seatId);
            const isSelected = seatSelect.includes(seat.seatId);
            const isReserved = reservedSeat.includes(seat.seatId)

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
                  backgroundColor: isReserved ? "#727272" : isSelected ? "#FFD727" : "transparent",
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
                onClick={!isUnavailable ? () => hSeat(seat.seatId, seat.type) : null}  // 클릭 불가능한 좌석은 클릭 이벤트 비활성화
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