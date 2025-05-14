import React, {useEffect, useState} from "react";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx";
import axios from "axios";
import useUserStore from "../../stores/useUserStore.jsx";

function BookReg({bkReg}) {
  const Nv = useNavigate();
  // 좌석 세팅에서 선택한 reservationIdx 가지고 있기
  const reservationIdx = useReservationIdxStore((state) => state.reservationIdx)
  const userStore = useUserStore((state) => state.user)
  const userIdx = userStore.userIdx
  const [reservationInfo, setReservationInfo] = useState([])
  const [reservationMenu, setReservationMenu] = useState([])
  const [restaurantInfo, setRestaurantInfo] = useState([])

  useEffect(() => {
    axios.all([
      axios.get("http://localhost:8080/getReg", {
        params: {reservationIdx: reservationIdx},
        headers: {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
      }),
      axios.get("http://localhost:8080/getMenuInfo", {
        params: {reservationIdx: reservationIdx},
        headers: {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
      }),
      axios.get("http://localhost:8080/getStoreInfo", {
        params: {reservationIdx: reservationIdx},
        headers: {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
      })
    ]).then(
      axios.spread((res1, res2, res3) => {
        setReservationInfo(res1.data)

        const menuList = res2.data.map((item) => ({
          ...item,
          menuName: item.menu.menuName,
          menuQuantity: item.selectedMenu.menuQuantity
        }))
        setReservationMenu(menuList)

        setRestaurantInfo(res3.data)
      })
    ).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className={'app-container container py-4'}>
      <section>
        <h3 className={'waiting-title'}>
          {restaurantInfo.restaurantDTO?.resName}에 <br/>예약하시겠어요?
        </h3>
      </section>
      <section>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>이용 방식</li>
          <li>먹고갈게요 (매장 내 취식)</li>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>예약 메뉴</li>

          <div className={"d-flex justify-content-center flex-column align-items-end"}>
            {reservationMenu.map((index) => (
              <li>{index.menuName} {index.menuQuantity} 개</li>
            ))}
          </div>

        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>총 입장 인원</li>
          <li>{reservationInfo.rsvPeople}명</li>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>예약 일시</li>
          <li>{reservationInfo.rsvDate}</li>
        </ul>
      </section>
      <section className={'p-3'} style={{background: '#FFF8E1', borderRadius: '10px'}}>
        <div className={'waiting-title-sub pb-2'} style={{color: '#FFA31C'}}>매장 예약시 유의사항</div>
        <p>{restaurantInfo.restaurantDTO?.resIntroduce}</p>
        <div></div>


      </section>
      <Button btnName={'예약 등록하기'} onClick={() => {
        Nv(`/book/info/${userIdx}`)
      }}/>
    </div>
  );
}


export default BookReg;






