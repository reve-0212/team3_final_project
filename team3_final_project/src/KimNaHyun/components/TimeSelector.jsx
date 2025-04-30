import React, { useState } from 'react';
import Button from "./Button.jsx";

const TimeSelector = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  // 10:00부터 16:00까지 1시간 간격으로 시간 배열 생성
  const timeSlots = [];
  for (let hour = 9; hour <= 19; hour++) {
    let hourString = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    timeSlots.push(hourString);
  }

  // 시간을 선택했을 때 상태 업데이트
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
      <div>
        <div className={'waiting-title-sub'}>시간 선택</div>
        <div>
          {timeSlots.map((time, index) => (
              <button
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  style={{
                    margin: '10px 5px',
                    padding: '7px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: '15px',

                    backgroundColor: selectedTime === time ? '#ffa31c' : '#fff',  // 클릭된 시간의 배경색 변경
                    color: selectedTime === time ? '#fff' : '#000', // 클릭된 시간의 글자색 변경
                  }}
              >
                {time}
              </button>
          ))}
        </div>

        {selectedTime && <div >선택한 시간: {selectedTime}</div>}

      </div>
  );
};

export default TimeSelector;






