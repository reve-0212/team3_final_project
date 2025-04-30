import Date from "../waiting/Date.jsx";
import React, {useState} from "react";
import DatePicker from "react-datepicker";

function DatePage() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className={'app-container'}>
            <div style={{ padding: "20px" }}>
                <h2>방문일시 선택</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                    inline // 캘린더 항상 보이게
                />

                {selectedDate && (
                    <p style={{ marginTop: "20px" }}>
                        선택한 날짜: {selectedDate.toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>

    );
}

export default DatePage






