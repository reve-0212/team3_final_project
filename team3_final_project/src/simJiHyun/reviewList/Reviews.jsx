import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Reviews() {
    return (
        <div className={"d-flex flex-row align-items-center justify-content-around py-3 mx-3"}
             style={{borderBottom: "1px solid #A9A9A9"}}>
            <div>
                <p className={"fs-4 fw-bold"}>런던베이글</p>
                <p className={"fs-6"}>맛있어요 또 갈게요</p>
                <p className={"fs-6"}>2025-04-30</p>
                <div className={"d-flex flex-row"}>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                </div>
            </div>
            <div
                className={"rounded-3"}
                style={{width: "10rem", height: "10rem", backgroundColor: "#A9A9A9"}}/>
        </div>
    );
}

export default Reviews