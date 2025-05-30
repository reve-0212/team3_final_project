import SjhReservationCard from "./SjhReservationCard.jsx";
import UseOrNoShow from "./UseOrNoShow.jsx";
import {useEffect, useState} from "react";
import useUserStore from "../../stores/useUserStore.jsx";
import api from "../../api/axios.js"


// state
function SjhReservation() {
  // expected : 이용 예정 , completed : 이용 완료 , cancelled : 취소
  const [filterType, setFilterType] = useState("expected")
  const [reservations, setReservations] = useState([])
  const user = useUserStore((state) => state.user)

  // 예약 여부 보기
  const userReservation = () => {
    api.get(`/userReservation`, {
      params: {
        userIdx: user.userIdx
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    }).then(res => {
      setReservations(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (user !== null) {
      userReservation()
    }
  }, [])

  const filteredReservations = reservations.filter(r => {
      // comeDatetime 에 값이 있으면 이용한거
      // cancelDatetime 에 값이 있으면 취소한거
      const isVisited = r.reservationDTO?.rsvComeDatetime !== null
      const isCancelled = r.reservationDTO?.rsvCancelDatetime !== null

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
        {/*로그인 했을 경우에만 리스트 출력. 로그인 안 했으면 로그인후 사용해주세요 출력*/}
        {user !== null ? (
          // 이용 예정, 완료, 취소 리스트가 있는지 확인. 그 후 값이 있으면 화면에 출력
          <div>
            {filteredReservations.length > 0 ? (
              filteredReservations.map(r => (
                <SjhReservationCard
                  key={r.index}
                  filterType={r.filterType}
                  reservationIdx={r.reservationDTO.reservationIdx}
                  restaurantIdx={r.restaurantDTO.resIdx}
                  isUse={r.reservationDTO.rsvComeDatetime}
                  isCancel={r.reservationDTO.rsvCancelDatetime}
                  restName={r.restaurantDTO.resName}
                  date={r.reservationDTO.rsvDate}
                  time={r.reservationDTO.rsvTime}
                  people={r.reservationDTO.rsvPeople}/>
              ))) : (
              <div className={"d-flex justify-content-center align-items-center"}>
                <p>내역이 없습니다</p>
              </div>
            )}
          </div>
        ) : (
          <div className={"d-flex justify-content-center align-items-center vh-100"}>
            <p>로그인 후 사용해주세요</p>
          </div>

        )}

      </div>
    </div>
  );
}

export default SjhReservation