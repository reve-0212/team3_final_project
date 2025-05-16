// Bookmark.jsx

import "../css/bookmark.css"
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "/src/stores/useUserStore.jsx"


// 작업
import {useEffect, useState} from "react";
import axios from "axios";
import noImage from "../img/noimage.jpg"


function Bookmark() {
    const userStore = useUserStore((state) => state.user)
    const nv = useNavigate();
    const [bookmarkedStores, setBookmarkedStores] = useState([]);


    const userIdx = userStore && userStore.userIdx !== null ? userStore.userIdx : ""
    console.log("userIdx: ", userIdx);


    useEffect(() => {
        axios
            .get(`http://localhost:8080/bookmark/${userIdx}`)
            .then((res) => {
                console.log("북마크 응답 데이터:", res.data);
                setBookmarkedStores(res.data);
            })
            .catch((err) => {
                console.error("북마크 목록 불러오기 실패", err);
            });
    }, [userIdx]);

    return (
        <div className="container py-4">
            {bookmarkedStores.length === 0 ? (
                <p className="text-center text-muted">북마크한 가게가 없습니다.</p>
            ) : (
                bookmarkedStores.map((store) => (
                    <div
                        className="row pb-3 pt-3"
                        key={store.resIdx}
                        onClick={() => nv(`/resdetail/${store.resIdx}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="col-7 box1 d-flex justify-content-center align-items-center pe-0">
                            <div className="position-relative">
                                <div className="overflow-hidden h-100">
                                    <img
                                        src={store.resImage1 || noImage}
                                        alt={store.resName}
                                        className="position-absolute h-100 w-100"
                                        sizes="100vw"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col ps-0">
                            <p className="fw-bold mb-0 fs-5">{store.resName}</p>
                            <p className="mb-1 fs-6">
                                <FontAwesomeIcon icon={faStar} className="filled-star" />
                                <span className="ps-2 fw-bold">
                  {typeof store.avgRating === "number"
                      ? store.avgRating.toFixed(1)
                      : "0.0"}
                </span>
                                <span className="ps-2 text-muted">
                  ({store.reviewCount || 0})
                </span>
                            </p>
                            <p className="fs-6 mb-1">
                                <span>{store.categoryName || "카테고리 없음"}</span>
                            </p>
                            <p className="mb-1">
                                {store.reserveOrWaiting === "W" && (
                                    <span className="categoryBtn me-2">예약</span>
                                )}
                                {store.reserveOrWaiting === "R" && (
                                    <span className="categoryBtn me-2">원격줄서기</span>
                                )}
                                {store.restOption1 === "Y" && (
                                    <span className="categoryBtn me-2">현장대기</span>
                                )}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>




        // <div className={'container py-4'}>
        //     <div className={'row pb-3 pt-3'} onClick={()=>{nv("/contentDetail")}}>
        //         <div className={'col-7 box1 d-flex justify-content-center align-items-center pe-0'}>
        //             <div className={'position-relative'}>
        //                 <div className={'overflow-hidden h-100'}>
        //                     {/*<Link to={'/123'}>*/}
        //                         <img sizes={'100vw'} src={'https://image.tabling.co.kr/prod/restaurant/c77f069800d7443b2ea40ab06bb86339.jpg?s=396x396&f=webp'} alt="#" className={'position-absolute h-100 w-100'}/>
        //                     {/*</Link>*/}
        //                 </div>
        //             </div>
        //         </div>
        //         <div className={'col ps-0'}>
        //             <p className={'fw-bold mb-0 fs-5'}>트루먼커피 서면</p>
        //             <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
        //                 <span className={'ps-2 fw-bold'}>4.8</span>
        //                 <span className={'ps-2'} style={{color: 'lightgrey'}}>(2)</span>
        //             </p>
        //             <p className={'fs-6 mb-1'}>
        //                 <span>카페/베이커리</span>
        //             </p>
        //             <p className={'mb-1'}>
        //                 <span className={'categoryBtn me-2'}>예약</span>
        //                 <span className={'categoryBtn me-2'}>원격줄서기</span>
        //             </p>
        //         </div>
        //     </div>
        //
        //     <div className={'row pb-3 pt-3'}>
        //         <div className={'col-7 box1 d-flex justify-content-center align-items-center pe-0'}>
        //             <div className={'position-relative'}>
        //                 <div className={'overflow-hidden h-100'}>
        //                     <Link to={'/123'}>
        //                         <img sizes={'100vw'} src={'https://image.tabling.co.kr/prod/restaurant/c18ee4e72a7bcfc7985182de44d0cb4b.jpg?s=396x396&f=webp'} alt="#" className={'position-absolute h-100 w-100'}/>
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //         {/*가게 정보*/}
        //         <div className={'col ps-0'}>
        //             <p className={'fw-bold mb-0 fs-5'}>맛찬들왕소금구이 서면점</p>
        //             <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
        //                 <span className={'ps-2 fw-bold'}>4.7</span>
        //                 <span className={'ps-2'} style={{color: 'lightgrey'}}>(2087)</span>
        //             </p>
        //             <p className={'fs-6 mb-1'}>
        //                 <span>육류</span>
        //             </p>
        //             <p className={'mb-1'}>
        //                 <span className={'categoryBtn me-2'}>원격줄서기</span>
        //             </p>
        //         </div>
        //     </div>
        //
        //     <div className={'row pb-3 pt-3'}>
        //         <div className={'col-7 box1 d-flex justify-content-center align-items-center pe-0'}>
        //             <div className={'position-relative'}>
        //                 <div className={'overflow-hidden h-100'}>
        //                     <Link to={'/123'}>
        //                         <img sizes={'100vw'} src={'https://polle-image.tabling.co.kr/posts/jbirDSSL6qtDrJBdK6CZag.jpg?s=396x396&f=webp'} alt="#" className={'position-absolute h-100 w-100'}/>
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className={'col ps-0'}>
        //             <p className={'fw-bold mb-0 fs-5'}>블랙업커피 서면</p>
        //             <p className={'mb-1 fs-6'}><FontAwesomeIcon icon={faStar} className={'filled-star'}/>
        //                 <span className={'ps-2 fw-bold'}>4.1</span>
        //                 <span className={'ps-2'} style={{color: 'lightgrey'}}>(217)</span>
        //             </p>
        //             <p className={'fs-6 mb-1'}>
        //                 <span>카페/베이커리</span>
        //             </p>
        //             <p className={'mb-1'}>
        //                 <span className={'categoryBtn me-2'}>예약</span>
        //             </p>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Bookmark