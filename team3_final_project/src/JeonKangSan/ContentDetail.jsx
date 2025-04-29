// ContentDetail.jsx

import { useState } from "react";
import "./JksSheet.css";

function ContentDetail() {
    const [ActTab, setActTab] = useState("상세정보"); // 기본 탭은 '상세정보'

    return (
        <div className="app-container">

            <div className="container py-2">

                {/* 가게 대표 이미지 */}
                <div className="card mb-3">
                    <div className="d-flex justify-content-between bg-light  flex-wrap p-3">
                        {/*<div className="col-4">*/}
                        {/*    <img src="/images/monbette.jpg" className="card-img detail-photo" alt="몬베톤 음식사진" />*/}
                        {/*</div>*/}
                        <div className="d-flex justify-content-center align-items-center bg-light col-4">
                            <span className="text-muted">No Image</span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center bg-light col-4">
                            <span className="text-muted">No Image</span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center bg-light col-4">
                            <span className="text-muted">No Image</span>
                        </div>

                    </div>
                </div>

                {/* 가게 이름 */}
                <div className="d-flex justify-content-center text mb-2">
                    <h5>가게이름</h5>
                </div>

                {/* 별점 및 영업정보 */}
                <div className="mb-4">
                    <small className="text-muted">별점 0.0 / 리뷰 갯수</small><br />
                    <small>영업중 오늘 11:00 ~ 22:00 ▼</small><br />
                    <small>전화번호 051-1234-5678</small>
                </div>
                {/* 웨이팅 등록 버튼*/}
                <button className="common-btn border-0 mb-3">웨이팅 등록</button>

                {/* 탭메뉴 */}
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${ActTab === "상세정보" ? "active" : ""}`}
                            onClick={() => setActTab("상세정보")}
                        >
                            상세정보
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${ActTab === "대표메뉴" ? "active" : ""}`}
                            onClick={() => setActTab("대표메뉴")}
                        >
                            대표메뉴
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${ActTab === "리뷰" ? "active" : ""}`}
                            onClick={() => setActTab("리뷰")}
                        >
                            리뷰
                        </button>
                    </li>
                </ul>

                {/* 상세정보 */}
                {ActTab === "상세정보" && (
                    <div className="mb-5">
                        <h5>상세정보</h5>

                        <div className="mb-3">
                            <small className="text-muted">전화번호</small><br />
                            <span>051-1234-5678</span>
                        </div>

                        <div className="mb-3">
                            <small className="text-muted">주소</small><br />
                            <span>부산 해운대구 구남로24번길 8 (우동) 1층</span>
                        </div>

                        <div className="mb-3">
                            <small className="text-muted">매장 소개</small>
                            <p className="small mt-1">
                                {'<일반>'}<br />
                                월~목 브레이크 타임 15:00~17:00<br />
                                금토일 브레이크 타임 없이 운영
                            </p>
                        </div>

                        <div className="mb-3">
                            <small className="text-muted">총 대기팀</small><br />
                            <span>현재 5팀 대기 중</span>
                        </div>

                        <div className="mb-3">
                            <small className="text-muted">정기휴무일</small><br />
                            <span>매주 월요일</span>
                        </div>
                    </div>
                )}

                {/* 대표메뉴 */}
                {ActTab === "대표메뉴" && (
                    <div className="mb-5">
                        <h5 className="mb-3">대표메뉴</h5>

                        <div className="row g-3 text-center">
                            <div className="col-12 d-flex flex-column align-items-center border-bottom pb-2">
                                <div className="detail-photo bg-light d-flex justify-content-center align-items-center mb-2">
                                    <span className="text-muted small">No Image</span>
                                </div>
                                <strong>메뉴이름1</strong>
                                <p className="small text-muted mb-1">메뉴설명입니다.</p>
                                <p className="mb-0">39,000원</p>
                            </div>

                            <div className="col-12 d-flex flex-column align-items-center border-bottom pb-2">
                                <div className="detail-photo bg-light d-flex justify-content-center align-items-center mb-2">
                                    <span className="text-muted small">No Image</span>
                                </div>
                                <strong>메뉴이름2</strong>
                                <p className="small text-muted mb-1">메뉴설명입니다.</p>
                                <p className="mb-0">45,000원</p>
                            </div>

                            <div className="col-12 d-flex flex-column align-items-center border-bottom pb-2">
                                <div className="detail-photo bg-light d-flex justify-content-center align-items-center mb-2">
                                    <span className="text-muted small">No Image</span>
                                </div>
                                <strong>메뉴이름3</strong>
                                <p className="small text-muted mb-1">메뉴설명입니다.</p>
                                <p className="mb-0">55,000원</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 리뷰 */}
                {ActTab === "리뷰" && (
                    <div className="mb-5">
                        <h5 className="mb-3">리뷰</h5>

                        <div className="d-flex gap-2 mb-3">
                            <button className="btn btn-outline-secondary btn-sm">사진리뷰</button>
                            <button className="btn btn-outline-secondary btn-sm">리뷰</button>
                            <button className="btn btn-outline-secondary btn-sm">원픽리뷰</button>
                        </div>

                        <div className="text-center mb-3">
                            <h1 className="mb-2">4.7</h1>
                            <span>⭐</span>
                        </div>

                        <div className="mb-3 text-center">
                            <button className="common-btn border-0">리뷰 전체보기</button>
                        </div>

                        <div className="mb-3">
                            <h6>매장 PICK</h6>
                            <div className="d-flex flex-wrap gap-2">
                                <span className="badge bg-secondary">맛있어요</span>
                                <span className="badge bg-secondary">친절해요</span>
                                <span className="badge bg-secondary">분위기 좋아요</span>
                                <span className="badge bg-secondary">청결해요</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default ContentDetail;
