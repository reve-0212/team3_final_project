import SjhReservationCard from "./SjhReservationCard.jsx";
import ReservationOrWaiting from "./ReservationOrWaiting.jsx";
import UseOrNoShow from "./UseOrNoShow.jsx";
import {useEffect, useState} from "react";
import useUserStore from "../../stores/useUserStore.jsx";
import axios from "axios";

// state
function SjhReservation() {
  // true : 이용예정/완료 , false : 취소/노쇼
  const [isUsed, setIsUsed] = useState(true)
  const user = useUserStore((state) => state.user)
  console.log(user)
  // true : 예약 , false : 웨이팅
  const [isReservation, setIsReservation] = useState(true)

  const allReservations = [
    // isUse : true(이용예정/완료), false(취소/노쇼)
    // isUse -> true
    // isVisit : true(이용 완료), false(이용 예정)
    // isUse -> false
    // isCancel : true(취소함), false(노쇼)
    // 예약 (isReservation:true)
    // 왔다 간 가게
    {
      id: 1,
      isUse: true,
      isVisit: true,
      isCancel: false,
      restName: "해운대 암소 갈비집 (이용 완료/예약)",
      date: "2024-05-02",
      time: "00:00",
      people: 2
    },
    // 아직 안간 가게
    {
      id: 2,
      isUse: true,
      isVisit: false,
      isCancel: false,
      restName: "블랙업 커피 (이용 예정/예약)",
      date: "2024-05-02",
      time: "00:00",
      people: 4
    },
    // 취소한 가게
    {
      id: 3,
      isUse: false,
      isVisit: false,
      isCancel: true,
      restName: "간장게장 (취소/예약)",
      date: "2024-05-02",
      time: "00:00",
      people: 1
    },
    // 노쇼한 가게
    {
      id: 4,
      isUse: false,
      isVisit: false,
      isCancel: false,
      restName: "장춘동왕족발보쌈 (노쇼/예약)",
      date: "2024-05-02",
      time: "00:00",
      people: 4
    },
  ]

  const reservationList = []

  const userReservation = () => {
    axios.get(`http://localhost:8080/userReservation`, {
      params: {
        userIdx: user.userIdx
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    }).then(res => {
      console.log(res.data)
      reservationList.push(res.data)
      console.log("--------reservationList------------")
      console.log(reservationList)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    userReservation()
  }, [])

  const filteredReservations = allReservations.filter(r => r.isUse === isUsed)

  return (
    <div className={"container py-4"}>

      <UseOrNoShow
        switchUN={(val) => setIsUsed(val)}
        isUsed={isUsed}/>

      {/*<ReservationOrWaiting*/}
      {/*    switchRW={(val) => setIsReservation(val)}*/}
      {/*    isReservation={isReservation}/>*/}

      <div>
        {filteredReservations.map(r => (
          <SjhReservationCard
            key={r.id}
            isUse={r.isUse}
            isVisit={r.isVisit}
            isCancel={r.isCancel}
            restName={r.restName}
            date={r.date}
            time={r.time}
            visitTime={r.visitTime}
            number={r.number}
            people={r.people}/>
        ))}
      </div>
    </div>
  );
}

export default SjhReservation