import {useEffect, useState} from "react";
import "./JksSheet.css";
import "../simJiHyun/SjhCss.css"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useUserStore from "../stores/useUserStore.jsx";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import useResStoreSjh from "../stores/useResStoreSjh.jsx";

function ContentDetail() {
  const userStore = useUserStore((state) => state.user)
  const setRes = useResStoreSjh((state) => state.setRes)
  const restaurant = useParams()

  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})
  const userIdx = userStore && userStore.userIdx !== null ? userStore.userIdx : ""

  const [ActTab, setActTab] = useState("상세정보");
  const Nv = useNavigate();

  const [storeInfo, setStoreInfo] = useState({});
  const [bestMenus, setBestMenus] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [convenient, setConvenient] = useState([])
  const [storeTime, setStoreTime] = useState([])
  const [hashTag, setHashTag] = useState([])
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

  // 여러가지 불러오기
  useEffect(() => {
    axios.all([
        // res1 : 가게 상세 정보 가져오기
        axios.get(`http://localhost:8080/detail/${restaurant.resIdx}`),
        // res2 : 가게 메뉴 가져오기
        axios.get(`http://localhost:8080/bestmenu/${restaurant.resIdx}`),
        // res3 : 편의시설 가져오기
        axios.get(`http://localhost:8080/convenient/${restaurant.resIdx}`),
        // res4 : 시간 가져오기
        axios.get(`http://localhost:8080/time/${restaurant.resIdx}`),
        // res5 : 태그 가져오기
        axios.get(`http://localhost:8080/hashTag/${restaurant.resIdx}`)
      ]
    ).then(
      axios.spread((res1, res2, res3, res4, res5) => {
        const data1 = res1.data
        const data2 = res2.data
        const data3 = res3.data
        const data4 = res4.data
        const data5 = res5.data

        console.log(data2)

        setStoreInfo(data1);
        setRes(data1)
        setCenter({lat: data1.resLat, lng: data1.resLng})
        setPosition({lat: data1.resLat, lng: data1.resLng})
        setTimeSlots(data1.resReserveTime.split(","))
        setBestMenus(data2);
        setConvenient(data3)
        setStoreTime(data4)
        setHashTag(data5)
      })
    ).catch((err) => {
      console.log(err)
    })
  }, [])

  // 리뷰 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8080/reviews/${restaurant.resIdx}`)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => console.log("리뷰 불러오기 오류:", err));
  }, [restaurant.resIdx]);

  // 시간 데이터 집어넣기
  useEffect(() => {
    if (!storeInfo.resReserveTime) return;
  }, [storeInfo.resReserveTime]);

  // 해시태그 나누기
  useEffect(() => {
    if (hashTag.length > 0) {
      const allTags =
        hashTag.flatMap(tagObj => tagObj?.categoryDTO?.categoryTag.split(","))
          .filter(Boolean)
      setParsedTags(allTags)
    }
  }, [hashTag]);

  // 내가 전에 갔던 페이지 기억하기
  // 중복된 페이지면 기억안함
  // 길이는 최대 3
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentStores") || "[]");
    const updated = [restaurant.resIdx, ...recent.filter(id => id !== restaurant.resIdx)]
    if (updated.length > 3) updated.length = 3;
    localStorage.setItem("recentStores", JSON.stringify(updated))
  }, [restaurant.resIdx]);

  console.log(localStorage.getItem("recentStores"))

  return (
    <div className="app-container">
      <div className="container py-2 content-container">
        {/* 가게 대표 이미지 */}
        <div className="d-flex overflow-auto gap-2 mb-3" style={{whiteSpace: "nowrap"}}>
          {[storeInfo.resImage1, storeInfo.resImage2, storeInfo.resImage3]
            .filter(Boolean)
            .map((img, idx) => (
              <div
                key={idx}
                className="bg-light rounded overflow-hidden"
                style={{
                  minWidth: "200px",
                  height: "180px",
                  flex: "0 0 auto"
                }}
              >
                <img
                  src={img}
                  alt={`대표 이미지 ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            ))}
        </div>

        {/* 가게 이름 */}
        <div className="d-flex justify-content-start text mb-2">
          <h5 className="fw-bold">
            {storeInfo ? storeInfo.resName : "로딩 중..."}</h5>
        </div>

        {/* 별점 및 영업정보 */}
        <div className="text-start mb-4">
          <div className="d-flex gap-2 mb-2">
            {/* 평균 평점 */}
            <span style={{
              backgroundColor: "#FFF8E1",
              padding: "4px 12px",
              borderRadius: "8px",
              fontWeight: "600",
              color: "#212529",
              fontSize: "0.9rem",
              display: "inline-block"
            }}>⭐ {reviews.length > 0
              ? (reviews.reduce((acc, cur) => acc + cur.reviewRating, 0) / reviews.length).toFixed(1)
              : "0.0"}</span>

            {/* 리뷰 개수 */}
            <span style={{
              backgroundColor: "#FFF8E1",
              padding: "4px 12px",
              borderRadius: "8px",
              fontWeight: "600",
              color: "#212529",
              fontSize: "0.9rem",
              display: "inline-block"
            }}>리뷰 {reviews.length}개</span>
          </div>
          <hr/>
          <div className="d-flex flex-column gap-2 mb-3">
            <div>
              <p className={"fw-semibold text-dark"}>
                <i className="fa-regular fa-clock text-secondary"></i>
                &nbsp; 영업시간
              </p>

              {storeTime.length === 0 ? (
                <p>정보가 없습니다</p>
              ) : (
                <div className={"d-grid"} style={{gridTemplateColumns: "repeat(2,1fr)"}}>
                  {storeTime.map((time) => (
                    <p>
                      <span className={"fw-bold"}>{time.restaurantTimeDTO?.day} : </span>
                      <span>{time.restaurantTimeDTO?.startTime.split(":")[0]}:</span>
                      <span>{time.restaurantTimeDTO?.startTime.split(":")[1]} ~ </span>
                      <span>{time.restaurantTimeDTO?.endTime.split(":")[0]}:</span>
                      <span>{time.restaurantTimeDTO?.endTime.split(":")[1]}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-phone text-secondary"></i>
              <span className="fw-semibold text-dark">전화번호:</span>
              <span>{storeInfo?.resCall || "-"}</span>
            </div>
          </div>
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
              <h4 className="extra-bold">해시태그</h4>

              {parsedTags.length === 0 ? (
                <p className={"text-center"}>해시태그가 없습니다</p>
              ) : (
                <div className="d-flex flex-wrap gap-2 ps-2 pt-2">
                  {parsedTags.map((tag) => (
                    <button type={"button"} className={"btn"} style={{backgroundColor: "#FFD727"}}>{tag}</button>
                  ))}
                </div>
              )}
            </div>

            <br/>
            <div className="mb-3 text-start">
              <h4 className="extra-bold">편의시설</h4>
              <div>
                {convenient.length === 0 ? (
                  <p>제공하는 편의시설이 없습니다</p>
                ) : (
                  <div className={"d-grid"}
                       style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)"}}>
                    {convenient.map((item, index) => (
                      <div className={"mx-3 d-flex justify-content-center flex-column justify-content-center"}>
                        <p className={"fw-bold"}>{item.convenientDTO?.cvName}</p>
                        {/*<p className={"fw-bold"}>{item.convenientDTO?.cvIntro}</p>*/}
                        <img
                          key={index}
                          src={item.convenientDTO?.cvImg}
                          style={{width: "50px", height: "50px"}}
                        />
                      </div>
                    ))}
                  </div>

                )}
              </div>
            </div>
          </div>
        )}

        {/* 메뉴 */}
        {/* 대표메뉴 */}
        {ActTab === "대표메뉴" && (
          <div className="mb-5">
            <h5 className="mb-3 fw-bold text-start">메뉴</h5>
            {bestMenus
              .filter(menu => menu.menuHidden !== "1") // 숨김 처리된 메뉴 제외
              .map((menu, idx) => (
                <div
                  key={idx}
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
                >
                  <div className="text-start">
                    <div className="fw-bold">
                      {menu.menuSoldOut === "1" && (
                        <span className="text-danger me-2">(품절)</span>
                      )}
                      {menu.menuName}
                    </div>
                    <div className="text-muted small">{menu.menuExplanation}</div>
                    <div className="fw-bold mt-3">{menu.menuPrice} 원</div>
                  </div>
                  <div
                    className="bg-light d-flex justify-content-center align-items-center"
                    style={{width: "64px", height: "64px", borderRadius: "6px"}}
                  >
                    <img src={menu.menuImage} style={{width: "64px", height: "64px", borderRadius: "10px"}}/>
                  </div>
                </div>
              ))}
          </div>
        )}


        {ActTab === "리뷰" && (
          <div className="mb-5 text-start">
            <h5 className="mt-5 text-start fw-bold">리뷰</h5>

            {(reviews.length > 0 ? reviews : [
              {
                userName: "사용자",
                reviewRating: "5.0",
                reviewWriteDate: "2025-05-01",
                reviewContent: "기본 리뷰 내용입니다. 첫 리뷰를 작성해보세요.",
                reviewImage1: "",
                reviewImage2: "",
                reviewImage3: ""
              }
            ]).map((review, idx) => (
              <div key={idx} className="card mb-3 shadow-sm p-3">
                {/* 사용자명 + 평점 */}
                <div className="d-flex justify-content-between mb-1">
                  <strong>{review.userName || "사용자"}</strong>
                  <span className="text-warning">★ {review.reviewRating}</span>
                </div>

                {/* 작성일 */}
                <div className="text-muted small mb-2">{review.reviewWriteDate}</div>

                {/* 리뷰 내용 */}
                <div className="mb-2">{review.reviewContent}</div>

                {/* 이미지 */}
                <div className="d-flex gap-2 flex-wrap">
                  {[review.reviewImage1, review.reviewImage2, review.reviewImage3]
                    .filter(Boolean)
                    .map((img, i) => (
                      <div
                        key={i}
                        className="bg-light rounded"
                        style={{width: "100px", height: "100px", overflow: "hidden"}}
                      >
                        <img
                          src={img}
                          alt={`리뷰 이미지 ${i}`}
                          style={{width: "100%", height: "100%", objectFit: "cover"}}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}


        {/* 예약 등록 */}
        <div className="d-flex flex-column gap-2 mb-4">
          <div className="text-start"><h4 className="extra-bold">예약 가능 시간</h4></div>
          <div className={"d-flex align-items-center justify-content-center flex-wrap"}>
            {timeSlots.map((time, idx) => (
              <button key={idx}
                      className={"btn m-1"}
                      style={{backgroundColor: "#FFF8E1"}}>
                {/*<button*/}
                {/*    key={idx}*/}
                {/*    className={`btn ${selectedTime === time ? "btn-primary" : "btn-outline-primary"}`}*/}
                {/*    onClick={() => setSelectedTime(time)}*/}
                {/*>*/}
                {time}
              </button>
            ))}
          </div>

          {userStore && userStore.userIdx !== null ? (
            <button
              className="common-btn w-100"
              onClick={() => {
                Nv(`/book/visit/${userIdx}/${restaurant.resIdx}`)
              }}>예약하기
            </button>
          ) : (
            <button
              className="common-btn w-100"
              onClick={() => {
                Nv("/user/login")
              }}>로그인 후 사용해주세요
            </button>

          )}

        </div>
      </div>
    </div>
  );
}

export default ContentDetail;