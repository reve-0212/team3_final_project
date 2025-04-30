import VisitorBtn from "../waiting/VisitorBtn.jsx";
import Button from "../waiting/Button.jsx";
import SeatImg from "../waiting/SeatImg.jsx";

function SeatPage() {
    return (
        <div className={'app-container'}>
            <h3 className={'waiting-title'}>좌석을 선택하세요.</h3>
            <SeatImg />
            <Button btnName={'다음'}/>
        </div>
    );
}

export default SeatPage






