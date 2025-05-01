import Banner from "./Banner.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";

function PreTimeSet() {
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
        <div style={{
            marginLeft: '200px',
            marginTop: '10vh',
            paddingTop: '2rem',
            paddingLeft: '1rem',
            width: 'calc(100% - 200px)',
            maxWidth: '1000px'
        }}>
            <Banner />
            <div className="d-flex">
                <Link to={"/PreReSet"} style={{ textDecoration: 'none',color:'black' }}><h4 className="text-start me-5">가게정보</h4></Link>
                <Link to={"/PreTimeSet"} style={{ textDecoration: 'none',color:'black' }}><h4 className="text-start me-5">운영정보</h4></Link>
            </div>
            <hr />

            <div style={{display:"flex", justifyContent:'space-between'}}>
                <h4 className="text-start me-5"><strong>운영 시간</strong></h4>
                <Link to="/PreTime">
                    <Button className="ms-auto" style={{ backgroundColor: "#FFD727" }}>
                        수정하기
                    </Button>
                </Link>
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
