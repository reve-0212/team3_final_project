import Button from "../components/Button.jsx";
import SeatImg from "../components/SeatImg.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ReservationPage from "../../KimSangMin/Seat/ReservationPage.jsx";
import SeatLayout from "../../KimSangMin/Seat/SeatLayout.jsx";
import SeatLayoutTest from "../../simJiHyun/SeatLayoutTest.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import axios from "axios";
import useSeatIdStore from "../../stores/useSeatIdStore.jsx";

function SeatPage() {
  const userStore = useUserStore((state) => state.user)
  const seatId = useSeatIdStore((state) => state.seatId)
  const userIdx = userStore.userIdx
  console.log("userIdx : " + userIdx)
  console.log("seatId : " + seatId)

  const resIdx = 1
  const menuIdx = 1

  const resSeat = () => {
    axios.put("http://localhost:8080/resSeat", {
      userIdx: userIdx,
      resIdx: resIdx,
      menuIdx: menuIdx,
      seatId: seatId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    })
      .then((res) => {
        Nv(`/book/menu/${userIdx}/${resIdx}`);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        Nv(`/book/menu/${userIdx}/${resIdx}`);
      })
  }

  const {reservationId} = useParams();
  const Nv = useNavigate()



  return (
    <div className={'app-container  container py-4'}>
      <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>

      <div className={"p-0 m-0 w-100 d-flex"} style={{overflowX: 'auto'}}>
        <SeatLayoutTest/>
      </div>

      <Button btnName={'다음'} onClick={() => {
        resSeat()
        // Nv(`/book/date/${reservationId}}`)
      }}/>
    </div>
  );
}

export default SeatPage






