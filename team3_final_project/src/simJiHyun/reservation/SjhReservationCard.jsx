import { useState } from "react";
import CancelPopup from "../popUP/cancelPopup.jsx";
import { useNavigate } from "react-router-dom";
import "../SjhCss.css";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";
import axios from "axios";
import { Accordion } from "react-bootstrap";


function SjhReservationCard(props) {
  const [openModal, setOpenModal] = useState(false);
  const Nv = useNavigate();

  const isExpected = props.isUse === null && props.isCancel === null;
  const isCompleted = props.isUse !== null && props.isCancel === null;
  const isCancelled = props.isCancel !== null;

  const { setReservationIdx } = useReservationIdxStore();
  const { setRestaurantIdx } = useRestaurantStore();
  const { setUserIdx } = useReservationIdxStore();

  return (
      <div className="my-3">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="d-flex align-items-center justify-content-between w-100">
                <p className="fw-bold fs-5 mb-0">{props.restName}</p>
                {isExpected && (
                    <p className="fw-bold p-2 visitBtn mb-0" style={{ borderRadius: "10px" }}>
                      이용 예정
                    </p>
                )}
                {isCompleted && (
                    <p className="fw-bold p-2 visitBtn mb-0" style={{ borderRadius: "10px" }}>
                      이용 완료
                    </p>
                )}
                {isCancelled && (
                    <p className="fw-bold p-2 visitBtn mb-0" style={{ borderRadius: "10px" }}>
                      취소됨
                    </p>
                )}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="fw-bold">
                <div className="d-flex justify-content-between">
                  <p style={{ color: "#929292" }}>예약 날짜</p>
                  <p>{props.date}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p style={{ color: "#929292" }}>예약 시간</p>
                  <p>{props.time}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p style={{ color: "#929292" }}>인원</p>
                  <p>{props.people}명</p>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <button
                    type="button"
                    className="btn rounded-3"
                    style={{ border: "1px solid #929292" }}
                    onClick={() => {
                      setReservationIdx(props.reservationIdx);
                      setRestaurantIdx(props.restaurantIdx);
// 상태에 따라 type 값 다르게 넘기기
                          let type = "cancel"
                          if (isCompleted || isCancelled) type = "complete"
                          Nv(`/book/info/${props.reservationIdx}?type=${type}`);
                    }}
                >
                  예약 상세
                </button>

                {isExpected && (
                    <button
                        type="button"
                        className="btn rounded-3"
                        style={{ border: "1px solid #929292" }}
                        onClick={() => setOpenModal(true)}
                    >
                      예약 취소하기
                    </button>
                )}

                {isCompleted && (
                    <button
                        type="button"
                        className="btn rounded-3"
                        style={{ border: "1px solid #C0C0C0", color: "#C0C0C0" }}
                        onClick={() => {
                          setReservationIdx(props.reservationIdx);
                          setRestaurantIdx(props.restaurantIdx);
                          setUserIdx(props.userIdx);
                          Nv("/review");
                        }}
                    >
                      리뷰 등록하기
                    </button>
                )}

                {openModal && <CancelPopup
                  restName={props.restName}
                  onClose={() => setOpenModal(false)}
                  onCancelConfirm={() => {
                    axios.all([
                      axios.put("http://localhost:8080/cancelBook", null,
                        {
                          params: {reservationIdx: props.reservationIdx},
                          headers: {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
                        }),
                      axios.put("http://localhost:8080/cancelBookHistory", null,
                        {
                          params: {reservationIdx: props.reservationIdx},
                          headers: {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
                        })
                    ]).then(() => {
                      axios.spread((res1, res2) => {
                        console.log("-----res1-----")
                        console.log(res1.data)
                        console.log("-----res2-----")
                        console.log(res2.data)
                        alert("예약이 취소되었습니다")
                      })
                    }).catch((err) => {
                      alert("예약 취소 중 오류가 발생했습니다")
                      console.log(err)
                    }).finally(() => {
                      setOpenModal(false)
                      location.reload()
                    })
                  }}/>
                }

              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
  );
}

export default SjhReservationCard;
