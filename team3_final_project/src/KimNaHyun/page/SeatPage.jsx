import Button from "../components/Button.jsx";
import SeatImg from "../components/SeatImg.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ReservationPage from "../../KimSangMin/Seat/ReservationPage.jsx";
import SeatLayout from "../../KimSangMin/Seat/SeatLayout.jsx";
import SeatLayoutTest from "../../simJiHyun/SeatLayoutTest.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import axios from "axios";
import useSeatIdStore from "../../stores/useSeatIdStore.jsx";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import useReservationIdxStore from "../../stores/useReservationIdxStore.jsx";

function SeatPage() {
  const userStore = useUserStore((state) => state.user)
  const resStore = useResStoreSjh((state) => state.res)
  const seatId = useSeatIdStore((state) => state.seatId)
  const setReservationIdxStore = useReservationIdxStore((state) => state.setReservationIdx)
  const reservationIdx = useReservationIdxStore((state) => state.reservationIdx)

  const userIdx = userStore.userIdx
  const resIdx = resStore.resIdx
  const rsvDate = "2025-05-13"
  const rsvTime = "10:00:00"

  console.log("userIdx : " + userIdx)
  console.log("seatId : " + seatId)
  console.log("resIdx : " + resIdx)
  console.log("reservationIdx : " + reservationIdx)


  const searchResIdx = () => {
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
  }

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

  // const {reservationId} = useParams();
  const Nv = useNavigate()

  return (
    <div className={'app-container  container py-4'}>
      <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>

      <div className={"p-0 m-0 w-100 d-flex"} style={{overflowX: 'auto'}}>
        <SeatLayoutTest/>
      </div>

      <Button btnName={'다음'} onClick={() => {
        searchResIdx()
        reserveSeat()
        // resSeat()
        // Nv(`/book/date/${reservationId}}`)
      }}/>
    </div>
  );
}

export default SeatPage






