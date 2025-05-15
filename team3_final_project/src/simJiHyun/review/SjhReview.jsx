import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ReviewTitle from "../reviewTitle.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../stores/useUserStore.jsx";
import Button from "../../KimNaHyun/components/Button.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";

function SjhReview() {
    const user = useUserStore((state) => state.user)
    const restaurantIdx = useRestaurantStore((state) => state.restaurantIdx);

    const [starScore, setStarScore] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [reviewImage1, setReviewImage1] = useState("");
    const [reviewImage2, setReviewImage2] = useState("");
    const [reviewImage3, setReviewImage3] = useState("");

    const Nv = useNavigate();

    // 별점 컴포넌트 렌더링
    const ratingStarHandler = () => {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <span key={i + 1} onClick={() => setStarScore(i + 1)}>
                    {i + 1 <= starScore ? (
                        <FontAwesomeIcon icon={faStar} />
                    ) : (
                        <FontAwesomeIcon icon={faStarRegular} />
                    )}
                </span>
            );
        }
        return result;
    };

    // 리뷰 등록 처리
    const handleSubmitReview = () => {
        if (starScore === 0 || reviewContent.trim() === "") {
            alert("별점과 리뷰 내용을 작성해주세요.");
            return;
        }

        const reviewData = {
            user,
            resIdx: restaurantIdx,
            reviewRating: starScore,
            reviewContent: reviewContent,
            reviewWriteDate: new Date().toLocaleDateString(),
            reviewImage1: reviewImage1,
            reviewImage2: reviewImage2,
            reviewImage3: reviewImage3,
        };

        // 서버로 리뷰 등록 요청
        axios
            .post("http://localhost:8080/api/review", reviewData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                },
            })
            .then((response) => {
                console.log("리뷰 등록 성공:", response);
                const reviewIdx = response.data.reviewIdx; // 여기서 얻은 ID
                alert("리뷰가 성공적으로 등록되었습니다.");

                // 다음 페이지로 이동하면서 reviewIdx 전달
                Nv(`/user/reviewList?reviewIdx=${reviewIdx}`);
            })
            .catch((error) => {
                console.error("리뷰 등록 실패:", error);
                alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
            });
    };

    return (
        <div className={"container"}>
            <h3 className={'basic-font'} style={{fontSize:'23px', textAlign:'center', fontWeight:'bold'}}>리뷰 등록하기</h3>
            <div className={"d-flex flex-column justify-content-center align-items-center"}>
                <p className={"fs-6 mb-0"}>방문한 가게는 어떠셨나요?</p>

                <div className={"fs-3 text-warning"}>{ratingStarHandler()}</div>

                <textarea
                    className={"form-control mt-3"}
                    rows={10}
                    style={{ resize: "none" }}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="리뷰 내용을 작성하세요..."
                />
            </div>

            <div className={"mt-3 mb-5"}>
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "white",
                        border: "1px solid #A9A9A9",
                    }}
                    className={"rounded-3 d-flex flex-column justify-content-center align-items-center"}
                >
                    <FontAwesomeIcon icon={faCamera} className={"fs-3"} />
                    <p className={"fs-6 mb-0"}>사진 0/5</p>
                </div>
            </div>

            {/* 리뷰 등록 버튼 */}
            <Button btnName="리뷰 등록하기" onClick={handleSubmitReview} />
        </div>
    );
}

export default SjhReview;
