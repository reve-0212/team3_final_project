import {useEffect, useState} from "react";
import CancelPopup from "../popUP/cancelPopup.jsx";
import {useNavigate} from "react-router-dom";
import "../SjhCss.css"
import useReservationStore from "../../stores/useReservationStore.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";

function SjhReservationCard(props) {
  // 모달을 열지 말지 결정한다
  const [openModal, setOpenModal] = useState(false);
  const Nv = useNavigate();

  const isExpected = props.isUse === null && props.isCancel === null
  const isCompleted = props.isUse !== null && props.isCancel === null
  const isCancelled = props.isCancel !== null

  const {setReservationIdx} = useReservationStore();
  const {setRestaurantIdx} = useRestaurantStore();
  console.log("reservationIdx : " + props.reservationIdx)
  console.log("restaurantIdx : " + props.restaurantIdx)

  return (
    <div style={{height: "350px", border: "1px solid #929292"}}
         className="rounded-4 p-3 my-2 position-relative reservationCard">

      <div className="d-flex align-items-center justify-content-between">
        <p className="fw-bold fs-5">{props.restName}</p>
        {isExpected && (
          <p className={"fw-bold p-2 visitBtn"} style={{borderRadius: "10px"}}>
            이용 예정
          </p>
        )}
        {isCompleted && (
          <p className={"fw-bold p-2 visitBtn"} style={{borderRadius: "10px"}}>
            이용 완료
          </p>
        )}
        {isCancelled && (
          <p className={"fw-bold p-2 visitBtn"} style={{borderRadius: "10px"}}>
            취소됨
          </p>
        )}
      </div>

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

      <div className="d-flex flex-column gap-2">
        <button type="button" className="btn rounded-3"
                style={{border: "1px solid #929292"}}
                onClick={() => {
                  setReservationIdx(props.reservationIdx)
                  setRestaurantIdx(props.restaurantIdx)
                  Nv(`/book/info/${props.reservationIdx}`)
                }}>예약 상세
        </button>

        {isExpected && (
          <button type="button" className={`btn rounded-3`}
                  style={{border: "1px solid #929292"}}
                  onClick={() => setOpenModal(true)}>
            예약 취소하기
          </button>
        )}

        {isCompleted && (
          <button type="button" className="btn rounded-3"
                  style={{border: "1px solid #C0C0C0", color: "#C0C0C0"}}
                  onClick={() => Nv("/review")}>
            리뷰 등록하기
          </button>
        )}

        {openModal && <CancelPopup
          restName={props.restName}
          onClose={() => setOpenModal(false)}/>
        }

      </div>
    </div>
  )
    ;
}

export default SjhReservationCard;
