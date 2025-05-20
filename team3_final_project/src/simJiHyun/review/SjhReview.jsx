import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../../stores/useUserStore.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";
import api from "../../api/axios.js"

function SjhReview() {
  const userState = useUserStore((state) => state.user);
  const resIdx = useRestaurantStore((state) => state.restaurantIdx);
  const [starScore, setStarScore] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewImage, setReviewImage] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingReviewId, setExistingReviewId] = useState(null);
  const Nv = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const reviewIdx = queryParams.get("reviewIdx");

  useEffect(() => {
    if (reviewIdx) {
      setIsEditMode(true);
      setExistingReviewId(reviewIdx);
      api.get(`/api/review/detail/${reviewIdx}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
          })
          .then((res) => {
            const review = res.data;
            setStarScore(review.reviewRating);
            setReviewContent(review.reviewContent);
            const imageUrls = [review.reviewImage1, review.reviewImage2, review.reviewImage3].filter(Boolean);
            setReviewImage(imageUrls.map(url => ({ preview: url, uploaded: true })));
          })
          .catch(err => console.error("리뷰 불러오기 실패:", err));
    }
  }, []);

  const ratingStarHandler = () => {
    return [...Array(5)].map((_, i) => (
        <span key={i + 1} onClick={() => setStarScore(i + 1)}>
        {i + 1 <= starScore ? (
            <FontAwesomeIcon icon={faStar} />
        ) : (
            <FontAwesomeIcon icon={faStarRegular} />
        )}
      </span>
    ));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "waitable");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dot2phme3/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const uploadImagesToCloudinary = async (images) => {
    const urls = [];

    for (const image of images) {
      if (image.uploaded) {
        urls.push(image.preview);
      } else {
        const url = await uploadToCloudinary(image.file);
        if (url) urls.push(url);
      }
    }

    return urls;
  };

  const handleSubmitReview = async () => {
    if (starScore === 0 || reviewContent.trim() === "") {
      alert("별점과 리뷰 내용을 작성해주세요.");
      return;
    }

    const imageUrls = await uploadImagesToCloudinary(reviewImage);

    const reviewData = {
      userIdx: userState.userIdx,
      resIdx: resIdx,
      reviewRating: starScore,
      reviewContent: reviewContent,
      reviewWriteDate: new Date().toLocaleDateString(),
      reviewImage1: imageUrls[0] ?? null,
      reviewImage2: imageUrls[1] ?? null,
      reviewImage3: imageUrls[2] ?? null,
    };

    const url = isEditMode
        ? `/api/review/${reviewIdx}`
        : "/api/review";

    const method = isEditMode ? api.put : api.post;

    method(url, reviewData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
        .then((response) => {
          alert(isEditMode ? "리뷰가 수정되었습니다." : "리뷰가 성공적으로 등록되었습니다.");
          Nv("/user/reviewList");
        })
        .catch((error) => {
          console.error("리뷰 등록/수정 실패:", error);
          alert("리뷰 처리 중 오류가 발생했습니다.");
        });
  };

  const handleDeleteReview = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      api.delete(`/api/review/${reviewIdx}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
          .then(() => {
            alert("리뷰가 삭제되었습니다.");
            Nv("/user/reviewList");
          })
          .catch(err => {
            console.error("리뷰 삭제 실패:", err);
            alert("삭제 중 오류가 발생했습니다.");
          });
    }
  };

  return (
      <div className="container">
        <h3 className="basic-font text-center fw-bold" style={{ fontSize: '23px' }}>
          {isEditMode ? "리뷰 수정하기" : "리뷰 등록하기"}
        </h3>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="fs-6 mb-0">방문한 가게는 어떠셨나요?</p>
          <div className="fs-3 text-warning">{ratingStarHandler()}</div>

          <textarea
              className="form-control mt-3"
              rows={10}
              style={{ resize: "none" }}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="리뷰 내용을 작성하세요..."
          />
        </div>

        <div className="mt-3 mb-5 d-flex flex-wrap gap-2">
          <label
              htmlFor="reviewImageUpload"
              style={{
                width: "100px", height: "100px",
                backgroundColor: "white", border: "1px solid #A9A9A9",
              }}
              className="rounded-3 d-flex flex-column justify-content-center align-items-center"
          >
            <FontAwesomeIcon icon={faCamera} className="fs-3" />
            <p className="fs-6 mb-0">사진 {reviewImage.length}/3</p>
          </label>
          <input
              id="reviewImageUpload"
              type="file"
              multiple accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 3);
                const newImages = files.map(file => ({
                  file,
                  preview: URL.createObjectURL(file),
                  uploaded: false,
                }));
                setReviewImage(newImages);
              }}
          />
          {reviewImage.map((img, idx) => (
              <img
                  key={idx}
                  src={img.preview}
                  alt={`preview-${idx}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
              />
          ))}
        </div>

        {isEditMode ? (
            <div className="d-flex gap-3 mt-5">
              <button
                  className="btn text-light fw-bold py-3 flex-fill"
                  style={{ backgroundColor: "#FFD700"}}
                  onClick={handleSubmitReview}
              >
                수정하기
              </button>
              <button
                  className="btn text-light fw-bold py-3 flex-fill"
                  style={{ backgroundColor: "#bbbbbb" }}
                  onClick={handleDeleteReview}
              >
                삭제하기
              </button>
            </div>
        ) : (
            <button
                className="btn text-light fw-bold py-3 flex-fill mt-5"
                style={{ backgroundColor: "#FFD700"}}
                onClick={handleSubmitReview}
            >
              등록하기
            </button>
        )}
      </div>
  );
}

export default SjhReview;
