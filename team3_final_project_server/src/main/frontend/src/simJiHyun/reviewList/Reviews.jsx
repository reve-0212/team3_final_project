import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../stores/useUserStore.jsx";
import {useNavigate} from "react-router-dom";
import api from "../../api/axios.js"

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const user = useUserStore((state) => state.user);
  const userIdx = user?.userIdx;
  const navigate = useNavigate();

  // useEffect로 리뷰 데이터 로딩
  useEffect(() => {
    if (!userIdx) {
      return;
    }

    api.get(`/api/review/${userIdx}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userIdx]); // userIdx가 바뀔 때마다 리뷰를 다시 로드

  // 리뷰 클릭 시 수정 페이지로 이동하는 함수
  const handleReviewClick = (reviewIdx) => {
    if (!reviewIdx) {
      return;
    }
    navigate(`/user/reviewWrite?reviewIdx=${reviewIdx}`);
  };

  return (
    <div className="container">
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="position-relative py-3 mx-3"
            style={{borderBottom: "1px solid #A9A9A9", cursor: "pointer", minHeight: "6rem"}}
            onClick={() => handleReviewClick(review.reviewIdx)}
          >
            {/* 이미지 영역 (오른쪽 상단 고정) */}
            <div
              className="rounded-3"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "5rem",
                height: "5rem",
                marginTop: "0.75rem",
                backgroundColor: "#A9A9A9",
                backgroundImage: review.reviewImage1 ? `url(${review.reviewImage1})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* 텍스트 영역 (이미지 너비 고려해서 padding or margin 설정) */}
            <div style={{paddingRight: "6rem"}}>
              <p className="fs-6 text-wrap mb-1">{review.reviewContent}</p>
              <p className="fs-6 text-wrap mb-1">{review.reviewWriteDate}</p>
              <div className="d-flex flex-row text-warning">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{opacity: i < review.reviewRating ? 1 : 0.3}}
                  />
                ))}
              </div>
            </div>
          </div>

        ))
      )}
    </div>
  );
}

export default Reviews;
