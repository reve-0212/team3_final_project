import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../stores/useUserStore.jsx";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import usePeopleStore from "../../stores/usePeopleStore.jsx";
import useRsvDateStore from "../../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../../stores/useRsvTimeStore.jsx";
import useRsvDateTimeStore from "../../stores/useRsvDateTimeStore.jsx";
import useSeatIdStore from "../../stores/useSeatIdStore.jsx";
import useMenuStore from "../../stores/useMenuStore.jsx";
import axios from "axios";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";
import api from "../../api/axios.js";

function BookReg() {
  const Nv = useNavigate();

  const userStore = useUserStore((state) => state.user)
  const res = useResStoreSjh((state) => state.res)
  const people = usePeopleStore((state) => state.people)
  const rsvDate = useRsvDateStore((state) => state.rsvDate)
  const rsvTime = useRsvTimeStore((state) => state.rsvTime)
  const rsvDateTime = useRsvDateTimeStore((state) => state.rsvDateTime)
  const selectedSeat = useSeatIdStore((state) => state.seatId)
  const selectedMenu = useMenuStore((state) => state.menu)
  const allPeople = people.man + people.woman + people.baby;

  return (
    <div className={'app-container container py-4'}>
      <section>
        <h3 className={'waiting-title'}>
          {res.resName}에 <br/>예약하시겠어요?
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
            {selectedMenu.map((index) => (
              <li>{index.menuName} {index.quantity} 개</li>
            ))}
          </div>

        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>총 입장 인원</li>
          <li>{people.man + people.woman + people.baby}명</li>
        </ul>
        <ul className={'d-flex justify-content-between mb-2 fw-bold'}>
          <li>예약 일시</li>
          <li>{rsvDateTime}</li>
        </ul>
      </section>
      <section className={'p-3'} style={{background: '#FFF8E1', borderRadius: '10px'}}>
        <div className={'waiting-title-sub pb-2'} style={{color: '#FFA31C'}}>매장 예약시 유의사항</div>
        <p>{res.resIntroduce}</p>
        <div></div>


      </section>
      <Button btnName={'예약 등록하기'} onClick={async () => {
        try {
          //   1. reservation 만들기
          const bookRes =
            await api.put("/bookAllReg", null, {
              params: {
                userIdx: userStore.userIdx,
                resIdx: res.resIdx,
                rsvPeople: allPeople,
                rsvMan: people.man,
                rsvWoman: people.woman,
                rsvBaby: people.baby,
                rsvDate: rsvDate,
                rsvTime: rsvTime
              }, headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
              }
            });

          //   2. 예약 번호 조회
          const searchRes =
            await api.get("/searchResIdx", {
              params: {
                userIdx: userStore.userIdx,
                resIdx: res.resIdx,
                rsvDate: rsvDate,
                rsvTime: rsvTime
              }, headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
              }
            }).catch(() => {
              alert("이미 같은 시간에 예약하셨습니다")
              Nv("/latestDetails")
            });

          // 3. 좌석 갯수 만큼 예약
          for (let seatId of selectedSeat) {
            await api.put("/reserveSeat", null, {
              params: {
                reservationIdx: searchRes.data,
                seatId: seatId
              }, headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
              }
            });
          }

          //   4. 메뉴 갯수만큼 예약
          for (let menu of selectedMenu) {
            await api.put("/reserveMenu", null, {
              params: {
                reservationIdx: searchRes.data,
                menuIdx: menu.menuIdx,
                menuQuantity: menu.quantity
              }, headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
              }
            });

            // 5. 히스토리 저장
            await api.put("/saveHistory", null, {
              params: {
                reservationIdx: searchRes.data,
                resIdx: res.resIdx,
                reservationDate: rsvDateTime,
                rsvPeople: people.man + people.woman + people.baby,
                rsvMan: people.man,
                rsvWoman: people.woman,
                rsvBaby: people.baby,
                menuIdx: menu.menuIdx,
                menuName: menu.menuName,
                menuPrice: menu.menuPrice,
                menuSCount: menu.quantity,
                menuSTP: menu.menuPrice * menu.quantity
              }, headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
              }
            })
          }

          useReservationIdxStore.getState().setReservationIdx(searchRes.data)
          useRestaurantStore.getState().setRestaurantIdx(res.resIdx)

          alert("예약 성공!")
          Nv(`/book/info/${res.resIdx}?type=book`)
        } catch (e) {
          console.log(e)
        }
      }
      }/>
    </div>
  );
}


export default BookReg;






