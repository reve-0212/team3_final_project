import "./JksSheet.css";
import {Link, useNavigate, useParams, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkRegular} from "@fortawesome/free-regular-svg-icons";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import noImage from '../JeongSeongYun/img/noimage.jpg';
import useRestaurantStore from "../stores/useRestaurantStore.jsx";
import useUserStore from "/src/stores/useUserStore.jsx";
import api from "../api/axios.js";

// jsy 작업

function ContentList() {
  const {category} = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const setResIdx = useRestaurantStore((state) => state.setRestaurantIdx)
  const userStore = useUserStore((state) => state.user)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const region = queryParams.get("region") || "";
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortOption, setSortOption] = useState("가까운 순");

  useEffect(() => {
    api.get(`/contents/${category}`, {
      params: {region: region}
    })
      .then(res => {
        setRestaurants(res.data);
      }).catch();
  }, [category, region]);

  useEffect(() => {
    api.get(`/contents/${category}/filter`, {
      params: {
        region: selectedRegion,
        sort: sortOption
      }
    })
      .then(res => {
        setRestaurants(res.data);
      })
      .catch();
  }, [category, selectedRegion, sortOption]);

  const toggleBookmark = (resIdx) => {
    const userIdx = userStore && userStore.userIdx !== null ? userStore.userIdx : ""

    // 로그인 확인
    if (!userIdx) {
      alert("로그인 후 사용 가능합니다.");
      return;
    }

    const isBookmarked = bookmarks[resIdx];

    // 상태 토글
    setBookmarks(prev => ({
      ...prev,
      [resIdx]: !prev[resIdx]
    }));

    const data = { userIdx, resIdx };
    const url = "/bookmark";

    // 북마크 등록 / 해제
    if (isBookmarked) {
      api.delete(url, {data}).catch();
    } else {
      api.post(url, data).catch(() => {});
    }
  };

  // --------------
  const Nv = useNavigate();
  const [bookmarks, setBookmarks] = useState({
    store1: false,
    store2: false
  })

  return (
    <div className="app-container">

      {/* 상단 필터 버튼 - 초기화, 지역 선택, 2차 정렬 */}
      <div className="d-flex gap-2 mb-4">
        <button
          className="btn-jks btn-outline-secondary btn-sm"
          onClick={() => {
            setSelectedRegion(""); // 기본 지역
            setSortOption("가까운 순"); // 기본 정렬
          }}
        >
          <i className="fa-solid fa-rotate-right"></i> 초기화
        </button>

        {/* 지역 선택 콤보박스 */}
        <div className="position-relative">
          <select
            className="btn-jks btn-sm button-seebox me-auto text-start"
            style={{width: 'auto', appearance: 'none'}}
            aria-label="지역 선택"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">전체</option>
            <option value="금정구">금정구</option>
            <option value="남구">남구</option>
            <option value="동구">동구</option>
            <option value="동래구">동래구</option>
            <option value="부산진구">부산진구</option>
            <option value="서구">서구</option>
            <option value="수영구">수영구</option>
            <option value="영도구">영도구</option>
            <option value="중구">중구</option>
            <option value="해운대구">해운대구</option>

          </select>
          <i
            className="fa-solid fa-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-white"
            style={{pointerEvents: 'none'}}></i>
        </div>

        {/* 정렬 기준 선택 콤보박스 */}
        <div className="position-relative d-inline-block">
          <select
            className="btn-jks button-seebox btn-sm text-start"
            style={{width: 'auto', appearance: 'none', paddingRight: '2rem'}}
            aria-label="정렬 기준 선택"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>가까운 순</option>
            <option>별점 높은 순</option>
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

        {restaurants.map((res, index) => (
          <div className="card mb-4" style={{cursor: 'pointer'}} key={index}>
            <div className="card-body text-start">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 fw-semibold flex-fill"
                    onClick={() => {
                      setResIdx(res.resIdx)
                      Nv(`/resdetail/${res.resIdx}`)
                    }}>
                  {res.resName || "식당 이름"}
                </h5>
                <button className="btn-jks btn-sm" onClick={() => toggleBookmark(res.resIdx)}>
                  <FontAwesomeIcon icon={bookmarks[res.resIdx] ? faBookmark : faBookmarkRegular}/>
                </button>
              </div>

              <p className="card-text my-2" onClick={() => {
                setResIdx(res.resIdx)
                Nv(`/resdetail/${res.resIdx}`)
              }}>
                ⭐ {typeof res.avgRating === "number" ? res.avgRating.toFixed(1) : "0.0"}
              </p>
              <small className="text-muted d-flex flex-fill" onClick={() => {
                setResIdx(res.resIdx)
                Nv(`/resdetail/${res.resIdx}`)
              }}
              >
                {res.categoryName || "카테고리"} · {res.resAddress1 || "주소"}
              </small>
              <div className="d-flex gap-2 my-2">
                {res.reserveOrWaiting === 'R' ? (
                  <span className="badge-default bg-light text-muted border">원격줄서기</span>
                ) : res.reserveOrWaiting === 'W' ? (
                  <span className="badge-default bg-light text-muted border">예약</span>
                ) : null}
                {res.restOption1 === 'Y' && (
                  <span className="badge-default bg-light text-muted border">현장대기</span>
                )}
              </div>
            </div>

            <div className="px-3 pb-3" onClick={() => {
              setResIdx(res.resIdx)
              Nv(`/resdetail/${res.resIdx}`)
            }}
            >
              <div className="d-flex justify-content-between gap-2 position-relative">
                {[res.resImage1, res.resImage2, res.resImage3].map((imgSrc, i) => (
                  <div className="rounded overflow-hidden" style={{width: '33.3%', height: '150px'}} key={i}>
                    <img
                      src={imgSrc || noImage}
                      alt={`음식${i + 1}`}
                      className="w-100 h-100"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                ))}

                {/* 대기팀 오버레이 */}
                <div className="overlay-badge">
                  대기팀 : 3명
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentList;
