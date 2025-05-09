// ContentDetail.jsx

import {useEffect, useState} from "react";
import "./JksSheet.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ContentDetail() {
    const [ActTab, setActTab] = useState("상세정보");
    const [RevTab, setRevTab] = useState("rev"); // 기본값: 리뷰(rev)
    const Nv = useNavigate();
    const [storeInfo, setStoreInfo] = useState("");
    const [bestMenus, setBestMenus] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [announce, setAnnounce] = useState(null);



    useEffect(() => {
        axios.get("http://localhost:8080/test22")
            .then((res) => {
                console.log("받은 데이터:", res.data);
                setStoreInfo(res.data[0]); // 리스트라면 [0], 객체면 그대로
            })
            .catch((err) => {
                console.error("요청 실패:", err);
            });
    }, []);

    useEffect(() => {
        if (ActTab === "대표메뉴" && storeInfo?.resIdx) {
            axios.get(`http://localhost:8080/bestmenu?resIdx=${storeInfo.resIdx}`)
                .then((res) => setBestMenus(res.data))
                .catch((err) => console.error("대표메뉴 오류:", err));
        }
    }, [ActTab, storeInfo]);

    useEffect(() => {
        if (ActTab === "리뷰" && storeInfo?.resIdx) {
            axios.get(`http://localhost:8080/reviews?resIdx=${storeInfo.resIdx}`)
                .then((res) => setReviews(res.data))
                .catch((err) => console.error("리뷰 오류:", err));
        }
    }, [ActTab, storeInfo]);

    useEffect(() => {
        axios.get("http://localhost:8080/announce")
            .then((res) => setAnnounce(res.data))
            .catch((err) => console.error("공지사항 불러오기 실패", err));
    }, []);



    return (
        <div className="app-container">

            <div className="container py-2 content-container">

                {/* 가게 대표 이미지 */}
                <div className="d-flex justify-content-center align-items-center bg-light w-100 mb-3"
                     style={{height: '250px'}}>
                    <span className="text-muted">사진</span>
                </div>

                {/* 가게 이름 */}
                <div className="d-flex justify-content-start text mb-2">
                    <h5 className="fw-bold">
                        {storeInfo ? storeInfo.resName : "로딩 중..."}</h5>
                </div>

                {/* 별점 및 영업정보 */}
                <div className="text-start mb-4">
                    <small className="fw-bold">
                        별점 {reviews[0] ? reviews[0].reviewRating : "0.0"} / 리뷰갯수 {reviews.length}
                    </small><br/>
                    <hr/>
                    <small className="fw-bold">영업중 {storeInfo ? storeInfo.resReserveTime : "-"}</small><br/>
                    <small className="fw-bold">전화번호 {storeInfo ? storeInfo.resCall : "-"}</small>
                    <hr/>
                </div>
                {/* 탭메뉴 */}
                {/* 버튼 메뉴 */}
                <div className="d-flex justify-content-center gap-2 mb-3">
                    <div className="d-flex gap-2 mb-3">
                        <button
                            className={`tab-btn ${ActTab === "상세정보" ? "active" : ""}`}
                            onClick={() => setActTab("상세정보")}
                        >
                            상세정보
                        </button>
                        <button
                            className={`tab-btn ${ActTab === "대표메뉴" ? "active" : ""}`}
                            onClick={() => setActTab("대표메뉴")}
                        >
                            대표메뉴
                        </button>
                        <button
                            className={`tab-btn ${ActTab === "리뷰" ? "active" : ""}`}
                            onClick={() => setActTab("리뷰")}
                        >
                            리뷰
                        </button>
                    </div>
                </div>

                {/* 상세정보 */}
                {ActTab === "상세정보" && (
                    <div className="mb-5 text-start">
                        <br/>
                        <h4 className="extra-bold">매장소개 {storeInfo ? storeInfo.resIntroduce : "-"}</h4>
                        <div className="mb-3">
                            <small className="notice-text">알림</small>
                            <p className="small mt-1">
                                {announce ? announce.announceContent : "공지사항을 불러오는 중입니다..."}
                            </p>
                        </div>


                        <br/>
                        <div className="mb-3">
                            <h4 className="extra-bold">편의시설</h4>
                            <ul>
                                <li>준비중</li>
                            </ul>
                        </div>


                        <br/>
                        <div className="mb-3">
                            <h4 className="extra-bold mb-2">위치</h4>
                            <div className="mt-2">
                                {storeInfo ? storeInfo.resAddress1 : "-"}
                            </div>
                            <div className="location-box">
                                지도 준비중
                            </div>
                        </div>


                        <br/>
                        <div className="mb-3 text-start">
                            <h4 className="extra-bold">#해시태그</h4>

                            <div className="d-flex flex-wrap gap-2 ps-2 pt-2">
                                <div><span className="badge">#혼술맛집</span></div>
                                <div><span className="badge">#안주맛집</span></div>
                                <div><span className="badge">#친절함</span></div>
                                <div><span className="badge">#청결함</span></div>
                            </div>

                            <div className="d-flex flex-wrap gap-2 ps-2 pt-2">
                                <div><span className="badge">#분위기 맛집</span></div>
                                <div><span className="badge">#로맨틱한</span></div>
                                <div><span className="badge">#데이트장소</span></div>
                                <div><span className="badge">#빈티지한</span></div>
                            </div>
                        </div>


                    </div>
                )}

                {/* 대표메뉴 */}

                {ActTab === "대표메뉴" && (
                    <div className="mb-5">
                        <h5 className="mb-3 fw-bold text-start">대표메뉴</h5>
                        {bestMenus.map((menu, idx) => (
                            <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <div className="text-start">
                                    <div className="fw-bold">{menu.testmenuName}</div>
                                    <div className="text-muted small">{menu.testmenuDesc}</div>
                                    <div className="fw-bold mt-3">{menu.testmenuPrice} 원</div>
                                </div>
                                <div className="bg-light d-flex justify-content-center align-items-center"
                                     style={{width: "64px", height: "64px", borderRadius: "6px"}}>
                                    <span className="text-muted small">사진</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {/*/!* 리뷰 *!/*/}
                {ActTab === "리뷰" && (
                    <div className="mb-5 text-start">
                        {/* 텍스트 탭 메뉴 */}
                        <div className="tab-menu-wrapper d-flex mb-4">
                            <div
                                className={`tab-menu-text ${RevTab === "rev" ? "active" : ""}`}
                                onClick={() => setRevTab("rev")}
                            >
                                일반리뷰
                            </div>
                            <div
                                className={`tab-menu-text ${RevTab === "onepick" ? "active" : ""}`}
                                onClick={() => setRevTab("onepick")}
                            >
                                원픽리뷰
                            </div>
                        </div>

                        {/* 평점 통계 영역 시작 */}
                        <div className="mb-3 text-start">
                            {/* 별점통계 제목 */}
                            <h6 className="fw-semibold small mb-3">별점통계</h6>

                            {/* 평점 전체영역: 별점과 세부항목을 한 줄로 */}
                            <div className="d-flex align-items-start">

                                {/* ★ 4.7 전체평점 묶음 */}
                                <div className="d-flex flex-column align-items-center me-3" style={{minWidth: "70px"}}>
                                    <span className="fw-bold text-warning" style={{fontSize: "1.5rem"}}>★</span>
                                    <span className="fw-bold" style={{fontSize: "1.2rem"}}>4.7</span>
                                    <small className="text-muted">전체 평점</small>
                                </div>

                                {/* 오른쪽 음식/가격/서비스/청결 점수줄 */}
                                <div className="flex-grow-1">
                                    {['음식', '가격', '서비스', '청결'].map((label, i) => (
                                        <div key={i} className="d-flex align-items-center mb-2">
                                            {/* 항목명 */}
                                            <div style={{width: '60px', fontSize: '0.85rem'}}>{label}</div>

                                            {/* 진행바 */}
                                            <div className="flex-grow-1 me-2">
                                                <div className="progress" style={{height: '6px'}}>
                                                    <div className="progress-bar bg-warning"
                                                         style={{width: '85%'}}></div>
                                                </div>
                                            </div>

                                            {/* 수치 */}
                                            <div style={{width: '30px', fontSize: '0.8rem'}}>4.8</div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <h5 className="mt-5 text-start fw-bold">사진</h5>
                        <div
                            className="bg-light rounded text-center d-flex justify-content-center align-items-center mb-4"
                            style={{height: '150px'}}>
                            <span className="text-muted">슬라이드 방식으로 사진 리스트 출력</span>
                        </div>

                        {/* 리뷰 정렬 */}
                        <div className="d-flex align-items-center mb-2">
                            {/* 필터 select 박스 */}
                            <select className="custom-select-text" aria-label="리뷰 정렬 기준" defaultValue="latest">
                                <option value="latest">최신순</option>
                                <option value="oldest">오래된순</option>
                                <option value="high">평점높은순</option>
                                <option value="low">평점낮은순</option>
                            </select>
                            <span className="custom-span-text ms-2">사진리뷰</span>
                        </div>

                        {/* 리뷰 리스트 (더미) */}
                        {reviews.map((review, idx) => (
                            <div key={idx} className="d-flex justify-content-between align-items-start border-bottom py-3">
                                <div className="flex-grow-1 pe-2">
                                    <div className="fw-bold">{review.userName || "사용자"} <span className="text-warning">★{review.reviewRating}</span></div>
                                    <div className="small text-muted">{review.reviewWriteDate}</div>
                                    <div className="small">{review.reviewContent}</div>
                                </div>
                                <div className="bg-light d-flex justify-content-center align-items-center"
                                     style={{width: "60px", height: "60px", borderRadius: "6px"}}>
                                    <span className="text-muted small">사진</span>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
                {/* 예약 등록, 웨이팅 등록*/}
                <div className="d-flex flex-column gap-2 mb-4">
                    <div className="text-start"><h4 className="extra-bold">예약 시간</h4></div>
                    <div className="location-box"></div>
                    <button className="common-btn w-100" onClick={() => {
                        Nv("/book/visit")
                    }}>예약하기
                    </button>
                    {/*<button className="common-btn w-100" onClick={() => {*/}
                    {/*    Nv("/waiting/visit")*/}
                    {/*}}>웨이팅하기*/}
                    {/*</button>*/}
                </div>

            </div>


        </div>
    );
}

export default ContentDetail;
