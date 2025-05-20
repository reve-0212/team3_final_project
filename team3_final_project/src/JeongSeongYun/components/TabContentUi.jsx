import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../stores/useUserStore.jsx";
import api from "../../api/axios.js"

function TabContentUi({title, engTitle, description}) {
  const nv = useNavigate();
  const user = useUserStore(state => state.user)
  const userIdx = user?.userIdx
  const [customStores, setCustomStores] = useState([])
  const [bookmarkStores, setBookmarkStores] = useState([])
  const [reviewStores, setReviewStores] = useState([])
  const [recentStores, setRecentStores] = useState([])
  const [needLogin, setNeedLogin] = useState(false)

  useEffect(() => {
    setCustomStores([])
    setBookmarkStores([])
    setCustomStores([])
    setReviewStores([])
    setNeedLogin(false)

    const fetchData = async () => {
      try {
        if (!userIdx && (engTitle === "bookmarkRes")) {
          setNeedLogin(true)
          return;
        }

        switch (engTitle) {
          case "customRec" : {
            const customRec = await api.get("/customRec")
            setCustomStores(customRec.data)
            break;
          }

          case "bookmarkRes" : {
            const bookmarkRes = await api.get("bookmarkRes", {
              params: {userIdx: userIdx}
            })
            setBookmarkStores(bookmarkRes.data)
            break;
          }

          case "reviewPick" : {
            const reviewRes = await api.get(`reviewPick`)
            setReviewStores(reviewRes.data)
            break;
          }

          case "recentlyRes" : {
            const stored = JSON.parse(localStorage.getItem("recentStores") || "[]")
            const recentRes = await Promise.all(stored.map((id) => api.get(`detail/${id}`)))
            setRecentStores(recentRes.map(res => res.data))
            break;
          }

          default:
            break;
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [engTitle, userIdx]);

  // 최신 맛집
  const renderStoreList = (storeList) => {
    return storeList.map((index) => {
      const imageList = [index.resImage1, index.resImage2, index.resImage3];

      return (
        <div key={index.resIdx} className={"mb-3"}>
          <p className={"fw-bold"}>{index.resName}</p>
          <div className={"d-flex justify-content-center align-items-center gap-3"}>
            {imageList.map((image, idx) => (
              image ? (
                <img
                  key={idx}
                  src={image}
                  style={{width: "128px", height: "128px", flex: "0 0 auto"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.resIdx}`)}
                />
              ) : (
                <div
                  key={idx}
                  style={{width: "128px", height: "128px", flex: "0 0 auto", backgroundColor: "#D9D9D9"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.resIdx}`)}
                ></div>
              )
            ))}
          </div>
        </div>
      );
    });
  };

  // 리뷰픽
  const renderReviewList = (reviewList) => {
    return reviewList.map((index) => {
      const imageList = [index.restaurantDTO?.resImage1, index.restaurantDTO?.resImage2, index.restaurantDTO?.resImage3];

      return (
        <div key={index.restaurantDTO?.resIdx} className={"mb-3"}>
          <div className={"d-flex justify-content-between align-items-center "}>
            <p className={"fw-bold"}>{index.restaurantDTO?.resName}</p>
            <p className={"fw-bold"}><FontAwesomeIcon icon={faStar}
                                                      style={{color: "#FFD727"}}/> : {index.reviewDTO?.reviewRating}</p>
          </div>

          <div className={"d-flex justify-content-center align-items-center gap-3"}>
            {imageList.map((image, idx) => (
              image ? (
                <img
                  key={idx}
                  src={image}
                  style={{width: "128px", height: "128px", flex: "0 0 auto"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.reviewDTO?.resIdx}`)}
                />
              ) : (
                <div
                  key={idx}
                  style={{width: "128px", height: "128px", flex: "0 0 auto", backgroundColor: "#D9D9D9"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.reviewDTO?.resIdx}`)}
                ></div>
              )
            ))}
          </div>
        </div>
      )
    })
  }

  // 북마크
  const renderBookmarkList = (bookmarkList) => {
    return bookmarkList.map((index) => {
      const imageList = [index.restaurantDTO?.resImage1, index.restaurantDTO?.resImage2, index.restaurantDTO?.resImage3];

      return (
        <div key={index.restaurantDTO?.resIdx} className={"mb-3"}>
          <p className={"fw-bold"}>{index.restaurantDTO?.resName}</p>
          <div className={"d-flex justify-content-center align-items-center gap-3"}>
            {imageList.map((image, idx) => (
              image ? (
                <img
                  key={idx}
                  src={image}
                  style={{width: "128px", height: "128px", flex: "0 0 auto"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.restaurantDTO?.resIdx}`)}
                />
              ) : (
                <div
                  key={idx}
                  style={{width: "128px", height: "128px", flex: "0 0 auto", backgroundColor: "#D9D9D9"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.restaurantDTO?.resIdx}`)}
                ></div>
              )
            ))}
          </div>
        </div>
      )
    })
  }

  // 맞춤 추천 ( 유저 태그가 없으므로 랜덤 3개 추천함)
  const renderCustomList = (customList) => {
    return customList.map((index) => {
      const imageList = [index.resImage1, index.resImage2, index.resImage3]

      return (

        //   나현씨 css 수정 ( 나중에 다시 합칠것!)
        // return (
        //   <div className="mb-5">
        //     <div className={"d-flex flex-row align-items-center justify-content-between"}>
        //       <div>
        //         <h5 className="fw-bold mb-1 fs-5 fs-sm-4">{title}</h5>
        //         <p className="text-muted small fs-7">{description}</p>
        //       </div>
        //       <small className="text-muted" onClick={() => {
        //         nv(`/contentList/${engTitle}`)
        //       }}>전체보기 ></small>
        //     </div>

        <div key={index.resIdx} className={"mb-3"}>
          <p className={"fw-bold"}>{index.resName}</p>
          <div className={"d-flex justify-content-center align-items-center gap-3"}>
            {imageList.map((image, idx) => (
              image ? (
                <img
                  key={idx}
                  src={image}
                  style={{width: "128px", height: "128px", flex: "0 0 auto"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.resIdx}`)}
                />
              ) : (
                <div
                  key={idx}
                  style={{width: "128px", height: "128px", flex: "0 0 auto", backgroundColor: "#D9D9D9"}}
                  className={"rounded-5"}
                  onClick={() => nv(`/resdetail/${index.resIdx}`)}
                ></div>
              )
            ))}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="mb-5">
      <div className={"d-flex flex-row align-items-center justify-content-between"}>
        <div>
          <h5 className="fw-bold mb-1 fs-5 fs-sm-4">{title}</h5>
          <p className="text-muted small fs-7">{description}</p>
        </div>
      </div>

      <div className="mb-4">
        {needLogin ?
          (
            <div className={"d-flex justify-content-center align-items-center"}>
              <button
                type={"button"}
                className={"btn fw-bold p-3 mt-5"}
                style={{backgroundColor: "#FFD727"}}
                onClick={() => {
                  nv("/user/login")
                }}>로그인이 필요합니다
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center mb-2 flex-column">
              {engTitle === "recentlyRes" && renderStoreList(recentStores)}
              {engTitle === "reviewPick" && renderReviewList(reviewStores)}
              {engTitle === "bookmarkRes" && renderBookmarkList(bookmarkStores)}
              {engTitle === "customRec" && renderCustomList(customStores)}
              {/*<small className="text-muted" onClick={() => {*/}
              {/*    nv(`/contentList/${engTitle}`)*/}
              {/*}}>전체보기</small>*/}
            </div>
          )}

      </div>
    </div>
  );
}

export default TabContentUi