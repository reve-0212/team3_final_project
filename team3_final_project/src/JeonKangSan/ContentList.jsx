import "./JksSheet.css";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkRegular} from "@fortawesome/free-regular-svg-icons";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

function ContentList() {
    const Nv = useNavigate();
    const [bookmarks, setBookmarks] = useState({
        store1: false,
        store2: false
    })

    const toggleBookmark = (storeKey) => {
        setBookmarks(prev => ({
            ...prev,
            [storeKey]: !prev[storeKey]
        }))
    }

    return (
        <div className="app-container">

            {/* 상단 필터 버튼 - */}
            <div className="d-flex gap-2 mb-4">
                <button className="btn btn-outline-secondary btn-sm"><i className="fa-solid fa-rotate-right"></i> 초기화
                </button>

                {/* 지역 선택 콤보박스 */}
                <div className="position-relative">
                    <select
                        className="btn btn-sm button-seebox me-auto text-start"
                        style={{width: 'auto', appearance: 'none'}}
                        aria-label="지역 선택"
                    >
                        <option>지역 선택</option>
                        <option>전포동</option>
                        <option>서면</option>
                        <option>해운대</option>
                        <option>남포동</option>
                    </select>
                    <i
                        className="fa-solid fa-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-white"
                        style={{pointerEvents: 'none'}}></i>
                </div>

                {/* 정렬 기준 선택 콤보박스 */}
                <div className="position-relative d-inline-block">
                    <select
                        className="btn button-seebox btn-sm text-start"
                        style={{
                            width: 'auto',
                            appearance: 'none',
                            paddingRight: '2rem'
                        }}
                        aria-label="정렬 기준 선택"
                    >
                        <option>가까운 순</option>
                        <option>별점 높은 순</option>
                        <option>대기 짧은 순</option>
                        <option>리뷰 많은 순</option>
                    </select>
                    <i
                        className="fa-solid fa-chevron-down position-absolute top-50 translate-middle-y me-1 text-white"
                        style={{right: '10px', pointerEvents: 'none'}}
                    ></i>
                </div>

            </div>
            <hr></hr>
            <br></br>

            {/* 가게 리스트 */}
            <div className="mb-5">

                {/* 첫 번째 가게 */}
                <div className="card mb-4" style={{cursor: 'pointer'}}>
                    <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 fw-semibold flex-fill"
                                onClick={() => {
                                    Nv("/contentDetail")
                                }}>몬베톤</h5>
                            <button className="btn btn-sm" onClick={() => toggleBookmark("store1")}>
                                <FontAwesomeIcon icon={bookmarks.store1 ? faBookmark : faBookmarkRegular}/>
                            </button>
                        </div>
                        <p className="card-text my-2" onClick={() => {
                            Nv("/contentDetail")
                        }}>⭐ 4.6 (109)</p>
                        <small className="text-muted d-flex flex-fill" onClick={() => {
                            Nv("/contentDetail")
                        }}>양식 · 전포동(602m)</small>
                        <div className="d-flex gap-2 my-2">
                            <span className="badge-default bg-light text-muted border">원격줄서기</span>
                            <span className="badge-default bg-light text-muted border">현장대기</span>
                            <span className="badge-default bg-light text-muted border">재방문많음</span>
                        </div>
                    </div>
                    <div id="storeImageCarousel" className="carousel slide" data-bs-ride="carousel"
                         onClick={() => {
                             Nv("/contentDetail")
                         }}>
                        <div className="carousel-inner rounded">
                            <div className="carousel-item active">
                                <img src="/monbette.jpg" className="d-block w-100" alt="몬베톤 음식"/>
                            </div>
                            <div className="carousel-item">
                                <img src="/monbette2.jpg" className="d-block w-100" alt="몬베톤 음식2"/>
                            </div>
                            <div className="carousel-item">
                                <img src="/monbette3.jpg" className="d-block w-100" alt="몬베톤 음식3"/>
                            </div>
                            <div className="carousel-overlay-text">대기팀 : 3명</div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#storeImageCarousel"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">이전</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#storeImageCarousel"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">다음</span>
                        </button>
                    </div>
                </div>

                {/* 두 번째 가게 */}
                <div className="card mb-4" style={{cursor: 'pointer'}}>
                    <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 fw-semibold">수프올샐러드</h5>
                            <button className="btn btn-sm">
                                <i className="fa-regular fa-bookmark"></i>
                            </button>
                        </div>
                        <p className="card-text my-2">⭐ 4.7 (241)</p>
                        <small className="text-muted">카페/베이커리 · 전포동(806m)</small>
                        <div className="d-flex gap-2 my-2">
                            <span className="badge-default bg-light text-muted border">원격줄서기</span>
                            <span className="badge-default bg-light text-muted border">현장대기</span>
                            <span className="badge-default bg-light text-muted border">테이블많음</span>
                        </div>
                    </div>
                    <div id="soupAndSaladCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner rounded position-relative">

                            <div className="carousel-item active">
                                <img src="/soupandsalad1.jpg" className="d-block w-100" alt="수프올샐러드 음식1"
                                     style={{height: '100%', objectFit: 'cover'}}/>
                            </div>

                            <div className="carousel-item">
                                <img src="/soupandsalad2.jpg" className="d-block w-100" alt="수프올샐러드 음식2"
                                     style={{height: '100%', objectFit: 'cover'}}/>
                            </div>

                            <div className="carousel-item">
                                <img src="/soupandsalad3.jpg" className="d-block w-100" alt="수프올샐러드 음식3"
                                     style={{height: '100%', objectFit: 'cover'}}/>
                            </div>

                            <div className="carousel-overlay-text">대기팀 : 1명</div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#soupAndSaladCarousel"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">이전</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#soupAndSaladCarousel"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">다음</span>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ContentList;
