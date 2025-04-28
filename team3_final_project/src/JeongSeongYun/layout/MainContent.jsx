import React from 'react';
import SlideBanner from "../library/SlideBanner.jsx";



const categories = ['한식', '중식', '일식', '분식', '세계요리', '퓨전', '기타'];

const MainContent = () => {
    return (
        <div>

            {/* 🔍 공지사항 알림 */}
            <div className={'container p-2'}>
                <div className="alert alert-warning d-flex align-items-center mb-4 fs-6 fs-sm-6 fs-md-5">
                    📢 공지사항 알림
                </div>
            </div>
            <SlideBanner/>

            <div className="container py-4">
                {/* 📂 카테고리 영역 */}
                <div className="row row-cols-4 g-3 mb-4 text-center">
                    {categories.map((category, index) => (
                        <div key={index} className="col">
                            <div className="bg-light rounded p-3 d-flex flex-column align-items-center">
                                <div className="bg-secondary rounded mb-2" style={{ width: '48px', height: '48px' }}></div>
                                <small className="fs-7 fs-md-6" style={{ fontSize: '0.65rem' }}>{category}</small>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🧭 탭 메뉴 */}
                <ul className="border-0 nav nav-tabs mb-3 justify-content-between" style={{ fontSize: '0.7rem' }}>
                    {['맞춤 추천', '내주변 맛집', '찜한 맛집', '리뷰 pick', '최근 본 맛집'].map((tab, idx) => (
                        <li className="nav-item flex-fill text-center" key={idx}>
                            <a
                                className={`border-0 nav-link py-2 px-1 ${idx === 0 ? '' : ''}`}
                                href="#"
                                style={{ whiteSpace: 'nowrap', fontSize: '0.65rem' }}
                            >
                                {tab}
                            </a>
                        </li>
                    ))}
                </ul>


                {/* 🍽 추천 섹션 */}
                <div className="mb-5">
                    <h5 className="fw-bold mb-1 fs-5 fs-sm-4">맞춤형 추천</h5>
                    <p className="text-muted small fs-7">우리 동네의 인기 맛집을 추천해드려요!</p>

                    {/* 블럭형 추천 */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong className="fs-6">블랙업 커피 서면점</strong>
                            <small className="text-muted">전체보기</small>
                        </div>
                        <div className="d-flex overflow-auto gap-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="bg-light rounded" style={{ width: '128px', height: '128px', flex: '0 0 auto' }}></div>
                            ))}
                        </div>
                    </div>

                    {/* 리스트형 추천 */}
                    <div>
                        <strong className="mb-2 d-block fs-6">블랙업 커피 서면점</strong>
                        <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
                    </div>
                    <div>
                        <strong className="mb-2 d-block fs-6">블랙업 커피 서면점</strong>
                        <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
                    </div>
                    <div>
                        <strong className="mb-2 d-block fs-6">블랙업 커피 서면점</strong>
                        <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
                    </div>
                    <div>
                        <strong className="mb-2 d-block fs-6">블랙업 커피 서면점</strong>
                        <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
                    </div>
                    <div>
                        <strong className="mb-2 d-block fs-6">블랙업 커피 서면점</strong>
                        <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
                    </div>
                    <div>
                        <strong className="mb-2 d-block fs-6">블랙업 커피 서면점</strong>
                        <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MainContent;
