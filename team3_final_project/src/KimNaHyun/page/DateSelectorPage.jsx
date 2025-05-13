import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Button from "../components/Button.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";
import useRsvDateStore from "../../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../../stores/useRsvTimeStore.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";

function DateTimeSelectorPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const storeResIdx = useRestaurantStore((state) => state.restaurantIdx);
  const setRsvDate = useRsvDateStore((state) => state.setRsvDate)
  const rsvDate = useRsvDateStore((state) => state.rsvDate)
  const setRsvTime = useRsvTimeStore((state) => state.setRsvTime)
  const rsvTime = useRsvTimeStore((state) => state.rsvTime)
  const userStore = useUserStore((state)=>state.user)
  const res = useResStoreSjh((state) => state.res)

  console.log(userStore)
  console.log(res)

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('sv-SE')
      setRsvDate(formattedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if(selectedTime){
      setRsvTime(selectedTime)
    }
  }, [selectedTime]);

  console.log("rsvDate")
  console.log(rsvDate)
  console.log("rsvTime")
  console.log(rsvTime)

  // 이전 페이지에서 전달된 데이터
  const {
    userIdx,
    resIdx,
    rsvMan,
    rsvWoman,
    rsvBaby,
    rsvPeople,
  } = location.state || {};
  console.log(userIdx, resIdx, rsvMan, rsvWoman, rsvBaby, rsvPeople);

  // 9시부터 19시까지 1시간 간격의 시간 슬롯
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

    const formattedDate = selectedDate.toLocaleDateString('sv-SE');
    const formattedDateTime = `${formattedDate} ${selectedTime}:00`;

    const userIdx = userStore.userIdx; // 예시 사용자 ID
    const resIdx = res.resIdx; // 예시 가게 ID
    console.log("userIdx")
    console.log(userIdx)
    console.log("resIdx")
    console.log(resIdx)

    const postData = {
      userIdx,
      resIdx,
      rsvPeople,
      rsvMan,
      rsvWoman,
      rsvBaby,
      rsvDate: formattedDate,
      rsvTime: formattedDateTime,
    };

    axios.put(`http://localhost:8080/api/date`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    })
      .then((res) => {
        const newReservationIdx = res.data?.reservationIdx || resIdx;
        navigate(`/book/seat/${userIdx}/${newReservationIdx}`);
      })
      .catch((err) => {
        alert("예약 정보 전송에 실패했습니다.");
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
          <p className="basic-font fw-bold" style={{marginTop: "10px"}}>
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
          <p className="basic-font fw-bold" style={{marginTop: "10px"}}>
            선택한 시간: {selectedTime}
          </p>
        )}
      </section>

      {/* 다음 버튼 */}
      <Button btnName="다음" onClick={handleSubmit}/>
    </div>
  );
}

export default DateTimeSelectorPage;
