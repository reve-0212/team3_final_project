// ContentDetail.jsx

import {useEffect, useState} from "react";
import "./JksSheet.css";
import "../simJiHyun/SjhCss.css"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
// import useUserStore from "../stores/useUserStore.jsx";
import useUserStore from "../stores/useUserStore.jsx";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";

function ContentDetail() {
  const userStore = useUserStore((state) => state.user)
  // const user = useUserStore((state) => state.user)
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})
  console.log(userStore.userIdx)
  const userIdx = userStore.userIdx

  const [ActTab, setActTab] = useState("상세정보");
  const [RevTab, setRevTab] = useState("rev"); // 기본값: 리뷰(rev)
  const Nv = useNavigate();
  const [storeInfo, setStoreInfo] = useState({});
  const [bestMenus, setBestMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const {resIdx} = useParams();


  // 현재 주소 값의 맨 뒤에서 1번째 값 가져옴
  const pathIdx = window.location.pathname;
  console.log(pathIdx[pathIdx.length - 1])
  const shortPathIdx = pathIdx[pathIdx.length - 1]

  // const filteredAndSortedReviews = reviews
  //     .filter(review => {
  //         if (!showOnlyWithImage) return true;
  //         return review.reviewImage1 || review.reviewImage2 || review.reviewImage3;
  //     })
  //     .sort((a, b) => {
  //         switch (sortOption) {
  //             case "latest":
  //                 return new Date(b.reviewWriteDate) - new Date(a.reviewWriteDate);
  //             case "oldest":
  //                 return new Date(a.reviewWriteDate) - new Date(b.reviewWriteDate);
  //             case "high":
  //                 return b.reviewRating - a.reviewRating;
  //             case "low":
  //                 return a.reviewRating - b.reviewRating;
  //             default:
  //                 return 0;
  //         }
  //     });

  // 작업 전에는 활성화되어 있었음.
  // const user = useUserStore((state) => state.user)
  // const userIdx = user.userIdx

  useEffect(() => {
    axios.get(`http://localhost:8080/detail/${shortPathIdx}`) // 단일 조회 API 사용 권장
      .then((res) => {
        console.log(res.data)
        setStoreInfo(res.data);
      })
      .catch((err) => {
        console.error("요청 실패:", err);
      });
  }, [shortPathIdx]);

  useEffect(() => {
    axios.get(`http://localhost:8080/bestmenu/${shortPathIdx}`)
      .then((res) => {
        console.log(res.data)
        setBestMenus(res.data);
      }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if (!storeInfo.resReserveTime) return;

    // 시작 시간 ~ 종료 시간 에서 ~ 를 기준으로 나눈 후 공백을 제거한다
    const [start, end] = storeInfo.resReserveTime.split("~").map(t => t.trim())
    // 시간:분 의 start(end)Hour 를 : 를 기준으로 나눈 후 시간 데이터만 가져온다.
    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);

    // slots 라는 배열을 생성하고 startHour 에서 endHour 까지 하나씩 더한 후 slots 배열에 넣는다
    // timeSlots 에 slots 배열을 넣는다
    const slots = [];
    for (let h = startHour; h < endHour; h++) {
      const hourStr = `${String(h).padStart(2, '0')}:00`;
      slots.push(hourStr)
    }
    setTimeSlots(slots)
  }, [storeInfo.resReserveTime]);

  // 지도 중심좌표
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  })

  // 현재 위치
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  })

  // 지도가 처음 렌더링 되면 중심좌표를 현재위치로 설정하고 위치 변화 감지
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude})
  //   })
  //
  //   navigator.geolocation.watchPosition((pos) => {
  //     setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude})
  //   })
  // }, []);


  return (
    <div className="app-container">

      <div className="container py-2 content-container">

        {/* 가게 대표 이미지 */}
        <div
          className="d-flex justify-content-center align-items-center bg-light w-100 mb-3"
          style={{height: '250px', maxHeight: '250px', overflow: 'hidden'}}
        >
          {storeInfo.resImage1 ? (
            <a href={storeInfo.resImage1} target="_blank" rel="noopener noreferrer">
              <img
                src={storeInfo.resImage1}
                alt="대표 이미지"
                style={{
                  height: '100%',
                  maxHeight: '250px',
                  width: 'auto',
                  objectFit: 'cover'
                }}
              />
            </a>
          ) : (
            <span className="text-muted">사진</span>
          )}
        </div>
        {/* 가게 이름 */}
        <div className="d-flex justify-content-start text mb-2">
          <h5 className="fw-bold">
            {storeInfo ? storeInfo.resName : "로딩 중..."}</h5>
        </div>

        {/* 별점 및 영업정보 */}
        <div className="text-start mb-4">
          <small className="fw-bold">
            평점 {reviews[0] ? reviews[0].reviewRating : ""}
            {/*/ 리뷰갯수 {reviews.length}*/}
          </small><br/>
          <hr/>
          <small className="fw-bold">영업중 {storeInfo ? storeInfo.resReserveTime : ""}</small><br/>
          <small className="fw-bold">전화번호 {storeInfo ? storeInfo.resCall : ""}</small>
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
            {/*<button*/}
            {/*    className={`tab-btn ${ActTab === "리뷰" ? "active" : ""}`}*/}
            {/*    onClick={() => setActTab("리뷰")}*/}
            {/*>*/}
            {/*    리뷰*/}
            {/*</button>*/}
          </div>
        </div>

        {/* 상세정보 */}
        {ActTab === "상세정보" && (
          <div className="mb-5 text-start">
            <br/>
            <h4 className="extra-bold">매장소개 {storeInfo ? storeInfo.resIntroduce : ""}</h4>
            <div className="mb-3">
              {/*<small className="notice-text">알림</small>*/}
              {/*<p className="small mt-1">*/}
              {/*    {announce ? announce.announceContent : "공지사항을 불러오는 중입니다..."}*/}
              {/*</p>*/}
            </div>


            <br/>
            <div className="mb-3">
              {/*<h4 className="extra-bold">편의시설</h4>*/}
              {/*<ul className="list-unstyled">*/}
              {/*    {amenities ? (*/}
              {/*        <>*/}
              {/*            {amenities.hasParking === "Y" && <li>주차 가능 - {amenities.parkingInfo}</li>}*/}
              {/*            {amenities.noDeposit === "Y" && <li>예약금 없음 - {amenities.depositInfo}</li>}*/}
              {/*            {amenities.hasGroupSeat === "Y" && <li>단체석 있음 - {amenities.groupSeatInfo}</li>}*/}
              {/*            {amenities.hasCoronation === "Y" &&*/}
              {/*                <li>기념행사 제공 - {amenities.coronationInfo}</li>}*/}
              {/*            {amenities.hasCorkage === "Y" && <li>코르키지 가능 - {amenities.corkageInfo}</li>}*/}
              {/*            {amenities.hasKidsZone === "Y" && <li>키즈존 있음 - {amenities.kidsZoneInfo}</li>}*/}
              {/*            {amenities.hasWifi === "Y" && <li>WiFi 제공 - {amenities.wifiInfo}</li>}*/}
              {/*            {amenities.hasWaitingArea === "Y" &&*/}
              {/*                <li>대기 공간 있음 - {amenities.waitingAreaInfo}</li>}*/}
              {/*        </>*/}
              {/*    ) : (*/}
              {/*        <li>불러오는 중...</li>*/}
              {/*    )}*/}
              {/*</ul>*/}
            </div>

            <br/>
            <div className="mb-3">
              <h4 className="extra-bold mb-2">위치</h4>
              <div className="mt-2">
                {storeInfo ? storeInfo.resAddress1 : ""}
              </div>
              <div className="location-box p-0">
                <Map id="map"
                     center={center}
                     // className={"d-flex justify-content-center w-100 h-100"}
                  style={{width: "100%", height: "100%",}}
                     level={3}>
                  <MapMarker position={position}/>
                </Map>
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
              <div key={idx}
                   className="d-flex justify-content-between align-items-center border-bottom py-3">
                <div className="text-start">
                  <div className="fw-bold">{menu.menuName}</div>
                  <div className="text-muted small">{menu.menuExplanation}</div>
                  <div className="fw-bold mt-3">{menu.menuPrice} 원</div>
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
        {/*{ActTab === "리뷰" && (*/}
        {/*    <div className="mb-5 text-start">*/}
        {/*        /!* 텍스트 탭 메뉴 *!/*/}
        {/*        <div className="tab-menu-wrapper d-flex mb-4">*/}
        {/*            <div*/}
        {/*                className={`tab-menu-text ${RevTab === "rev" ? "active" : ""}`}*/}
        {/*                onClick={() => setRevTab("rev")}*/}
        {/*            >*/}
        {/*                일반리뷰*/}
        {/*            </div>*/}
        {/*            <div*/}
        {/*                className={`tab-menu-text ${RevTab === "onepick" ? "active" : ""}`}*/}
        {/*                onClick={() => setRevTab("onepick")}*/}
        {/*            >*/}
        {/*                원픽리뷰*/}
        {/*            </div>*/}
        {/*        </div>*/}

        {/*        /!* 평점 통계 영역 시작 *!/*/}
        {/*        <div className="mb-3 text-start">*/}
        {/*            /!* 별점통계 제목 *!/*/}
        {/*            <h6 className="fw-semibold small mb-3">별점통계</h6>*/}

        {/*            /!* 평점 전체영역: 별점과 세부항목을 한 줄로 *!/*/}
        {/*            <div className="d-flex align-items-start">*/}

        {/*                /!* 전체평점 묶음 *!/*/}
        {/*                <div className="d-flex flex-column align-items-center me-3" style={{minWidth: "70px"}}>*/}
        {/*                    <span className="fw-bold text-warning" style={{fontSize: "1.5rem"}}>★</span>*/}
        {/*                    <span className="fw-bold" style={{fontSize: "1.2rem"}}>*/}
        {/*                    {avgRating !== null ? avgRating.toFixed(1) : ""}*/}
        {/*                    </span>*/}
        {/*                    <small className="text-muted">전체 평점</small>*/}
        {/*                </div>*/}

        {/*                /!* 오른쪽 음식/가격/서비스/청결 점수줄 *!/*/}
        {/*                <div className="flex-grow-1">*/}
        {/*                    {ratingTypes.map((item, i) => {*/}
        {/*                        const score = avgRatings?.[item.key] ?? 0;*/}
        {/*                        const percent = (score / 5) * 100;*/}

        {/*                        return (*/}
        {/*                            <div key={i} className="d-flex align-items-center mb-2">*/}
        {/*                                /!* 항목명 *!/*/}
        {/*                                <div style={{width: '60px', fontSize: '0.85rem'}}>{item.label}</div>*/}

        {/*                                /!* 진행바 *!/*/}
        {/*                                <div className="flex-grow-1 me-2">*/}
        {/*                                    <div className="progress" style={{height: '6px'}}>*/}
        {/*                                        <div className="progress-bar bg-warning"*/}
        {/*                                             style={{width: `${percent}%`}}></div>*/}
        {/*                                    </div>*/}
        {/*                                </div>*/}

        {/*                                /!* 수치 *!/*/}
        {/*                                <div*/}
        {/*                                    style={{width: '30px', fontSize: '0.8rem'}}>{score.toFixed(1)}</div>*/}
        {/*                            </div>*/}
        {/*                        );*/}
        {/*                    })}*/}
        {/*                </div>*/}

        {/*            </div>*/}
        {/*        </div>*/}

        {/*        <h5 className="mt-5 text-start fw-bold">사진</h5>*/}
        {/*        <div className="d-flex flex-wrap gap-2 mb-4">*/}
        {/*            {reviews*/}
        {/*                .flatMap(review =>*/}
        {/*                    [review.reviewImage1, review.reviewImage2, review.reviewImage3].filter(Boolean)*/}
        {/*                )*/}
        {/*                .map((imageUrl, idx) => (*/}
        {/*                    <div key={idx} className="bg-light rounded"*/}
        {/*                         style={{width: "100px", height: "100px", overflow: "hidden"}}>*/}
        {/*                        <img*/}
        {/*                            src={imageUrl}*/}
        {/*                            alt={`리뷰이미지${idx}`}*/}
        {/*                            style={{width: "100%", height: "100%", objectFit: "cover"}}*/}
        {/*                        />*/}
        {/*                    </div>*/}
        {/*                ))}*/}
        {/*        </div>*/}

        {/*        /!* 리뷰 정렬 *!/*/}
        {/*        <div className="d-flex align-items-center mb-2">*/}
        {/*            <select*/}
        {/*                className="custom-select-text"*/}
        {/*                aria-label="리뷰 정렬 기준"*/}
        {/*                value={sortOption}*/}
        {/*                onChange={(e) => setSortOption(e.target.value)}*/}
        {/*            >*/}
        {/*                <option value="latest">최신순</option>*/}
        {/*                <option value="oldest">오래된순</option>*/}
        {/*                <option value="high">평점높은순</option>*/}
        {/*                <option value="low">평점낮은순</option>*/}
        {/*            </select>*/}

        {/*            <span*/}
        {/*                className="custom-span-text ms-2"*/}
        {/*                style={{cursor: 'pointer'}}*/}
        {/*                onClick={() => setShowOnlyWithImage(prev => !prev)}*/}
        {/*            >*/}
        {/*                {showOnlyWithImage ? '전체리뷰' : '사진리뷰'}*/}
        {/*            </span>*/}
        {/*        </div>*/}


        {/*        {filteredAndSortedReviews*/}
        {/*            .filter((review) => {*/}
        {/*                if (RevTab === "rev") return review.isOnePick === 'N';*/}
        {/*                if (RevTab === "onepick") return review.isOnePick === 'Y';*/}
        {/*                return true;*/}
        {/*            })*/}
        {/*            .map((review, idx) => (*/}
        {/*                <div key={idx}*/}
        {/*                     className="d-flex justify-content-between align-items-start border-bottom py-3">*/}
        {/*                    <div className="flex-grow-1 pe-2">*/}
        {/*                        <div className="fw-bold">*/}
        {/*                            {review.userName || "사용자"} <span*/}
        {/*                            className="text-warning">★{review.reviewRating}</span>*/}
        {/*                        </div>*/}
        {/*                        <div className="small text-muted">{review.reviewWriteDate}</div>*/}
        {/*                        <div className="small">{review.reviewContent}</div>*/}
        {/*                    </div>*/}
        {/*                    <div className="bg-light d-flex justify-content-center align-items-center"*/}
        {/*                         style={{width: "60px", height: "60px", borderRadius: "6px"}}>*/}
        {/*                        {review.reviewImage1 ? (*/}
        {/*                            <img src={review.reviewImage1} alt="리뷰 이미지" style={{*/}
        {/*                                width: "100%",*/}
        {/*                                height: "100%",*/}
        {/*                                objectFit: "cover",*/}
        {/*                                borderRadius: "6px"*/}
        {/*                            }}/>*/}
        {/*                        ) : (*/}
        {/*                            <span className="text-muted small">사진</span>*/}
        {/*                        )}*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            ))}*/}

        {/*    </div>*/}
        {/*)}*/}

        {/* 예약 등록, 웨이팅 등록*/}
        <div className="d-flex flex-column gap-2 mb-4">
          <div className="text-start"><h4 className="extra-bold">예약 시간</h4></div>
          <div className="location-box">
            {timeSlots.map((time, idx) => (
              <button key={idx} className={"btn btn-outline-primary"}>
                {time}
              </button>
            ))}
          </div>

          <button className="common-btn w-100" onClick={() => {
            Nv(`/book/visit/${userIdx}/${resIdx}`)
          }}>예약하기
          </button>

          <button className="visitBtnActive btn w-100 p-3 fw-bold fs-6"
                  onClick={() => {
                    Nv("/waiting/visit")
                  }}>웨이팅하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentDetail;