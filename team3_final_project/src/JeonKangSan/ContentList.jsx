import "./JksSheet.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkRegular} from "@fortawesome/free-regular-svg-icons";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import noImage from '../JeongSeongYun/img/noimage.jpg';


function ContentList() {

  // JSY 작업
  const { category  } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  console.log("category : " + category)


  // jks 작업

  useEffect(() => {
    axios.get(`http://localhost:8080/contents/${category}`)
      .then(res => {
        console.log("받아온 데이터:", res.data); // 여기에서 확인
        setRestaurants(res.data);
      }).catch(err => console.log('데이터 가져오기 오류 :', err));
  }, [category]);

  useEffect(() => {
    console.log("restaurants")
    console.log(restaurants);


    if (restaurants.length > 0) {
      console.log("첫 번째 식당 평균 평점:", restaurants[0].avgRating);
    }
  },[restaurants])


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
        <button className="btn-jks btn-outline-secondary btn-sm"><i className="fa-solid fa-rotate-right"></i> 초기화
        </button>

        {/* 지역 선택 콤보박스 */}
        <div className="position-relative">
          <select
              className="btn-jks btn-sm button-seebox me-auto text-start"
              style={{ width: 'auto', appearance: 'none' }}
              aria-label="지역 선택"
              onChange={(e) => Nv(`/contentList/${category}/${e.target.value}`)}
          >
            <option value="중구">중구</option>
            <option value="서구">서구</option>
            <option value="동구">동구</option>
            <option value="영도구">영도구</option>
            <option value="부산진구">부산진구</option>
            <option value="동래구">동래구</option>
            <option value="남구">남구</option>
            <option value="수영구">수영구</option>
            <option value="해운대구">해운대구</option>
            <option value="금정구">금정구</option>

          </select>
          <i
            className="fa-solid fa-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-white"
            style={{pointerEvents: 'none'}}></i>
        </div>

        {/* 정렬 기준 선택 콤보박스 */}
        <div className="position-relative d-inline-block">
          <select
            className="btn-jks button-seebox btn-sm text-start"
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

        {restaurants.map((res, index) => (
          <div className="card mb-4" style={{ cursor: 'pointer' }} key={index}>
            <div className="card-body text-start">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 fw-semibold flex-fill"
                    onClick={() => Nv(`/resdetail/${res.resIdx}`)}>
                  {res.resName || "식당 이름"}
                </h5>
                <button className="btn-jks btn-sm" onClick={() => toggleBookmark(res.resIdx)}>
                  <FontAwesomeIcon icon={bookmarks[res.resIdx] ? faBookmark : faBookmarkRegular} />
                </button>
              </div>

              {/*1. resDetail 로 가고 싶으지 아니면 contentDetail 로 가고싶은지?*/}

              <p className="card-text my-2" onClick={() => Nv(`/resdetail/${res.resIdx}`)}>
                ⭐ {res.avgRating || "0.0"}
              </p>
              <small className="text-muted d-flex flex-fill" onClick={() => Nv(`/resdetail/${res.resIdx}`)}>
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

            <div className="px-3 pb-3" onClick={() => Nv(`/resdetail/${res.resIdx}`)}>
              <div className="d-flex justify-content-between gap-2 position-relative">
                {[res.resImage1, res.resImage2, res.resImage3].map((imgSrc, i) => (
                  <div className="rounded overflow-hidden" style={{ width: '33.3%', height: '150px' }} key={i}>
                    <img
                      src={imgSrc || noImage}
                      alt={`음식${i + 1}`}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
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
