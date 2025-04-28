import "../css/bookmark.css"
import {Link} from "react-router-dom";

import noImage from "../img/noimage.jpg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Bookmark() {
    return (
        <div className={'container py-4 vh-100'}>
            <div className={'row pb-3 pt-3'}>
                <div className={'col-sm-6 box1 d-flex justify-content-center align-items-center pe-0'}>
                    <div className={'position-relative'}>
                        <div className={'overflow-hidden h-100'}>
                            <Link to={'/123'}>
                                <img sizes={'100vw'} src={noImage} alt="#" className={'position-absolute h-100 w-100'}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'col-sm ps-0'}>
                    <p className={'fw-bold mb-0 fs-5'}>트루먼커피 서면</p>
                    <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
                        <span className={'ps-2 fw-bold'}>4.8</span>
                        <span className={'ps-2'} style={{color: 'lightgrey'}}>(27)</span>
                    </p>
                    <p className={'fs-6'}>
                        <span>카페/베이커리</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Bookmark