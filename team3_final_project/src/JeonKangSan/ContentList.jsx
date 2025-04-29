// ContentList.jsx

// 대다수의 태그나 요소들은 기능에 맞게 바꿀겁니다

// index.html에 필요
// <!--  부트스트랩 아이콘 cdn -->
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">


import "./JksSheet.css";

function ContentList() {
    return (
        <div className="app-container">

            {/* 상단 필터 버튼 - */}
            <div className="d-flex gap-2 mb-4">
                <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-arrow-clockwise"></i> 초기화</button>
                <button className="btn btn-warning btn-sm text-white">부산 전체 <i className="bi bi-chevron-down"></i></button>
                <button className="btn btn-outline-secondary btn-sm">가까운 순 <i className="bi bi-chevron-down"></i></button>
            </div>
            <hr></hr>
            <br></br>

            {/* 가게 리스트 */}
            <div className="mb-5">

                {/* 첫 번째 가게 */}
                <div className="card mb-4" style={{ cursor: 'pointer' }}>
                    <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 fw-semibold">몬베톤</h5>
                            <button className="btn btn-light btn-sm">
                                <i className="bi bi-bookmark"></i>
                            </button>
                        </div>
                        <p className="card-text my-2">⭐ 4.6 (109)</p>
                        <small className="text-muted">양식 · 전포동(602m)</small>
                        <div className="d-flex gap-2 my-2">
                            <span className="badge rounded-pill bg-light text-muted border">원격줄서기</span>
                            <span className="badge rounded-pill bg-light text-muted border">현장대기</span>
                            <span className="badge rounded-pill bg-light text-muted border">재방문률높음</span>
                            {/*<span className="badge bg-primary">원격줄서기</span>*/}
                            {/*<span className="badge bg-success">현장대기</span>*/}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between bg-light flex-wrap p-3">
                        {/*<div className="col-4">*/}
                        {/*    <img src="/images/monbette.jpg" className="card-img detail-photo" alt="몬베톤 음식사진" />*/}
                        {/*</div>*/}
                        <div className="d-flex justify-content-center align-items-center bg-light detail-photo">
                            <span className="text-muted">No Image</span>
                        </div>

                        <div className="d-flex justify-content-center align-items-center bg-light detail-photo">
                            <span className="text-muted">No Image</span>
                        </div>

                        <div className="d-flex justify-content-center align-items-center bg-light detail-photo">
                            <span className="text-muted">No Image</span>
                        </div>

                    </div>
                    <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* 남은 대기 안내 (왼쪽) */}
                            <div className="d-flex align-items-center gap-2">
                                <span className="badge rounded-pill bg-light text-muted border">남은 대기 : 3팀</span>
                            </div>
                        </div>
                        {/* 상세 정보 보기 버튼 (아래) */}
                        <button className="btn btn-sm common-btn mt-3">
                            상세 정보
                        </button>
                    </div>
                </div>

                {/* 두 번째 가게 */}
                <div className="card mb-4" style={{ cursor: 'pointer' }}>
                    <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 fw-semibold">수프올샐러드</h5>
                            <button className="btn btn-light btn-sm">
                                <i className="bi bi-bookmark"></i>
                            </button>
                        </div>
                        <p className="card-text my-2">⭐ 4.7 (241)</p>
                        <small className="text-muted">카페/베이커리 · 전포동(806m)</small>
                        <div className="d-flex gap-2 my-2">
                            <span className="badge rounded-pill bg-light text-muted border">원격줄서기</span>
                            <span className="badge rounded-pill bg-light text-muted border">현장대기</span>
                            <span className="badge rounded-pill bg-light text-muted border">테이블많음</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between bg-light  flex-wrap p-3">
                        {/*<div className="col-4">*/}
                        {/*    <img src="/images/soupandsalad.jpg" className="card-img detail-photo" alt="수프올샐러드 음식사진" />*/}
                        {/*</div>*/}
                        <div className="d-flex justify-content-center align-items-center bg-light detail-photo">
                            <span className="text-muted">No Image</span>
                        </div>

                        <div className="d-flex justify-content-center align-items-center bg-light detail-photo">
                            <span className="text-muted">No Image</span>
                        </div>

                        <div className="d-flex justify-content-center align-items-center bg-light detail-photo">
                            <span className="text-muted">No Image</span>
                        </div>

                    </div>
                    <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* 남은 대기 안내 (왼쪽) */}
                            <div className="d-flex align-items-center gap-2">
                                <span className="badge rounded-pill bg-light text-muted border">남은 대기 : 1팀</span>
                            </div>


                        </div>
                        {/* 상세 정보 보기 버튼 (아래) */}
                        <button className="btn btn-sm common-btn mt-3">
                            상세 정보
                        </button>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default ContentList;
