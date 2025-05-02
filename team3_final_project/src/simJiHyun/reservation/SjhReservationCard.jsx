import {useState} from "react";
import CancelPopup from "../popUP/cancelPopup.jsx";
import {useNavigate} from "react-router-dom";
import "../SjhCss.css"

function SjhReservationCard(props) {
    // 모달을 열지 말지 결정한다
    const [openModal, setOpenModal] = useState(false);

    const Nv = useNavigate();

    return (
        <div style={{height: "350px", border: "1px solid #929292"}}
             className="rounded-4 p-3 my-2 position-relative reservationCard">

            <div className="d-flex align-items-center justify-content-between">
                <p className="fw-bold fs-5">{props.restName}</p>

                {/*이용예정/완료 와 취소/노쇼를 나눈다*/}
                {props.isUse ?
                    (<p className={`fw-bold p-2 visitBtn${props.isVisit ? "Active" : ""}`}
                        style={{borderRadius: "10px"}}>
                        {/*방문했으면 이용완료, 아니면 이용예정*/}
                        {props.isVisit ? "이용 완료" : "이용 예정"}
                    </p>)
                    : (
                        <p className={`fw-bold p-2 visitBtn${props.isCancel ? "Active" : ""}`}
                           style={{borderRadius: "10px"}}>
                            {/*취소했으면 취소, 아니면 노쇼*/}
                            {props.isCancel ? "취소" : "노쇼"}
                        </p>
                    )
                }
            </div>

            {/*예약과 웨이팅 여부로 나뉜다*/}
            {props.isReservation ? (
                <div className="fw-bold">
                    {/*예약*/}
                    <div className="d-flex justify-content-between">
                        <p style={{color: "#929292"}}>예약 날짜</p>
                        <p>{props.date}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p style={{color: "#929292"}}>예약 시간</p>
                        <p>{props.time}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p style={{color: "#929292"}}>인원</p>
                        <p>{props.people}명</p>
                    </div>
                </div>
            ) : (
                <div className="fw-bold">
                    {/*웨이팅*/}
                    {/*방문한 경우 방문 시간도 같이 출력한다*/}
                    <div className="d-flex justify-content-between">
                        <p style={{color: "#929292"}}>접수 일시</p>
                        <p>{props.time}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p style={{color: "#929292"}}>대기번호</p>
                        <p>{props.number}번</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p style={{color: "#929292"}}>인원</p>
                        <p>{props.people}명</p>
                    </div>
                    {props.isVisit ?
                        <div className="d-flex justify-content-between">
                            <p style={{color: "#929292"}}>방문 시간</p>
                            <p>{props.visitTime}</p>
                        </div> : <div/>
                    }
                </div>)}

            {/*방문 여부를 묻는다*/}
            {props.isVisit ? (
                <div className="d-flex flex-column gap-2">
                    <button type="button" className="btn rounded-3"
                            style={{border: "1px solid #929292"}}
                            onClick={() => {
                                Nv(props.isReservation ? "/book/info" : "/waiting/info")
                            }}>{props.isReservation ? "예약 상세" : "대기 상세"}
                    </button>
                    <button type="button" className="btn rounded-3"
                            style={{border: "1px solid #C0C0C0", color: "#C0C0C0"}}
                            onClick={() => {
                                Nv("/review")
                            }}>리뷰 등록하기
                    </button>
                </div>
            ) : (
                <div className="d-flex flex-column gap-2">
                    <button type="button" className="btn rounded-3"
                            style={{border: "1px solid #929292"}}
                            onClick={() => {
                                Nv(props.isReservation ? "/book/info" : "/waiting/info")
                            }}>{props.isReservation ? "예약 상세" : "대기 상세"}
                    </button>
                    {/*누르면 openModal 의 값이 true 가 된다*/}
                    <button type="button" className="btn rounded-3"
                            style={{border: "1px solid #929292"}}
                            onClick={() => setOpenModal(true)}>
                        {props.isReservation ? "예약 취소하기" : "웨이팅 취소하기"}
                    </button>

                    {/*A && B 일 때 둘다 true 라면 B 렌더링
                        onClose 함수를 넘긴다 (openModal 상태를 false 로 만든다)*/}
                    {openModal && <CancelPopup
                        restName={props.restName}
                        isReservation={props.isReservation}
                        onClose={() => setOpenModal(false)}/>}
                </div>
            )
            }
        </div>
    )
        ;
}

export default SjhReservationCard;
