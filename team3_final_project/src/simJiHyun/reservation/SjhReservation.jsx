import SjhReservationCard from "./SjhReservationCard.jsx";
import ReservationOrWaiting from "./ReservationOrWaiting.jsx";
import UseOrNoShow from "./UseOrNoShow.jsx";
import {useEffect, useState} from "react";
import useUserStore from "../../stores/useUserStore.jsx";
import axios from "axios";

// state
function SjhReservation() {
  // expected : 이용 예정 , completed : 이용 완료 , cancelled : 취소
  const [filterType, setFilterType] = useState("expected")
  const [reservations, setReservations] = useState([])
  const user = useUserStore((state) => state.user)

  // 예약 여부 보기
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
      setReservations(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    userReservation()
  }, [])

  const filteredReservations = reservations.filter(r => {
      // comeDatetime 에 값이 있으면 이용한거
      // cancelDatetime 에 값이 있으면 취소한거
      const isVisited = r.reservation.rsvComeDatetime !== null
      const isCancelled = r.reservation.rsvCancelDatetime !== null

      switch (filterType) {
        case "expected":
          return !isVisited && !isCancelled
        case "completed":
          return isVisited && !isCancelled
        case "cancelled":
          return isCancelled
        default:
          return false
      }
    }
  )

  return (
    <div className={"container py-4"}>

      <UseOrNoShow
        switchUN={(val) => setFilterType(val)}
        filterType={filterType}/>

      <div>
        {filteredReservations.length > 0 ? (
          filteredReservations.map(r => (
              <SjhReservationCard
                key={r.index}
                filterType={r.filterType}
                reservationIdx={r.reservation.reservationIdx}
                restaurantIdx={r.restaurant.resIdx}
                isUse={r.reservation.rsvComeDatetime}
                isCancel={r.reservation.rsvCancelDatetime}
                restName={r.restaurant.resName}
                date={r.reservation.rsvDate}
                time={r.reservation.rsvTime}
                people={r.reservation.rsvPeople}/>
            )
          )
        ) : (
          <p>예약 내역이 없습니다</p>
        )
        }
      </div>
    </div>
  );
}

export default SjhReservation