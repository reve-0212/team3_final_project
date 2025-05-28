import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import SeatLayoutTest from "../../simJiHyun/SeatLayoutTest.jsx";
import useUserStore from "../../stores/useUserStore.jsx";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";
import useRsvDateStore from "../../stores/useRsvDateStore.jsx";
import useRsvTimeStore from "../../stores/useRsvTimeStore.jsx";
import useRsvDateTimeStore from "../../stores/useRsvDateTimeStore.jsx";

function SeatPage() {
  const Nv = useNavigate()
  const userStore = useUserStore((state) => state.user)
  const resStore = useResStoreSjh((state) => state.res)
  const rsvDateStore = useRsvDateStore((state) => state.rsvDate)
  const rsvTimeStore = useRsvTimeStore((state) => state.rsvTime)
  const setRsvDateTimeStore = useRsvDateTimeStore((state) => state.setRsvDateTime)

  const userIdx = userStore.userIdx
  const resIdx = resStore.resIdx
  const rsvDate = rsvDateStore
  const rsvTime = rsvTimeStore
  const rsvDateTime = rsvDate + " " + rsvTime

  return (
    <div className={'app-container  container py-4'}>
      <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>

      <div className={"p-0 m-0 w-100 d-flex"} style={{overflowX: 'auto'}}>
        <SeatLayoutTest/>
      </div>

      <Button btnName={'다음'} onClick={() => {
        setRsvDateTimeStore(rsvDateTime)
        Nv(`/book/menu/${userIdx}/${resIdx}`)
      }}/>
    </div>
  );
}

export default SeatPage






