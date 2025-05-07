import "../css/bookmark.css"
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Bookmark() {
    const nv = useNavigate();

    return (
        <div className={'container py-4'}>
            <div className={'row pb-3 pt-3'} onClick={()=>{nv("/contentDetail")}}>
                <div className={'col-7 box1 d-flex justify-content-center align-items-center pe-0'}>
                    <div className={'position-relative'}>
                        <div className={'overflow-hidden h-100'}>
                            {/*<Link to={'/123'}>*/}
                                <img sizes={'100vw'} src={'https://image.tabling.co.kr/prod/restaurant/c77f069800d7443b2ea40ab06bb86339.jpg?s=396x396&f=webp'} alt="#" className={'position-absolute h-100 w-100'}/>
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
                <div className={'col ps-0'}>
                    <p className={'fw-bold mb-0 fs-5'}>트루먼커피 서면</p>
                    <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
                        <span className={'ps-2 fw-bold'}>4.8</span>
                        <span className={'ps-2'} style={{color: 'lightgrey'}}>(2)</span>
                    </p>
                    <p className={'fs-6 mb-1'}>
                        <span>카페/베이커리</span>
                    </p>
                    <p className={'mb-1'}>
                        <span className={'categoryBtn me-2'}>예약</span>
                        <span className={'categoryBtn me-2'}>원격줄서기</span>
                    </p>
                </div>
            </div>

            <div className={'row pb-3 pt-3'}>
                <div className={'col-7 box1 d-flex justify-content-center align-items-center pe-0'}>
                    <div className={'position-relative'}>
                        <div className={'overflow-hidden h-100'}>
                            <Link to={'/123'}>
                                <img sizes={'100vw'} src={'https://image.tabling.co.kr/prod/restaurant/c18ee4e72a7bcfc7985182de44d0cb4b.jpg?s=396x396&f=webp'} alt="#" className={'position-absolute h-100 w-100'}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'col ps-0'}>
                    <p className={'fw-bold mb-0 fs-5'}>맛찬들왕소금구이 서면점</p>
                    <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
                        <span className={'ps-2 fw-bold'}>4.7</span>
                        <span className={'ps-2'} style={{color: 'lightgrey'}}>(2087)</span>
                    </p>
                    <p className={'fs-6 mb-1'}>
                        <span>육류</span>
                    </p>
                    <p className={'mb-1'}>
                        <span className={'categoryBtn me-2'}>원격줄서기</span>
                    </p>
                </div>
            </div>

            <div className={'row pb-3 pt-3'}>
                <div className={'col-7 box1 d-flex justify-content-center align-items-center pe-0'}>
                    <div className={'position-relative'}>
                        <div className={'overflow-hidden h-100'}>
                            <Link to={'/123'}>
                                <img sizes={'100vw'} src={'https://polle-image.tabling.co.kr/posts/jbirDSSL6qtDrJBdK6CZag.jpg?s=396x396&f=webp'} alt="#" className={'position-absolute h-100 w-100'}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'col ps-0'}>
                    <p className={'fw-bold mb-0 fs-5'}>블랙업커피 서면</p>
                    <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
                        <span className={'ps-2 fw-bold'}>4.1</span>
                        <span className={'ps-2'} style={{color: 'lightgrey'}}>(217)</span>
                    </p>
                    <p className={'fs-6 mb-1'}>
                        <span>카페/베이커리</span>
                    </p>
                    <p className={'mb-1'}>
                        <span className={'categoryBtn me-2'}>예약</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Bookmark