
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import TimeSelector from "../components/TimeSelector.jsx";
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";


function DateSelectorPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const Nv = useNavigate();

    return (
        <div className={'app-container'}>
            <section>
                <h3 className={'waiting-title'}>방문 일시를 선택하세요</h3>
                <div className="datepicker-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜를 선택하세요"
                        popperClassName="custom-datepicker-popover"
                        inline // 캘린더 항상 보이게
                    />

                    {selectedDate && (
                        <p style={{marginTop: "30px"}}>
                            선택한 날짜: {selectedDate.toLocaleDateString()}
                        </p>
                    )}
                </div>
            </section>
            <section>
                <TimeSelector/>
                <Button btnName={'다음'} onClick={() => {
                    Nv("/book/menu")
                }}/>

            </section>

        </div>

    );
}

export default DateSelectorPage






