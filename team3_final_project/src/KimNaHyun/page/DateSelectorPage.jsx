import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useRsvDateStore from "../../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../../stores/useRsvTimeStore.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import usePeopleStore from "../../stores/usePeopleStore.jsx";

// 최종 에약 확정 페이지에서 한번에 예약하기
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import Button from "../components/Button.jsx";

function DateSelectorPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [openingHours, setOpeningHours] = useState([]); // 초기값 제거

  const navigate = useNavigate();

  const setRsvDate = useRsvDateStore((state) => state.setRsvDate);
  const setRsvTime = useRsvTimeStore((state) => state.setRsvTime);
  const userStore = useUserStore((state) => state.user);
  const res = useResStoreSjh((state) => state.res)
  const people = usePeopleStore((state) => state.people)

  const userIdx = userStore.userIdx
  const resIdx = res.resIdx
  const today = new Date();

  // 영업시간 받아오기
  useEffect(() => {
    if (!resIdx) return;

    axios
      .get(`http://localhost:8080/api/time/${resIdx}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        setOpeningHours(response.data.split(","))
      })
      .catch((err) => {
        console.error("영업시간 불러오기 실패:", err);
        alert("식당 정보를 불러오지 못했습니다.");
      });
  }, [resIdx]);

  // 날짜 상태 저장
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("sv-SE");
      setRsvDate(formattedDate);
    }
  }, [selectedDate]);

  // 시간 상태 저장
  useEffect(() => {
    if (selectedTime) {
      setRsvTime(selectedTime);
    }
  }, [selectedTime]);

  // 예약 전송
  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    navigate(`/book/seat/${userIdx}/${resIdx}`)
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
          minDate={new Date()}
          maxDate={new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)}
        />
        {selectedDate && (
          <p className="basic-font fw-bold" style={{marginTop: "10px"}}>
            선택한 날짜: {selectedDate.toLocaleDateString()}
          </p>
        )}
      </section>

      {/* 시간 선택 */}
      <section className="mb-4">
        <h5>
          시간 선택
          <span style={{fontSize: "0.9rem", color: "#888"}}>
          </span>
        </h5>
        <div>
          {openingHours.map((index) => (
            <button
              key={index}
              onClick={() => setSelectedTime(index)}
              style={{
                margin: "5px",
                padding: "7px 20px",
                fontSize: "0.9rem",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "15px",
                backgroundColor: selectedTime === index ? "#5D4037" : "#fff",
                color: selectedTime === index ? "#fff" : "#000",
              }}>{index}</button>
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

export default DateSelectorPage;
