import { useState } from "react";
import AdminSeatEditor from "./AdminSeatEditor.jsx";

function ReMain() {
  const [reviews, setReviews] = useState([
    {
      writer: "홍길동",
      date: "2024-04-25",
      rating: 5,
      content: "음식이 정말 맛있었어요!",
      reply:"감사합니다! 또 방문해주세요",
      ImageUrl:"https://via.placeholder.com/100"
    },
    {
      writer: "홍길동",
      date: "2024-04-25",
      rating: 5,
      content: "음식이 정말 맛있었어요!",
      reply:"감사합니다! 또 방문해주세요",
      ImageUrl:"https://via.placeholder.com/100"
    },
    {
      writer: "홍길동",
      date: "2024-04-25",
      rating: 5,
      content: "음식이 정말 맛있었어요!",
      reply:"감사합니다! 또 방문해주세요",
      ImageUrl:"https://via.placeholder.com/100"
    },
    {
      writer: "홍길동",
      date: "2024-04-25",
      rating: 5,
      content: "음식이 정말 맛있었어요!",
      reply:"감사합니다! 또 방문해주세요,가가가가가가가" +
          "가가가가가가가가가가가가" +
          "가가가가가가가가가" +
          "가가가가가가ㅏ가가" +
          "ㄱ가가가ㅏ가가가가가가가" +
          "가가가가ㅏ",
      ImageUrl:"https://via.placeholder.com/100"
    },
    {
      writer: "홍길동",
      date: "2024-04-25",
      rating: 5,
      content: "음식이 정말 맛있었어요!",
      reply:"감사합니다! 또 방문해주세요",
      ImageUrl:"https://via.placeholder.com/100"
    },
  ]);

  return (
      <div
          style={{
            marginLeft: '200px',
            marginTop: '10vh',
            paddingTop: '2rem',
            paddingLeft: '1rem',
            width: 'calc(100% - 200px)',
            maxWidth: '1000px'
          }}
      >
        <h2 className="text-start">리뷰</h2>
        <hr />

        <p className="text-start">리뷰목록 관리</p>
        <hr />


        <div className="mb-3 d-flex align-items-center" style={{ gap: '1rem' }}>
          <input
              type="text"
              className="form-control"
              placeholder="리뷰를 검색하세요"
              style={{ maxWidth: '300px' }}
          />
          <button className="btn btn-primary">검색</button>
        </div>

        <ul className="list-group">
          {reviews.map((review, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                {/* 왼쪽 내용 */}
                <div className="text-start w-100">
                  <div><strong>작성자:</strong> {review.writer}</div>
                  <div><strong>작성일:</strong> {review.date}</div>
                  <div><strong>별점:</strong> {'⭐'.repeat(review.rating)}</div>
                  <div><strong>리뷰:</strong> {review.content}</div>
                  <div className="mt-2"><strong>답글:</strong> {review.reply}</div>
                </div>

                {/* 오른쪽 - 사진 + 버튼 */}
                <div className="d-flex flex-column align-items-end ms-3" style={{ minWidth: '120px' }}>
                  <img
                      src={review.ImageUrl}
                      alt="리뷰 이미지"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className="mt-2 d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary">수정</button>
                    <button className="btn btn-sm btn-outline-danger">삭제</button>
                  </div>
                </div>
              </li>
          ))}
        </ul>

      </div>
  );
}

export default ReMain;
