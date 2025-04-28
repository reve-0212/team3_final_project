import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function sjhNav() {
    const navigate = useNavigate();

    const arrowLeft = () => {
        navigate(-1);
    }
    return (
        <nav className={"navbar navbar-expand-lg navbar-light"}>
            <div className={"container-fluid m-1"}>
                <FontAwesomeIcon icon={faArrowLeft} className={"fs-5"} onClick={arrowLeft}/>
            </div>
        </nav>
    );
}

export default sjhNav