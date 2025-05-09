import { useState } from "react";
import ReBanner from "./ReBanner.jsx";

function PreRe() {
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

  // 답글 상태관리
  const [edIndex, setEdIndex] = useState (null);
  const [chReply, setChReply] = useState("");

  // 답글 수정하기
  const upIndex = (index) => {
    setEdIndex(index);
    setChReply(reviews[index].reply);
  };

  // 답글 저장하기
  const saIndex = (index) => {
    const upReview = [...reviews];
    upReview[index].reply = chReply;
    setReviews(upReview);
    setEdIndex(null);
  }

  // 답글 삭제하기
  const delReply = (index) => {
    const upReview = [...reviews];
    upReview[index].reply = "";
    setReviews(upReview);
  }

  return (
      <div
          style={{
            marginLeft: "250px",
            paddingTop: "8rem",
            paddingLeft: "1rem",
            width: "calc(100% - 200px)",
            // maxWidth: "1000px",
            minHeight: "100vh",
          }} className={'container'}
      >
        <ReBanner/>
        <div className={'d-flex gap-3 justify-content-start align-items-center me-5'}>
          <h2 className={'new-menu-title'}>리뷰 관리</h2>

          {/*검색창*/}
          <div className={'menu-search-box d-flex align-items-center'} style={{
            borderRadius: '2rem',
            overflow: 'hidden',
            width: '500px',
            paddingRight: '5px',
            marginLeft: '3rem'
          }}>
            <input
                type="text"
                placeholder={'검색어를 입력하세요'}
                className={'menu-search-input'}
                style={{border: 'none', width: '100%', height: '100%'}}
            />
            <button className="btn"
                    style={{height: '3.5vw', whiteSpace: 'nowrap', paddingRight: '2rem'}}
                    >검색
            </button>
          </div>
        </div>
        <hr/>
        <ul className="list-group">
          {reviews.map((review, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                {/* 왼쪽 내용 */}
                <div className="text-start w-100">
                  <div><strong>작성자:</strong> {review.writer}</div>
                  <div><strong>작성일:</strong> {review.date}</div>
                  <div><strong>별점:</strong> {'⭐'.repeat(review.rating)}</div>
                  <div><strong>리뷰:</strong> {review.content}</div>
                  <div className="mt-2">
                    <strong>답글:</strong>
                    {edIndex === index ? (
                        <textarea
                            value={chReply}
                            onChange={(e) => setChReply(e.target.value)}
                            className="form-control mt-1"
                        />
                    ) : (
                        <div>{review.reply}</div>
                    )}
                  </div>
                </div>

                {/* 오른쪽 - 사진 + 버튼 */}
                <div className="d-flex flex-column align-items-end ms-3" style={{minWidth: '120px'}}>
                  <img
                      src={review.ImageUrl}
                      alt="리뷰 이미지"
                      style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className="mt-2 d-flex gap-2">
                    {edIndex === index ? (
                        <button className="btn btn-sm btn-outline-success" onClick={() => saIndex(index)}>저장</button>
                    ) : review.reply ? (
                        <>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => upIndex(index)}>수정</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => delReply(index)}>삭제</button>
                        </>
                    ) : (
                        <button className="btn btn-sm btn-outline-primary" onClick={() => upIndex(index)}>작성</button>
                    )}
                  </div>
                </div>
              </li>
          ))}
        </ul>

      </div>
  );
}

export default PreRe;
