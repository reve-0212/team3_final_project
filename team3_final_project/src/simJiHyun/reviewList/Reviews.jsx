import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../stores/useUserStore.jsx";
import { useNavigate } from "react-router-dom";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const user = useUserStore((state) => state.user);
    const userIdx = user?.userIdx;
    const navigate = useNavigate();

    // useEffect로 리뷰 데이터 로딩
    useEffect(() => {
        if (!userIdx) {
            console.warn("userIdx가 아직 정의되지 않았습니다.");
            return;
        }

        console.log("userIdx로 리뷰 요청:", userIdx);

        axios
            .get(`http://localhost:8080/api/review/${userIdx}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                },
            })
            .then((response) => {
                console.log("리뷰 목록 불러오기 성공:", response.data);
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("리뷰 불러오기 실패:", error);
            });
    }, [userIdx]); // userIdx가 바뀔 때마다 리뷰를 다시 로드

    // 리뷰 클릭 시 수정 페이지로 이동하는 함수
    const handleReviewClick = (reviewIdx) => {
        if (!reviewIdx) {
            console.warn("유효하지 않은 reviewIdx:", reviewIdx);
            return;
        }
        console.log("리뷰 수정 페이지로 이동:", reviewIdx);
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
                        className="d-flex flex-row align-items-center justify-content-between py-3 mx-3"
                        style={{
                            borderBottom: "1px solid #A9A9A9",
                            cursor: "pointer",
                        }}
                        onClick={() => handleReviewClick(review.reviewIdx)} // 리뷰 클릭 시 수정 페이지로 이동
                    >
                        <div>
                            <p className="fs-4 fw-bold">{review.resName}</p>
                            <p className="fs-6">{review.reviewContent}</p>
                            <p className="fs-6">{review.reviewWriteDate}</p>
                            <div className="d-flex flex-row text-warning">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        style={{ opacity: i < review.reviewRating ? 1 : 0.3 }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div
                            className="rounded-3"
                            style={{
                                width: "10rem",
                                height: "10rem",
                                backgroundColor: "#A9A9A9",
                                backgroundImage: review.reviewImage1 ? `url(${review.reviewImage1})` : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export default Reviews;
