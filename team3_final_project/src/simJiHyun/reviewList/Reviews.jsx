import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../stores/useUserStore.jsx";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const user = useUserStore((state) => state.user);
    const userIdx = user?.userIdx;
    const queryParams = new URLSearchParams(window.location.search);
    const reviewIdx = queryParams.get('reviewIdx');
    console.log('Review ID:', reviewIdx);  // reviewIdx 출력


    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/${userIdx}`,  {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        })
            .then((response) => {
                console.log("리뷰 목록:", response.data);
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("리뷰 불러오기 실패:", error);
            });
    }, []);

    return (
        <div className="container">
            {reviews.length === 0 ? (
                <p>리뷰가 없습니다.</p>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="d-flex flex-row align-items-center justify-content-between py-3 mx-3"
                         style={{ borderBottom: "1px solid #A9A9A9" }}>
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
                        <div className="rounded-3"
                             style={{
                                 width: "10rem",
                                 height: "10rem",
                                 backgroundColor: "#A9A9A9",
                                 backgroundImage: `url(${review.reviewImage1 || ""})`,
                                 backgroundSize: "cover",
                                 backgroundPosition: "center"
                             }}>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Reviews;
