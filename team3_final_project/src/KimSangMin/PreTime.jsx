import Banner from "./Banner.jsx";
import {useState} from "react";
import PreTimeSet from "./PreTimeSet.jsx";
import {Link} from "react-router-dom";

function PreTime() {

    const wDays = ["월","화","수","목","금","토","일"]

    // 요일 순서대로 폼 출력
    const [input , setInput] = useState(
        wDays.map(day => ({
            day,
            startHo: '',
            startMi:'',
            endHo:'',
            endMi:''
        }))
    );

    const chInput = (index, field, value) => {
        const newInput = [...input];
        newInput[index][field] = value;
        setInput(newInput);
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
                <Link to={"/preSetting"} style={{ textDecoration: 'none' }}><h4 className="text-start me-5">가게정보</h4></Link>
                <h4 className="text-start">운영정보</h4>
            </div>
            <hr/>
            <h4 className="text-start"><strong>운영 시간</strong>
                <span style={{color:"#FFD727", fontSize: "14px"}}> *필수</span>
            </h4>

            <div className="mb-4">
                {input.map((val, index) => {
                    const stTime = `${String(val.startHo).padStart(2,'0')}:${String(val.startMi).padStart(2,'0')}`;
                    const fiTime = `${String(val.endHo).padStart(2,'0')}:${String(val.endMi).padStart(2,'0')}`;

                    return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                            <div style={{ width: '100px', marginRight: '10px', fontWeight: 'bold' }}>
                                {val.day}
                            </div>

                            {/* 입력폼 */}
                            <input
                                type="number"
                                placeholder="시작 시간"
                                value={val.startHo}
                                onChange={(e) => chInput(index, 'startHo', e.target.value)}
                                className="form-control"
                                style={{ width: '130px', marginLeft: '10px', marginRight: '5px' }}
                            />
                            <input
                                type="number"
                                placeholder="시작 분"
                                value={val.startMi}
                                onChange={(e) => chInput(index, 'startMi', e.target.value)}
                                className="form-control"
                                style={{ width: '130px', marginRight: '10px' }}
                            />
                            <input
                                type="number"
                                placeholder="종료 시간"
                                value={val.endHo}
                                onChange={(e) => chInput(index, 'endHo', e.target.value)}
                                className="form-control"
                                style={{ width: '130px', marginRight: '5px' }}
                            />
                            <input
                                type="number"
                                placeholder="종료 분"
                                value={val.endMi}
                                onChange={(e) => chInput(index, 'endMi', e.target.value)}
                                className="form-control"
                                style={{ width: '130px' }}
                            />

                            {/* 시간 정보 */}
                            <div style={{ marginLeft: '5px', fontSize: '14px', color: '#555', display:'flex', alignItems: 'center' }}>
                                {val.day && `${val.day} : ${stTime} ~ ${fiTime}`}
                            </div>

                        </div>
                    )
                })}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:'30px' }}>
                    <button className="btn me-2" style={{backgroundColor:'#FFCD83'}}>저장</button>
                    <button className="btn" style={{backgroundColor:'#FFD727'}}>수정</button>
                </div>
            </div>
            <hr/>
            <h4><strong>휴무일</strong></h4>
            <hr/>


        </div>
    );
}

export default PreTime

