import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faCircleExclamation, faLocationDot, faPen} from "@fortawesome/free-solid-svg-icons";
import StoreMap from "./StoreMap.jsx";
import Button from "./Button.jsx";
import CancelPopup from "../../simJiHyun/popUP/cancelPopup.jsx";
import {useEffect, useState} from "react";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx";
import axios from "axios";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import api from "../../api/axios.js";

function BookInfo() {
  // 모달을 열지 말지 결정한다
  const [openModal, setOpenModal] = useState(false);
  const reservationIdx = useReservationIdxStore(state => state.reservationIdx)
  const restaurantIdx = useRestaurantStore(state => state.restaurantIdx)
  const setRes = useResStoreSjh((state) => state.setRes)
  const [reservations, setReservations] = useState({})
  const [menus, setMenus] = useState([])
  const Nv = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type")

  useEffect(() => {
    axios.all([
      // 예약 정보 가져오기 (메뉴 제외)
      api.get("/getBook", {
        params: {
          reservationIdx: reservationIdx,
          restaurantIdx: restaurantIdx
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      }),
      // 예약 정보 가져오기 (메뉴만)
      api.get("/getMenu", {
        params: {
          reservationIdx: reservationIdx,
          restaurantIdx: restaurantIdx
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      })
    ]).then(
      axios.spread((res1, res2) => {
        setReservations(res1.data)
        setMenus(res2.data)
      })).catch(() => {

    })
  }, []);

  const rsvTime = reservations.reservation?.rsvTime
  const shortRsvTime = rsvTime ? rsvTime.substring(0, 5) : "";

  return (
    <div className={'app-container container py-4'}>

      <section>
        <h3 style={{color: '#5D4037', fontWeight: 'bold'}}>{reservations.restaurantDTO?.resName} <FontAwesomeIcon
          icon={faAngleRight}/>
        </h3>
        <div className={'text-secondary'}>태그</div>
      </section>

      <section>
        <ul className={'d-flex  mb-2 waiting-title-sub basic-font'}>
          <li><FontAwesomeIcon icon={faPen}/></li>
          <li style={{paddingLeft: '6px'}}>등록정보</li>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>이용 방식</li>
          <li>먹고 갈게요 (매장 내 취식)</li>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>선택 메뉴</li>
          <div>
            {menus.map((index) => (<li>{index.menuDTO?.menuName} {index.selectedMenuDTO?.menuQuantity} 개</li>))}
          </div>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>총 입장 인원</li>
          <li>{reservations.reservationDTO?.rsvPeople}명</li>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>예약 일시</li>
          <li>{reservations.reservationDTO?.rsvDate} {shortRsvTime}</li>
        </ul>
      </section>

      <section>
        <ul className={'d-flex  mb-2 waiting-title-sub basic-font'}>
          <li><FontAwesomeIcon icon={faLocationDot}/></li>
          <li style={{paddingLeft: '6px'}}>매장 위치</li>
        </ul>

        <StoreMap
          resLat={reservations.restaurantDTO?.resLat}
          resLng={reservations.restaurantDTO?.resLng}/>

      </section>

      <section>
        <ul className={'d-flex mb-2 waiting-title-sub basic-font'}>
          <li><FontAwesomeIcon icon={faCircleExclamation}/></li>
          <li style={{paddingLeft: '6px'}}>매장 유의사항</li>
        </ul>
        <div>{reservations.restaurantDTO?.resIntroduce}</div>
      </section>

      {type === 'book' && (
        <Button btnName={"메인으로 가기"} onClick={() => {
          setRes(null)
          Nv("/")
        }}/>
      )}

      {type === 'cancel' && (
        <Button btnName={'예약 취소하기'} onClick={() => {
          setOpenModal(true)
        }}/>
      )}

      {/*A && B 일 때 둘다 true 라면 B 렌더링
                        onClose 함수를 넘긴다 (openModal 상태를 false 로 만든다)*/}
      {openModal && <CancelPopup
        restName={reservations.restaurantDTO?.resName}
        onClose={() => {
          axios.put("http://localhost:8080/cancelBook", null,
            {
              params: {reservationIdx: reservationIdx},
              headers: {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
            }).then((res) => {
            console.log(res)
            alert("예약이 취소되었습니다")
            Nv("/latestDetails")
          }).catch((err) => {
            console.log(err)
          })
          setOpenModal(false)
        }
        }/>}
    </div>
  );
}

export default BookInfo






