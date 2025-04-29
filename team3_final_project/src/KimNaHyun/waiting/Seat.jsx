import VisitorBtn from "./VisitorBtn.jsx";
import Button from "./Button.jsx";
import SeatImg from "./SeatImg.jsx";

function Seat() {
    return (
        <div className={'app-container'}>
            <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>
            <SeatImg />
            <Button btnName={'다음'}/>
        </div>
    );
}

export default Seat






