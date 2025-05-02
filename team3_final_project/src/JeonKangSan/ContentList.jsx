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
                    <div className="px-3 pb-3"
                         onClick={() => {
                             Nv("/contentDetail")
                         }}>
                        <div className="d-flex justify-content-between gap-2 position-relative">
                            <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }}>
                                <img src="/monbette.jpg" alt="몬베톤 음식1" className="w-100 h-100" style={{ objectFit: 'cover' }}/>
                            </div>
                            <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }}>
                                <img src="/monbette2.jpg" alt="몬베톤 음식2" className="w-100 h-100" style={{ objectFit: 'cover' }}/>
                            </div>
                            <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }}>
                                <img src="/monbette3.jpg" alt="몬베톤 음식3" className="w-100 h-100" style={{ objectFit: 'cover' }}/>
                            </div>
                            {/* 대기팀 오버레이 */}
                            <div className="overlay-badge">
                                대기팀 : 3명
                            </div>
                        </div>
                    </div>

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

                    <div className="px-3 pb-3">
                        <div className="d-flex justify-content-between gap-2 position-relative">

                            <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }}>
                                <img src="/soupandsalad1.jpg"  alt="수프올샐러드 음식1"
                                     className="w-100 h-100" style={{ objectFit: 'cover'}}/>
                            </div>
                            <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }}>
                                <img src="/soupandsalad2.jpg"  alt="수프올샐러드 음식2"
                                     className="w-100 h-100" style={{ objectFit: 'cover'}}/>
                            </div>
                            <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }}>
                                <img src="/soupandsalad3.jpg"  alt="수프올샐러드 음식3"
                                     className="w-100 h-100" style={{ objectFit: 'cover'}}/>
                            </div>

                            {/* 대기팀 오버레이 */}
                            <div className="overlay-badge">
                                대기팀 : 1명
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ContentList;
