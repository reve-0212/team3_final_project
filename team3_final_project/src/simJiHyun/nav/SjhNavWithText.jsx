import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function SjhNavWithText() {
    const navigate = useNavigate();

    const arrowLeft = () => {
        navigate(-1);
    }
    return (
        <nav className={"navbar navbar-expand-lg navbar-light"}>
            <div className={"container-fluid d-flex position-relative m-1"}>
                <FontAwesomeIcon icon={faArrowLeft} className={"fs-5"} onClick={arrowLeft}/>
                <p className={"fs-5 mb-0 position-absolute start-50 translate-middle-x fw-bold"}>예약내역</p>
            </div>
        </nav>
    );
}

export default SjhNavWithText