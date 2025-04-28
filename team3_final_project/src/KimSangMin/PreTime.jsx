import Banner from "./Banner.jsx";
import {useState} from "react";

function PreTime() {
    const [input , setInput] = useState([
        { day: '', startHour: '', startMinute: '', endHour: '', endMinute: '' }
    ]);

    const chInput = (index, field, value) => {
        const newInput = [...input];

        if (field === 'day') {
            const hDay = newInput.some((item, idx) => item.day === value && idx !== index);
            if (hDay){
                alert('이미 선택된 요일입니다.');
                return;
            }
        }

        newInput[index][field] = value;
        setInput(newInput);
    };

    const addInput = () => {
        if (input.length >= 7) {
            alert('더 이상 추가하실 수 없습니다.');
            return;
        }
        setInput([...input, { day: '', startHour: '', startMinute: '', endHour: '', endMinute: '' }]);
    };

    const rmInput = () => {
        if (input.length > 1) {
            setInput(input.slice(0, -1));
        }
    };

    return (
        <div style={{
            marginLeft: '200px',
            marginTop: '10vh',
            paddingTop: '2rem',
            paddingLeft: '1rem',
            width: 'calc(100% - 200px)',
            maxWidth: '1000px'
        }}>
            <Banner/>
            <div className="d-flex">
                <h4 className="text-start me-5">가게정보</h4>
                <h4 className="text-start">운영정보</h4>
            </div>
            <hr/>
            <h4 className="text-start"><strong>운영 시간</strong>
                <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span>
            </h4>

            <div className="mb-4">
                {input.map((val, index) => {
                    const stTime = `${String(val.startHour).padStart(2,'0')}:${String(val.startMinute).padStart(2,'0')}`;
                    const fiTime = `${String(val.endHour).padStart(2,'0')}:${String(val.endMinute).padStart(2,'0')}`;

                    return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <select
                                value={val.day}
                                onChange={(e) => chInput(index, 'day', e.target.value)}
                                className="form-control"
                                style={{ width: '100px', marginRight: '10px' }}
                            >
                                <option value="">요일 선택</option>
                                <option value="월요일">월요일</option>
                                <option value="화요일">화요일</option>
                                <option value="수요일">수요일</option>
                                <option value="목요일">목요일</option>
                                <option value="금요일">금요일</option>
                                <option value="토요일">토요일</option>
                                <option value="일요일">일요일</option>
                            </select>



                            {/* 입력폼 */}
                            <input
                                type="number"
                                placeholder="시작 시간"
                                value={val.startHour}
                                onChange={(e) => chInput(index, 'startHour', e.target.value)}
                                className="form-control"
                                style={{ width: '130px', marginLeft: '10px', marginRight: '5px' }}
                            />
                            <input
                                type="number"
                                placeholder="시작 분"
                                value={val.startMinute}
                                onChange={(e) => chInput(index, 'startMinute', e.target.value)}
                                className="form-control"
                                style={{ width: '130px', marginRight: '10px' }}
                            />
                            <input
                                type="number"
                                placeholder="종료 시간"
                                value={val.endHour}
                                onChange={(e) => chInput(index, 'endHour', e.target.value)}
                                className="form-control"
                                style={{ width: '130px', marginRight: '5px' }}
                            />
                            <input
                                type="number"
                                placeholder="종료 분"
                                value={val.endMinute}
                                onChange={(e) => chInput(index, 'endMinute', e.target.value)}
                                className="form-control"
                                style={{ width: '130px' }}
                            />

                            {/* 시간 정보 */}
                            <div style={{ marginLeft: '5px', fontSize: '14px', color: '#555', display:'flex', alignItems: 'center' }}>
                                {val.day && `${val.day} : ${stTime} ~ ${fiTime}`}
                            </div>

                            {/* 버튼 */}
                            {index === input.length - 1 && (
                                <div style={{ marginLeft: '10px' }}>
                                    <button className='btn btn-sm' onClick={addInput} style={{ marginRight: '5px', border :'1px solid #FFD727' }}>
                                        추가
                                    </button>
                                    <button className='btn btn-sm' style={{ border :'1px solid #FFD727'}} onClick={rmInput}>
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:'30px' }}>
                    <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                    <button className="btn" style={{backgroundColor:'#FFD727'}}>수정</button>
                </div>
            </div>
        </div>
    );
}

export default PreTime;
