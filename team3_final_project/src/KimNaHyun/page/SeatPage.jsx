
import Button from "../components/Button.jsx";
import SeatImg from "../components/SeatImg.jsx";
import {useNavigate, useParams} from "react-router-dom";

function SeatPage() {
    const {reservationId} = useParams();
    const Nv = useNavigate()

    return (
        <div className={'app-container  container py-4'}>
            <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>
            <SeatImg/>
            <Button btnName={'다음'} onClick={() => {
                Nv(`/book/date/${reservationId}}`)
            }}/>
        </div>
    );
}

export default SeatPage






