import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Button from "../components/Button.jsx";
import useRsvDateStore from "../../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../../stores/useRsvTimeStore.jsx";
import useUserStore from "../../stores/useUserStore.jsx";

function DateSelectorPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [openingHours, setOpeningHours] = useState(""); // 초기값 제거

  const navigate = useNavigate();
  const location = useLocation();

  const setRsvDate = useRsvDateStore((state) => state.setRsvDate);
  const setRsvTime = useRsvTimeStore((state) => state.setRsvTime);
  const userStore = useUserStore((state) => state.user);
  const res = useResStoreSjh((state) => state.res)

  const {
    userIdx: passedUserIdx,
    resIdx: passedResIdx,
    rsvMan,
    rsvWoman,
    rsvBaby,
    rsvPeople,
  } = location.state || {};

  const userIdx = userStore?.userIdx ?? passedUserIdx ?? 0;
  const resIdx = passedResIdx ?? 1;

  useEffect(()=>{
    console.log(userStore)
  },[userStore])

  useEffect(() => {
    console.log(res)
  }, [res]);

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
          // 응답에서 바로 data를 추출하여 trimming 후 설정
          const hours = response.data?.trim() ?? "";
          console.log("최종 파싱된 영업시간:", hours);
          setOpeningHours(hours);
        })
        .catch((err) => {
          console.error("영업시간 불러오기 실패:", err);
          alert("식당 정보를 불러오지 못했습니다.");
        });
  }, [resIdx]);

  // 시간 슬롯 생성
  useEffect(() => {
    const parseBusinessHours = (hoursStr) => {
      if (!hoursStr.includes("~")) return { startHour: 0, endHour: 0 };

      const [start, end] = hoursStr.replace(/\s/g, "").split("~");
      const startHour = parseInt(start.split(":")[0], 10);
      const endHour = parseInt(end.split(":")[0], 10);

      return { startHour, endHour };
    };

    if (openingHours) {
      const { startHour, endHour } = parseBusinessHours(openingHours);
      console.log("⏰ 파싱된 영업시간:", { startHour, endHour });

      const slots = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
      }

      console.log("✅ 생성된 시간 슬롯:", slots);
      setTimeSlots(slots);
    }
  }, [openingHours]);

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

    const formattedDate = selectedDate.toLocaleDateString("sv-SE");
    const formattedDateTime = `${formattedDate} ${selectedTime}:00`;

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

    axios
        .put(`http://localhost:8080/api/date`, postData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
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
              <p className="basic-font fw-bold" style={{ marginTop: "10px" }}>
                선택한 날짜: {selectedDate.toLocaleDateString()}
              </p>
          )}
        </section>

        {/* 시간 선택 */}
        <section className="mb-4">
          <h5>
            시간 선택
            <span style={{ fontSize: "0.9rem", color: "#888" }}>
          </span>
          </h5>
          <div>
            {timeSlots.map((time, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
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
              <p className="basic-font fw-bold" style={{ marginTop: "10px" }}>
                선택한 시간: {selectedTime}
              </p>
          )}
        </section>

        {/* 다음 버튼 */}
        <Button btnName="다음" onClick={handleSubmit} />
      </div>
  );
}

export default DateSelectorPage;
