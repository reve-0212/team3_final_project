// ContentDetail.jsx

import {useEffect, useState} from "react";
import "./JksSheet.css";
import "../simJiHyun/SjhCss.css"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
// import useUserStore from "../stores/useUserStore.jsx";
import useUserStore from "../stores/useUserStore.jsx";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import useResStoreSjh from "../stores/useResStoreSjh.jsx";

function ContentDetail() {
  const userStore = useUserStore((state) => state.user)
  const setRes = useResStoreSjh((state) => state.setRes)

  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})
  // console.log(userStore.userIdx)
  const userIdx = userStore.userIdx

  const [ActTab, setActTab] = useState("상세정보");
  const Nv = useNavigate();

  const [storeInfo, setStoreInfo] = useState({});
  const [bestMenus, setBestMenus] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const {resIdx} = useParams();

  const [parsedTags, setParsedTags] = useState([]);

  // 지도 초기 중심좌표
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  })

  // 지도 초기 확대
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  })

  // console.log(timeSlots)

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

  // 여러가지 불러오기
  useEffect(() => {
    axios.all([
        // res1 : 가게 상세 정보 가져오기
        axios.get(`http://localhost:8080/detail/${shortPathIdx}`),
        // res2 : 가게 메뉴 가져오기
        axios.get(`http://localhost:8080/bestmenu/${resIdx}`),
      ]
    ).then(
      axios.spread((res1, res2) => {
        const data1 = res1.data
        const data2 = res2.data

        setStoreInfo(data1);
        setRes(data1)
        setCenter({lat: data1.resLat, lng: data1.resLng})
        setPosition({lat: data1.resLat, lng: data1.resLng})
        setBestMenus(data2);
      })
    ).catch((err) => {
      console.log(err)
    })
  }, [])

  // 시간 데이터 집어넣기
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
            {/*평점 {reviews[0] ? reviews[0].reviewRating : ""}*/}
            {/*/ 리뷰갯수 {reviews.length}*/}
          </small><br/>
          <hr/>
          <small className="fw-bold">영업시간 {storeInfo ? storeInfo.resReserveTime : ""}</small><br/>
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
              메뉴
            </button>
          </div>
        </div>

        {/* 상세정보 */}
        {ActTab === "상세정보" && (
          <div className="mb-5 text-start">
            <br/>
            <h4 className="extra-bold">"{storeInfo ? storeInfo.resIntroduce : ""}"</h4>
            <div className="mb-3">
            </div>

            <br/>
            <div className="mb-3">
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
              <h4 className="extra-bold">해시 태그</h4>

              {parsedTags.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2 ps-2 pt-2">
                    {parsedTags.map((tag, idx) => (
                        <div key={idx}>
                          <span className="badge">#{tag}</span>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="ps-2 pt-2 text-muted small">등록된 해시태그가 없습니다</div>
              )}
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

        {/* 예약 등록, 웨이팅 등록*/}
        <div className="d-flex flex-column gap-2 mb-4">
          <div className="text-start"><h4 className="extra-bold">예약 가능 시간</h4></div>
          <div className={"d-flex align-items-center flex-wrap"}>
            {timeSlots.map((time, idx) => (
              <button key={idx}
                      className={"btn m-1"}
                      style={{backgroundColor: "#FFD700"}}>
            {/*<button*/}
            {/*    key={idx}*/}
            {/*    className={`btn ${selectedTime === time ? "btn-primary" : "btn-outline-primary"}`}*/}
            {/*    onClick={() => setSelectedTime(time)}*/}
            {/*>*/}
                {time}
              </button>
            ))}
          </div>

          <button className="common-btn w-100" onClick={() => {
            Nv(`/book/visit/${userIdx}/${resIdx}`)
          }}>예약하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentDetail;