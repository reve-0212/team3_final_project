import {useState} from "react";
import CancelPopup from "../popUP/cancelPopup.jsx";
import {useNavigate} from "react-router-dom";

function SjhReservationCard(props) {
    // 모달을 열지 말지 결정한다
    const [openModal, setOpenModal] = useState(false);
    const Nv = useNavigate();

    return (
        <div style={{height: "350px", border: "1px solid #929292"}}
             className="rounded-4 p-3 my-2 position-relative">

            <div className="d-flex align-items-center justify-content-between">
                <p className="fw-bold fs-5">{props.restName}</p>
                <p className="text-light fw-bold p-2"
                   style={{backgroundColor: "#FFA31C", borderRadius: "10px"}}>
                    {props.isUse ? "이용 완료" : "이용 예정"}
                </p>
            </div>

            <div className="fw-bold">
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
            </div>

            {props.isUse ? (
                <div className="d-flex flex-column gap-2">
                    <button type="button" className="btn rounded-3"
                            style={{border: "1px solid #929292"}}>대기 상세
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
                            style={{border: "1px solid #929292"}}>대기 상세
                    </button>
                    {/*누르면 openModal 의 값이 true 가 된다*/}
                    <button type="button" className="btn rounded-3"
                            style={{border: "1px solid #929292"}}
                            onClick={() => setOpenModal(true)}>대기 취소하기
                    </button>

                    {/*A && B 일 때 둘다 true 라면 B 렌더링
                        onClose 함수를 넘긴다 (openModal 상태를 false 로 만든다)*/}
                    {openModal && <CancelPopup onClose={() => setOpenModal(false)}/>}
                </div>
            )}
        </div>
    );
}

export default SjhReservationCard;
