import WaBanner from "./WaBanner.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import ReBanner from "./ReBanner.jsx";

function PreTimeSet({onEditClick}) {
    // 수기로 데이터를 정의
    const input = [
        { day: "월", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "화", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "수", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "목", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "금", startHo: 9, startMi: 0, endHo: 18, endMi: 0 },
        { day: "토", startHo: 10, startMi: 0, endHo: 15, endMi: 0 },
        { day: "일", startHo: 10, startMi: 0, endHo: 15, endMi: 0 }
    ];

    const [HoPut,setHoPut] = useState(

    )


    return (
        <div
            // style={{
            // marginLeft: '300px',
            // marginTop: '10vh',
            // paddingTop: '2rem',
            // paddingLeft: '1rem',
            // width: 'calc(100% - 200px)',
            // maxWidth: '1000px'
            // }}
        >
            <ReBanner />

            <div style={{display:"flex", justifyContent:'space-between'}}>
                <h4 className="text-start me-5"><strong>운영 시간</strong></h4>
                <Button
                    className="ms-auto"
                    style={{ backgroundColor: "#FFD727" }}
                    onClick={onEditClick}
                    >
                    수정하기
                </Button>
            </div>
            <hr />

            {/* input 배열의 각 요소를 map으로 출력 */}
            <div className="ms-3"
            style={{fontSize:'20px'}}>
                {input.map((val, index) => {
                    const stTime = `${String(val.startHo).padStart(2, '0')}:${String(val.startMi).padStart(2, '0')}`;
                    const fiTime = `${String(val.endHo).padStart(2, '0')}:${String(val.endMi).padStart(2, '0')}`;
                    return (
                        <div key={index}>
                            <p>{val.day}: {stTime} ~ {fiTime}</p>
                        </div>
                    );
                })}
            </div>
            <hr/>

        </div>
    );
}

export default PreTimeSet;
