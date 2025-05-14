import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import SeatLayoutTest from "../../simJiHyun/SeatLayoutTest.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import axios from "axios";
import useSeatIdStore from "../../stores/useSeatIdStore.jsx";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx";
import useRsvDateStore from "../../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../../stores/useRsvTimeStore.jsx";
import {useEffect} from "react";
import usePeopleStore from "../../stores/usePeopleStore.jsx";
import useRsvDateTimeStore from "../../stores/useRsvDateTimeStore.jsx";

function SeatPage() {
  const Nv = useNavigate()
  const userStore = useUserStore((state) => state.user)
  const resStore = useResStoreSjh((state) => state.res)
  const seatId = useSeatIdStore((state) => state.seatId)
  const setReservationIdxStore = useReservationIdxStore((state) => state.setReservationIdx)
  const reservationIdx = useReservationIdxStore((state) => state.reservationIdx)
  const rsvDateStore = useRsvDateStore((state) => state.rsvDate)
  const rsvTimeStore = useRsvTimeStore((state) => state.rsvTime)
  const people = usePeopleStore((state) => state.people)
  const setRsvDateTimeStore = useRsvDateTimeStore((state) => state.setRsvDateTime)

  const userIdx = userStore.userIdx
  const resIdx = resStore.resIdx
  const rsvDate = rsvDateStore
  const rsvTime = rsvTimeStore
  const rsvDateTime = rsvDate + " " + rsvTime

  useEffect(() => {
    console.log(people)
  }, [people]);

  console.log("userIdx : " + userIdx)
  console.log("seatId : " + seatId)
  console.log("resIdx : " + resIdx)
  console.log("reservationIdx : " + reservationIdx)
  console.log("rsvDate : " + rsvDate)
  console.log("rsvTime : " + rsvTime)

  useEffect(() => {
    axios.get("http://localhost:8080/searchResIdx", {
      params: {
        userIdx: userIdx,
        resIdx: resIdx,
        rsvDate: rsvDate,
        rsvTime: rsvTime
      }, headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    }).then((res) => {
      console.log(res.data)
      setReservationIdxStore(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const shouldLeave = window.confirm("현재까지 예약한 내역이 초기화됩니다. 계속 하시겠습니까?")
      // 아니요 를 누르면 히스토리에 지금 이 페이지를 한번 더 저장한다
      // 사용자가 뒤로가기를 눌렀을 때 이 페이지로 다시 돌아옴
      if (shouldLeave) {
        axios.delete("http://localhost:8080/deleteReservation", {
          params: {
            userIdx: userIdx,
            reservationIdx: reservationIdx
          }, headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
          }
        }).then((res) => {
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })

        window.history.pushState(null, "", window.location.href)
      }
    }

    // 끝나면 handlePopState 이벤트 없애기
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  console.log("searchReservationIdx")
  console.log(reservationIdx)

  const reserveSeat = () => {
    for (let i = 0; i < seatId.length; i++) {
      axios.put("http://localhost:8080/reserveSeat", null, {
        params: {
          reservationIdx: reservationIdx,
          seatId: seatId[i]
        }, headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div className={'app-container  container py-4'}>
      <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>

      <div className={"p-0 m-0 w-100 d-flex"} style={{overflowX: 'auto'}}>
        <SeatLayoutTest/>
      </div>

      <Button btnName={'다음'} onClick={() => {
        reserveSeat()
        setRsvDateTimeStore(rsvDateTime)
        Nv(`/book/menu/${userIdx}/${resIdx}`)
      }}/>
    </div>
  );
}

export default SeatPage






