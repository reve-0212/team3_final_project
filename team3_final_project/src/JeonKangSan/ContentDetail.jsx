// ContentDetail.jsx

import {useState} from "react";
import "./JksSheet.css";
import {useNavigate} from "react-router-dom";

function ContentDetail() {
    const [ActTab, setActTab] = useState("상세정보");
    const [RevTab, setRevTab] = useState("rev"); // 기본값: 리뷰(rev)
    const Nv = useNavigate();


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
                    <h5 className="fw-bold">가게이름</h5>
                </div>

                {/* 별점 및 영업정보 */}
                <div className="text-start mb-4">
                    <small className="fw-bold">별점 0.0 / 리뷰 갯수</small><br/>
                    <hr/>
                    <small className="fw-bold">영업중 오늘 11:00 ~ 22:00 ▼</small><br/>
                    <small className="fw-bold">전화번호 051-1234-5678</small>
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
                        <h4 className="extra-bold">매장소개</h4>
                        <div className="mb-3">
                            <small className="notice-text">알림</small>
                            <p className="small mt-1">
                                월 ~ 목 브레이크 타임 15:00 ~ 17:00<br/>
                                금토일 브레이크 타임 없이 운영됩니다.<br/>
                                시즌 한정 메뉴를 제외한 전 메뉴 포장 가능합니다.<br/>
                                해목은 나고야식 히츠마부시(장어덮밥) 전문점 입니다. <br/>
                                그외 카이센동과 마구로동, 튀김 등<br/>
                                다양한 메뉴도 함께 즐길 수 있습니다.<br/>
                                항상 해목을 사랑해 주셔서 감사합니다.<br/>
                            </p>
                        </div>


                        <br/>
                        <div className="mb-3">
                            <h4 className="extra-bold">편의시설</h4>
                            <ul>
                                <li>단체석 구비</li>
                                <li>콜키지 서비스 가능</li>
                                <li>유아용 의자 구비</li>
                                <li>테라스 시설 구비</li>
                                <li>남녀 화장실 구분</li>
                            </ul>
                        </div>


                        <br/>
                        <div className="mb-3">
                            <h4 className="extra-bold mb-2">위치</h4>
                            <div className="location-box">
                            </div>
                            <div className="mt-2">
                                부산 해운대구 구남로 24번길 8 (우동) 1층
                            </div>
                        </div>


                        <br/>
                        <div className="mb-3 text-start">
                            <h4 className="extra-bold">#해시태그</h4>

                            <div className="d-flex flex-wrap gap-2 ps-2 pt-2">
                                <div><span className="badge">#혼술 맛집</span></div>
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

                        {[1, 2, 3].map((idx) => (
                            <div key={idx}
                                 className="d-flex justify-content-between align-items-center border-bottom py-3">
                                {/* 메뉴 설명 영역 */}
                                <div className="text-start">
                                    <div className="fw-bold">메뉴이름</div>
                                    <div className="text-muted small">메뉴설명</div>
                                    <div className="fw-bold mt-3">39,000 원</div>
                                </div>

                                {/* 이미지 박스 */}
                                <div
                                    className="bg-light d-flex justify-content-center align-items-center"
                                    style={{width: "64px", height: "64px", borderRadius: "6px"}}
                                >
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
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx}
                                 className="d-flex justify-content-between align-items-start border-bottom py-3">
                                <div className="flex-grow-1 pe-2">
                                    <div className="fw-bold">김또깡 <span className="text-warning">★★★★★</span></div>
                                    <div className="small text-muted">2025.04.23</div>
                                    <div className="small">리뷰</div>
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
