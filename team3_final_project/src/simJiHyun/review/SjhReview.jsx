import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faStar} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useUserStore from "../../stores/useUserStore.jsx";
import useRestaurantStore from "../../stores/useRestaurantStore.jsx";

function SjhReview() {
  const userState = useUserStore((state) => state.user);
  const resIdx = useRestaurantStore((state) => state.restaurantIdx)

  const [starScore, setStarScore] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewImage, setReviewImage] = useState([])

  useEffect(() => {
    console.log("userIdx : " + userState.userIdx)
    console.log("resIdx : " + resIdx)
  }, []);

  const Nv = useNavigate();

  // 별점 컴포넌트 렌더링
  const ratingStarHandler = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <span key={i + 1} onClick={() => setStarScore(i + 1)}>
          {i + 1 <= starScore ? (
            <FontAwesomeIcon icon={faStar}/>
          ) : (
            <FontAwesomeIcon icon={faStarRegular}/>
          )}
        </span>
      );
    }
    return result;
  };

  const uploadToCloudinary = async (file) => {
    console.log("업로드할 파일:", file);
    console.log("name:", file.name);
    console.log("type:", file.type);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "waitable");

    for (let pair of formData.entries()) {
      if (pair[0] === "file") {
        const f = pair[1];
        console.log(`file name: ${f.name}`);
        console.log(`file size: ${f.size}`);
        console.log(`file type: ${f.type}`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dot2phme3/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Cloudinary 응답:", data);
      return data.secure_url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const uploadImagesToCloudinary = async (files) => {
    const urls = []

    for (const file of files) {
      const url = await uploadToCloudinary(file)
      if (url) urls.push(url)
    }
    return urls;
  }

  // 리뷰 등록 처리
  const handleSubmitReview = async () => {
    if (starScore === 0 || reviewContent.trim() === "") {
      alert("별점과 리뷰 내용을 작성해주세요.");
      return;
    }

    const imageUrls = await uploadImagesToCloudinary(reviewImage);

    const reviewData = {
      userIdx: userState.userIdx,
      resIdx: resIdx, // 예시 값
      reviewRating: starScore,
      reviewContent: reviewContent,
      reviewWriteDate: new Date().toLocaleDateString(),
      reviewImage1: imageUrls[0] ?? null,
      reviewImage2: imageUrls[1] ?? null,
      reviewImage3: imageUrls[2] ?? null,
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
      <h3 className={'basic-font'} style={{fontSize: '23px', textAlign: 'center', fontWeight: 'bold'}}>리뷰 등록하기</h3>
      <div className={"d-flex flex-column justify-content-center align-items-center"}>
        <p className={"fs-6 mb-0"}>방문한 가게는 어떠셨나요?</p>

        <div className={"fs-3 text-warning"}>{ratingStarHandler()}</div>

        <textarea
          className={"form-control mt-3"}
          rows={10}
          style={{resize: "none"}}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="리뷰 내용을 작성하세요..."
        />
      </div>

      <div className={"mt-3 mb-5 d-flex justify-content-between"}>
        <label
          htmlFor={"reviewImageUpload"}
          style={{
            width: "100px", height: "100px",
            backgroundColor: "white", border: "1px solid #A9A9A9",
          }}
          className={"rounded-3 d-flex flex-column justify-content-center align-items-center"}>
          <FontAwesomeIcon icon={faCamera} className={"fs-3"}/>
          <p className={"fs-6 mb-0"}>사진 {reviewImage.length}/3</p>
        </label>
        <input id={"reviewImageUpload"}
               type={"file"}
               multiple accept={"image/*"}
               style={{display: "none"}}
               onChange={(e) => {
                 const files = Array.from(e.target.files).slice(0, 3)
                 setReviewImage(files)
               }}/>

        {reviewImage.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={`preview=${idx}`}
            style={{width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px"}}
          />
        ))}
      </div>

      <button
        type={"button"}
        className={"btn rounded-3 text-light fw-bold flex-fill py-3 mt-5"}
        style={{backgroundColor: "#FFA31C"}}
        onClick={handleSubmitReview}
      >
        등록하기
      </button>

      {/*<button onClick={async () => {*/}
      {/*  const urls = await uploadImagesToCloudinary(reviewImage)*/}
      {/*  console.log("---urls---")*/}
      {/*  console.log(urls)*/}
      {/*}} type={"button"}>uploadToImgur*/}
      {/*</button>*/}
    </div>
  );
}

export default SjhReview