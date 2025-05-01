import VisitorBtn from "../components/VisitorBtn.jsx";
import Button from "../components/Button.jsx";
import SeatImg from "../components/SeatImg.jsx";
import {useNavigate} from "react-router-dom";

function SeatPage() {
    const Nv = useNavigate()

    return (
        <div className={'app-container'}>
            <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>
            <SeatImg/>
            <Button btnName={'다음'} onClick={() => {
                Nv("/waiting/reg")
            }}/>
        </div>
    );
}

export default SeatPage






